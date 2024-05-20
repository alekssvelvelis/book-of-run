import React, { useEffect, useRef, memo } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';

const Enemy = ({ positionX, positionY, height, onYChange, gameOver, isCollided, paused }) => {
    if (isCollided) {
        return null;
    }

    const translateY = useRef(new Animated.Value(positionY)).current;


    useEffect(() => {
        if (paused || gameOver) {
            translateY.stopAnimation();
        } else {
            const animation = Animated.timing(translateY, {
                toValue: 100,
                duration: 10000,
                useNativeDriver: true,
            });
            animation.start();
            return () => {
                animation.stop();
            };
        }
    }, [paused, translateY, gameOver]);

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