import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Easing } from 'react-native';
import Login from '../components/Authorize/Login';
import Register from '../components/Authorize/Register';

class AuthorizeScreen extends Component {
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
    const { navigation, onLogin, setLoginToken } = this.props;

    const frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [30, -400],
    });
    const backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [400, 30],
    });

    const frontAnimatedStyle = {
      transform: [{ translateX: frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ translateX: backInterpolate }],
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#242424' }}>
        <Animated.View style={[{ position: 'absolute', backfaceVisibility: 'hidden', width: '100%', left: 0 }, frontAnimatedStyle]}>
          <Login sendCard={this.slideBack} navigation={navigation} onLogin={onLogin} setLoginToken={setLoginToken}/>
        </Animated.View>
        <Animated.View style={[{ position: 'absolute', backfaceVisibility: 'hidden', width: '100%', left: 0 }, backAnimatedStyle]}>
          <Register sendCard={this.slideBack}/>
        </Animated.View>
      </View>
    );
  }
}

export default AuthorizeScreen;
