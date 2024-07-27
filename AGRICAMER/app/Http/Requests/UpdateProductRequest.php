<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'image' => 'nullable',
            'product_name' => 'nullable|string',
            'description' => 'nullable|string',
            'price_per_unit' => 'nullable|numeric',
            'farmer_id' => 'required|integer',
            'category_id' => 'required|integer',
            'quantity' => 'required|integer',
        ];
    }
}
