<?php
namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\Exception\ApiErrorException;
use Illuminate\Support\Facades\Validator;
use App\Models\Coin;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        // Get the coin amount from the query parameters
        $coinAmount = $request->query('price');

//         Create Stripe customer and ephemeral key
        $stripe = new StripeClient([
            'api_key' => 'sk_test_51P28YvP2bxrnQ5RhVsM2iNZ5BC8mLX7fmzWgR3JinKHT5DEAEtB4zzJBojU14R1DeKlYvKjHqNNZPDreVNTjV5v100eW4vR0FU',
            'stripe_version' => '2024-04-10',
        ]);
        $customer = $stripe->customers->create();
        $ephemeralKey = $stripe->ephemeralKeys->create([
            'customer' => $customer->id,
        ], [
            'stripe_version' => '2024-04-10',
        ]);

        try {
            // Create a payment intent with the calculated payment amount
            $paymentIntent = $stripe->paymentIntents->create([
                'amount' => $coinAmount,
                'currency' => 'eur',
                'customer' => $customer->id,
                'description' => 'Purchase of in-game currency',
            ]);

            $userCoin = Coin::where('user', $request->user()->id)->first();

            if($userCoin){
                $userCoin->coins += $request->query("coins");

                $userCoin->save();
            }

            // Return the necessary data including the ephemeral key, customer ID, payment intent client secret, and publishable key
            return response()->json([
                'ephemeralKey' => $ephemeralKey->secret,
                'customer' => $customer->id,
                'paymentIntent' => $paymentIntent->client_secret,
                'publishableKey' => env('STRIPE_PUBLIC_KEY'),
            ], 200);
        } catch (ApiErrorException $e) {
            // Handle any API errors
            return response()->json(['error' => $e->getMessage()], 500);
        }

//        return response()->json([
//            "message" => $request->query('price'),
//            'test' => $request->query('user'),
//            'test1' => $request->query('coins')
//        ], 200);
    }

    public function makeMargungijs(){
        $coin = Coin::create([
            "user" => 1,
            "coins" => 0,
        ]);

        return response()->json([
            "message" => $coin
        ], 200);
    }

    public function returnCoins(){
        return response()->json([
            "coin" => Coin::all()
        ], 200);
    }
}
