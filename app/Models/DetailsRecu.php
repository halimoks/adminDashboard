<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailsRecu extends Model
{
    use HasFactory;
    protected $table = 'details__recus';

    protected $fillable = ['designation', 'prixUnitaire', 'quantity', 'facture_id'];
    public function facture()
    {
        return $this->belongsTo(Facture::class, 'facture_id');
    }
    public function montantTotal()
    {
        return $this->prixUnitaire * $this->quantite;
    }
    public function montantTotalTTC($tva)
    {
        return $this->montantTotal() + ($this->montantTotal() * $tva);
    }
}
