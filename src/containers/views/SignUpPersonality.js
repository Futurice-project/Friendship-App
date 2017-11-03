import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import Button from '../../components/Button';
import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import Personality from '../../components/Personality';

import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Platform,
  Dimensions,
} from 'react-native';

class SignUpPersonality extends React.Component {
  static navigationOptions = {
    header: () => null,
  };

  render() {
    return (
      <View>
        <ViewContainer>
          <Padding style={{ flex: 1 }}>
            <Header>
              <ProgressBar />
              <ProgressBar />
              <ProgressBar />
              <ProgressBar />
              <ProgressBar />
            </Header>
            <Title>PERSONALITY</Title>
            <SubTitle>
              <Text
                style={{
                  fontFamily: 'NunitoSans-Bold',
                  fontSize: 20,
                  color: '#efebe9',
                }}
              >
                1/4{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'NunitoSans-Regular',
                  fontSize: 20,
                  color: '#efebe9',
                }}
              >
                Lifestyle
              </Text>
            </SubTitle>
            <Text
              style={{
                fontFamily: 'NunitoSans-Light',
                fontSize: 16,
                color: '#efebe9',
              }}
            >
              Are you more..
            </Text>
            <Centered>
              <Personalities>
                <Personality title="RELAXED" image="relaxed" />
                <Text
                  style={{
                    paddingBottom: 15,
                    paddingTop: 15,
                    color: '#efebe9',
                    fontFamily: 'NunitoSans-Light',
                    fontSize: 16,
                  }}
                >
                  or
                </Text>
                <Personality title="AMBITIOUS" image="ambitious" />
              </Personalities>
            </Centered>
          </Padding>
        </ViewContainer>
      </View>
    );
  }
}

const Personalities = styled.View`
  margin-top: 50;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  margin-top: 13;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50;
`;

const ProgressBar = styled.View`
  background-color: #3a4853;
  width: 19%;
  height: 10;
`;

const Title = styled.Text`
  font-size: 40;
  fontFamily: 'Friendship_version_2';
  color: #faf5f0;
`;

const SubTitle = styled.View`
  margin-top: 10;
  margin-bottom: 10;
  display: flex;
  flex-direction: row;
`;

export default SignUpPersonality;
