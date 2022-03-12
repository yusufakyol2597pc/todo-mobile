import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmDialog } from '../store/actions/global.actions';

const ConfirmDialog = () => {
  const dispatch = useDispatch();  
  const dialog = useSelector(state => state.global.confirmDialog);

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={dialog.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          dispatch(closeConfirmDialog());
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{dialog.title}</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => dispatch(closeConfirmDialog())}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={dialog.onOk}>
                    <Text style={styles.textStyle}>{dialog.okText}</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    margin: 8,
    width: "33%"
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: "row"
  }
});

export default ConfirmDialog;
