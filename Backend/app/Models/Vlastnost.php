<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vlastnost extends Model
{
    protected $table = 'Vlastnost';        // Explicitly specify the table name
    protected $primaryKey = 'id_vlastnosti';// Set the primary key to id_osoby

    public $incrementing = true;
    //public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';
}
