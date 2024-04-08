import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

function Leaderboard() {
    const dummyData = [
        { username: 'User1', score: 90, hood: 'Miami, Florida' },
        { username: 'User2', score: 100, hood: 'Bronx, New York' },
        { username: 'User3', score: 85, hood: 'San Francisco, California' },
        { username: 'User4', score: 87, hood: 'Redneckia, North Dakota' },
        { username: 'User5', score: 95, hood: 'Los Angeles, California' },
        { username: 'User6', score: 75, hood: 'Seattle, Washington' },
        { username: 'User7', score: 82, hood: 'Chicago, Illinois' },
        { username: 'User8', score: 78, hood: 'Houston, Texas' },
        { username: 'User9', score: 65, hood: 'Phoenix, Arizona' },
        { username: 'User10', score: 70, hood: 'Las Vegas, Nevada' },
    ];

    // Sorting the dummy data by score
    const sortedData = dummyData.sort((a, b) => b.score - a.score);

    // Dividing the sorted data into tiers
    const tiers = {
        'King of Space': [],
        'Diamond': [],
        'Gold': [],
        'Silver': [],
        'Bronze': []
    };

    sortedData.forEach((user, index) => {
        if (index === 0) {
            tiers['King of Space'].push(user);
        } else if (index >= 1 && index < 3) {
            tiers['Diamond'].push(user);
        } else if (index >= 3 && index < 6) {
            tiers['Gold'].push(user);
        } else if (index >= 6 && index < 9) {
            tiers['Silver'].push(user);
        } else {
            tiers['Bronze'].push(user);
        }
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                {Object.keys(tiers).map((tier, index) => (
                    <View key={index} style={{position: 'relative', marginTop: 38}}>
                        <Image
                            source={getImageSource(tier)}
                            style={styles.image}
                        />
                        <View style={[styles.leaderboardTitle, getBackgroundStyle(tier)]}>
                            <Text style={{color: 'white', marginLeft: 65, fontSize: 20, margin: 1, fontWeight: 'bold'}}>{tier}</Text>
                        </View>
                        {tiers[tier].map((user, idx) => (
                            <View key={idx} style={[styles.leaderboardTitle, styles.leaderboardPlayer, getPlayerBackgroundStyle(tier)]}>
                                <Text style={{color: 'white', fontSize: 20, marginLeft: 6}}>{user.username}</Text>
                                <Text style={{color: 'white', fontSize: 20, marginRight: 10, margin: 1}}>{user.score}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const getImageSource = (tier) => {
    switch (tier) {
        case 'King of Space':
            return require('../../assets/SpaceKing.png');
        case 'Diamond':
            return require('../../assets/diamond.png');
        case 'Gold':
            return require('../../assets/gold.png');
        case 'Silver':
            return require('../../assets/silver.png');
        case 'Bronze':
            return require('../../assets/bronze.png');
        default:
            return null;
    }
}

const getBackgroundStyle = (tier) => {
    switch (tier) {
        case 'Diamond':
            return styles.diamondBackground;
        case 'Gold':
            return styles.goldBackground;
        case 'Silver':
            return styles.silverBackground;
        case 'Bronze':
            return styles.bronzeBackground;
        default:
            return styles.leaderboardTitle;
    }
}

const getPlayerBackgroundStyle = (tier) => {
    switch (tier) {
        case 'Diamond':
            return styles.diamondPlayer;
        case 'Gold':
            return styles.goldPlayer;
        case 'Silver':
            return styles.silverPlayer;
        case 'Bronze':
            return styles.bronzePlayer;
        default:
            return styles.leaderboardPlayer;
    }
}

const styles = StyleSheet.create({
    container: {
        color: 'white',
        flex: 1,
        backgroundColor: '#242424',
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    leaderboardTitle: {
        backgroundColor: '#5b0b99',
        width: 300,
        color: 'white',
        position: 'relative',
        borderRadius: 4,
    },
    leaderboardPlayer: {
        marginTop: 4,
        backgroundColor: '#bd84e8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    diamondBackground: {
        backgroundColor: '#3e64ed',
    },
    goldBackground: {
        backgroundColor: '#dbae07',
    },
    silverBackground: {
        backgroundColor: '#8a8987',
    },
    bronzeBackground: {
        backgroundColor: '#e07604',
    },
    diamondPlayer:{
        backgroundColor: '#87c7ed'
    },
    goldPlayer:{
        backgroundColor: '#fcc90f'
    },
    silverPlayer:{
        backgroundColor: '#a6a5a2'
    },
    bronzePlayer:{
        backgroundColor: '#f5ac5d'
    },
    image: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: -28,
        left: -25,
        zIndex: 1,
        resizeMode: 'cover',
    },
});

export default Leaderboard;
