<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategoria extends Model
{
    use HasFactory;
    protected $table = 'Kategoria';        // Explicitly specify the table name
    protected $primaryKey = 'id_kategorie';// Set the primary key to id_osoby

    public $incrementing = false;
    public $timestamps = false;// If id_osoby is not auto-incrementing, set this to false
    protected $keyType = 'int';
    protected $fillable = [
        'id_kategorie', // Add this
        'nazov',
    ];
}