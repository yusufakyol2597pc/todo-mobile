import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function CountdownTimer(props: any) {
  return (
        <CountdownCircleTimer
          key={props.key}
          isPlaying={props.isPlaying}
          duration={props.duration}
          trailColor="#B52C46"
          colors='#E5E5E5'
          size={280}
          strokeWidth={80}
          trailStrokeWidth={80}
          strokeLinecap="butt"
          onComplete={props.onComplete}
        />
  );
}
