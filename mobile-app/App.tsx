import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hex game for mobile</Text>
      <StatusBar style="auto" />
      <Svg width="100%" height="300">
        <Polygon points="300,150 225,280 75,280 0,150 75,20 225,20" stroke="blue" strokeWidth="2.5" fill="green" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
