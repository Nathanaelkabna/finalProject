<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class userProductController extends Controller
{
    public function getProducts(string $id)
    {
        try {
            $products = Product::where('farmer_id', $id)->orderBy('id', 'desc')->get();
            return response()->json([
                'product' => $products
            ], 200);
        } catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'products does not exist',
                    'error' => $e->getMessage()
                ]
                );
        }
    }

    public function PaginateProducts(string $id)
    {
        try {
            $products = Product::where('farmer_id', $id)->orderBy('id', 'desc')->paginate(5);
            return response()->json([
                'product' => $products
            ], 200);
        } catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'products does not exist',
                    'error' => $e->getMessage()
                ]
                );
        }
    }
}
