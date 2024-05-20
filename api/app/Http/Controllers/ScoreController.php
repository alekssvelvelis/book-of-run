<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Score;

class ScoreController extends Controller
{
    public static function store(Request $request){
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'score' => 'required|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 202);
        }
        $score_value = $request->input('score');

        $tokenableId = $user->id;
        Log::info($tokenableId);
        // Check if the user already has a score instance


        Score::create([
            'user' => $tokenableId,
            'score' => $score_value,
        ]);

        return response()->json([
            'message' => 'Score saved!',
        ], 201);

        // $existingScore = Score::where('user', $tokenableId)->first();
        // if ($existingScore) {
        //     if ($score_value > $existingScore->score) {
        //         // Update the existing score
        //         $existingScore->update([
        //             'score' => $score_value,
        //             'hood' => $hood,
        //         ]);

        //         return response()->json([
        //             'message' => 'Score updated!',
        //         ], 200);
        //     } else {
        //         return response()->json([
        //             'message' => 'New score is not larger than the previous score.',
        //         ], 201);
        //     }
        // } else {
        //     Score::create([
        //         'user' => $tokenableId,
        //         'score' => $score_value,
        //         'hood' => $hood,
        //     ]);

        //     return response()->json([
        //         'message' => 'Score saved!',
        //     ], 201);
        // }
    }

    public static function scores(){
        // Retrieve the highest score for each user
        $highestScores = Score::select('user', DB::raw('MAX(score) as max_score'))
            ->groupBy('user')
            ->with('user:id,name,email') // Eager load user details
            ->get();
        
        Log::info($highestScores);
        return response()->json([
            'data' => $highestScores,
            'message' => 'Successfully retrieved each user\'s highest score.'
        ], 200);
    }
    
    public static function userScores(Request $request){
        // Retrieve the currently authenticated user
        $user = $request->user();
    
        // Check if the user is authenticated
        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated.'
            ], 401);
        }
    
        // Retrieve all scores associated with the authenticated user
        $userScores = Score::where('user', $user->id)->get();
    
        // Return the response
        return response()->json([
            $userScores
        ], 200);
    }
    
}
