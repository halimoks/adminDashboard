<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Devis extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['dateDevis','object','client_id'];
    function client(){
        return $this->belongsTo(Client::class);
    }
}
