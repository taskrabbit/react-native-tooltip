/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import ReactNative from 'react-native';
import React from 'react';
import ToolTip from 'react-native-tooltip';

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Example extends React.Component {
  handleCopyPress() {
    AlertIOS.alert(`Copy has been pressed!`);
  }

  handleOtherPress() {
    AlertIOS.alert(`Other has been pressed!`);
  }

  render() {
    const actions = [
      {text: 'Copy', onPress: this.handleCopyPress },
      {text: 'Other', onPress: this.handleOtherPress }
    ];
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ToolTip
          actions={actions}
          underlayColor={'blue'}
          style={styles.selectedName}
        >
          <Text style={styles.welcome}>
            Press Here.
          </Text>
        </ToolTip>

        <ToolTip
          arrowDirection="up"
          actions={actions}
        >
          <Text style={styles.welcome}>
            Up
          </Text>
        </ToolTip>
        <ToolTip
          arrowDirection="left"
          actions={actions}
        >
          <Text style={styles.welcome}>
            Left
          </Text>
        </ToolTip>
        <ToolTip
          arrowDirection="right"
          underlayColor='transparent'
          actions={actions}
        >
          <Text style={styles.welcome}>
            Right
          </Text>
        </ToolTip>
      </View>
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
