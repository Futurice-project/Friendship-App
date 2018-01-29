import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';

import rest from '../../../utils/rest';
import * as personalities from '../../../state/personalities';
import {
  Centered,
  Padding,
  ViewContainer,
} from '../../../components/Layout/Layout';
import Personality from '../../../components/SignUp/Personality';
import ProgressBar from '../../../components/SignUp/ProgressBar';

/**
 * Map states from redux-api to this components props
 * @param state
 */
const mapStateToProps = (state, ownProps) => ({
  createUserPersonalities: state.createUserPersonalities,
  auth: state.auth,
  index: ownProps.navigation.state.params
    ? ownProps.navigation.state.params.index
    : 0,
  personalities: state.personalities ? state.personalities.data.data : 0,
  navigatorState: state.navigatorState,
  personalityState: state.personalityState,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Navigate to the SignUpPersonality view
   * @param index
   */
  changeView: index => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpPersonality',
        params: { index },
      }),
    );
  },
  updateChosenPersonalities: personality => {
    dispatch(personalities.add(personality));
  },
  /**
   * Retrieve personalities
   * @param credentials
   */
  getPersonalities: () => {
    dispatch(rest.actions.personalities()).catch(err => console.log(err));
  },
  /**
   * Add user personalities
   * @param credentials
   */
  addUserPersonalities: credentials => {
    dispatch(
      rest.actions.createUserPersonalities(
        {},
        { body: JSON.stringify(credentials) },
      ),
    )
      .then(() => {
        dispatch(NavigationActions.navigate({ routeName: 'LoveAndHate' }));
      })
      .catch(err => console.log(err));
  },
});

class SignUpPersonality extends React.Component {
  /**
   * Disable header
   * @type {{header: (()=>null)}}
   */
  static navigationOptions = {
    header: () => null,
  };

  state = {
    personalityId: '',
    level: '',
  };

  /**
   * Retrieve all the personalities when loading the component
   * for the first time
   */
  componentDidMount() {
    // console.log('Testing token here!!!', this.props.auth);
    this.props.getPersonalities();
  }

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

    console.log(personalityId);

    // Remove duplicates from array
    var personalities = this.props.personalityState.chosenPersonalities;

    // Search backwards for duplicates
    for (var i = 0; i < personalities.length; i++) {
      if (searchBackwards) {
        if (
          personalities[i] == personalityId - 1 ||
          personalities[i] == personalityId
        ) {
          personalities.splice(i, 1);
        }
      }
    }

    // Search forward for duplicates
    for (var i = 0; i < personalities.length; i++) {
      if (searchForwards) {
        if (
          personalities[i] == personalityId + 1 ||
          personalities[i] == personalityId
        ) {
          personalities.splice(i, 1);
        }
      }
    }

    return personalities;
  };

  /**
   * Handle a personality click
   * Set the state with new chosen personalities
   * @param personalityId
   */
  handleClick = personalityId => {
    // Create new list with non duplicate personalities
    var personalities = this.removeDuplicateFromChosenPersonalities(
      personalityId,
    );
    personalities.push({ personalityId, level: 5 });

    if (this.props.index + 2 >= this.props.personalities.length) {
      // We are at the end of the list
      this.props.addUserPersonalities({
        personalities,
      });
    } else {
      // Change the view and increment the index
      this.props.updateChosenPersonalities(personalities);
      this.props.changeView(this.props.index + 2);
    }
  };

  /**
   * Renders personalities with personality component according to
   * the list from the personality state
   * @returns {XML}
   */
  renderTwoPersonalities() {
    if (!this.props.personalities) {
      return <Text>Network failed</Text>;
    }

    var personalities = this.props.personalities;

    return (
      <Centered>
        <Personality
          key={personalities[this.props.index].id}
          title={personalities[this.props.index].name}
          image={personalities[this.props.index].name}
          onPress={() => this.handleClick(personalities[this.props.index].id)}
        />
        <PersonalityText>or</PersonalityText>
        <Personality
          key={personalities[this.props.index + 1].id}
          title={personalities[this.props.index + 1].name}
          image={personalities[this.props.index + 1].name}
          onPress={() =>
            this.handleClick(personalities[this.props.index + 1].id)}
        />
      </Centered>
    );

    return <Personalities>{personalities}</Personalities>;
  }

  /**
   * Render a text component containing the progress of the
   * steps in this view
   * Example: (1/4, 2/4)
   * @returns {XML}
   */
  renderProgress() {
    if (!this.props.personalities) {
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
        {this.props.index / 2 + 1}/{this.props.personalities.length / 2}{' '}
      </Text>
    );
  }

  /**
   * Render the component
   * @returns {XML}
   */
  render() {
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
            {this.renderTwoPersonalities()}
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

const PersonalityText = styled.Text`
  margin-top: 15;
  margin-bottom: 15;
  font-size: 16;
  color: #efebe9;
  font-family: 'NunitoSans-Light';
`;

const Title = styled.Text`
  margin-top: 50;
  font-size: 40;
  font-family: 'Friendship_version_2';
  color: #faf5f0;
`;

const SubTitle = styled.View`
  margin-top: 10;
  margin-bottom: 10;
  display: flex;
  flex-direction: row;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPersonality);
