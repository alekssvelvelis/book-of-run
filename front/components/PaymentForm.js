// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';
// import axios from 'axios';
//
// const PaymentForm = ({ selectedAmount }) => {
//     const [cardholderName, setCardholderName] = useState('');
//     const { confirmPayment } = useStripe();
//
//     const handleMakePayment = async () => {
//         try {
//             const { paymentIntent, error } = await confirmPayment({
//                 type: 'Card',
//                 billingDetails: {
//                     name: cardholderName,
//                 },
//                 paymentMethodOptions: {
//                     card: {
//                         networks : ['visa'],
//                     }
//                 },
//                 paymentMethodTypes: ['card'], // Specify the payment method types
//                 // amount: parseFloat(selectedAmount) * 100, // Amount should be in cents
//                 amount: 5,
//                 currency: 'EUR',
//             });
//
//             if (error) {
//                 console.error('Payment failed:', error);
//                 // Handle payment failure here
//             } else if (paymentIntent) {
//                 console.log('Payment succeeded!', paymentIntent);
//                 // Handle successful payment response here
//                 // Now, send the paymentIntent to your Laravel backend for further processing
//                 await sendPaymentIntentToBackend(paymentIntent);
//             }
//         } catch (error) {
//             console.error('Payment failed:', error);
//             // Handle payment failure here
//         }
//     };
//
//
//     const sendPaymentIntentToBackend = async (paymentIntent) => {
//         try {
//             const response = await axios.post('http://172.20.10.3/api/create-payment-intent', {
//                 paymentIntentId: paymentIntent.id,
//                 // Add more data as needed for your Laravel backend
//             });
//
//             console.log('Payment intent sent to backend:', response.data);
//         } catch (error) {
//             console.error('Failed to send payment intent to backend:', error);
//             // Handle error
//         }
//     };
//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View style={styles.container}>
//                 <View style={styles.formBox}>
//                     <Text style={styles.header}>MAKE A PAYMENT</Text>
//                     <Text style={styles.label}>Cardholder Name</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholderTextColor={'gray'}
//                         placeholder="John Doe"
//                         value={cardholderName}
//                         onChangeText={setCardholderName}
//                     />
//                     <CardField
//                         postalCodeEnabled={true}
//                         placeholder={{
//                             number: '4242-4242-4242-4242',
//                             expiry: '12/34',
//                             cvc: 'CVC',
//                         }}
//                         cardStyle={{
//                             backgroundColor: '#323232',
//                             textColor: '#FFFFFF',
//                         }}
//                         style={styles.cardField}
//                     />
//                     <TouchableOpacity style={styles.button} onPress={handleMakePayment}>
//                         <Text style={styles.buttonText}>Make Payment</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </TouchableWithoutFeedback>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#242424',
//         width: '100%'
//     },
//     formBox: {
//         backgroundColor: 'black',
//         padding: 20,
//         borderRadius: 10,
//         width: '80%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: 'white',
//         alignSelf: 'flex-start',
//     },
//     input: {
//         height: 40,
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         marginBottom: 10,
//         color: 'white',
//         backgroundColor: '#323232',
//         width: '100%',
//     },
//     button: {
//         backgroundColor: '#323232',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         width: '50%',
//         marginTop: 10,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//     },
//     header: {
//         fontSize: 30,
//         color: 'white',
//         fontWeight: "thin",
//         marginBottom: 10,
//     },
//     cardField: {
//         width: '100%',
//         height: 50,
//     }
// });
//
// export default PaymentForm;





