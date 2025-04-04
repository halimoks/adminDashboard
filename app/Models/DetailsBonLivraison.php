<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailsBonLivraison extends Model
{
    use HasFactory;
    protected $fillable = ['designation','prixUnitaire','quantity','facture_id'];
    
    function bon_livraison(){
        return $this->belongsTo(BonLivraison::class);
    }
    
    function facture(){
        return $this->belongsTo(Facture::class);
    }
}
