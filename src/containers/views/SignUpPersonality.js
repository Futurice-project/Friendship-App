import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
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

const mapStateToProps = state => ({
  createUserPersonality: state.createUserPersonality,
});

const mapDispatchToProps = dispatch => ({
  createUserPersonality: credentials => {
    dispatch(
      rest.actions.createUserPersonality(
        {},
        { body: JSON.stringify(credentials) },
      ),
    )
      .then(() =>
        dispatch(
          NavigationActions.navigate({
            routeName: 'SignOut',
          }),
        ),
      )
      .catch(err => console.log(err));
  },
});

class SignUpPersonality extends React.Component {
  static navigationOptions = {
    header: () => null,
  };

  state = {
    personalityId: '',
    level: '',
  };

  handleClickRelaxed = () => {
    this.setState(
      {
        personalityId: 1,
        level: 5,
      },
      () => {
        const { userId, personalityId, level } = this.state;
        this.props.createUserPersonality({ personalityId, level });
      },
    );
  };

  handleClickAmbigious = () => {
    this.setState(
      {
        personalityId: 2,
        level: 5,
      },
      () => {
        const { userId, personalityId, level } = this.state;
        this.props.createUserPersonality({ personalityId, level });
      },
    );
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
                <Personality
                  title="RELAXED"
                  image="relaxed"
                  onPress={this.handleClickRelaxed}
                />
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
                <Personality
                  title="AMBITIOUS"
                  image="ambitious"
                  onPress={this.handleClickAmbigious}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPersonality);
