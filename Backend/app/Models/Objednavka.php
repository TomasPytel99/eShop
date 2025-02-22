<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objednavka extends Model
{
    use HasFactory;
    protected $table = 'objednavka';
    protected $primaryKey = 'id_objednavky';

    public $incrementing = true;
    public $timestamps = false;
    protected $keyType = 'int';

    protected $fillable = [
        'id_objednavky',
        'id_zakaznika',
        'datum',
        'celkova_cena',
        'platba'
    ];
}
