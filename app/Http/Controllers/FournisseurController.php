<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FournisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fournisseurs = Fournisseur::paginate(6);
        return Inertia::render('Fournisseurs/ListFournisseurs', ['fournisseurs' => $fournisseurs]);
    }

    public function create()
    {
        return Inertia::render('Fournisseurs/CreateFournisseur');
    }

    public function store(Request $request)
    {
        $messages = [
            'nomFournisseur.required' => 'Le nom du fournisseur est requis.',
            'nomFournisseur.string' => 'Le nom du fournisseur doit être une chaîne de caractères.',
            'nomSC.required' => 'Le nom de la société est requis.',
            'nomSC.string' => 'Le nom de la société doit être une chaîne de caractères.',
            'tel.required' => 'Le numéro de téléphone est requis.',
            'tel.regex' => 'Le téléphone doit être un numéro valide.',
            'fax.regex' => 'Le fax doit être un numéro valide.',
            'email.required' => 'L\'adresse e-mail est requise.',
            'email.email' => 'Veuillez entrer une adresse e-mail valide.',
            'adresse.required' => 'L\'adresse est requise.',
        ];

        $validator = Validator::make($request->all(), [
            'nomFournisseur' => 'required|string|max:255',
            'nomSC' => 'required|string|max:255',
            'tel' => 'required|regex:/^\\+?[0-9]{8,15}$/',
            'fax' => 'nullable|regex:/^\\+?[0-9]{8,15}$/',
            'email' => 'required|email|max:255',
            'adresse' => 'required|string|max:500',
        ], $messages);

        if ($validator->fails()) {
            return Inertia::render('Fournisseurs/CreateFournisseur', [
                'errors' => $validator->errors(),
                'old' => $request->all()
            ]);
        }

            Fournisseur::create($request->only([
                'nomFournisseur', 'nomSC', 'tel', 'fax', 'email', 'adresse'
            ]));
            return redirect()->route('fournisseurs.index')->with('success','Fournisseur ajouté avec success');
        }

    public function edit(Fournisseur $fournisseur)
    {
        return Inertia::render('Fournisseurs/EditFournisseur', [
            'fournisseur' => $fournisseur
        ]);
    }

    public function update(Request $request, Fournisseur $fournisseur)
    {
        $messages = [
            'nomFournisseur.required' => 'Le nom du fournisseur est requis.',
            'nomSC.required' => 'Le nom de la société est requis.',
            'tel.required' => 'Le numéro de téléphone est requis.',
            'email.required' => 'L\'adresse e-mail est requise.',
            'adresse.required' => 'L\'adresse est requise.',
        ];

        $validator = Validator::make($request->all(), [
            'nomFournisseur' => 'required|string|max:255',
            'nomSC' => 'required|string|max:255',
            'tel' => 'required|regex:/^\\+?[0-9]{8,15}$/',
            'fax' => 'nullable|regex:/^\\+?[0-9]{8,15}$/',
            'email' => 'required|email|max:255',
            'adresse' => 'required|string|max:500',
        ], $messages);

        if ($validator->fails()) {
            return Inertia::render('Fournisseurs/EditFournisseur', [
                'fournisseur' => $fournisseur,
                'errors' => $validator->errors(),
                'old' => $request->all(),
            ]);
        }
        
        $fournisseur->update($request->all());
        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur mise à jour avec succes');
    }

    public function destroy(Fournisseur $fournisseur)
    {
        $fournisseur->delete();
        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur supprimée avec succes');
    }
}