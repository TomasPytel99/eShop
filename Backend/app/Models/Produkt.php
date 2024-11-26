<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produkt extends Model
{
    protected $table = 'Produkt';        // Explicitly specify the table name
    protected $primaryKey = 'id_produktu';// Set the primary key to id_osoby

    public $incrementing = true;
    //public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';

    public function vlastnosti_produktu()
    {
        return $this->hasMany('App\Models\VlastnostiProduktu', 'id_produktu', 'id_produktu');
    }
}
