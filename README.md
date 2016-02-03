# react-native-tooltip

A react-native component from displaying tooltip. Uses UIMenuController.

### Add it to your project

1. Edit your package.json and add `"react-native-tooltip": "git://github.com/taskrabbit/react-native-tooltip.git"`
2. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name"` [(Screenshot)](http://url.brentvatne.ca/jQp8) then [(Screenshot)](http://url.brentvatne.ca/1gqUD).
3. Add `libRNToolTipMenu.a` to `Build Phases -> Link Binary With Libraries`
   [(Screenshot)](http://url.brentvatne.ca/17Xfe).
4. Whenever you want to use it within React code now you can: `var ToolTipText = require('react-native-tooltip');`

### Props

- `actions`: Array of actions `[{text: 'Copy', onPress: () => Clipboard.set(this.someValue) }]`
- `longPress`: Boolean indicating if the tooltip should be showing on longPress, false by default.

#### Props from TouchableHighlight.propTypes

- `activeOpacity`
- `onHideUnderlay`
- `onShowUnderlay`
- `style`
- `underlayColor`

You can see the list on the react native [website](https://facebook.github.io/react-native/docs/touchablehighlight.html#content)

## Example 1

```javascript
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  PixelRatio,
  View,
} = React;

var ToolTipMenu = require('NativeModules').ToolTipMenu;
var { ToolTipText } = require('react-native-tooltip');

var tooltip = React.createClass({
  getInitialState: function() {
    return {
      input: 'chirag',
    }
  },
  handleChange: function(event) {
    this.setState({input: event.nativeEvent.text});
  },
  handleFocus: function(change) {
    ToolTipMenu.show(React.findNodeHandle(this.refs.input), ['x', 'z']);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.textinputContainer}>
          <ToolTipText
            suppressHighlighting={true}
            onChange={this.handleChange}
            onPress={this.handleFocus}
            ref={'input'}
            style={styles.textinput}
          >{this.state.input}</ToolTipText>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textinputContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: 60,
    marginVertical: 2,
    marginHorizontal: 2,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    borderColor: '#c7c7cc',
    padding: 2,
    fontSize: 14,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('tooltip', () => tooltip);
```

## Example 2

```javascript
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  View,
} = React;

var { ToolTip } = require('react-native-tooltip');

var tooltip = React.createClass({
  getInitialState: function() {
    return {
      input: 'chirag',
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.textinputContainer}>
          <ToolTip
            actions={[
              {text: 'x', onPress: () => { this.setState({input: 'x pressed'}) }},
              {text: 'y', onPress: () => { this.setState({input: 'y pressed'}) }}
            ]}
            underlayColor={cssVar('trGray10')}
            longPress={true}
            style={styles.textinput}
          >
            <Text>
              {this.state.input}
            </Text>
          </ToolTip>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textinputContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: 60,
    marginVertical: 2,
    marginHorizontal: 2,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    borderColor: '#c7c7cc',
    padding: 2,
    fontSize: 14,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('tooltip', () => tooltip);
```

## Here is how it looks:
![Demo gif](https://github.com/chirag04/react-native-tooltip/blob/master/screenshot.png)
