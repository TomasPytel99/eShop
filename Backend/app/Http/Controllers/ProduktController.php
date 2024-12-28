<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use App\Models\Produkt;
use App\Models\VlastnostiProduktu;
use Illuminate\Http\Request;

class ProduktController extends Controller
{
    public function items(Request $request)
    {
        $section = null;
        switch ($request->get('section')) {
            case 'Gitary':
                $section = 1;
                break;
            case 'Husle':
                $section = 2;
                break;
            case 'Klávesy':
                $section = 3;
                break;
            case 'Bicie':
                $section = 4;
                break;
            case 'Harfy':
                $section = 5;
                break;
            case 'Dychy':
                $section = 6;
                break;
            case 'Akordeóny':
                $section = 7;
                break;
            case 'Príslušenstvo':
                $section = 8;
                break;
            default:
                $section = 1;
                break;
        }
        $guitars = Produkt::join('Vlastnosti_produktu as vp', 'produkt.id_produktu','=','vp.id_produktu')
        ->join('Vlastnost as v', 'v.id_vlastnosti','=','vp.id_vlastnosti')
        ->join('Obrazky as o', 'produkt.id_obrazka', '=', 'o.id_obrazka')
        ->where('produkt.id_kategorie', $section)
        ->select('produkt.id_produktu', 'produkt.nazov as nazov_produktu', 'aktualna_cena','o.obrazok', 'v.nazov', 'hodnota_vlastnosti')->get();
        return $guitars->groupBy('id_produktu')->map(function ($record) {
            $result = [];
            $propertyName = null;
            $guitars = $record->toArray();
            foreach ($guitars as $guitar) {
                foreach ($guitar as $key => $value) {
                    if(!array_key_exists($key, $result)){
                        if($key == 'obrazok') {
                            $result[$key] = base64_encode($value);
                            $result['mime_type'] = 'image/png';
                            continue;
                        }
                        if($key == 'nazov') {
                            $propertyName = $value;
                            continue;
                        }
                        if ($key == 'hodnota_vlastnosti') {
                            $result[ucfirst($propertyName)] = ucfirst($value);
                        } else {
                            $result[ucfirst($key)] = ucfirst($value);
                        }
                    }
                }
            }
            return $result;
        });
    }


    public function newItem(Request $request)
    {
        $data['id_produktu'] = '33';
        $data['aktualna_cena'] = $request['cena'];
        $K = Kategoria::where('nazov', strtolower($request['section']))->first();
        $data['id_kategorie'] = $K->id_kategorie;
    }
}
