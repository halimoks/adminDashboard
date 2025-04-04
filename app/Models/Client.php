<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['nomClient','nomSociete','telephone','email','adresse','ICE','IF'];

    function factures(){
        return $this->hasMany(Facture::class);
    }
    function devis(){
        return $this->hasMany(Devis::class);
    }
    function recus(){
        return $this->hasMany(Recu::class);
    }
    function bon_livraisons(){
        return $this->hasMany(BonLivraison::class);
    }
}
