<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BonLivraison extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['dateBonLivraison','object','facture_id'];
    function facture(){
        return $this->belongsTo(Facture::class);
    }
    function details_bon_livraison(){
        return $this->hasOne(DetailsBonLivraison::class);
    }
    
}
