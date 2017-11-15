import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import * as personalities from '../../state/personalities';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import Personality from '../../components/Personality';
import ProgressBar from '../../components/ProgressBar';

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
  createUserPersonalities: state.createUserPersonalities,
  auth: state.auth,
  personalities: state.personalities,
  navigatorState: state.navigatorState,
  personalityState: state.personalityState,
});

const mapDispatchToProps = dispatch => ({
  incrementView: (length, endIndex) => {
    dispatch(personalities.increment(length, endIndex));
  },
  changeView: index => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpPersonality',
        params: { index: 1 },
      }),
    );
  },
  getPersonalities: credentials => {
    dispatch(rest.actions.personalities()).catch(err => console.log(err));
  },
  addUserPersonalities: credentials => {
    dispatch(
      rest.actions.createUserPersonalities(
        {},
        { body: JSON.stringify(credentials) },
      ),
    )
      .then(() => {
        dispatch(
          NavigationActions.navigate({
            routeName: 'Tabs',
          }),
        );
      })
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

  /**
   * Check's if the personalityId (the combination of the two oppositise personalites)
   * already exists in the list, and duplicates
   * It will return a new array with personalities
   * @param personalityId
   * @returns {Array}
   */
  removeDuplicateFromChosenPersonalities = personalityId => {
    // Check if we need to search one index back
    // This occurs for the second personality we want to check the previous chosen one as well
    var searchBackwards = false;
    var searchForwards = false;
    if (personalityId % 2 == 0) {
      searchBackwards = true;
    } else {
      searchForwards = true;
    }

    // Remove duplicates from array
    var personalities = this.props.personalityState.chosenPersonalities;
    for (var i = 0; i < personalities.length; i++) {
      if (
        (searchBackwards && personalities[i].personalityId == personalityId) ||
        personalities[i].personalityId == personalityId - 1
      ) {
        personalities.splice(i, 1);
      }
    }
    for (var i = 0; i < personalities.length; i++) {
      if (
        (searchForwards && personalities[i].personalityId == personalityId) ||
        personalities[i].personalityId == personalityId + 1
      ) {
        personalities.splice(i, 1);
      }
    }

    return personalities;
  };

  handleClick = personalityId => {
    var personalities = this.removeDuplicateFromChosenPersonalities(
      personalityId,
    );
    personalities.push({ personalityId: personalityId, level: 5 });
    if (
      this.props.personalities.data.data.length ==
      this.props.personalityState.endIndex
    ) {
      this.props.addUserPersonalities({
        personalities: this.props.personalityState.chosenPersonalities,
      });
    } else {
      this.props.incrementView(
        this.props.personalities.data.data.length,
        this.props.personalityState.endIndex,
      );
    }
  };

  componentDidUpdate() {
    // console.log('Testing token here!!!', this.props.auth);
    this.props.getPersonalities();
  }

  renderTwoPersonalities() {
    if (!this.props.personalities.data.data) {
      return <Text>Network failed</Text>;
    }

    var personalities = this.props.personalities.data.data
      .slice(
        this.props.personalityState.startIndex,
        this.props.personalityState.endIndex,
      )
      .map(personality => {
        return (
          <Personality
            key={personality.id}
            title={personality.name}
            image={personality.name}
            onPress={() => this.handleClick(personality.id)}
          />
        );
      });

    return <Personalities>{personalities}</Personalities>;
  }

  renderProgress() {
    if (!this.props.personalities.data.data) {
      return;
    }

    return (
      <Text
        style={{
          fontFamily: 'NunitoSans-Bold',
          fontSize: 20,
          color: '#efebe9',
        }}
      >
        {this.props.personalityState.endIndex / 2}/{this.props.personalities.data.data.length / 2}{' '}
      </Text>
    );
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <ViewContainer>
          <ProgressBar color="#3a4853" steps="5" />
          <Padding style={{ flex: 1 }}>
            <Title>PERSONALITY</Title>
            <SubTitle>
              {this.renderProgress()}
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
            <Centered>{this.renderTwoPersonalities()}</Centered>
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

// const ProgressBar = styled.View`
//   background-color: #3a4853;
//   width: 19%;
//   height: 10;
// `;

const Error = styled.Text`
  font-size: 11;
  color: #faf5f0;
  color: red;
`;

const Title = styled.Text`
  margin-top: 50;
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
