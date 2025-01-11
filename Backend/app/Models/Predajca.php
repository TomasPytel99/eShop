<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Predajca extends Model
{
    protected $table = 'Predajca';
    protected $primaryKey = 'id_zakaznika';

    public $incrementing = false;

    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'id_zakaznika',
        'id_kategorie',
        'admin',
    ];
}
