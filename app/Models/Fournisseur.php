<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fournisseur extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['nomFournisseur','nomSC','tel','fax','email','adresse'];

    function articles(){
        return $this->hasMany(Article::class);
    }
}


