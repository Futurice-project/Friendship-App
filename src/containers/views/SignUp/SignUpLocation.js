import React from 'react';
import { connect } from 'react-redux';
import rest from '../../../utils/rest';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { SignUpWrapper } from '../../../components/Layout/Layout';
import RoundTab from '../../../components/RoundTab';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import { LOCATION } from '../../../components/SignUp/Constants';
import validate from '../../../components/SignUp/validate';
import { Field, reduxForm, submit } from 'redux-form';
import LocationList from '../../../components/SignUp/LocationList';

/*const mapStateToProps = state => ({
  locations: state.locations,
  signup: state.signup,
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => {
    dispatch(rest.actions.locations());
  },

  postUserLocations: locationsObject => {
    dispatch(
      rest.actions.createUserLocations(
        {},
        {body: JSON.stringify(locationsObject)},
      ),
    );
  },

  openSignUpPersonality: () => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpPersonality',
        params: {index: 0},
      }),
    );
  },
});*/

class SignUpLocation extends React.Component {
  state = {
    selectedLocations: [],
  };

  onSelectedItemsChange = selectedLocations => {
    this.setState({ selectedLocations });
  };

  onPressNext() {
    let { selectedLocations } = this.state;
    let tempLocations = selectedLocations.map(location => ({
      locationId: location,
    }));

    const locationsObject = { locations: tempLocations };

    this.props.postUserLocations(locationsObject);

    this.props.incProgress();

    this.props.openSignUpPersonality();
  }

  render() {
    const { dispatch } = this.props;

    return (
      <SignUpWrapper>
        <ProgressBar steps={LOCATION} />
        <SignUpDivWrapper
          style={{
            paddingTop: 60,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: 'transparent',
            flex: 3,
          }}
        >
          <SignUpTitle>HEY!</SignUpTitle>
          <SignUpWelcomeText>
            With this information, we will find the people closest to you.
          </SignUpWelcomeText>
        </SignUpDivWrapper>

        <SignUpDivWrapper
          style={{ flex: 8, justifyContent: 'center', marginTop: 20 }}
        >
          <Field name={'locations'} component={LocationList} />
        </SignUpDivWrapper>
        <RoundTab title="NEXT" onPress={() => dispatch(submit('signup'))} />
      </SignUpWrapper>
    );
  }
}

const SignUpDivWrapper = styled.View`
  display: flex;
  background-color: #efebe9;
  width: 100%;
`;

const SignUpTitle = styled.Text`
  width: 121;
  height: 45;
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 45;
  text-align: justify;
  color: #2d4359;
`;

const SignUpWelcomeText = styled.Text`
  width: 300;
  height: 90;
  font-family: 'NunitoSans-Regular';
  font-size: 15;
  font-weight: 300;
  line-height: 25;
  color: #2d4359;
  text-align: justify;
  padding-top: 15;
  background-color: transparent;
`;

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: validate,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(SignUpLocation);
