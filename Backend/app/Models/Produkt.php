<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produkt extends Model
{
    protected $table = 'Produkt';        // Explicitly specify the table name
    protected $primaryKey = 'id_produktu';// Set the primary key to id_osoby

    public $timestamps = false;
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'id_produktu',
        'id_kategorie',
        'aktualna_cena',
        'nazov',
        'id_obrazka',
    ];

    public function vlastnosti_produktu()
    {
        return $this->hasMany('App\Models\VlastnostiProduktu', 'id_produktu', 'id_produktu');
    }
}
