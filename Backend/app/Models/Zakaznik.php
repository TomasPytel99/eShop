<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Zakaznik extends Model
{
    use HasFactory;
    protected $table = 'Zakaznik';        // Explicitly specify the table name
    protected $primaryKey = 'id_zakaznika';// Set the primary key to id_osoby

    public $incrementing = false;
    public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';
    protected $fillable = [
        'id_zakaznika', // Add this
        'email',
        'heslo',
        'zlava',
        'datum_reg'
    ];
}
