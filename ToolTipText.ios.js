'use strict';

import React from 'react-native';
const {
  Text,
  requireNativeComponent,
} = React;

const ToolTipMenu = React.NativeModules.ToolTipMenu;

const RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

const propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.number,
  })),
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
    const {actions, ...textProps} = this.props;

    return (
      <RCTToolTipText ref='toolTipText' onChange={this.handleToolTipTextChange}>
        <Text
          {...textProps}
          onPress={this.handleTextPress}
        />
      </RCTToolTipText>
    );
  }
}

ToolTipText.propTypes = propTypes;

export default ToolTipText;
