<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VlastnostiProduktu extends Model
{
    protected $table = 'Vlastnosti_produktu';        // Explicitly specify the table name
    protected $primaryKey = 'id_produktu';// Set the primary key to id_osoby

    public $incrementing = false;
    //public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';

    public function produkt()
    {
        return $this->belongsTo('App\Models\Product', 'id_produktu', 'id_produktu');
    }
}
