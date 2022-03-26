import { signOut } from 'firebase/auth';
import React, { Component, useState } from 'react'
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase';

import { RootTabScreenProps } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFEFE'
  },
  button: {
    width: "50%",
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: '#38383A',
    marginTop: 32
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default function ProfileScreen({ navigation }: RootTabScreenProps<'TabThree'>) {

    function handleIndexChange(index: number) {
        console.log("inde", index);
        
    }

    return (
        <View style={styles.container}>
            <Text>{auth.currentUser?.displayName}</Text>
            <Text>{auth.currentUser?.email}</Text>

            <TouchableOpacity onPress={() => {
                signOut(auth).then(() => {
                  // Sign-out successful.
                }).catch((error) => {
                  // An error happened.
                });
              }} style={styles.button}>
                <Text style={{color: "white"}}>Log Out</Text>
            </TouchableOpacity>
        </View>
      )
}