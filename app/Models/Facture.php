<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facture extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['dateFacture', 'object','source','etatPayement', 'client_id'];
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function bonLivraison()
    {
        return $this->hasOne(BonLivraison::class, 'facture_id');
    }

    public function detailsRecus()
    {
        return $this->hasMany(DetailsRecu::class, 'facture_id');
    }

    public function detailsFactures()
    {
        return $this->hasMany(DetailsFacture::class, 'facture_id');
    }
    
    public function detailsDevis()
    {
        return $this->hasMany(DetailsDevis::class, 'facture_id');
    }
}
