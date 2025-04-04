<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory;
    protected $fillable = ['nomProduit','quantity','fournisseur_id'];
    function fournisseur(){
        return $this->belongsTo(Fournisseur::class);
    }
    function details_factures(){
        return $this->hasMany(DetailsFacture::class);
    }
    function details_devis(){
        return $this->hasMany(DetailsDevis::class);
    }
}
