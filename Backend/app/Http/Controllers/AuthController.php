<?php

namespace App\Http\Controllers;

use App\Models\Osoba;
use App\Models\User;
use App\Models\Zakaznik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('YourAppName')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Get authenticated user
    public function getUser(Request $request)
    {
        $user = $request->user();
        $zakaznik = Zakaznik::where('id_zakaznika', $user->id)->first();
        $osoba = Osoba::where('id_osoby', $zakaznik->id_zakaznika)->first();
        $data['name'] = $osoba->meno;
        $data['email'] = $zakaznik->email;
        $data['surname'] = $osoba->priezvisko;
        $data['address'] = $osoba->adresa;
        $data['phone'] = $osoba->telefon;
        $data['psc'] = $osoba->psc;
        $data['city'] = $osoba->mesto;
        return response()->json($data, 200);
    }

    public function updateUser(request $request)
    {
        $user = request()->user();

        $validated = $request->validate([
            'name' => 'required',
            'surname' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'city' => 'required',
            'address' => 'required',
            'psc' => 'required',
        ]);
        $user->update([
            'email' => request('email'),
        ]);

        $zakaznik = Zakaznik::where('id_zakaznika', $user->id)->first();
        $zakaznik->update([
            'email' => request('email')
        ]);
        $osoba = Osoba::where('id_osoby', $zakaznik->id_zakaznika)->first();
        $osoba->update([
            'meno' => request('name'),
            'priezvisko' => request('surname'),
            'telefon' => request('phone'),
            'mesto' => request('city'),
            'adresa' => request('address'),
            'psc' => request('psc'),
        ]);

        $user->save();
        $zakaznik->save();
        $osoba->save();
        return response()->json(['User updated successfully.'], 200);
    }

    public function register(Request $request)
    {
        // Validate incoming data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $zakaznik = Zakaznik::create([
            'id_zakaznika' => $user->id,
            'email' => $request->email,
            'heslo' => $user->password,
            'zlava' => '5',
            'datum_reg' => now()->format('Y-m-d H:i:s'),
        ]);

        $osoba = Osoba::create([
            'id_osoby' => $zakaznik->id_zakaznika,
            'meno' => $request['name'],
            'priezvisko' => $request['surname'],
            'adresa' => $request['address'],
            'telefon' => $request['phone'],
            'mesto' => $request['city'],
            'psc' => $request['PSC'],
        ]);

        // Create an API token for the new user
        $token = $user->createToken('YourAppName')->plainTextToken;

        // Return the response with user and token
        return response()->json([
            'token' => $token,
            'user_id' => $user->id,
        ]);
    }
}
