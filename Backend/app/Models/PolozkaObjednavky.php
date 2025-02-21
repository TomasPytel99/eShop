<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolozkaObjednavky extends Model
{
    use HasFactory;
    protected $table = 'Polozka_objednavky';
    protected $primaryKey = ['id_objednavky', 'id_produktu'];

    public $incrementing = false;
    public $timestamps = false;

    protected function setKeysForSaveQuery($query)
    {
        foreach ($this->primaryKey as $key) {
            $query->where($key, $this->getAttribute($key));
        }
        return $query;
    }
    protected $fillable = [
        'id_objednavky',
        'id_produktu',
        'mnozstvo',
        'kupna_cena'
    ];
}
