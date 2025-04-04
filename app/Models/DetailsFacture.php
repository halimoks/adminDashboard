<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailsFacture extends Model
{
    use HasFactory;
    protected $table = 'details_factures';
    protected $fillable =['designation','prixUnitaire','quantity','facture_id','article_id'];
    
    public function facture()
    {
        return $this->belongsTo(Facture::class, 'facture_id');
    }
    public function article()
    {
        return $this->belongsTo(Article::class, 'article_id');
    }
}
