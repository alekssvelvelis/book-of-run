import React, { useEffect, useState, useRef } from 'react';
import {StyleSheet, View, Image, Dimensions, Text, AppState, ImageBackground} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Enemy from './components/Game/Enemy';
import { useFonts } from "expo-font";

const END_POSITION = 120;
const { height, width } = Dimensions.get('window');

export default function App() {
  const [enemies, setEnemies] = useState([]);
  const onLeft = useSharedValue(true);
  const enemyInterval = useRef(null);
  const [score, setScore] = useState(0);
  const [heart, setHeart] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);
  const [enemiesReached100, setEnemiesReached100] = useState([]); // New state variable
  const [collidedEnemies, setCollidedEnemies] = useState([]);
  const enemyIdCounter = useRef(0);
  const [collisionPosition, setCollisionPosition] = useState({}); // State variable to store collision position
  const [explosionPlayed, setExplosionPlayed] = useState(false)
  const [multiplier, setMultiplier] = useState(1)
  const [fontsLoaded, fontError] = useFonts({
    'VT': require('./assets/fonts/VT323-Regular.ttf'),
  });

  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        position.value = e.translationX;
      })
      .onEnd((e) => {
        if (position.value > END_POSITION) {
          position.value = withTiming(END_POSITION - 2, { duration: 100 });
          onLeft.value = false;
        } else if (position.value < -END_POSITION) {
          position.value = withTiming(-END_POSITION + 2, { duration: 100 });
          onLeft.value = true;
        }
      });

  useEffect(() => {
    enemyInterval.current = setInterval(() => {
      const randomX = Math.floor(Math.random() * 241) - 120; // Generates random number between -120 and 120
      const newEnemyId = enemyIdCounter.current; // Assign current ID from counter
      const newEnemy = { id: newEnemyId, x: randomX, y: -850 }; // Add unique ID to each enemy
      setEnemies(prevEnemies => [...prevEnemies, newEnemy]);
      enemyIdCounter.current += 1; // Increment counter for next enemy
    }, 3000);

    return () => {
      clearInterval(enemyInterval.current);
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
          appStateVisible.match(/inactive|background/) &&
          nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      setAppStateVisible(nextAppState);
      console.log('AppState', nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appStateVisible]);

  useEffect(() => {
    const enemyToRemove = enemies.find(enemy => enemy.y >= 100 && !enemiesReached100.includes(enemy.id) && !collidedEnemies.includes(enemy.id));

    if (enemyToRemove) {
      setScore(prevScore => prevScore + (100 * multiplier));
      setEnemiesReached100(prevEnemiesReached100 => [...prevEnemiesReached100, enemyToRemove.id]);
    }
  }, [enemies, enemiesReached100]); // Include enemiesReached100 in dependency array

  useEffect(() => {
    if (heart === 0) {
      setGameOver(true);
      clearInterval(enemyInterval.current); // Stop spawning enemies when game over
    }
  }, [heart]);


  const updateEnemyYPosition = useRef(null);

  const handleEnemyYChange = (y, index) => {
    clearTimeout(updateEnemyYPosition.current);
    updateEnemyYPosition.current = setTimeout(() => {
      setEnemies((prevEnemies) => {
        const updatedEnemies = [...prevEnemies];
        if (updatedEnemies[index]) { // Check if the enemy at the specified index exists
          updatedEnemies[index].y = y;
        }
        return updatedEnemies;
      });
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies(prevEnemies => {
        const updatedEnemies = prevEnemies.map(enemy => {
          if (enemy.y < 100) {
            const newY = enemy.y + 47.5; // Example: Move 5 units downwards every 0.5 seconds
            return { ...enemy, y: newY };
          }
          return enemy; // If enemy.y is already larger than 100, return the enemy without modification
        });
        return updatedEnemies;
      });
    }, 500); // Run every 0.5 seconds (500 milliseconds)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [gameOver]);



  useEffect(() => {
    enemies.forEach((enemy) => {
      // Calculate the range within which a collision is detected
      const collisionRange = 40; // Adjust as needed

      if (Math.abs(enemy.x - position.value) < collisionRange) {
        if (Math.abs(enemy.y + 200) < 20) {
          if(!gameOver){
            setHeart(heart - 1);
            setCollidedEnemies(prevState => [...prevState, enemy.id])
            setCollisionPosition({ x: enemy.x, y: enemy.y });
            setExplosionPlayed(true);
          }
        }
      }
    });
  }, [enemies, position.value]);

  useEffect(() => {
    if (explosionPlayed) {
      setTimeout(() => {
        setCollisionPosition({});
        setExplosionPlayed(false); // Reset explosionPlayed state
      }, 900); // Adjust the duration according to your gif animation
    }
  }, [explosionPlayed]);

  return (
      <ImageBackground source = {require('./assets/images/background.jpeg')} style = {styles.background}>
        <View style={styles.container}>
          {Object.keys(collisionPosition).length !== 0 && (
              <Animated.Image
                  source={require('./assets/images/boom-unscreen.gif')}
                  style={[
                    styles.explosion,
                    { transform: [{ translateX: collisionPosition.x }, { translateY: -100 }] },
                  ]}
              />
          )}
          <Text style={styles.livesText}>Lives: {heart}</Text>
          <Text style={styles.scoreText}>{score.toString().padStart(5, '0')}</Text>
          {gameOver && (
              <View style={styles.overlay}>
                <View style={styles.gameOverPopup}>
                  <Text style={styles.gameOverText}>Game Over!</Text>
                </View>
              </View>
          )}
          <GestureHandlerRootView style={styles.container}>
            {enemies.map((enemy, index) => (
                <Enemy
                    key={index}
                    positionX={enemy.x}
                    positionY={enemy.y}
                    height={height}
                    onYChange={(y) => handleEnemyYChange(y, index)}
                    gameOver={gameOver}
                    index = {index}
                    isCollided={collidedEnemies.includes(enemy.id)} // Pass isCollided prop
                />
            ))}
            <GestureDetector gesture={panGesture}>
              <Animated.View
                  style={[styles.box, { transform: [{ translateX: position }] }]}
              >
                <Image
                    source={require('./assets/images/spaceship1.gif')}
                    style={styles.image}
                />
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'VT'
  },
  box: {
    height: 120,
    borderRadius: 20,
    marginBottom: 30,
    zIndex: 10,
  },
  scoreText: {
    position: 'absolute',
    top: 40,
    right: 20,
    color: '#fff',
    fontSize: 35,
    fontFamily: 'VT'
  },
  livesText: {
    position: 'absolute',
    top: 40,
    left: 20,
    color: '#fff',
    fontSize: 35,
    fontFamily: 'VT'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 20
  },
  gameOverPopup: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  gameOverText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'VT'
  },
  explosion: {
    position: 'absolute',
    width: 140,
    height: 140,
    resizeMode: 'contain',
    zIndex: 10,
  },
  background: {
    flex: 1,
  },
});
