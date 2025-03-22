<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VlastnostiKategorie extends Model
{
    protected $table = 'Vlastnosti_kategorie';        // Explicitly specify the table name
    protected $primaryKey = ['id_kategorie', 'id_vlastnosti'];// Set the primary key to id_osoby

    public $incrementing = false;
    public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';

    protected function setKeysForSaveQuery($query)
    {
        foreach ($this->primaryKey as $key) {
            $query->where($key, $this->getAttribute($key));
        }
        return $query;
    }

    protected $fillable = [
        'id_kategorie',
        'id_vlastnosti',
        'dolezita'
    ];
}
