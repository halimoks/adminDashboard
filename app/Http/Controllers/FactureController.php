<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Facture;
use App\Models\Devis;
use App\Models\Client;
use App\Models\Article;
use App\Models\BonLivraison;
use App\Models\DetailsBonLivraison;
use App\Models\DetailsDevis;
use App\Models\DetailsFacture;
use App\Models\DetailsRecu;
use App\Models\Recu;
use App\Models\Revenue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class FactureController extends Controller
{
    public function index()
    {
        $facturesQuery = Facture::query()->with('client');
        
        $factures = $facturesQuery->paginate(8);
    
        return Inertia::render('Factures/ListFactures', [
            'factures' => $factures,
            'success' => session('success'),
            'error' => session('error'),
            'csrftoken' => csrf_token(),
            'clients' => Client::all(),
        ]);
    }
    
    

    public function create()
    {
        $clients = Client::all();
        $articles = Article::all();

        return Inertia::render('Factures/CreateFacture', compact('clients', 'articles'));
    }

    public function store(Request $request)
    {
        // Custom validation messages
        $messages = [
            'object.required' => 'L\'objet est requis.',
            'client_id.required' => 'Le client est requis.',
            'etatPayement.required' => 'Le statut de paiement est requis.',
            'products.required' => 'Au moins un produit est requis.',
            'products.*.designation.required' => 'La désignation est requise pour ce produit.',
            'products.*.designation.string' => 'La désignation doit être une chaîne de caractères.',
            'products.*.designation.max' => 'La désignation ne peut pas dépasser 255 caractères.',
            'products.*.qte.required' => 'La quantité est requise pour chaque produit.',
            'products.*.qte.integer' => 'La quantité doit être un nombre entier.',
            'products.*.qte.min' => 'La quantité doit être au moins 1.',
            'products.*.produit.required' => 'Un produit doit être sélectionné.',
            'products.*.pu.required' => 'Le prix unitaire est requis.',
            'products.*.pu.numeric' => 'Le prix doit être un nombre.',
            'products.*.pu.min' => 'Le prix doit être supérieur ou égal à 1.',
        ];

        // Validate the request
        $validator = Validator::make($request->all(), [
            'object' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
            'etatPayement' => 'required|boolean',
            'products' => 'required|array',
            'products.*.designation' => 'required|string|max:255',
            'products.*.qte' => 'required|integer|min:1',
            'products.*.produit' => 'required|exists:articles,id',
            'products.*.pu' => 'required|numeric|min:1',
        ], $messages);

        if ($validator->fails()) {
            return Inertia::render('Factures/CreateFacture', [
                'clients' => Client::all(),
                'articles' => Article::all(),
                'errors' => $validator->errors(),
                'old' => $request->all(),
            ]);
        }

        if($request->paperType == 'facture'){
            $facture = new Facture();
                $facture->dateFacture = now();
                $facture->object = $request->object;
                $facture->source = 'facture';
                $facture->etatPayement = (int) $request->etatPayement;
                $facture->client_id = $request->client_id;
            $facture->save();

            foreach ($request->products as $product) {
                $article = Article::find($product['produit']);
                if ($article->quantity < $product['qte']) {
                    return redirect()->route('factures.index')->with('error', 'Quantité insuffisante pour l\'article ' . $article->designation);
                }

                $detailsFacture = DetailsFacture::create([
                    'designation' => $product['designation'],
                    'prixUnitaire' => $product['pu'],
                    'quantity' => $product['qte'],
                    'facture_id' => $facture->id,
                    'article_id' => $product['produit'],
                ]);
            
                $article->quantity -= $product['qte'];
                $article->save();
            
                Revenue::create([
                    'object' => $request->object,
                    'prix' => $product['pu'] * $product['qte'],
                    'details_factures_id' => $detailsFacture->id,
                ]);

                $detailsRecu = DetailsRecu::create([
                    'designation'=>$product['designation'],
                    'prixUnitaire'=>$product['pu'],
                    'quantity'=>$product['qte'],
                    'facture_id'=>$facture->id
                ]);

                DetailsBonLivraison::create([
                    'designation'=>$product['designation'],
                    'prixUnitaire'=>$product['pu'],
                    'quantity'=>$product['qte'],
                    'facture_id'=>$facture->id
                ]);
            }
            
            Recu::create([
                'dateRecu'=>now(),
                'object'=>$request->object,
                'client_id'=>$request->client_id,
            ]);

            $bonLivraison = BonLivraison::create([
                'dateBonLivraison'=> now(),
                'object'=>$product['designation'],
                'facture_id'=>$facture->id
            ]);
        }
        else if($request->paperType == 'devis'){
            $devis = new Devis();
                $devis->dateDevis = now();
                $devis->object = $request->object;
                $devis->client_id = $request->client_id;
            $devis->save();


            $facture = new Facture();
                $facture->dateFacture = now();
                $facture->object = $request->object;
                $facture->source = 'devis';
                $facture->etatPayement = 0;
                $facture->client_id = $request->client_id;
            $facture->save();


            foreach ($request->products as $product) {
                DetailsDevis::create([
                    'designation' => $product['designation'],
                    'prixUnitaire' => $product['pu'],
                    'quantity' => $product['qte'],
                    'facture_id' => $facture->id,  
                    'article_id' =>$product['produit']          
                ]);
            };
        };

        return redirect()->route('factures.index')->with('success', "{$request->paperType} créée avec succès.");
    }

    public function edit(Facture $facture)
    {
        $articles = Article::all();
        $detailsFacture = DetailsFacture::where('facture_id', $facture->id)->get();
        
        // Check if there are any DetailsFacture
        if ($detailsFacture->isEmpty()) {
            $detailsDevis = DetailsDevis::where('facture_id', $facture->id)->get();
            $details = $detailsDevis;
        } else {
            $details = $detailsFacture;
        }
    
        $clients = Client::all();
    
        return Inertia::render('Factures/EditFacture', [
            'facture' => $facture,
            'articles' => $articles,
            'clients' => $clients,
            'details' => $details,
        ]);
    }
    

    public function update(Request $request, Facture $facture)
    { 

        $messages = [
            'object.required' => 'L\'objet est requis.',
            'client_id.required' => 'Le client est requis.',
            'etatPayement.required' => 'Le statut de paiement est requis.',
            'products.required' => 'Au moins un produit est requis.',
            'products.*.designation.required' => 'La désignation est requise pour ce produit.',
            'products.*.designation.string' => 'La désignation doit être une chaîne de caractères.',
            'products.*.designation.max' => 'La désignation ne peut pas dépasser 255 caractères.',
            'products.*.qte.required' => 'La quantité est requise pour chaque produit.',
            'products.*.qte.integer' => 'La quantité doit être un nombre entier.',
            'products.*.qte.min' => 'La quantité doit être au moins 1.',
            'products.*.produit.required' => 'Un produit doit être sélectionné.',
            'products.*.pu.required' => 'Le prix unitaire est requis.',
            'products.*.pu.numeric' => 'Le prix doit être un nombre.',
            'products.*.pu.min' => 'Le prix doit être supérieur ou égal à 1.',
        ];
    
        // Validate the request
        $validator = Validator::make($request->all(), [
            'object' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
            'etatPayement' => 'required|boolean',
            'products' => 'required|array',
            'products.*.designation' => 'required|string|max:255',
            'products.*.qte' => 'required|integer|min:1',
            'products.*.produit' => 'required|exists:articles,id',
            'products.*.pu' => 'required|numeric|min:1',
        ], $messages);
    
        if ($validator->fails()) {
            return Inertia::render('Factures/EditFacture', [
                'facture' => $facture,
                'articles' => Article::all(),
                'clients' => Client::all(),
                'errors' => $validator->errors(),
                'old' => $request->all(), // Return old input
            ]);
        }
    
        // Update the facture fields
        $facture->update([
            'object' => $request->object,
            'client_id' => $request->client_id,
            'etatPayement' => (int) $request->etatPayement,
        ]);
    
        $detailsFacture = DetailsFacture::where('facture_id', $facture->id)->get();
    
        if ($detailsFacture->isNotEmpty()) {
            // Clear existing DetailsFacture
            $facture->detailsFactures()->delete();
        } else {
            // If no DetailsFacture, clear existing DetailsDevis instead
            $facture->detailsDevis()->delete();
        }
    
        // Create or update the details
        foreach ($request->products as $product) {
            if ($detailsFacture->isNotEmpty()) {
                // Create new DetailsFacture
                DetailsFacture::create([
                    'designation' => $product['designation'],
                    'prixUnitaire' => $product['pu'],
                    'quantity' => $product['qte'],
                    'facture_id' => $facture->id,
                    'article_id' => $product['produit'],
                ]);
            } else {
                // Create new DetailsDevis
                DetailsDevis::create([
                    'designation' => $product['designation'],
                    'prixUnitaire' => $product['pu'],
                    'quantity' => $product['qte'],
                    'facture_id' => $facture->id,
                    'article_id' => $product['produit'],
                ]);
            }
        }
    
        return redirect()->route('factures.index')->with('success', 'Facture mise à jour avec succès.');
    }
    
    
    
    public function destroy(Facture $facture)
    {
        $facture->detailsFactures()->delete();
        $facture->detailsRecus()->delete();
        $facture->bonLivraison()->delete();
        $facture->detailsDevis()->delete();

        $facture->delete();
        return redirect()->route('factures.index')->with('success', 'Facture supprimée avec succès.');
    }

    public function printFacture(Request $req , $id){
        $facture = Facture::findOrFail($id);

        if($facture->source === 'devis'){
            $details = DetailsDevis::where('facture_id', $id)->get();
            return view('imagine.factures.printDevis',compact('details','facture'));
        }
        elseif ($facture->source === 'facture') {
            $details = DetailsFacture::where('facture_id', $id)->get();
            return view('imagine.factures.printFacture', compact('facture', 'details'));
        }
        else{
            return redirect()->route('factures.index')->with('error', 'La facture demandée n\'existe pas.');
        }
    }
    public function printBL($id){

        $bl = BonLivraison::where('facture_id', $id)->first();
        $details = DetailsBonLivraison::where('facture_id', $id)->get();


        $facture = Facture::where('id',$id)->first();

        return view('imagine.factures.printBL',compact('bl','details','facture'));
    }
    public function printRecu($id){
        $details = DetailsRecu::where('facture_id',$id)->get();
        $facture = Facture::where('id',$id)->first();

        
        return view('imagine.factures.printRecu', compact('facture', 'details'));
    }
}
