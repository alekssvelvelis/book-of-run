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
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:15',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('name', $request->input('username'))->first();
        Log::info($user);
        if (!$user) {
            return response()->json(['error' => 'Username is unrecognized'], 401);
        }

        if (Hash::check($request->input('password'), $user->password)) {
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'user' => $user,
            ]);
        } else {
            return response()->json(['error' => 'Password is not correct'], 401);
        }
    }

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

        return response()->json([
            'message' => 'User registered successfully',
        ], 201);
    }

    public function logout(Request $request)
    {
        Log::info($request->bearerToken());
        $user = $request->user();
        Log::info($user);
        if ($user) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Successfully logged out']);
        }

        return response()->json(['error' => 'Invalid token'], 401);
    }

    public function getUserData(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['error' => 'Invalid token'], 401);
            }
            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function updateUserData(Request $request)
    {
        try{
            $user = $request->user();
            Log::info($request->all());
            $validator = Validator::make($request->all(), [
                'username' => 'required|string|min:3|max:15|unique:users,name,'.$user->id,
                'email' => 'required|email|min:4|max:100|unique:users,email,'.$user->id,
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user->email = $request->input('email');
            $user->name = $request->input('username');
            $user->save();

            return response()->json(['message' => 'Data updated succesfully']);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function updateUserPassword(Request $request)
    {
        try{
            $user = $request->user();
            Log::info($request->all());
            $validator = Validator::make($request->all(), [
                'currentPassword' => 'required',
                'newPassword' => 'required|min:8',
                'confirmNewPassword' => 'required|min:8|same:newPassword',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            if($user->password){
                $currentPassword = $request->input('currentPassword');

                if (!Hash::check($currentPassword, $user->password)) {
                    return response()->json(['errors' => ['currentPassword' => 'Wrong current password']], 422);
                }
            }

            $user->password = $request->input('newPassword');
            $user->save();

            return response()->json(['message' => 'Password updated succesfully']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
