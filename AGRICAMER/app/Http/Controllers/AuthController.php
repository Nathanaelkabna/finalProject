<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Farmer;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated();
        $data['role'] ? $data['role'] = "agriculteur" : $data['role'] = "client";
        /**
         * @var UploadedFile|null $image
         */

        $image = $data['image'];
        try {
            $imageName = Str::random(32).".".$image->getClientOriginalExtension();

            $user = User::create([
                'name' => $data['name'],
                'image' => $imageName,
                'email' => $data['email'],
                'role' => $data['role'],
                'password' => Hash::make($data['password']),
                'address' =>  $data['address'],
                'phone_number' => $data['phone_number']
            ]);

            if($user->role == "agriculteur") {
                $farmer = Farmer::create([
                    'user_id' => $user->id,
                ]
                );
            }

            Storage::disk('public')->put($imageName, file_get_contents($image));

            $token = $user->createToken('main')->plainTextToken;
    
            return response(compact('user', 'token'));
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Invalid image'
            ], 500);
        }
          
        
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if(!Auth::attempt($credentials))
        {
            $error = 'the provided credentials are not correct';
            return response(compact('error'), 422);
        }

        /** @var  \App\Models\User $user */

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }
    public function logout(Request $request)
    {
        /** @var  \App\Models\User $user */
        $user = Auth::user();
        $user->currentAccessToken()->can('logout');

        return response(
            [
                'success' => true
            ]
        );
    }
}
