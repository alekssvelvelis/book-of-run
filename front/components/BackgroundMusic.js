import React from 'react';
import { Audio } from 'expo-av';

class BackgroundMusic extends React.Component {
    soundObject = new Audio.Sound();

    async componentDidMount() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            });

            await this.loadAudio();
        } catch (e) {
            console.log(e);
        }
    }

    async componentWillUnmount() {
        await this.soundObject.stopAsync();
        await this.soundObject.unloadAsync();
    }

    async loadAudio() {
        try {
            await this.soundObject.loadAsync(require('./sounds/cyberbonk.mp3'));
            await this.soundObject.playAsync();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return null;
    }
}

export default BackgroundMusic;
