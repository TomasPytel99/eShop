<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obrazok extends Model
{
    protected $table = 'Obrazky';        // Explicitly specify the table name
    protected $primaryKey = 'id_obrazka';// Set the primary key to id_osoby

    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'int';
    protected $fillable = [
        'id_obrazka',
        'nazov_obrazka',
        'obrazok',
    ];
}
