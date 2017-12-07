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
  activities: state.activities,
  navigatorState: state.navigatorState,
  activityState: state.activityState,
});

export class SignUpLoveAndHate extends React.Component {
  static navigationOptions = {
    header: () => null,
  };

  componentWillMount() {
    this.props.getActivities();
  }

  renderFiveLoveAndHateActivities = () => {
    //    if (!this.props.personalities.data.data) {
    //      return <Text>Network failed</Text>;
    //    }

    let activities = this.props.activities.data.data //this.props.activities.data.data
      .map(activity => {
        //activities have a category equal to 1
        if (activity.category == 1) {
          return <LoveAndHate key={activity.id} activity={activity.name} />;
        }
      });

    return <Activities>{activities}</Activities>;
    {
    }
  };

  renderFiveLoveAndHateInterests = () => {
    //    if (!this.props.personalities.data.data) {
    //      return <Text>Network failed</Text>;
    //    }

    let activities = this.props.activities.data.data //this.props.activities.data.data
      .map(activity => {
        //interests have a category equal to 2
        if (activity.category == 2) {
          return <LoveAndHate key={activity.id} activity={activity.name} />;
        }
      });

    return <Activities>{activities}</Activities>;
    {
    }
  };

  renderPage() {
    if (this.state.page == 1) {
      return this.renderFiveLoveAndHateActivities();
    } else {
      return this.renderFiveLoveAndHateInterests();
    }
  }

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

  renderTitle() {
    if (this.state.page == 1) {
      return '1/2 Activities';
    } else {
      return '2/2 Interests';
    }
  }
  state = { page: 1 };

  render() {
    console.log(this.props);
    return (
      <View>
        <ViewContainer>
          <ProgressBar color="#3a4853" steps="5" />
          <Padding>
            <View style={{ flexDirection: 'row' }}>
              <Title style={{ color: '#ff8a65' }}>YEAH </Title>
              <Title>&</Title>
              <Title style={{ color: '#99ccff' }}> NAAH</Title>
            </View>
            <SubTitle>
              <Text
                style={{
                  fontFamily: 'NunitoSans-Regular',
                  fontSize: 20,
                  color: '#efebe9',
                }}
              >
                {this.renderTitle()}
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
            <Centered>{this.renderPage()}</Centered>
          </Padding>
          <RoundTab
            title="NEXT"
            tint="#faf5f0" /*onPress={() => this.handleClick(activity.id)}*/
            onPress={() => {
              this.setState({ page: 2 });
            }}
          />
        </ViewContainer>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLoveAndHate);
