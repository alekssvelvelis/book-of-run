import React, { useEffect, useRef, memo } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';

const Enemy = ({ positionX, positionY, height, onYChange, gameOver, isCollided }) => {
    if (isCollided) {
        return null; // Return null to render nothing if the game is over or the enemy has collided
    }

    const translateY = useRef(new Animated.Value(positionY)).current;

    useEffect(() => {
        let animation;
        if (!gameOver) {
            animation = Animated.timing(translateY, {
                toValue: 100,
                duration: 10000,
                useNativeDriver: true,
            });
            animation.start();
        }
        // Return cleanup function to stop animation when unmounted
        return () => {
            if (animation) animation.stop();
            translateY.removeAllListeners();
        };
    }, [gameOver, translateY]);

    useEffect(() => {
        // Update the Y value in the parent component when translateY changes
        const listener = ({ value }) => {
            onYChange(value);
        };
        if (!gameOver) translateY.addListener(listener);
        // Return cleanup function to remove listener when unmounted or game over
        return () => {
            translateY.removeListener(listener);
        };
    }, [gameOver, onYChange, translateY]);

    const enemyStyle = {
        transform: [{ translateX: positionX }, { translateY }, {rotate: '180deg'}],
    };

    return (
        <Animated.Image
            source={require('../../assets/images/enemyship.gif')}
            style={[styles.enemy, enemyStyle]}
        />
    );
};

const styles = StyleSheet.create({
    enemy: {
        position: 'absolute',
        width: 40,
        height: 80,
        borderRadius: 2.5,
        zIndex: 5,
    },
});

export default Enemy;