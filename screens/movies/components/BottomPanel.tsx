import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IBottomPanelProps {
  children?: React.ReactNode;
  style?: any;
}

export default function BottomPanel (props: IBottomPanelProps) {
  return <View style={styles.bottomPanel}>
    {props.children}
  </View>
}

/*
* position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
* */

const styles = StyleSheet.create({
  bottomPanel: {
    position: 'absolute',
    width: '100%',
    height: 64,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
