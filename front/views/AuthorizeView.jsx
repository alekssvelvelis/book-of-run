import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Easing } from 'react-native';
import Login from '../components/Authorize/Login';
import Register from '../components/Authorize/Register';

class AuthorizeView extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      isFlipped: false,
    };
  }

  slideBack = () => {
    const { isFlipped } = this.state;
    const toValue = isFlipped ? 0 : 1;

    Animated.timing(
      this.animatedValue,
      {
        toValue,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }
    ).start();

    this.setState({ isFlipped: !isFlipped });
  }

  render() {
    const { isFlipped } = this.state;

    const frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-160, -600],
    });
    const backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [250, -155],
    });

    const frontAnimatedStyle = {
      transform: [{ translateX: frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ translateX: backInterpolate }],
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={[{ position: 'absolute', backfaceVisibility: 'hidden', width: '100%', left: 0 }, frontAnimatedStyle]}>
          <Login sendCard={this.slideBack}/>
        </Animated.View>
        <Animated.View style={[{ position: 'absolute', backfaceVisibility: 'hidden', width: '100%', left: 0 }, backAnimatedStyle]}>
          <Register sendCard={this.slideBack}/>
        </Animated.View>
      </View>
    );
  }
}

export default AuthorizeView;
