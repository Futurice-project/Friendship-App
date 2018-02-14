import React from 'react';
import rest from '../../../utils/rest';
import { Text } from '../../../components/Layout/TextLayout';
import {
  Centered,
  Padding,
  ViewContainer,
} from '../../../components/Layout/Layout';
import YeahAndNaah from '../../../components/SignUp/YeahAndNaah';
import styled from 'styled-components/native';
import { View } from 'react-native';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import RoundTab from '../../../components/RoundTab';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state, ownProps) => ({
  tags: state.tags,
  index: ownProps.navigation.state.params
    ? ownProps.navigation.state.params.index
    : 1,
  tagState: state.tagState,
});

const mapDispatchToProps = dispatch => ({
  getTags: () => {
    dispatch(rest.actions.tags()).catch(err => console.log(err));
  },
  addUserTags: credentials => {
    dispatch(
      rest.actions.userTags({}, { body: JSON.stringify(credentials) }),
    ).catch(err => console.log(err));
  },
  changeView: index => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'YeahAndNaah',
        params: { index },
      }),
    );
  },
  openSignUpPersonality: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpMatching',
      }),
    ),
});

export class SignUpLoveAndHate extends React.Component {
  componentWillMount() {
    this.props.getTags();
  }

  renderFiveLoveAndHateActivities = () => {
    if (!this.props.tags.data.data) {
      return;
    }
    let activities = this.props.tags.data.data.map(activity => {
      //activities have a category equal to 1
      if (activity.category === 1) {
        return (
          <YeahAndNaah
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
    if (!this.props.tags.data.data) {
      return;
    }
    let activities = this.props.tags.data.data.map(activity => {
      //interests have a category equal to 2
      if (activity.category === 2) {
        return (
          <YeahAndNaah
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
    if (this.props.index === 1) {
      return this.renderFiveLoveAndHateActivities();
    } else {
      return this.renderFiveLoveAndHateInterests();
    }
  }

  renderTitle() {
    if (this.props.index === 1) {
      return '1/2 Activities';
    } else {
      return '2/2 Interests';
    }
  }

  render() {
    return (
      <View>
        <ViewContainer>
          <ProgressBar color="#3a4853" steps="4" />
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
            tint="#faf5f0"
            onPress={() => {
              if (this.props.index === 1) {
                this.props.changeView(2);
              } else {
                this.props.addUserTags({
                  tags: this.props.tagState.chosenTags,
                });
                this.props.openSignUpPersonality();
              }
            }}
          />
        </ViewContainer>
      </View>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLoveAndHate);
