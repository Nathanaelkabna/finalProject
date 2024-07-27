<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderProductRequest;
use App\Http\Requests\UpdateOrderProductRequest;
use App\Models\OrderProduct;
use App\Models\Product;

class OrderProductController extends Controller
{
    public function index()
    {
        $orders = OrderProduct::all();
        return response()->json([
            'order' => $orders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderProductRequest $request)
    {
        $data = $request->validated();
        $order = OrderProduct::create($data);
        $orderQuantity = $order->quantity;
        $productId = $data['product_id'];
        $product = Product::find($productId);
        $productQuantity = $product->quantity;
        $product->update([
            'quantity' => $productQuantity - $orderQuantity,
        ]);
        $product->save();
        return response()->json([
            'order' => $order,
            'message' => 'order successfully registered',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = OrderProduct::where('user_id',$id)->orderBy('id', 'desc')->get();
        return response()->json([
            'order' => $order,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderProductRequest $request, string $id)
    {
        $data = $request->validated();
        $order = OrderProduct::find($id);
        $order->update($data);
        $order->save();
        return response()->json(
            [
                'message' => 'order successfully updated'
            ],200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = OrderProduct::where('user_id',$id);
        $order->delete();
        return response()->json(
            [
               'message' => 'order successfully deleted'
            ],200
        );
    }
}
