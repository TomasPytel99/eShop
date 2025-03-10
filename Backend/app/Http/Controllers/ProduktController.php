<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use App\Models\OblubeneProdukty;
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
            $record = OblubeneProdukty::where('id_produktu', (int)$itemId)
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
            $record = OblubeneProdukty::where('id_produktu', $itemId)
                                        ->where('id_zakaznika', $user->id)
                                        ->first();
            if(!$record) {
                $newRecord = new OblubeneProdukty([
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
            $record = OblubeneProdukty::where('id_produktu', (int) $itemId)
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
            case 'Klavesy':
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
            case 'Akordeony':
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
            case 'Klavesy':
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
            case 'Akordeony':
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
            ->where('produkt.vymazany', '=', 'N')
        ->select('produkt.id_produktu', 'produkt.nazov as nazov_produktu', 'produkt.zlava as zlava' ,'aktualna_cena',
            'obrazok_cesta', 'nahravka_cesta', 'pocet' ,'v.nazov', 'hodnota_vlastnosti')->get();
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
                $imageFilename = $guitar['obrazok_cesta'];
                $path = storage_path('app/public/'.$imageFilename);
                $result['obrazok'] = asset('storage/'.$imageFilename);
                try {
                    $imageFilename = $guitar['nahravka_cesta'];
                    if (file_exists('storage/'.$imageFilename)) {
                        $result['zvuk'] = asset('storage/'.$imageFilename);
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
        $item->pocet = $data->Pocet;
        $item->save();

        $path = $request->file('obrazok')->storePubliclyAs('images/'.$category->nazov, $item->id_produktu . '.png', 'public');  //chat GPT
        $item->obrazok_cesta = $path;
        if($request->file('zvuk')) {
            $soundPath = $request->file('zvuk')->storePubliclyAs('sounds/'.$category->nazov, $item->id_produktu . '.mp3', 'public');
            $item->nahravka_cesta = $soundPath;
        }
        $item->save();



        $fields = json_decode($request->input('element')); //chat GPT
        $fields->section = $request->input('section');
        foreach ($fields as $property => $value) {
            if($property == 'Nazov_produktu' || $property == 'Aktualna_cena' ||
                $property == 'id_kategorie' || $property == 'user' || $property == 'section' || $property == 'Zlava'
                || $property == 'Pocet') {
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
            if($property == 'Nazov_produktu' || $property == 'Aktualna_cena' || $property == 'Zlava' || $value == ""
                || $value == null || $property == 'Pocet') {
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

        $itemData= [];
        $file = $request->file('obrazok');
        if($file) {
            $path = $request->file('obrazok')->storePubliclyAs('images/'. $category->nazov, $item->id_obrazka . '.png', 'public');
            $itemData['obrazok_cesta'] = $path;
        }
        $file = $request->file('zvuk');
        if($file) {
            $path = $request->file('zvuk')->storePubliclyAs('sounds/' . $category->nazov, $item->id_produktu . '.mp3', 'public');
            $itemData['nahravka_cesta'] = $path;
        }

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
        $count = $element->Pocet;
        if($count != '' && $count != 0) {
            $itemData['pocet'] = $count;
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
/*
                if(Storage::disk('public')->exists($item->obrazok_cesta)) {
                    Storage::disk('public')->delete($item->obrazok_cesta);
                }*/
                $item->vymazany = 'A';
                $item->save();
            }
            return response()->json(['OK' => 'Vymazali sme pozadovany produkt'], 200);
        }
        return response()->json(['Unauthorized' => 'Sak pockaj ty hacker'], 401);
    }

    public function advertisedItems(Request $request)
    {
        $itemId = $request->input('Id_produktu');
        $dbItem = Produkt::where('id_produktu', $itemId)->first();

        if ($dbItem) {
            $category = $dbItem->id_kategorie;
            $price = $dbItem->aktualna_cena;

            $mr = VlastnostiKategorie::where('id_kategorie', '=', $dbItem->id_kategorie)->where('dolezita', '=', 'A')
                                        ->select('id_vlastnosti')->get();

            $filterProperties = Produkt::join('Vlastnosti_produktu as vp', 'produkt.id_produktu', '=', 'vp.id_produktu')
                                ->join('Vlastnosti_kategorie as vk', 'vk.id_kategorie', '=', 'produkt.id_kategorie')
                                ->where('produkt.id_produktu', $dbItem->id_produktu)
                                ->whereIn('vp.id_vlastnosti', $mr)
                                ->select('vp.hodnota_vlastnosti')->get();

            $advItems = Produkt::join('Vlastnosti_produktu as vp', 'produkt.id_produktu', '=', 'vp.id_produktu')
                ->join('Vlastnost as v', 'v.id_vlastnosti', '=', 'vp.id_vlastnosti')
                ->where('produkt.id_kategorie', $category)
                ->where('aktualna_cena', '<=', $price * 1.0)
                ->where('produkt.id_produktu', '!=' ,$itemId)
                ->where('produkt.vymazany', '=' ,'N')
                ->whereIn('vp.hodnota_vlastnosti', $filterProperties)
                ->select('produkt.id_produktu', 'produkt.nazov as nazov_produktu', 'produkt.zlava as zlava', 'aktualna_cena',
                    'obrazok_cesta', 'pocet' ,'v.nazov', 'hodnota_vlastnosti')->get();

            $advItems = $advItems->groupBy('id_produktu')->map(function ($record) {
                $result = [];
                $propertyName = null;
                $advItems = $record->toArray();
                foreach ($advItems as $item) {
                    foreach ($item as $key => $value) {
                        if (!array_key_exists($key, $result)) {

                            if ($key == 'nazov') {
                                $propertyName = $value;
                                continue;
                            }
                            if ($key == 'hodnota_vlastnosti') {
                                $result[mb_convert_case($propertyName, MB_CASE_TITLE, "UTF-8")] = mb_convert_case($value, MB_CASE_TITLE, "UTF-8");
                            } else {
                                $result[ucfirst($key)] = ucfirst($value);
                            }

                        }
                    }
                    $imageFilename = $item['obrazok_cesta'];
                    $path = storage_path('app/public/'.$imageFilename );
                    $result['obrazok'] = asset('storage/'.$imageFilename );
                    try {
                        $imageFilename = $item['nahravka_cesta'];
                        if (file_exists('storage/'.$imageFilename)) {
                            $result['zvuk'] = asset('storage/'.$imageFilename);
                        }
                    } catch (exception $ex) {

                    }
                }
                return $result;
            });
            $advItems = $advItems->slice(0, 7);
            return $advItems;
        }
        return response()->json(['No advertised products' => 'nooo'], 405);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
    }
}
