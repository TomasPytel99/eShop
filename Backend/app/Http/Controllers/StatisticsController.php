<?php

namespace App\Http\Controllers;

use App\Models\Objednavka;
use App\Models\PolozkaObjednavky;
use App\Models\Predajca;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function getCategoryStats(Request $request)
    {
        $user = $request->user();
        $seller = Predajca::where('id_predajcu', $user->id)->first();
        $now = Carbon::now()->startOfDay()->toDateTimeString();
        $yearBack = Carbon::now()->subYear()->endOfDay()->toDateTimeString();

        if($seller != null && $seller->admin == 'y') {

            $stats = PolozkaObjednavky::join('Produkt as p', 'p.id_produktu', '=', 'polozka_objednavky.id_produktu')
                                        ->join('Objednavka as o', 'o.id_objednavky', '=', 'polozka_objednavky.id_objednavky')
                                        ->whereBetween('datum', [$yearBack, $now])
                                        ->orderBy('id_kategorie', 'asc')
                                        ->select('id_kategorie', 'datum')->get();

            $s = (string) $stats;

            return response()->json($stats, 200);
        }
        return response()->json(['Not OK'], 404);
    }

    public function getOrderStats(Request $request)
    {
        $user = $request->user();
        $seller = Predajca::where('id_predajcu', $user->id)->first();
        $now = Carbon::now()->startOfDay()->toDateTimeString();
        $yearBack = Carbon::now()->subYear()->endOfDay()->toDateTimeString();

        if($seller != null && $seller->admin == 'y') {

            $stats = Objednavka::whereBetween('datum', [$yearBack, $now])->orderBy('datum', 'asc')
                                ->select('datum', 'celkova_cena')->get();

            $s = (string) $stats;

            return response()->json($stats, 200);
        }
        return response()->json(['Not OK'], 404);
    }
}
