<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\ResourceRegistrar;

class KategoriaController extends Controller
{
    public function likeCategory(Request $request)
    {
        $id = $request->input('Nazov_kategorie');

        return response()->json(['OK'], 200);
    }

    public function dislikeCategory(Request $request, $nazov)
    {
        $idk = $nazov;

        return response()->json(['OK'], 200);
    }

    public function isCategoryLiked(Request $request)
    {
        $id = $request->input('id_kategorie');

        return response()->json(['OK'], 200);
    }
}
