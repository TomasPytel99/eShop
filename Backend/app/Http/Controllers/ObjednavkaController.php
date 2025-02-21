<?php

namespace App\Http\Controllers;

use App\Models\Firma;
use App\Models\Objednavka;
use App\Models\Osoba;
use App\Models\Produkt;
use App\Models\Zakaznik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use function Laravel\Prompts\search;

class ObjednavkaController extends Controller
{
    public function newOrder(Request $request)
    {
        $id  = $request->get('user_id');
        $name = $request->get('name');
        $surname = $request->get('surname');
        $email = $request->get('email');
        $address = $request->get('address');
        $city = $request->get('city');
        $psc = $request->get('psc');
        $phone = $request->get('phone');
        $itemIdes = $request->get('items');
        $paymentMethod = $request->get('paymentMethodName');
        $companyName = $request->get('companyName');
        $itemIds = array_map('intval', $itemIdes);
        $transportPrice = $request->get('transportPrice');
        $itemAmounts = $request->get('itemAmounts');

        $items = Produkt::whereIn('id_produktu', $itemIds)->get();
        $totalPrice = 0;
        $idsFromDB = $items->pluck('id_produktu')->toArray();
        foreach ($items as $item) {
            $index = array_search($item->id_produktu, $idsFromDB);
            $totalPrice += $item->aktualna_cena * $itemAmounts[$index];
        }

        if($itemIds == null || $itemIds != null) {
            return response()->json(['failed' => false], 400);
        }

        if($companyName == null) {
            $user = Zakaznik::where('id_zakaznika', '=', $id)->first();
            if($user == null) {
                $user = new User();
                $id = $user->id;
                $customer = Zakaznik::create([
                    'id_zakaznika' => $id,
                ]);
                $person = Osoba::create([
                    'id_osoby' => $id,
                    'meno' => $name,
                    'priezvisko' => $surname,
                    'email' => $email,
                    'adresa' => $address,
                    'city' => $city,
                    'psc' => $psc,
                    'telefon' => $phone,
                ]);
            } else {
                $id = $user->id_zakaznika;
            }
        } else {
            $company = Firma::where('nazov', '=', $companyName)->first();
            if($company == null) {
                $user = User::create([
                    'email' => $email,
                ]);
                $id = $user->id;
                $customer = Zakaznik::create([
                    'id_zakaznika' => $id,
                    'email' => $email,
                ]);
                $companyICO = $request->get('ico');
                $companyType = $request->get('companyType');
                $company = Firma::create([
                    'id_firmy' => $id,
                    'nazov_firmy' => $companyICO,
                    'ico' => $companyICO,
                    'typ_spolocnosti' => $companyType,
                ]);/*
                $person = Osoba::create([
                    'id_osoby' => $id,
                    'meno' => $name,
                    'priezvisko' => $surname,
                    'email' => $email,
                    'adresa' => $address,
                    'city' => $city,
                    'psc' => $psc,
                    'telefon' => $phone,
                ]);*/
            } else {
                $id = $company->id;
            }
        }

        if($id != null) {
            $order = new Objednavka();
            $order->id_zakaznika = $id;
            $order->datum = now()->format('Y-m-d H:i:s');

            if($paymentMethod == 'Dobierka') {
                $order->platba = 'n';
                $totalPrice += 1;
            } else {
                $order->platba = 'y';
            }
            $order->celkova_cena = $totalPrice + $transportPrice;
            $order->save();

            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['success' => true], 200);
        }
    }
}
