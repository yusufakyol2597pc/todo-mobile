import React, { Component, useState } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

import Swiper from 'react-native-swiper'
import Todos from './Todos'
import { RootTabScreenProps } from '../../types';

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default function TodosSwiper({ navigation }: RootTabScreenProps<'TabOne'>) {
    const [pages, setPages] = useState([
        <Todos ind={0} key="0"/>,
        <Todos ind={1} key="1"/>,
        <Todos ind={2} key="2"/>,
    ]);

    function handleIndexChange(index: number) {
        console.log("inde", index);
        setPages([
            <Todos ind={-2} key="0"/>,
            <Todos ind={-1} key="0"/>,
            <Todos ind={0} key="0"/>,
            <Todos ind={1} key="1"/>,
            <Todos ind={2} key="2"/>,
        ]);
    }

    return (
        <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false} loop={false} onIndexChanged={handleIndexChange}>
            {
                pages.map(page => page)
            }
        </Swiper>
      )
}