<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use App\Models\Oblubene_produkty;
use App\Models\Obrazok;
use App\Models\Predajca;
use App\Models\Produkt;
use App\Models\Vlastnost;
use App\Models\VlastnostiKategorie;
use App\Models\VlastnostiProduktu;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProduktController extends Controller
{

    public function isItemLiked(Request $request)
    {
        $user = request()->user();
        $itemId = $request->query->get('Id_produktu');
        try {
            $record = Oblubene_produkty::where('id_produktu', (int)$itemId)
                ->where('id_zakaznika', $user->id)
                ->first();
            if($record) {
                return response()->json(true);
            }
            return response()->json(false);
        } catch (Exception $ex) {
            return response()->json(['error'=>"Nastala chyba"], 500);
        }
    }

    public function likeItem(Request $request)
    {
        $user = request()->user();
        $id = $user->id;
        try {
            $itemId = (int) request()->input('Id_produktu');
            $record = Oblubene_produkty::where('id_produktu', $itemId)
                                        ->where('id_zakaznika', $user->id)
                                        ->first();
            if(!$record) {
                $newRecord = new Oblubene_produkty([
                    'id_produktu' => $itemId,
                    'id_zakaznika' => $id,
                ]);
                $newRecord->save();
            }
            return response()->json(['success' => true], 200);
        } catch (Exception $ex) {
            return response()->json(['error'=>"Nastala chyba pri pridávaní do obľúbených"], 400);
        }
    }

    public function dislikeItem(Request $request, $itemId)
    {
        $user = request()->user();
        try {
            $record = Oblubene_produkty::where('id_produktu', (int) $itemId)
                ->where('id_zakaznika', $user->id)
                ->first();
            if($record) {
                $record->delete();
            } else {
                return response()->json(['error' => "Nepodarilo sa vymazať z obľúbených, lebo záznam neexistuje"], 400);
            }
            return response()->json(['success' => true], 200);
        } catch (Exception $ex) {
            return response()->json(['error'=>"Nastala chyba pri odoberaní z obľúbených"], 400);
        }
    }
    public function categoryProperties(Request $request)
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
        $sectionProps = VlastnostiKategorie::join('vlastnost as v', 'vlastnosti_kategorie.id_vlastnosti', '=', 'v.id_vlastnosti')->where('id_kategorie', $section)->get();
        $names = array_column($sectionProps->toArray(), 'nazov');
        $capitalised = array_map(function ($item) {
            return mb_convert_case($item, MB_CASE_TITLE, "UTF-8");
        }, $names);
        return response()->json($capitalised);
    }

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
        //chat GPT
        $guitars = Produkt::join('Vlastnosti_produktu as vp', 'produkt.id_produktu','=','vp.id_produktu')
        ->join('Vlastnost as v', 'v.id_vlastnosti','=','vp.id_vlastnosti')
        ->where('produkt.id_kategorie', $section)
        ->select('produkt.id_produktu', 'produkt.nazov as nazov_produktu', 'produkt.zlava as zlava' ,'aktualna_cena', 'id_obrazka', 'v.nazov', 'hodnota_vlastnosti')->get();
        return $guitars->groupBy('id_produktu')->map(function ($record) {
            $result = [];
            $propertyName = null;
            $guitars = $record->toArray();
            foreach ($guitars as $guitar) {
                foreach ($guitar as $key => $value) {
                    if(!array_key_exists($key, $result)){
                        ////Moj kod
                        if($key == 'nazov') {
                            $propertyName = $value;
                            continue;
                        }
                        if ($key == 'hodnota_vlastnosti') {
                            $result[mb_convert_case($propertyName, MB_CASE_TITLE, "UTF-8")] = mb_convert_case($value, MB_CASE_TITLE, "UTF-8");
                        } else {
                            $result[ucfirst($key)] = ucfirst($value);
                        }
                        ////////////
                    }
                }
                $imageFilename = $guitar['id_obrazka'];
                $path = storage_path('app/public/images/' . $imageFilename.'.png');
                $result['obrazok'] = asset('storage/images/' . $imageFilename.'.png');
                try {
                    $imageFilename = $guitar['id_produktu'];
                    if (file_exists('storage/sounds/'.$imageFilename.'.mp3')) {
                        $result['zvuk'] = asset('storage/sounds/' . $guitar['id_produktu'].'.mp3');
                    }
                } catch (exception $ex) {

                }
            }
            return $result;
        });
        ///////////
    }

    public function addItem(Request $request)
    {
        //chat GPT
        $request->validate([
            'obrazok' => 'required|file|mimes:jpg,jpeg,png,gif|max:5120', // Max 5MB
        ]);
        /////////
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
        $item->zlava = $data->Zlava;
        $item->save();
        $image = Obrazok::create([
            'id_obrazka' => $item->id_produktu,
        ]);
        $item->id_obrazka = $image->id_obrazka;
        $item->save();

        $path = $request->file('obrazok')->storePubliclyAs('images', $image->id_obrazka . '.png', 'public');  //chat GPT
        $soundPath = $request->file('zvuk')->storePubliclyAs('sounds', $item->id_produktu . '.mp3', 'public');

        $fields = json_decode($request->input('element')); //chat GPT
        $fields->section = $request->input('section');
        foreach ($fields as $property => $value) {
            if($property == 'Nazov_produktu' || $property == 'Aktualna_cena' ||
                $property == 'id_kategorie' || $property == 'user' || $property == 'section') {
                continue;
            }
            if($value == "" || $value == null){
                continue;
            }
            $l = strtolower($property);
            $prop = Vlastnost::where('nazov', mb_strtolower($property, 'UTF-8'))->first();
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
        $element = json_decode($request->input('element'));

        $user = request()->user();
        $item = Produkt::where('id_produktu', $request->input('id_produktu'))->first();
        $seller = Predajca::where('id_predajcu', $user->id)->first();
        $category = Kategoria::where('nazov', strtolower($request['section']))->first();
        if($seller->id_kategorie != $category->id_kategorie && $seller->admin != 'y') {
            return response()->json(['error' => 'Nemáte práva na pridanie produktu do tejto kategorie'], 401);
        }
        $properties = VlastnostiProduktu::where('id_produktu', $item->id_produktu)->get();
        $e = json_decode($request->input('element'), true);
        foreach ($e as $property => $value) {
            if($property == 'Nazov_produktu' || $property == 'Aktualna_cena' || $property == 'Zlava' || $value == "" || $value == null) {
                continue;
            } else {
                $propertyId = Vlastnost::where('nazov', strtolower($property))->first();
                $v = $propertyId->id_vlastnosti;
                $record = VlastnostiProduktu::where('id_vlastnosti', $v)
                    ->where('id_produktu', $request->input('id_produktu'))
                    ->where('id_kategorie', $category->id_kategorie)
                    ->first();
                if($record)
                {
                    $record->update([
                        'hodnota_vlastnosti' => $value
                    ]);
                }
            }
        }


        $file = $request->file('obrazok');
        if($file) {
            $path = $request->file('obrazok')->storePubliclyAs('images', $item->id_obrazka . '.png', 'public');
        }
        $file = $request->file('zvuk');
        if($file) {
            $path = $request->file('zvuk')->storePubliclyAs('sounds', $item->id_produktu . '.mp3', 'public');
        }
        $itemData= [];
        $newName = $element->Nazov_produktu;
        if($newName != '') {
            $itemData['nazov'] = $newName;
        }
        $actualPrice = $element->Aktualna_cena;
        if($actualPrice != '' && $actualPrice != 0) {
            $itemData['aktualna_cena'] = $actualPrice;
        }
        $sale = $element->Zlava;
        if($sale != '' && $sale != 0) {
            $itemData['zlava'] = $sale;
        }
        $item->update($itemData);
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
                if(Storage::disk('public')->exists('images/'. $item->id_obrazka . '.png')) {
                    Storage::disk('public')->delete('images/'. $item->id_obrazka . '.png');
                }
            }
            return response()->json(['OK' => 'Vymazali sme pozadovany produkt'], 200);
        }
        return response()->json(['Unauthorized' => 'Sak pockaj ty hacker'], 401);
    }
}
