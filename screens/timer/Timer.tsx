import { StyleSheet, TouchableOpacity } from "react-native";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const focusTime = 25 * 60;
const restTime = 5 * 60;

export default function Timer() {
    const { t, i18n } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(undefined);
    const [duration, setDuration] = useState(focusTime);
    const [remTime, setRemTime] = useState(focusTime);
    const [phase, setPhase] = useState(0);
    const [key, setKey] = useState(0);

    return (
        <View style={styles.container}>
            <MonoText style={{ fontSize: 16 }}>
                {phase == 2 ? i18n.t("restMode") : i18n.t("focusMode")}
            </MonoText>
            <View style={styles.content}>
                <View
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: phase === 2 ? "#602CB5" : "#B52C46",
                        marginBottom: 32,
                    }}
                ></View>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={
                        isPlaying === undefined
                            ? phase === 0
                                ? false
                                : true
                            : isPlaying
                    }
                    duration={duration}
                    trailColor="#B52C46"
                    colors="#E5E5E5"
                    size={280}
                    strokeWidth={80}
                    trailStrokeWidth={80}
                    strokeLinecap="butt"
                    onComplete={() => {
                        setRemTime(phase === 2 ? focusTime : restTime);
                        setDuration(phase === 2 ? focusTime : restTime);
                        setKey((prevKey) => prevKey + 1);
                        setPhase((phase) => (phase === 2 ? 0 : 2));
                    }}
                >
                    {({ remainingTime }) => {
                        if (isPlaying === false) {
                            return (
                                <TouchableOpacity
                                    onPress={() => setIsPlaying(true)}
                                    style={styles.timerButton}
                                    onLongPress={() => {
                                        setPhase(0);
                                        setDuration(focusTime);
                                        setRemTime(focusTime);
                                        setIsPlaying(undefined);
                                        setKey((prevKey) => prevKey + 1);
                                    }}
                                >
                                    <MonoText
                                        style={{
                                            fontSize: 18,
                                            color: "#38383A",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {i18n.t("resume")}
                                    </MonoText>
                                </TouchableOpacity>
                            );
                        }
                        if (isPlaying === true) {
                            setRemTime(remainingTime);
                            return (
                                <TouchableOpacity
                                    style={styles.timerButton}
                                    onPress={() => setIsPlaying(false)}
                                    onLongPress={() => {
                                        setPhase(0);
                                        setDuration(focusTime);
                                        setRemTime(focusTime);
                                        setIsPlaying(undefined);
                                        setKey((prevKey) => prevKey + 1);
                                    }}
                                >
                                    <MonoText
                                        style={{
                                            fontSize: 18,
                                            color: "#38383A",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {i18n.t("stop")}
                                    </MonoText>
                                </TouchableOpacity>
                            );
                        }
                        if (phase == 0) {
                            setRemTime(remainingTime);
                            return (
                                <TouchableOpacity
                                    style={styles.timerButton}
                                    onPress={() => {
                                        setDuration(focusTime);
                                        setPhase(1);
                                        setIsPlaying(true);
                                        setKey((prevKey) => prevKey + 1);
                                    }}
                                >
                                    <MonoText
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "#B52C46",
                                        }}
                                    >
                                        {i18n.t("start")}
                                    </MonoText>
                                </TouchableOpacity>
                            );
                        }
                        return (
                            <View style={{ alignItems: "center" }}>
                                <MonoText
                                    style={{
                                        fontSize: 18,
                                        color: "#38383A",
                                        fontWeight: "400",
                                    }}
                                >
                                    Digital
                                </MonoText>
                            </View>
                        );
                    }}
                </CountdownCircleTimer>
                <MonoText style={{ fontSize: 16, marginTop: 16 }}>
                    {i18n.t("remTime", {
                        minutes: Math.floor((remTime % 3600) / 60),
                        seconds: remTime % 60,
                    })}
                </MonoText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 72,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    timerButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: "center",
        justifyContent: "center",
    },
});
