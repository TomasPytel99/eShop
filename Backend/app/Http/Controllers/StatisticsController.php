<?php

namespace App\Http\Controllers;

use App\Models\PolozkaObjednavky;
use App\Models\Predajca;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function getCategoryStats(Request $request)
    {
        $user = $request->user();
        $seller = Predajca::where('id_predajcu', $user->id)->first();

        if($seller != null && $seller->admin == 'y') {

            $stats = PolozkaObjednavky::join('Produkt as p', 'p.id_produktu', '=', 'polozka_objednavky.id_produktu')
                                        ->orderBy('id_kategorie', 'asc')->get();

            $ordered = $stats->groupBy('id_kategorie');

            $result = [];
            foreach ($ordered as $key => $value) {
                $total = 0;
                foreach ($value as $item => $val) {
                    $total += $val->mnozstvo;
                }
                array_push($result, $total);
            }

            return response()->json($result, 200);
        }
        return response()->json(['Not OK'], 404);
    }
}
