<?php

namespace App\Http\Controllers;

use App\Models\Osoba;
use App\Models\Zakaznik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use const http\Client\Curl\AUTH_ANY;

class ZakaznikController extends Controller
{
    public function all() {
        return Zakaznik::all();
    }

    public function register(Request $request)
    {
        $m = DB::select('select zakaznik_seq.nextval from dual')[0]->nextval;
        $data['id_zakaznika'] = ''.$m;
        $data['email'] = $request['email'];
        $data['heslo'] = $request['password'];
        $data['zlava'] = '5';
        $data['datum_reg'] = now()->format('Y-m-d H:i:s');
        $zakaznik = Zakaznik::create($data);

        $osoba_data['id_osoby'] = $m;
        $osoba_data['meno'] = $request['name'];
        $osoba_data['priezvisko'] = $request['surname'];
        $osoba_data['adresa'] = $request['address'];
        $osoba_data['telefon'] = $request['phone'];
        $osoba_data['mesto'] = $request['city'];
        $osoba_data['psc'] = $request['PSC'];
        $osoba = Osoba::create($osoba_data);

        return response()->json('$zakaznik', 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return response()->json(Auth::user(), 200);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
