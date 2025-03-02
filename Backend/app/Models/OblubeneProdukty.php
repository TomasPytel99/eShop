<?php

namespace App\Models;

use Awobaz\Compoships\Compoships;
use Illuminate\Database\Eloquent\Model;

class Oblubene_produkty extends Model
{
    use Compoships;

    protected $table = 'Oblubene_produkty';        // Explicitly specify the table name
    protected $primaryKey = ['id_produktu', 'id_zakaznika'];// Set the primary key to id_osoby

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
    protected $fillable = [
        'id_produktu',
        'id_zakaznika',
    ];
}
