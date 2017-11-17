import React from 'react';

import { Bold, Description, Text } from '../../components/Text';
import { Centered, Padding, ViewContainer } from '../../components/Layout';
import LoveAndHate from '../../components/LoveAndHate';
import styled from 'styled-components/native';
import { View } from 'react-native';
import ProgressBar from '../../components/ProgressBar';

const SubTitle = styled.View`
  margin-top: 10;
  margin-bottom: 10;
  display: flex;
  flex-direction: row;
`;

const Title = styled.Text`
  margin-top: 50;
  font-size: 40;
  fontFamily: 'Friendship_version_2';
  color: #faf5f0;
`;

export default class LoveAndHateView extends React.Component {
  static navigationOptions = {
    header: () => null,
  };

  state: {
    data: ['football', 'boxing', 'concerts', 'reading', 'skiing', 'drinking'],
  };

  renderDescription = () => (
    <Description>
      Here's a sample view using your <Bold>LoveAndHate</Bold> component.
    </Description>
  );

  renderLoveAndHate() {
    return <LoveAndHate />;
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

  render = () => (
    <View>
      <ViewContainer>
        <ProgressBar color="#3a4853" steps="5" />
        <Padding style={{ flex: 1 }}>
          <Title>YEAH & NAAH...</Title>
          <SubTitle>
            {/*this.renderProgress()*/}
            <Text
              style={{
                fontFamily: 'NunitoSans-Regular',
                fontSize: 20,
                color: '#efebe9',
              }}
            >
              1/2 Activities
            </Text>
          </SubTitle>
          <Centered>{this.renderLoveAndHate()}</Centered>
        </Padding>
      </ViewContainer>
      {this.renderDescription()}
    </View>
  );
}
