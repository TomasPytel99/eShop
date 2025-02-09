<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Awobaz\Compoships\Compoships;

class VlastnostiProduktu extends Model
{
    use Compoships;

    protected $table = 'Vlastnosti_produktu';        // Explicitly specify the table name
    protected $primaryKey = ['id_produktu', 'id_kategorie', 'id_vlastnosti'];// Set the primary key to id_osoby

    public $incrementing = false;
    public $timestamps = false;

    //chat GPT
    protected function setKeysForSaveQuery($query)
    {
        foreach ($this->primaryKey as $key) {
            $query->where($key, $this->getAttribute($key));
        }
        return $query;
    }
    //
    protected $fillable = [
        'id_produktu',
        'id_kategorie',
        'id_vlastnosti',
        'hodnota_vlastnosti',
    ];
}
