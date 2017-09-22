import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { IconButton } from '../../components/Pepperoni';
import { Bold, Description, Title } from '../../components/Text';
import { Centered } from '../../components/Layout';
import styled from 'styled-components/native';
import LaunchingPageLogoAsset from '../../../assets/drawable-mdpi/friendship_logo_light.png';
import { Font } from 'expo';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  openSettings: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
  openSignUp: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
  openLogIn: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
  openPreview: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
});

const WelcomePageWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    minHeight: '100%',
    justifyContent: 'center',
  },
})`
  background-color: #2a343c;
`;

const LaunchingPageLogo = styled.Image.attrs({
  source: LaunchingPageLogoAsset,
  resizeMode: 'contain',
})`
  margin: 49px;
  align-self: center;
  width: 261px;
  height: 157px;
`;

const LaunchingPageMessage = styled.Text`
  width: 149px;
  height: 45px;
  font-family: 'Friendship_version_2';
  font-size: 25;
  line-height: 45;
  text-align: center;
  color: #faf6f0;
`;

export class WelcomeView extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: () => null,
  };

  render = () => (
    <WelcomePageWrapper>
      <Centered>
        <LaunchingPageLogo />
        <LaunchingPageMessage>Test</LaunchingPageMessage>
        <Title>Hello, world!</Title>
        <Description>
          This is a sample view from the <Bold>Pepperoni app kit</Bold>.
        </Description>
        <IconButton name="settings" onPress={this.props.openSettings} />
      </Centered>
    </WelcomePageWrapper>
  );
}

export default connect(undefined, mapDispatchToProps)(WelcomeView);
