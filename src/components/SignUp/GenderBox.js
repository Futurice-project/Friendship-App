import React from 'react';
import styled from 'styled-components/native';

export default class GenderBox extends React.Component {
  state = { color: '#ffffff' };

  _handlePress() {
    this.props.updateGenders();
    if (this.state.color === '#ffffff') {
      return this.setState({ color: '#ff8a65' });
    }
    return this.setState({ color: '#ffffff' });
  }

  render() {
    return (
      <View style={{ backgroundColor: this.state.color }}>
        <TouchableOpacity onPress={() => this._handlePress()}>
          <Text>{this.props.gender}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const TouchableOpacity = styled.TouchableOpacity``;

const View = styled.View`
  overflow: hidden;
  height: 44;
  width: 36%;
  border-radius: 27;
  padding-left: 15;
  margin-right: 11;
  justify-content: center;
`;

const Text = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 18;
  color: #4a4a4a;
  text-align: left;
`;
