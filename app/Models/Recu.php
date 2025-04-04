<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recu extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['dateRecu','object','client_id'];
    function client(){
        return $this->belongsTo(Client::class);
    }
    public function facture()
    {
        return $this->belongsTo(Facture::class, 'facture_id');
    }
    public function detailsRecu()
{
    return $this->hasMany(DetailsRecu::class, 'recu_id');
}
}
