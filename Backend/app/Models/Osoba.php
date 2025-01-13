<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Osoba extends Model
{
    //chat GPT
    protected $table = 'Osoba';
    protected $primaryKey = 'id_osoby';

    public $incrementing = false;

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
    //////
}
