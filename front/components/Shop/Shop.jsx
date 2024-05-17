import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
console.log('screen widht', screenWidth);
const Shop = () => {
    const [isOpenModal, setModalOpen] = useState(false);

    const handleToggleModal = () => {
        setModalOpen(!isOpenModal);
    };

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
                        <View style={{ backgroundColor: '#242424', display: 'flex', alignItems: 'center', zIndex: 5, marginTop: '50%', color: 'white', borderRadius: 20, width: screenWidth - 20, height: 140 }}>
                        <Text style={{ position: 'absolute', top: 0, right: 16, color: 'white', textTransform: 'uppercase', fontSize: 24, marginTop: 8, color: 'red',}} onPress={handleToggleModal}>X</Text>
                            <Text style={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: 24, marginTop: 8,}}>Purchase lives</Text>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, marginTop: 8,}}>You currently have 3 lives</Text>
                            <Text style={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: 24, marginTop: 8,}}>Buy</Text>
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
