import React, {useCallback, useEffect} from 'react';
import {handleURLCallback, StripeProvider, useStripe} from "@stripe/stripe-react-native";
import { Linking } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from './components/HomeScreen';
// import DetailsScreen from './components/DetailsScreen';
// import {View} from "react-native";
import BuyCoins from "./components/BuyCoins";
import BackgroundMusic from "./components/BackgroundMusic";



function App() {

    const { handleURLCallback } = useStripe();

    const handleDeepLink = useCallback(
        async (url) => {
            if (url) {
                const stripeHandled = await handleURLCallback(url);
                if (stripeHandled) {
                } else {
                }
            }
        },
        [handleURLCallback]
    );

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            await handleDeepLink(initialUrl);
        };

        getUrlAsync();

        const deepLinkListener = Linking.addEventListener(
            'url',
            (event) => {
                handleDeepLink(event.url);
            }
        );

        return () => deepLinkListener.remove();
    }, [handleDeepLink]);

    // const Stack = createStackNavigator();

    return (
            <StripeProvider publishableKey= "pk_test_51P28YvP2bxrnQ5RhmWDK0oB42kWbMG4lOs1qk26FtEB7Nv05ZQpTKm97ILFiAvoPjQw48sS37eUsq0UkRBZjCG9v00EaNZxnkl">
                <BuyCoins />
            </StripeProvider>
    );

}

export default App;

