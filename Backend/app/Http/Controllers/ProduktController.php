<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use App\Models\Obrazok;
use App\Models\Predajca;
use App\Models\Produkt;
use App\Models\Vlastnost;
use App\Models\VlastnostiProduktu;
use http\Env\Response;
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
            default:
                $section = 8;
                break;
        }
        $guitars = Produkt::join('Vlastnosti_produktu as vp', 'produkt.id_produktu','=','vp.id_produktu')
        ->join('Vlastnost as v', 'v.id_vlastnosti','=','vp.id_vlastnosti')
        ->where('produkt.id_kategorie', $section)
        ->select('produkt.id_produktu', 'produkt.nazov as nazov_produktu', 'aktualna_cena', 'id_obrazka', 'v.nazov', 'hodnota_vlastnosti')->get();
        return $guitars->groupBy('id_produktu')->map(function ($record) {
            $result = [];
            $propertyName = null;
            $guitars = $record->toArray();
            foreach ($guitars as $guitar) {
                foreach ($guitar as $key => $value) {
                    if(!array_key_exists($key, $result)){
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
                $imageFilename = $guitar['id_obrazka'];
                $path = storage_path('app/public/images/' . $imageFilename.'.png');
                $result['obrazok'] = asset('storage/images/' . $imageFilename.'.png');
            }
            return $result;
        });
    }

    public function addItem(Request $request)
    {
        $request->validate([
            'obrazok' => 'required|file|mimes:jpg,jpeg,png,gif|max:5120', // Max 5MB
        ]);
        $data = json_decode($request->input('element'));

        $user = request()->user();
        $seller = Predajca::where('id_predajcu', $user->id)->first();
        $category = Kategoria::where('nazov', strtolower($request['section']))->first();
        if($seller->id_kategorie != $category->id_kategorie && $seller->admin != 'y') {
            return response()->json(['error' => 'Nemáte práva na pridanie produktu do tejto kategorie'], 401);
        }
        $item = new Produkt();
        $item->aktualna_cena = $data->Aktualna_cena;
        $item->id_kategorie = $category->id_kategorie;
        $item->nazov = $data->Nazov_produktu;
        $item->save();
        $image = Obrazok::create([
            'id_obrazka' => $item->id_produktu,
        ]);
        $item->id_obrazka = $image->id_obrazka;
        $item->save();

        $path = $request->file('obrazok')->storePubliclyAs('images', $image->id_obrazka . '.png', 'public');

        $fields = json_decode($request->input('element'));
        $fields->section = $request->input('section');
        foreach ($fields as $property => $value) {
            if($property == 'Nazov_produktu' || $property == 'Aktualna_cena' ||
                $property == 'id_kategorie' || $property == 'user' || $property == 'section') {
                continue;
            }
            $prop = Vlastnost::where('nazov', strtolower($property))->first();
            VlastnostiProduktu::create([
                'id_produktu' => $item->id_produktu,
                'id_kategorie' => $category->id_kategorie,
                'id_vlastnosti' => $prop->id_vlastnosti,
                'hodnota_vlastnosti' => $value,
            ]);
        }
        return response()->json($item);
    }

    public function editItem(Request $request)
    {
        $el = json_decode($request->input('element'));
        $user = request()->user();
        $s = request()->input('section');
        $item = Produkt::where('id_produktu', $request->input('id_produktu'))->first();

        if($user->id_kategorie != $item->id_kategorie && $user->admin != 'y') {
            return response()->json(['error' => 'Nemáte práva na upravu produktu v tejto kategorii'], 401);
        }
        $properties = Vlastnost::where('id_produktu', $request['id_produktu'])->all();
        foreach ($properties as $property) {
            if($request[$property]) {
                $value = VlastnostiProduktu::where('nazov', $property->nazov && 'id_kategorie', $item->id_kategorie)->first();
                $value->update([
                    $request[$property] => $request[$property]->value,
                ]);
            }
        }
        $item->update([
            'nazov' => $request['nazov_produktu'],
            'aktualna_cena' => $request['cena'],
            'id_kategorie' => $request['id_kategorie'],
        ]);
        return response()->json(['OK', 'Upravili ste zadany produkt'], 200);
    }

    public function deleteItem(Request $request, $id)
    {
        $user = request()->user();
        $seller = Predajca::where('id_predajcu', $user->id)->first();
        if($seller) {
            $item = Produkt::where('id_produktu', $id)->first();
            if($seller->id_kategorie != $item->id_kategorie && $seller->admin != 'y') {
                return response()->json(['error' => 'Nemáte práva na odstránenie produktu v tejto kategorii'], 401);
            }

            if($item != null) {
                $properties = VlastnostiProduktu::where('id_produktu', $item->id_produktu)->get();
                foreach ($properties as $property) {
                    $property->delete();
                }
                $item->delete();
            }
            return response()->json(['OK' => 'Vymazali sme pozadovany produkt'], 200);
        }
        return response()->json(['Unauthorized' => 'Sak pockaj ty hacker'], 401);
    }
}
