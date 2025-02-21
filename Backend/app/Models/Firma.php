<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Firma extends Model
{
    protected $table = 'Firma';        // Explicitly specify the table name
    protected $primaryKey = 'id_firmy';// Set the primary key to id_osoby

    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'int';

    protected $fillable = [
        'id_firmy',
        'ico',
        'nazov_firmy',
        'typ_spolocnosti'
    ];
}
