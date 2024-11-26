<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Osoba extends Model
{
    protected $table = 'Osoba';        // Explicitly specify the table name
    protected $primaryKey = 'id_osoby';// Set the primary key to id_osoby

    public $incrementing = false;
    //public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'id_osoby',
        'meno',
        'priezvisko',
        'adresa',
        'mesto',
        'psc',
        'telefon',
    ];
}
