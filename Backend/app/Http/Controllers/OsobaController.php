<?php

namespace App\Http\Controllers;

use App\Models\Osoba;
use Illuminate\Http\Request;

class OsobaController extends Controller
{
    public function all() {
        return Osoba::all();
    }
}
