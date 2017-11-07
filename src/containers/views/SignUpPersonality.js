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
  auth: state.auth,
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: credentials => {
    dispatch(rest.actions.personalities()).catch(err => console.log(err));
  },
  addUserPersonality: credentials => {
    dispatch(
      rest.actions.createUserPersonality(
        {},
        { body: JSON.stringify(credentials) },
      ),
    )
      .then(() => console.log('success'))
      .catch(err => console.log(err));
  },
  openNextView: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Tabs',
      }),
    ),
});

class SignUpPersonality extends React.Component {
  static navigationOptions = {
    header: () => null,
  };

  state = {
    personalityId: '',
    level: '',
    personalities: [],
    startIndex: 0,
    endIndex: 2,
    newPersonalityChosen: false,
  };

  handleClick = personalityId => {
    this.setState(
      {
        personalityId: personalityId,
        level: 5,
        newPersonalityChosen: true,
      },
      () => {
        const { userId, personalityId, level } = this.state;
        this.props.addUserPersonality({ personalityId, level });
      },
    );
  };

  componentDidMount() {
    console.log('Testing token here!!!', this.props.auth);
    this.props.getPersonalities();
  }

  componentWillReceiveProps() {
    // Check if we actually receive data
    // Check if we just chose a new personality to prevent bugs
    if (
      this.props.createUserPersonality.data.data &&
      this.state.newPersonalityChosen
    ) {
      if (!this.props.createUserPersonality.error) {
        if (this.props.personalities.data.data.length == this.state.endIndex) {
          this.props.openNextView();
        } else {
          this.setState({
            newPersonalityChosen: false,
            startIndex: this.state.startIndex + 2,
            endIndex: this.state.endIndex + 2,
          });
        }
      }
    }
  }

  renderTwoPersonalities() {
    if (!this.props.personalities.data.data) {
      return <Text>Network failed</Text>;
    }

    var personalities = this.props.personalities.data.data
      .slice(this.state.startIndex, this.state.endIndex)
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

  renderError() {
    if (!this.props.createUserPersonality.error) {
      return;
    }

    return (
      <Error>
        This personality is already chosen before and can't be added again
      </Error>
    );
  }

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
            <Centered>{this.renderTwoPersonalities()}</Centered>
            {this.renderError()}
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

const Error = styled.Text`
  font-size: 11;
  color: #faf5f0;
  color: red;
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
