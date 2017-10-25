import React from 'react';
import styled from 'styled-components/native';
import { Picker } from 'react-native';
import { Item } from 'react-native/Libraries/Components/Picker/Picker';

const DropDownWrapper = styled.View`
  background-color: #faf6f0;
  height: 44;
  width: 300;
  border-radius: 27;
`;

export default class DropDown extends React.Component {
  static navigationOptions = {
    title: 'DropDown',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: '',
      results: {
        items: [],
      },
    };
  }

  onValueChange(value) {
    this.setState({
      selected1: value,
    });
  }

  render() {
    return (
      <DropDownWrapper>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selected1}
          onValueChange={this.onValueChange.bind(this)}
          prompt="Test"
        >
          <Item label="Cats" value="key0" />
          <Item label="Dogs" value="key1" />
          <Item label="Birds" value="key2" />
          <Item label="Elephants" value="key3" />
        </Picker>
      </DropDownWrapper>
    );
  }
}
