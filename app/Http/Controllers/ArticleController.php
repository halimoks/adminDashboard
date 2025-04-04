<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller{    
    public function index()
    {
        $articles = Article::with('fournisseur')->paginate(6);

        $fournisseurs = Fournisseur::all();
        return Inertia::render('Articles/ListArticles', [
            'articles'=>$articles,
            'fournisseurs' => $fournisseurs
        ]);
    }


    public function create()
    {
        $fournisseurs = Fournisseur::all();

        return Inertia::render('Articles/CreateArticle',['fournisseurs'=>$fournisseurs]);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nomProduit' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'fournisseur_id' => 'required|exists:fournisseurs,id', // Assuming 'fournisseurs' is the correct table name
        ]);

        Article::create([
            'nomProduit' => $validatedData['nomProduit'], // Assuming 'object' is the corresponding column in the database
            'quantity' => $validatedData['quantity'],
            'fournisseur_id' => $validatedData['fournisseur_id'],
        ]);


        return redirect()->route('articles.index')->with('success','Article ajouté avec succées!');    
}

    public function edit(Article $article)
    {
        $fournisseurs = Fournisseur::all();

        return Inertia::render('Articles/EditArticle',['fournisseurs'=>$fournisseurs, 'article'=>$article]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validatedData = $request->validate([
            'nomProduit' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'fournisseur_id' => 'required|exists:fournisseurs,id',
        ]);
        

        $article->update([
            'nomProduit' => $validatedData['nomProduit'],
            'quantity' => $validatedData['quantity'],
            'fournisseur_id' => $validatedData['fournisseur_id'],
        ]);

        
        return redirect()->route('articles.index')->with('success', 'Article mis à jour avec succès!');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Article supprimé avec succès!');
    }
}
