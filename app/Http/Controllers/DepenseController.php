<?php

namespace App\Http\Controllers;

use App\Models\Depense;
use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DepenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $depenses = Depense::paginate(6);

        return Inertia::render('Depenses/ListDepenses',['depenses'=>$depenses]);
    }

    public function create()
    {
        return Inertia::render('Depenses/CreateDepense');
    }
    public function store(Request $request)
    {
        $messages = [
            'description.required' => 'L\'objet est requis.',
            'montant.required' => 'Le montant est requis.',
            'montant.numeric' => 'Le montant doit être un nombre.',
            'montant.min' => 'Le montant ne peut pas être négatif.',
        ];
    
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'montant' => 'required|numeric|min:0',
        ], $messages);
    
        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }
    
        $depense = new Depense();
        $depense->description = $request->description;
        $depense->montant = $request->montant;
        $depense->save();
    
        return redirect()->route('depenses.index')->with('success', 'Dépense créée avec succès');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Depense $depense)
    {
        return Inertia::render('Depenses/EditDepense',[
            'depense' => $depense
        ]);
    }

    public function update(Request $request, Depense $depense)
    {
        $messages = [
            'description.required' => 'L\'objet est requis.',
            'montant.required' => 'Le montant est requis.',
            'montant.numeric' => 'Le montant doit être un nombre.',
            'montant.min' => 'Le montant ne peut pas être négatif.',
        ];
    
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'montant' => 'required|numeric|min:0',
        ], $messages);
    
        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }
    
        try {
            $depense->update([
                'description' => $request->description,
                'montant' => $request->montant
            ]);
    
            return redirect()->route('depenses.index')->with('success', 'Dépense mise à jour avec succès');
        } catch (\Exception $e) {
            Log::error('Error updating depense: ' . $e->getMessage());
            return redirect()
                ->back()
                ->with('error', 'Une erreur est survenue lors de la mise à jour de la dépense')
                ->withInput();
        }
    }
    public function destroy(Depense $depense)
    {
        $depense->delete();
        return redirect()->route('depenses.index')->with('success', 'Dépense supprimée avec succès');
    }
    
}
