import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import {getToken} from "../../utils/storageUtils";
const screenWidth = Dimensions.get('window').width;
console.log('screen widht', screenWidth);
const Shop = () => {
    const [isOpenModal, setModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [heartCount, setHearts] = useState(0);
    const handleToggleModal = () => {
        setModalOpen(!isOpenModal);
    };
    const handleHeartPurchase = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`http://10.13.6.174/api/purchaseHearts?price=${500}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
                console.log(responseData.errors);
            } else {
                console.log(responseData.message);
                setErrors({});
            }
        } catch (error) {
            console.error('Error occurred: inside of catch', error);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#242424' }}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={[styles.heading, styles.profileHeading]}>Purchase upgrades</Text>
                <TouchableOpacity onPress={handleToggleModal}>
                    <Image
                        source={require('../../assets/images/heart.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                {isOpenModal &&
                    <TouchableOpacity style={{ width: screenWidth, height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 3, alignItems: 'center', position: 'absolute', }} onPress={handleToggleModal}>
                        <View style={{ backgroundColor: '#242424', display: 'flex', alignItems: 'center', zIndex: 5, marginTop: '50%', color: 'white', borderRadius: 20, width: screenWidth - 20, }}>
                            <Text style={{ position: 'absolute', top: 0, right: 16, textTransform: 'uppercase', fontSize: 24, marginTop: 8, color: 'red',}} onPress={handleToggleModal}>X</Text>
                            <Text style={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: 24, marginTop: 8,}}>Purchase lives</Text>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, marginTop: 8,}}>You currently have 3 lives</Text>
                            <Text style={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: 24, marginTop: 8,}} onPress={handleHeartPurchase}>BUY FOR 500</Text>
                            {errors && <Text style={{ textAlign: 'center', color: 'red', textTransform: 'uppercase', fontSize: 24, marginTop: 8, marginBottom: 2,}}>{errors.price}</Text>}
                        </View>
                    </TouchableOpacity>}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    heading: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        marginTop: 24,
    },
    profileHeading: {
        fontSize: 32,
        marginTop: 12,
        textTransform: 'uppercase',
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 4,
        backgroundColor: '#181818',
        borderRadius: 10
    },
    picker: {
        height: 50,
        width: 150,
        color: 'white',
        backgroundColor: '#181818'
    },
    gameItem: {
        backgroundColor: '#181818',
        width: 300,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: 'white',
        borderWidth: 1
    },
    gameText: {
        color: 'white',
        fontSize: 18,
        justifyContent: 'space-between'
    },
});

export default Shop;
