<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Firma extends Model
{
    protected $table = 'Firma';        // Explicitly specify the table name
    protected $primaryKey = 'id_firmy';// Set the primary key to id_osoby

    public $incrementing = false;
    //public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';
}
