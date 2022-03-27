import { StyleSheet, TouchableOpacity } from 'react-native';
import { MonoText } from '../../components/StyledText';
import { View } from '../../components/Themed';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useState } from 'react';

const focusTime = 20 * 60;
const restTime = 5 * 60;

export default function Timer() {
  const [duration, setDuration] = useState(focusTime);
  const [remTime, setRemTime] = useState(focusTime);
  const [phase, setPhase] = useState(0);
  const [key, setKey] = useState(0);

  return (
    <View style={styles.container}>
      <MonoText style={{fontSize: 16}}>{phase == 2 ? "Rest Mode": "Focus Mode"}</MonoText>
      <View style={styles.content}>
        <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: phase === 2 ? "#602CB5" : "#B52C46", marginBottom: 32}}></View>
        <CountdownCircleTimer
          key={key}
          isPlaying={phase === 0 ? false : true}
          duration={duration}
          trailColor="#B52C46"
          colors='#E5E5E5'
          size={280}
          strokeWidth={80}
          trailStrokeWidth={80}
          strokeLinecap="butt"
          onComplete={() => {
            setRemTime(phase === 2 ? focusTime : restTime);
            setDuration(phase === 2 ? focusTime : restTime);
            setKey(prevKey => prevKey + 1)
            setPhase(phase => phase === 2 ? 0 : 2);
          }}
        >
          {({ remainingTime }) => {
            setRemTime(remainingTime);
            if (phase == 0) {
              return (
                <TouchableOpacity onPress={() => {
                  setDuration(focusTime);
                  setPhase(1);
                }}>
                <MonoText style={{fontSize: 18, fontWeight: "400", color: "#B52C46"}}>Start</MonoText>
              </TouchableOpacity>
              )
            }
            return (
              <MonoText style={{fontSize: 18, color: "#38383A", fontWeight: "400"}}>Digital</MonoText>
            )
          }}
        </CountdownCircleTimer>
        <MonoText style={{fontSize: 16, marginTop: 16}}>{Math.floor((remTime % 3600) / 60) + " minutes and " + remTime % 60 + " seconds left"}</MonoText>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 72
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
