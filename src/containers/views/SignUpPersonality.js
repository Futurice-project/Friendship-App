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
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: credentials => {
    dispatch(rest.actions.personalities());
  },
  createUserPersonality: credentials => {
    dispatch(
      rest.actions.createUserPersonality(
        {},
        { body: JSON.stringify(credentials) },
      ),
    )
      .then(() => console.log('success'))
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
    personalities: [],
    startIndex: 0,
    endIndex: 2,
  };

  handleClick = personalityId => {
    this.setState(
      {
        personalityId: personalityId,
        level: 5,
      },
      () => {
        const { userId, personalityId, level } = this.state;
        this.props.createUserPersonality({ personalityId, level });
      },
    );
  };

  componentDidMount() {
    this.props.getPersonalities();
  }

  componentWillReceiveProps() {
    if (this.props.personalities) {
      this.setState({ personalities: this.props.personalities.data.data });
    }
    if (this.props.createUserPersonality) {
      console.log('eindelijk');
      console.log(this.props.createUserPersonality);
    }
  }

  renderTwoPersonalities() {
    var personalities = this.state.personalities
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
