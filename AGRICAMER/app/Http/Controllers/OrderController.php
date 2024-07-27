<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;

class OrderController extends Controller
{
    public function storeOrder(StoreOrderRequest $request )
    {
        $data = $request->validated();
        $order = Order::create($data);
        return response()->json([
            'message' => 'votre paiement a correctement ete effectuer'
        ], 200);
    }
}
