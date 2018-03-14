import React from 'react';
import { connect } from 'react-redux';
import rest from '../../../utils/rest';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';

import MultiSelect from '../../../utils/react-native-multiple-select/lib/react-native-multi-select';
import { SignUpWrapper } from '../../../components/Layout/Layout';
import RoundTab from '../../../components/RoundTab';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import { LOCATION } from '../../../components/SignUp/Constants';
import validate from '../../../components/SignUp/validate';
import { Field, reduxForm, submit } from 'redux-form';

const mapStateToProps = state => ({
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
        { body: JSON.stringify(locationsObject) },
      ),
    );
  },

  openSignUpPersonality: () => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpPersonality',
        params: { index: 0 },
      }),
    );
  },
});

export class SignUpLocation extends React.Component {
  state = {
    selectedLocations: [],
  };

  componentWillMount() {
    this.props.getLocations();
  }

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
    const { selectedLocations } = this.state;
    const { dispatch, input } = this.props;

    console.log(input);

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
          <Field
            name={'locations'}
            component={() => (
              <MultiSelect
                hideTags
                items={this.props.locations.data}
                uniqueKey="id"
                hideSubmitButton={true}
                fixedHeight={true}
                onSelectedItemsChange={e => {
                  console.log(e);
                  input.onChange(e);
                }}
                selectedItems={selectedLocations}
                selectText="REGION*"
                searchInputPlaceholderText="Search municipalities..."
                selectedItemTextColor="#ff8a65"
                selectedItemIconColor="#ff8a65"
                title="YOUR LOCATION"
              />
            )}
          />
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
  onSubmit: () => {
    console.log(this.state.selectedLocations);
    validate(this.state.selectedLocations, 'LOCATION');
  },
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(connect(mapStateToProps, mapDispatchToProps)(SignUpLocation));
