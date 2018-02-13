import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';

import rest from '../../../utils/rest';
import { addPersonality } from '../../../state/personalities';
import {
  Centered,
  Padding,
  ViewContainer,
} from '../../../components/Layout/Layout';
import Personality from '../../../components/SignUp/Personality';
import ProgressBar from '../../../components/SignUp/ProgressBar';

const mapStateToProps = (state, ownProps) => ({
  createUserPersonalities: state.createUserPersonalities,
  personalities: state.personalities,
  personalityState: state.personalityState,
});

const mapDispatchToProps = dispatch => ({
  changeView: index => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpPersonality',
        params: { index },
      }),
    );
  },
  updateChosenPersonalities: personality => {
    dispatch(addPersonality(personality));
  },
  getPersonalities: () => {
    dispatch(rest.actions.personalities());
  },
  addUserPersonalities: credentials => {
    dispatch(
      rest.actions.createUserPersonalities(
        {},
        { body: JSON.stringify(credentials) },
      ),
    );
  },
});

class SignUpPersonality extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getPersonalities();
  }

  handleClick = async personalityId => {
    // let selectedPersonalities = [];
    // selectedPersonalities.push({ personalityId, level: 5 });

    if (
      this.props.navigation.state.params.index + 2 >=
      this.props.personalities.data.length
    ) {
      // We are at the end of the list
      const test = await this.props.updateChosenPersonalities({
        personalityId,
        level: 5,
      });
      console.log(test);
      this.props.addUserPersonalities({
        personalities: this.props.personalityState.chosenPersonalities,
      });
    } else {
      // Change the view and increment the index
      this.props.updateChosenPersonalities({ personalityId, level: 5 });
      this.props.changeView(this.props.navigation.state.params.index + 2);
      // this.props.changeView();
    }
  };

  /**
   * Renders personalities with personality component according to
   * the list from the personality state
   * @returns {XML}
   */
  renderTwoPersonalities() {
    if (!this.props.personalities.data) {
      return <Text>Network failed</Text>;
    }

    if (this.props.personalities.syncing) {
      return <Text>syncing failed</Text>;
    }

    if (this.props.personalities.loading) {
      return <Text>loading failed</Text>;
    }

    if (!this.props.personalities.sync) {
      return <Text>sync failed</Text>;
    }

    let index = this.props.navigation.state.params.index;
    console.log(index);
    let personalities = this.props.personalities.data;
    console.log(personalities);

    return (
      <Centered>
        <Personality
          key={personalities[index].id}
          title={personalities[index].name}
          image={personalities[index].name}
          onPress={() => this.handleClick(personalities[index].id)}
        />
        <PersonalityText>or</PersonalityText>
        <Personality
          key={personalities[index + 1].id}
          title={personalities[index + 1].name}
          image={personalities[index + 1].name}
          onPress={() => this.handleClick(personalities[index + 1].id)}
        />
      </Centered>
    );
  }

  /**
   * Render a text component containing the progress of the
   * steps in this view
   * Example: (1/4, 2/4)
   * @returns {XML}
   */
  renderProgress() {
    if (!this.props.personalities.data) {
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
        {this.props.index / 2 + 1}/{this.props.personalities.data.length /
          2}{' '}
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
