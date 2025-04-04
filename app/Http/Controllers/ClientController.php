<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clients = Client::paginate(6);
        
        // Pass flash messages to the view
        return Inertia::render('Clients/ListClients', [
            'clients' => $clients,
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clients/CreateClient');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $messages = [
            'nomClient.required' => 'Le nom du client est requis.',
            'nomClient.regex' => 'Le nom du client doit contenir au moins une lettre.',
            'nomSociete.required' => 'Le nom de la société est requis.',
            'nomSociete.regex' => 'Le nom de la société doit contenir au moins une lettre.',
            'telephone.required' => 'Le numéro de téléphone est requis.',
            'telephone.regex' => 'Le numéro de téléphone doit contenir entre 8 et 14 chiffres.',
            'email.required' => 'L\'email est requis.',
            'email.email' => 'L\'email doit être un format valide.',
            'adresse.required' => 'L\'adresse est requise.',
            'ICE.required' => 'L\'ICE est requis.',
            'ICE.numeric' => 'L\'ICE doit être un nombre.',
            'IF.required' => 'L\'IF est requis.',
            'IF.numeric' => 'L\'IF doit être un nombre.',
        ];
    
        $validator = Validator::make($request->all(), [
            'nomClient' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'nomSociete' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'telephone' => 'required|regex:/^\d{8,14}$/',
            'email' => 'required|email|max:255',
            'adresse' => 'required|string|max:255',
            'ICE' => 'required|numeric',
            'IF' => 'required|numeric',
        ], $messages);
    
        if ($validator->fails()) {
            return Inertia::render('Clients/CreateClient', [
                'errors' => $validator->errors(),
                'old' => $request->all(),
            ]);
        }
    
        // Create a new client
        Client::create($request->all());
    
        return redirect()->route('clients.index')->with('success', 'Client created successfully.');
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return Inertia::render('Clients/EditClient', ['client' => $client]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $messages = [
            'nomClient.required' => 'Le nom du client est requis.',
            'nomClient.regex' => 'Le nom du client doit contenir au moins une lettre.',
            'nomSociete.required' => 'Le nom de la société est requis.',
            'nomSociete.regex' => 'Le nom de la société doit contenir au moins une lettre.',
            'telephone.required' => 'Le numéro de téléphone est requis.',
            'telephone.regex' => 'Le numéro de téléphone doit contenir entre 8 et 14 chiffres.',
            'email.required' => 'L\'email est requis.',
            'email.email' => 'L\'email doit être un format valide.',
            'adresse.required' => 'L\'adresse est requise.',
            'ICE.required' => 'L\'ICE est requis.',
            'ICE.numeric' => 'L\'ICE doit être un nombre.',
            'IF.required' => 'L\'IF est requis.',
            'IF.numeric' => 'L\'IF doit être un nombre.',
        ];
    
        $validator = Validator::make($request->all(), [
            'nomClient' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'nomSociete' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'telephone' => 'required|regex:/^\d{8,14}$/', // Between 8 and 14 digits
            'email' => 'required|email|max:255',
            'adresse' => 'required|string|max:255',
            'ICE' => 'required|numeric',
            'IF' => 'required|numeric',
        ], $messages);
    
        if ($validator->fails()) {
            return Inertia::render('Clients/EditClient', [
                'client' => $client,
                'errors' => $validator->errors(),
                'old' => $request->all(),
            ]);
        }
    
        try {
            $client->update($request->all());
    
            return redirect()->route('clients.index')->with('success', 'Client updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('clients.index')->with('error', 'An error occurred while updating the client.');
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        try {
            $client->delete();

            return redirect()->route('clients.index')->with('success', 'Client deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('clients.index')->with('error', 'An error occurred while deleting the client.');
        }
    }
}
