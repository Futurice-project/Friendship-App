import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import styled from 'styled-components/native';

import { Description, Bold } from '../../components/Text';
import { SignUpWrapper, Padding, Centered } from '../../components/Layout';
import Label from '../../components/Label';
import { TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';

class PersonalityView extends React.Component {
  static navigationOptions = {
    title: 'Personality',
    header: () => null,
  };

  render() {
    return (
      <SignUpWrapper>
        <Padding>
          <Header>
            <HeaderRectangle>
              <Text style={styles.title}>Things that describe me</Text>
              <Text style={styles.subTitle}>
                These will be shown in your profile
              </Text>
            </HeaderRectangle>
          </Header>
        </Padding>
      </SignUpWrapper>
    );
  }
}

const Header = styled.View`
  display: flex;
  height: 200;
  width: 100%;
`;
const HeaderRectangle = styled.View`
  background-color: red;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const styles = {
  title: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 40,
    color: '#2d4359',
  },
  subTitle: {
    marginTop: 5,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 15,
    color: '#2d4359',
  },
};

export default connect(undefined)(PersonalityView);
