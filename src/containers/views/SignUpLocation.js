import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import { SignUpViewWrapper, SignUpWrapper } from '../../components/Layout';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import RoundTab from '../../components/RoundTab';
import { NavigationActions } from 'react-navigation';
import MultiSelect from '../../utils/react-native-multiple-select/lib/react-native-multi-select';

const SignUpDivWrapper = styled.View`
  display: flex;
  background-color: #efebe9;
  width: 100%;
`;

/* Wrapper for the text */
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
`;

export class SignUpLocation extends React.Component {
  componentWillMount() {
    this.props.getLocations();
  }

  state = {
    selectedItems: [],
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <SignUpWrapper>
        <SignUpDivWrapper
          style={{
            paddingTop: 60,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: 'transparent',
            flex: 2,
          }}
        >
          <SignUpTitle>HEY!</SignUpTitle>
          <SignUpWelcomeText>
            With this information, we will find the people closest to you.
          </SignUpWelcomeText>
        </SignUpDivWrapper>

        <SignUpDivWrapper
          style={{ flex: 8, justifyContent: 'center', marginTop: 50 }}
        >
          <MultiSelect
            style={{ borderRadius: 27, backgroundColor: '#faf5f0' }}
            hideTags
            items={this.props.locations.data.data}
            uniqueKey="id"
            ref={component => {
              multiSelect = component;
            }}
            hideSubmitButton={true}
            fixedHeight={true}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="REGION*"
            searchInputPlaceholderText="Search municipalities..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#fff"
            selectedItemTextColor="#ff8a65"
            selectedItemIconColor="#ff8a65"
            itemTextColor="#000"
            searchInputStyle={{ color: '#000' }}
            title="YOUR LOCATION"
          />
        </SignUpDivWrapper>
        <RoundTab
          title="NEXT"
          onPress={() => {
            this.props.postUserLocations(this.state.selectedItems);
            this.props.openSignUpPersonality();
          }}
        />
      </SignUpWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLocations: () => {
    dispatch(rest.actions.locations());
  },
  postUserLocations: locations => {
    newLocations = locations.map(location => ({ locationId: location }));
    const locationsObject = {
      locations: newLocations,
    };
    dispatch(
      rest.actions.createUserLocations(
        {},
        { body: JSON.stringify(locationsObject) },
      ),
    );
  },
  openSignUpPersonality: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpPersonality',
      }),
    ),
});
const mapStateToProps = state => ({
  locations: state.locations,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLocation);
