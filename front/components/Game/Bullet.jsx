import React, { useEffect, useRef, memo } from 'react';
import { StyleSheet, Animated } from 'react-native';

const Bullet = memo(({ positionX, positionY, height, onYChange, gameOver }) => {
    const translateY = useRef(new Animated.Value(positionY)).current;

    useEffect(() => {
        let animation;
        if (!gameOver) {
            animation = Animated.timing(translateY, {
                toValue: -height,
                duration: 1500,
                useNativeDriver: true,
            });
            animation.start();
        }
        // Return cleanup function to stop animation when unmounted
        return () => {
            if (animation) animation.stop();
            translateY.removeAllListeners();
        };
    }, [gameOver, height, translateY]);

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

    const bulletStyle = {
        transform: [{ translateX: positionX }, { translateY }],
    };

    return (
        <Animated.Image
            source={require('../../assets/images/bullet1-green.gif')}
            style={[styles.bullet, bulletStyle]}
        />
    );
});

const styles = StyleSheet.create({
    bullet: {
        position: 'absolute',
        width: 40,
        height: 80,
        borderRadius: 2.5,
        zIndex: 5,
        bottom: 10,
    },
});

export default Bullet;