import React, { Component, useEffect, useRef, useState } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import Swiper from "react-native-swiper";
import Todos from "./Todos";
import { RootTabScreenProps } from "../../types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { TodoType } from "../../store/enums/todoType";

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB",
    },
    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5",
    },
    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9",
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
});

export default function TodosSwiper({
    navigation,
}: RootTabScreenProps<"TabOne">) {
    const [pages, setPages] = useState([]);
    const swiper = useRef(null);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const q = query(
            collection(db, "dates"),
            where("userId", "==", auth.currentUser?.uid),
            where("date", "<", today)
        );
        var dateList: any = [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dateList.push(doc);
            });
            dateList = dateList.reverse();
            const today = new Date();
            dateList.push({ type: TodoType.DAILY, date: today, isToday: true });

            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            dateList.push({ type: TodoType.DAILY, date: nextDay });

            dateList.push({ type: TodoType.SOME_DAY });
            setPages(dateList);
            swiper.current.scrollBy(dateList.length - 3);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (swiper && pages.length > 0) {
            swiper.current.scrollBy(pages.length - 3);
        }
    }, []);

    return (
        <Swiper
            style={styles.wrapper}
            showsButtons={false}
            showsPagination={false}
            loop={false}
            ref={swiper}
        >
            {pages.map((page, index) => (
                <Todos key={"" + index} date={page.data ? page.data() : page} />
            ))}
        </Swiper>
    );
}
