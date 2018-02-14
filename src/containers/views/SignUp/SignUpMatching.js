import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { Padding, ViewContainer } from '../../../components/Layout/Layout';
import DescriptionBubble from '../../../components/BubbleTextInput';
import Toggle from '../../../components/Toggle';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import RoundTab from '../../../components/RoundTab';
import { connect } from 'react-redux';
import rest from '../../../utils/rest';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  patchUser: (description, enableMatching, userId) => {
    const details = {
      description,
      enableMatching,
    };

    dispatch(
      rest.actions.userDetails.patch(
        { userId },
        { body: JSON.stringify(details) },
      ),
    ).then(() => {
      dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
        }),
      );
    });
  },
});

class SignUpMatching extends React.Component {
  state = {
    enableMatching: false,
    description: '',
  };

  render = () => {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ViewContainer style={{ backgroundColor: '#e8e9e8' }}>
          <ProgressBar steps={5} />
          <Padding>
            <Title>FINDING THE RIGHT PEOPLE FOR YOU</Title>
            <P>Do you want to receive recommendation on people</P>
            <Toggle
              leftText="NO THANK YOU"
              rightText="YES, PLEASE"
              value={this.state.enableMatching}
              onPress={() => {
                this.setState({ enableMatching: !this.state.enableMatching });
              }}
            />

            <InfoText>
              This means that your profile is public when you join an event or a
              group, but you won’t be recommended people near your location
            </InfoText>

            <SubTitle>WOULD YOU LIKE TO ADD A SMALL BIO?</SubTitle>
            <DescriptionBubble
              style={{ alignSelf: 'center' }}
              text="ADD A DESCRIPTION"
              value={this.state.description}
              placeholder="You can tell your future friends about your interests, what you’re looking for or what you think friendship is…"
              onChangeText={description => this.setState({ description })}
            />
            <InfoText>You can always add and change this information</InfoText>
          </Padding>
          <RoundTab
            title="Next"
            tint="#2d4359"
            titleColor="#fff"
            onPress={() => {
              this.props.patchUser(
                this.state.description,
                this.state.enableMatching,
                this.props.auth.data.decoded.id,
              );
            }}
          />
        </ViewContainer>
      </KeyboardAvoidingView>
    );
  };
}

const Title = styled.Text`
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 36;
  text-align: left;
  align-self: center;
  margin-top: 30;
  margin-left: 5%;
  color: #839297;
`;
const P = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 16;
  font-weight: 300;
  line-height: 24;
  text-align: left;
  color: #4a4a4a;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 13;
  margin-top: 10;
`;
const SubTitle = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  font-weight: 600;
  letter-spacing: 1.5;
  text-align: left;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 30;
  color: #4a4a4a;
`;
const InfoText = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  line-height: 16;
  letter-spacing: 1.59;
  text-align: left;
  align-self: center;
  color: #9b9b9b;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 50;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpMatching);
