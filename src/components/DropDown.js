import React from 'react';
import styled from 'styled-components/native';
import { Picker } from 'react-native';
import { Item } from 'react-native/Libraries/Components/Picker/Picker';

const DropDownWrapper = styled.View`
  background-color: #faf6f0;
  height: 40;
  width: 300;
  border-radius: 27;
  align-self: center;
`;

//Contains that hold the input and the label
const Container = styled.View`padding-left: 0;`;

//The title is displayed in bold over the input
const InputTitle = styled.Text`
  color: ${props => props.titleColor || '#2d4359'};
  font-weight: 600;
  width: auto;
  height: 25;
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  letter-spacing: 1.5;
  text-align: left;
  padding-left: 40px;
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
      <Container>
        <InputTitle titleColor={this.props.titleColor}>
          {this.props.title}
        </InputTitle>
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
      </Container>
    );
  }
}
