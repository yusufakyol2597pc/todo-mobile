import { useEffect, useState } from "react";
import SigninSingnupScreen from "./SigninSingnupScreen";
import { useColorScheme } from "react-native";
import Navigation from "../../navigation";
import { Text } from "../../components/Themed";
import { auth } from "../../firebase";

export default function () {
    const [loggedin, setLoggedin] = useState(undefined);
    const colorScheme = useColorScheme();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedin(true);
            } else {
                setLoggedin(false);
            }
        });

        return unsubscribe;
    }, [])

    if (loggedin === false) {
        return (
            <SigninSingnupScreen/>
        )
    }
    if (loggedin === true) {
        return (
            <Navigation colorScheme={colorScheme} />
        )
    }

    return (
        <Text>
            Loading
        </Text>
    )
}