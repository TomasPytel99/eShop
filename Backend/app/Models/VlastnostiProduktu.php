<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VlastnostiProduktu extends Model
{
    protected $table = 'Vlastnosti_produktu';        // Explicitly specify the table name
    protected $primaryKey = 'id_produktu';// Set the primary key to id_osoby

    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'int';

    protected $fillable = [
        'id_produktu',
        'id_kategorie',
        'id_vlastnosti',
        'hodnota_vlastnosti',
    ];

    public function produkt()
    {
        return $this->belongsTo('App\Models\Product', 'id_produktu', 'id_produktu'); //chat GPT
    }
}
