import React from 'react';
import rest from '../../utils/rest';
import { Text } from '../../components/Text';
import { Centered, Padding, ViewContainer } from '../../components/Layout';
import LoveAndHate from '../../components/LoveAndHate';
import styled from 'styled-components/native';
import { View } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import RoundTab from '../../components/RoundTab';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as activities from '../../state/activities';

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

const Activities = styled.View`
  align-items: center;
  justify-content: center;
`;

const mapDispatchToProps = dispatch => ({
  getActivities: credentials => {
    dispatch(rest.actions.activities()).catch(err => console.log(err));
  },
  incrementView: (length, endIndex) => {
    dispatch(activities.increment(length, endIndex));
  },
  addUserActivities: credentials => {
    dispatch(
      rest.actions.createUserActivities(
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

const mapStateToProps = state => ({
  //activities: state.activities,
  navigatorState: state.navigatorState,
  activityState: state.activityState,
});

export class SignUpLoveAndHate extends React.Component {
  static navigationOptions = {
    header: () => null,
  };

  state = {
    activities: [
      { id: 0, name: 'football' },
      { id: 1, name: 'boxing' },
      { id: 2, name: 'concerts' },
      { id: 3, name: 'reading' },
      { id: 4, name: 'skiing' },
    ],
  };

  componentDidUpdate() {
    //this.props.getActivities();
  }

  renderFiveLoveAndHate = () => {
    //    if (!this.props.personalities.data.data) {
    //      return <Text>Network failed</Text>;
    //    }

    let activities = this.state.activities //this.props.activities.data.data
      //      .slice(
      //        this.props.activityState.startIndex,
      //        this.props.activityState.endIndex,
      //      )
      .map(activity => {
        return <LoveAndHate key={activity.id} activity={activity.name} />;
      });

    return <Activities>{activities}</Activities>;
    {
      /*
<LoveAndHate activity="Football"/>
<LoveAndHate activity="Boxing"/>
<LoveAndHate activity="Concerts"/>
<LoveAndHate activity="Reading"/>
<LoveAndHate activity="Skiing"/>
*/
    }
  };

  handleClick = activityId => {
    let personalities = this.removeDuplicateFromChosenPersonalities(
      personalityId,
    );
    personalities.push({ personalityId: personalityId, level: 5 });
    if (
      this.props.personalities.data.data.length ===
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

  /*  renderProgress() {
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
  }*/

  render() {
    console.log(this.props);
    return (
      <View>
        <ViewContainer>
          <ProgressBar color="#3a4853" steps="5" />
          <Padding>
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
          </Padding>
          <Padding
            style={{
              flex: 1,
              paddingTop: -16,
              paddingLeft: -16,
              paddingRight: -16,
            }}
          >
            <Centered>{this.renderFiveLoveAndHate()}</Centered>
          </Padding>
          <RoundTab
            title="NEXT"
            tint="#faf5f0" /*onPress={() => this.handleClick(activity.id)}*/
          />
        </ViewContainer>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLoveAndHate);
