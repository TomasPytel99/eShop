<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Zakaznik extends Model
{
    //chat GPT
    use HasFactory;
    protected $table = 'Zakaznik';
    protected $primaryKey = 'id_zakaznika';

    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'int';
    protected $fillable = [
        'id_zakaznika',
        'email',
        'heslo',
        'zlava',
        'datum_reg',
        'vymazany'
    ];
    /////////
}
