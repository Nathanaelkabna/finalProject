<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:4000',
            'product_name' => 'required|string',
            'description' => 'nullable|string',
            'price_per_unit' => 'required|numeric',
            'farmer_id' => 'required|integer',
            'category_id' => 'required|integer',
            'quantity' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'image.required' => 'Please upload a product image.',
            'image.image' => 'The selected file is not an image.',
            'image.mimes' => 'The selected file must be a JPEG, PNG, JPG, GIF, or SVG image.',
            'image.max' => 'The image file size must not exceed 4MB.',

            'product_name.required' => 'Please enter a product name.',
            'description.nullable' => 'Please provide a product description.',
            'price_per_unit.required' => 'Please enter a price per unit.',
            'price_per_unit.numeric' => 'The price per unit must be a numeric value.',

            'description.string' => 'Description must be a string',
        ];
    }
}
