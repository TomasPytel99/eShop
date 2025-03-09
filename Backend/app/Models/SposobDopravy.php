<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SposobDopravy extends Model
{
    protected $table = 'sposob_dopravy';
    protected $primaryKey = 'id_dopravcu';

    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'int';

    protected $fillable = [
        'id_dopravcu',
        'nazov',
        'cena',
    ];
}
