import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import LaunchingPageLogoAsset from '../../../assets/drawable-mdpi/friendship_logo_light.png';
import PreviewLogoAsset from '../../../assets/drawable-mdpi/icon_preview.png';
import Button from '../../components/Button';
import RoundTab from '../../components/RoundTab';
import { StyleSheet } from 'react-native';

const mapStateToProps = state => ({
  auth: state.auth,
  navigatorState: state.navigatorState,
});

const mapDispatchToProps = dispatch => ({
  openSettings: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Tabs',
      }),
    ),

  openSignUp: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUp',
      }),
    ),
  openTabs: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Tabs',
      }),
    ),
  openSignIn: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignIn',
      }),
    ),
  openPreview: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Preview',
      }),
    ),
});

/* Container for the page */
const LaunchingPageWrapper = styled.View`
  flex: 1;
  background-color: #2a343c;
`;

/* Container for the launching message of the app */
const LaunchingMessage = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

/* Container for the different navigation options */
const LaunchingNavigationOptions = styled.View`
  flex: 1;
  margin-top: 23px;
`;

/* Container for the option to continue without authenticating */
const Preview = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

/* Container with connection options : Log In (account already exists) or Sign up (first time) */
const Connection = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #ff8a65;
`;

/* Container for each options */
const ConnectionOption = styled.View`
  flex: 1;
  align-items: center;
`;

/* Component for the app logo */
const LaunchingPageLogo = styled.Image.attrs({
  source: LaunchingPageLogoAsset,
  resizeMode: 'contain',
})`
  margin: 49px 49px -15px 49px;
  width: 261px;
  height: 157px;
`;

/* Wrapper for the launching message */
const LaunchingPageMessage = styled.Text`
  width: 160px;
  height: 45px;
  font-family: 'Friendship_version_2';
  font-size: 25;
  line-height: 45;
  text-align: center;
  color: #faf6f0;
`;

/* Component for the preview logo */
const PreviewLogo = styled.Image.attrs({
  source: PreviewLogoAsset,
  resizeMode: 'contain',
  alignSelf: 'center',
})`
  width: 50px;
  height: 24.6px;
`;

/* Style for Preview text */
const styles = StyleSheet.create({
  preview: {
    width: 109,
    height: 44,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2.0,
    textAlign: 'center',
    color: '#faf6f0',
    backgroundColor: 'transparent',
  },
});

/** Styled View for the launching page
 *  This view contains the different options a user can choose to navigate in the app.
 *  Depending on the user's choice, the app will go to either the navigationScreen, 
 *  the LoginScreen or the SignupScreen
 */
export class WelcomeView extends React.Component {
  componentDidMount() {
    if (this.props.auth && this.props.auth.data.decoded) {
      this.props.openTabs();
    }
  }

  render = () => (
    <LaunchingPageWrapper>
      <LaunchingMessage>
        <LaunchingPageLogo />
        <LaunchingPageMessage> YEAH! & NAAAH</LaunchingPageMessage>
      </LaunchingMessage>

      <LaunchingNavigationOptions>
        <RoundTab title="Preview" onPress={this.props.openSettings}>
          <PreviewLogo />
        </RoundTab>
        <Connection>
          <ConnectionOption>
            <Button
              title="Join"
              primary
              border
              textColor="green"
              size="half"
              color="light"
              onPress={this.props.openSignUp}
            />
          </ConnectionOption>
          <ConnectionOption>
            <Button
              title="Log In"
              border
              textColor="white"
              color="light"
              size="half"
              onPress={this.props.openSignIn}
            />
          </ConnectionOption>
        </Connection>
      </LaunchingNavigationOptions>
    </LaunchingPageWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView);
