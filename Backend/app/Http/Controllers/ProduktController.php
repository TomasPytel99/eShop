<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use App\Models\Produkt;
use App\Models\VlastnostiProduktu;
use Illuminate\Http\Request;

class ProduktController extends Controller
{
    public function gitary()
    {   $guitars = Produkt::join('Vlastnosti_produktu as vp', 'produkt.id_produktu','=','vp.id_produktu')
        ->join('Vlastnost as v', 'v.id_vlastnosti','=','vp.id_vlastnosti')
        ->where('produkt.id_kategorie', 1)
        ->select('produkt.id_produktu', 'produkt.nazov as nprod', 'aktualna_cena', 'v.nazov', 'hodnota_vlastnosti')->get();
        $grouped = $guitars->groupBy('id_produktu')->map(function ($item) {
            $result = [];

            // Loop through the first item and add all its attributes to the result
            // Without knowing the names, we can just add them as they are
            foreach ($item->first()->getAttributes() as $key => $value) {
                $h = $item->first()->getAttributes();
                $result[$key] = $value;
            }

            // Loop through each property in the group and add it dynamically to the result
            foreach ($item as $product) {
                // Dynamically assign property based on 'vlastnost_nazov'
                $result[$product->vlastnost_nazov] = $product->hodnota_vlastnosti;
            }
            return $result;
        });
        dd($grouped);
    }


    public function newItem(Request $request)
    {
        $data['id_produktu'] = '33';
        $data['aktualna_cena'] = $request['cena'];
        $K = Kategoria::where('nazov', strtolower($request['section']))->first();
        $data['id_kategorie'] = $K->id_kategorie;
    }
}
