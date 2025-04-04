<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailsDevis extends Model
{
    use HasFactory;
    protected $table = 'details__devis';
    protected $fillable =['designation','prixUnitaire','quantity','facture_id', 'article_id'];
    function facture(){
        return $this->belongsTo(Facture::class);
    }
}
