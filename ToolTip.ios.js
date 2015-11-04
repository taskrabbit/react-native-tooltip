'use strict';

import React from 'react-native';
const {
  requireNativeComponent,
  TouchableHighlight,
  View,
} = React;

const ToolTipMenu = React.NativeModules.ToolTipMenu;

const RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

const propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func,
  })),
  longPress: React.PropTypes.bool,
  ...TouchableHighlight.propTypes,
};

class ToolTipText extends React.Component {
  constructor(props) {
    super(props);

    this.handleToolTipTextChange = this.handleToolTipTextChange.bind(this);
    this.handleTextPress         = this.handleTextPress.bind(this);
  }

  getOptionTexts() {
    return this.props.actions.map((option) => option.text);
  }

  // Assuming there is no actions with the same text
  getCallback(optionText) {
    const selectedOption = this.props.actions.find((option) => option.text === optionText);

    if (selectedOption) {
      return selectedOption.onPress;
    }

    return null;
  }

  getTouchableHighlightProps() {
    let props = {};

    Object.keys(TouchableHighlight.propTypes).forEach((key) => props[key] = this.props[key]);

    if (this.props.longPress) {
      props.onLongPress = this.handleTextPress;
    } else {
      props.onPress = this.handleTextPress;
    }

    return props;
  }

  handleTextPress() {
    ToolTipMenu.show(React.findNodeHandle(this.refs.toolTipText), this.getOptionTexts());
  }

  handleToolTipTextChange(event) {
    const callback = this.getCallback(event.nativeEvent.text);

    if (callback) {
      callback(event);
    }
  }

  render() {
    return (
      <RCTToolTipText ref='toolTipText' onChange={this.handleToolTipTextChange}>
        <TouchableHighlight
          {...this.getTouchableHighlightProps()}
        >
          <View>
            {this.props.children}
          </View>
        </TouchableHighlight>
      </RCTToolTipText>
    );
  }
}

ToolTipText.propTypes = propTypes;

export default ToolTipText;
