<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Score;

class ScoreController extends Controller
{
    public static function store(Request $request){
        $validator = Validator::make($request->all(), [
            'user' => 'required|exists:users,id',
            'score' => 'required|min:1',
            'hood' => 'required|string|min:3|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 202);
        }

        $user_id = $request->input('user');
        $score_value = $request->input('score');
        $hood = $request->input('hood');

        // Check if the user already has a score instance
        $existingScore = Score::where('user', $user_id)->first();

        if ($existingScore) {
            if ($score_value > $existingScore->score) {
                // Update the existing score
                $existingScore->update([
                    'score' => $score_value,
                    'hood' => $hood,
                ]);

                return response()->json([
                    'message' => 'Score updated!',
                ], 200);
            } else {
                return response()->json([
                    'message' => 'New score is not larger than the previous score.',
                ], 201);
            }
        } else {
            Score::create([
                'user' => $user_id,
                'score' => $score_value,
                'hood' => $hood,
            ]);

            return response()->json([
                'message' => 'Score saved!',
            ], 201);
        }
    }

    public static function scores(){
        return response()->json([
            'data' => Score::with('user')->get(),
            'message' => 'Successfully retrieved all scores.'
        ], 200);
    }

}
