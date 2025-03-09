<?php

namespace App\Http\Controllers;

use App\Models\Firma;
use App\Models\Objednavka;
use App\Models\Osoba;
use App\Models\PolozkaObjednavky;
use App\Models\Produkt;
use App\Models\SposobDopravy;
use App\Models\SposobPlatby;
use App\Models\Zakaznik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use function Laravel\Prompts\search;
use function MongoDB\BSON\toJSON;

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
        $transportMethod = $request->get('transportMethodName');
        $itemAmounts = $request->get('itemAmounts');

        $items = Produkt::whereIn('id_produktu', $itemIds)->get();
        $totalPrice = 0;
        $idsFromDB = $items->pluck('id_produktu')->toArray();

        $responseData = [
            'email' => $email,
            'address' => $address,
            'city' => $city,
            'psc' => $psc,
            'phone' => $phone,
        ];

        foreach ($items as $item) {
            $amount = $itemAmounts[$item->id_produktu];
            $totalPrice += ($item->aktualna_cena - $item->aktualna_cena / 100 * $item->zlava) * $amount;
        }
/*
        if($itemIds == null || $itemIds != null) {
            return response()->json(['failed' => false], 400);
        }*/

        if($companyName == null) {
            $user = Zakaznik::where('email', '=', $email)->first();
            if($user == null) {
                $user = new User([
                    'email' => $email,
                ]);
                $user->save();
                $id = $user->id;
                $customer = Zakaznik::create([
                    'id_zakaznika' => $id,
                    'email' => $email,
                ]);
                $person = Osoba::create([
                    'id_osoby' => $id,
                    'meno' => $name,
                    'priezvisko' => $surname,
                    'email' => $email,
                    'adresa' => $address,
                    'mesto' => $city,
                    'psc' => $psc,
                    'telefon' => $phone,
                ]);
            } else {
                $id = $user->id_zakaznika;
                //$id = 41;
            }
            $responseData['name'] = $name;
            $responseData['surname'] = $surname;

        } else {
            $ico = $request->get("ico");
            $company = Firma::where('ico', '=', $ico)->first();
            if($company == null) {
                $user = User::create([
                    'email' => $email,
                ]);
                $id = $user->id;
                $customer = Zakaznik::create([
                    'id_zakaznika' => $id,
                    'email' => $email,
                ]);
                $companyType = $request->get('companyType');
                $company = Firma::create([
                    'id_firmy' => $id,
                    'nazov_firmy' => $companyType,
                    'ico' => $ico,
                    'typ_spolocnosti' => $companyType,
                ]);
            } else {
                $id = $company->id;
            }
            $responseData['companyName'] = $companyName;
            $responseData['companyType'] = $companyType;
            $responseData['ico'] = $ico;
        }

        if($id != null) {
            $order = new Objednavka();
            $i = $order->id_objednavky;
            $order->id_zakaznika = $id;
            $order->datum = now()->format('Y-m-d H:i:s');

            if($paymentMethod['paymentName'] == 'Dobierka') {
                $order->platba = 'n';
                $totalPrice += 1;
            } else {
                $order->platba = 'y';
            }
            $payMethod = SposobPlatby::where('nazov', '=' ,$paymentMethod['paymentName'])->first();
            $transportOption = SposobDopravy::where('nazov', '=' ,$transportMethod['optionName'])->first();
            $a = $transportOption->nazov;
            $totalPrice += $transportOption->cena;

            $order->id_platby = $payMethod->id_platby;
            $order->id_dopravcu = $transportOption->id_dopravcu;
            $order->celkova_cena = $totalPrice;
            $order->save();

            foreach ($items as $item) {
                $amount = $itemAmounts[$item->id_produktu];

                $itemOfOrder = PolozkaObjednavky::create([
                    'id_objednavky' => $order->id_objednavky,
                    'id_produktu' => $item->id_produktu,
                    'mnozstvo' => $amount,
                    'kupna_cena' => $item->aktualna_cena,
                ]);

                if($item->pocet < $amount) {
                    $item->pocet = 0;
                } else {
                    $item->pocet = $item->pocet - $amount;
                }
                $item->save();
            }
            $responseData['orderId'] = $order->id_objednavky;
            $responseData['date'] = $order->datum;
            $responseData['totalPrice'] = $totalPrice;
            $responseData['paymentMethod'] = $paymentMethod;
            $responseData['transportMethod'] = $transportMethod;
            return response()->json($responseData, 200);
        } else {
            return response()->json(['success' => true], 200);
        }
    }

    public function getOrders(Request $request)
    {
        $user = $request->user();

        $customer = Zakaznik::where('id_zakaznika', '=', $user->id)->first();
        $person = Osoba::where('id_osoby', '=', $customer->id_zakaznika)->first();
        $company = Firma::where('id_firmy', '=', $customer->id_zakaznika)->first();

        $orders = Objednavka::where('objednavka.id_zakaznika', '=', $customer->id_zakaznika)
                    ->join('Polozka_objednavky as po', 'po.id_objednavky', '=', 'objednavka.id_objednavky')
                    ->join('Produkt as p', 'p.id_produktu', '=', 'po.id_produktu')->get();
        $myOrders = [];
        $myOrders = $orders->groupBy('id_objednavky')->map(function ($record) use ($person, $company, $customer) {
            $order = [];
            $order['name'] = $person->meno;
            $order['surname'] = $person->priezvisko;
            $order['address'] = $person->adresa;
            $order['phone'] = $person->telefon;
            $order['email'] = $customer->email;
            $order['psc'] = $person->psc;

            if($company) {
                $order['companyName'] = $company->nazov;
                $order['companyType'] = $company->typ_spolocnosti;
                $order['ico'] = $company->ico;
            }
            $items = [];
            $i = 0;
            foreach ($record as $item) {
                if($i == 0) {
                    $order['orderId'] = $item->id_objednavky;
                    $order['date'] = $item->datum;
                    $order['totalPrice'] = $item->celkova_cena;
                    $paymentMethod = SposobPlatby::where('id_platby', '=', $item->id_platby)->first();
                    $transportMethod = SposobDopravy::where('id_dopravcu', '=', $item->id_dopravcu)->first();

                    $order['paymentMethod'] = (object) [
                        'paymentId' => $paymentMethod->id_platby,
                        'paymentName' => $paymentMethod->nazov,
                        'paymentPrice' => $paymentMethod->cena,
                    ];

                    $order['transportMethod'] = (object) [
                        'optionId' => $transportMethod->id_dopravcu,
                        'optionName' => $transportMethod->nazov,
                        'optionPrice' => $transportMethod->cena,
                    ];
                    $i++;
                }
                $obj = (object) [
                    'Id_produktu' => $item->id_produktu,
                    'amount' => $item->mnozstvo,
                    'Nazov_produktu' => $item->nazov,
                    'Aktualna_cena' => $item->aktualna_cena,
                    'Zlava' => $item->zlava
                ];
                array_push($items, $obj);
            }
            $order['items'] = $items;
            return $order;
        });


        return response()->json($myOrders, 200);
    }
}
