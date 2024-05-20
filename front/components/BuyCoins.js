import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useStripe, StripeProvider, usePaymentSheet} from "@stripe/stripe-react-native";
import {getToken} from "../utils/storageUtils";

const BuyCoinsComponent = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentInProcess, setPaymentInProcess] = useState(false);

    const coinsData = [
        { id: 0 , amount: 1000, price: 99 , value: '0,99 EUR' },
        { id: 1 , amount: 2800, price: 199, value: '1,99 EUR' },
        { id: 2 , amount: 5000, price: 299, value: '2,99 EUR' },
        { id: 3 , amount: 7000, price: 399, value: '3,99 EUR' },
        { id: 4 , amount: 13000, price: 599, value: '5,99 EUR' },
        { id: 5 , amount: 30000, price: 999, value: '9,99 EUR' },
    ];

    function getAmountForPrice(price) {
        const coinData = coinsData.find(coin => coin.price === price);
        return coinData ? coinData.amount : null;
    }
        const fetchPaymentSheetParams = async (value) => {
            const token = await getToken()
            const response = await fetch(`http://172.20.10.2/api/createPaymentIntent?price=${value}&coins=${coinsData.find(coin => coin.price === value)?.amount}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const { paymentIntent, ephemeralKey, customer} = await response.json();

            return {
                paymentIntent,
                ephemeralKey,
                customer,
            };
        };



        const initializePaymentSheet = async (value) => {
            const {
                paymentIntent,
                ephemeralKey,
                customer,
                publishableKey,
            } = await fetchPaymentSheetParams(value);

            const { error } = await initPaymentSheet({
                merchantDisplayName: "Example, Inc.",
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                //methods that complete payment after a delay, like SEPA Debit and Sofort.
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: 'Jane Doe',
                },
                returnURL: 'your-app://buycoins', // Add the returnURL here
            });
            if (!error) {
                setLoading(true);
            }
        };

        async function handleBuyNow(value) {
            if(paymentInProcess){
                return;
            }
            setPaymentInProcess(true);
            await initializePaymentSheet(value);
            const paymentResponse = await presentPaymentSheet();
            if (paymentResponse.error) {
                Alert.alert(`Error code: ${paymentResponse.error.code}`, paymentResponse.error.message);
            } else {
                Alert.alert('Success', 'Your order is confirmed!');
            }
            setPaymentInProcess(false);
        }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {/*<TouchableOpacity*/}
                {/*    style={styles.backButton}*/}
                {/*    onPress={() => navigation.goBack()}>*/}
                {/*    <Text style={styles.backButtonText}>Back</Text>*/}
                {/*</TouchableOpacity>*/}
                <Text style={styles.header}> BUY COINS</Text>
                {coinsData.map((coin, index) => (
                    <View key={index} style={styles.infoBox}>
                        <View>
                            <Text style={styles.infoText}>{coin.amount} coins</Text>
                            <View style={styles.breakLine}>
                                <Text style={{ color: 'white' }}></Text>
                            </View>
                            <Text style={styles.infoText2}>{coin.value}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.buyButton}
                            onPress={() => handleBuyNow(coin.price)}>
                            <Text style={styles.buyButtonText}>Buy</Text>
                        </TouchableOpacity>

                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#242424',
        padding: 50,
    },
    header: {
        color: 'white',
        fontSize: 32,
        padding: 50,
    },
    infoBox: {
        flex: 1,
        backgroundColor: '#323232',
        padding: 30,
        borderRadius: 10,
        width: 250,
        height: '20%',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 30,
        color: 'white',
    },
    buyButton: {
        backgroundColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buyButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    infoText2: {
        fontSize: 15,
        paddingTop: 5,
        color: 'white',
    },
    breakLine: {
        width: 50,
        height: '4%',
        backgroundColor: 'white',
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default BuyCoinsComponent;
