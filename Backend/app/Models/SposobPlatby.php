<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SposobPlatby extends Model
{
    protected $table = 'Sposob_platby';        // Explicitly specify the table name
    protected $primaryKey = 'id_platby';// Set the primary key to id_osoby

    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'int';

    protected $fillable = [
        'id_platby',
        'nazov',
        'cena',
    ];
}
