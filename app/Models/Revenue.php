<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Revenue extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['object', 'prix', 'details_factures_id'];

    public function detailsFacture()
    {
        return $this->belongsTo(DetailsFacture::class, 'details_factures_id');
    }
}
