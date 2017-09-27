import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import RoundTab from '../../components/RoundTab';

export default class RoundTabView extends React.Component {
  static navigationOptions = {
    title: 'RoundTab',
  };

  render = () => (
    <ViewContainer>
      <RoundTab imageTint="#000">
        <TouchableOpacity>
          <Text style={styles.buttonStyle}>hi</Text>
        </TouchableOpacity>
      </RoundTab>
    </ViewContainer>
  );
}
const styles = {
  buttonStyle: {
    width: 230,
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2d4359',
  },
};
