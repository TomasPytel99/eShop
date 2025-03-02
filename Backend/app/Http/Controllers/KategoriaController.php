<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use App\Models\OblubeneKategorie;
use Illuminate\Http\Request;
use Exception;

class KategoriaController extends Controller
{
    public function likeCategory(Request $request)
    {
        $user = $request->user();
        $name = strtolower($request->input('Nazov_kategorie'));
        $record = Kategoria::where('nazov', $name)->first();
        $s = $record->id_kategorie;
        $q = $user->id;
        $liked = OblubeneKategorie::where('id_kategorie', '=' ,(int)$record->id_kategorie)
                                    ->where('id_zakaznika','=' ,$user->id)->first();
        if(!$liked){
            try {
                $favourite = OblubeneKategorie::create([
                    'id_kategorie' => $record->id_kategorie,
                    'id_zakaznika' => $user->id,
                ]);
                $favourite->save();
                return response()->json(['OK'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage()], 500);
            }
        }
        return response()->json(['Nepodarilo sa pridat do oblubenych kategorii'], 200);
    }

    public function dislikeCategory(Request $request, $nazov)
    {
        $user = $request->user();
        $name = strtolower($nazov);
        $record = Kategoria::where('nazov', $name)->first();

        try {
            $liked = OblubeneKategorie::where('id_kategorie', (int)$record->id_kategorie)
                                        ->where('id_zakaznika', $user->id)->first();

            if($liked) {
                $liked->delete();
            } else {
                return response()->json(['error' => "Nepodarilo sa vymazať z obľúbených, lebo záznam neexistuje"], 400);
            }
            return response()->json(['success' => true], 200);
        } catch (Exception $ex) {
            return response()->json(['error'=>"Nastala chyba pri odoberaní z obľúbených"], 400);
        }
    }

    public function isCategoryLiked(Request $request)
    {
        $user = $request->user();
        $name = strtolower($request->input('Nazov_kategorie'));
        $record = Kategoria::where('nazov', $name)->first();

        try {
            $liked = OblubeneKategorie::where('id_kategorie', (int)$record->id_kategorie)
                                        ->where('id_zakaznika', $user->id)->first();

            if($liked) {
                return response()->json(true);
            }
            return response()->json(false);
        } catch (Exception $ex) {
            return response()->json(['error'=>"Nastala chyba"], 500);
        }
    }
}
