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
  getTags: credentials => {
    dispatch(rest.actions.tags()).catch(err => console.log(err));
  },
  incrementView: (length, endIndex) => {
    dispatch(tags.increment(length, endIndex));
  },
  addUserTags: credentials => {
    console.log('aaa');
  },
  changeView: index => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpLoveAndHate',
        params: { page: index },
      }),
    );
  },
});

const mapStateToProps = (state, ownProps) => ({
  tags: state.tags,
  index: ownProps.navigation.state.params
    ? ownProps.navigation.state.params.index
    : 0,
  navigatorState: state.navigatorState,
});

export class SignUpLoveAndHate extends React.Component {
  static navigationOptions = {
    header: () => null,
  };

  componentWillMount() {
    this.props.getTags();
  }

  renderFiveLoveAndHateActivities = () => {
    let activities = this.props.tags.data.data //this.props.tags.data.data
      .map(activity => {
        //activities have a category equal to 1
        if (activity.category == 1) {
          return (
            <LoveAndHate
              key={activity.id}
              activityName={activity.name}
              activityId={activity.id}
            />
          );
        }
      });

    return <Activities>{activities}</Activities>;
  };

  renderFiveLoveAndHateInterests = () => {
    let activities = this.props.tags.data.data //this.props.tags.data.data
      .map(activity => {
        //interests have a category equal to 2
        if (activity.category == 2) {
          return (
            <LoveAndHate
              key={activity.id}
              activityName={activity.name}
              activityId={activity.id}
            />
          );
        }
      });

    return <Activities>{activities}</Activities>;
  };

  renderPage() {
    if (this.props.page == 1) {
      return this.renderFiveLoveAndHateActivities();
    } else {
      return this.renderFiveLoveAndHateInterests();
    }
  }

  renderTitle() {
    if (this.props.page == 1) {
      return '1/2 Activities';
    } else {
      return '2/2 Interests';
    }
  }

  render() {
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
              this.props.changeView(1);
            }}
          />
        </ViewContainer>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLoveAndHate);
