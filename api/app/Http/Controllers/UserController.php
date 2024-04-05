<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        Log::info($request->all());
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:15|unique:users,name',
            'email' => 'required|email|min:4|max:100|unique:users,email',
            'password' => 'required|min:8',
            'confirm' => 'required|same:password|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'name' => $request->input('username'),
            'password' => Hash::make($request->input('confirm')),
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'access_token' => $token,
        ], 201);

        // return response()->json([
        //      'message' => 'test',
        // ], 201);
    }

    public static function test(){
        return response()->json([
            'message' => 'test',
       ]);
    }
}
