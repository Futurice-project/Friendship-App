import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Image, View, Text, FlatList } from 'react-native';

import { PepperoniLogo, IconButton } from '../../components/Pepperoni';
import { Title, Description, Bold } from '../../components/Text';
import { ViewContainer, Centered } from '../../components/Layout';
//mapStateToProps data from reducer to this props
//mapDispatchToProps data from action this this props
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  openSettings: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
  openPeople: () => dispatch(NavigationActions.navigate({ routeName: 'Tabs' })),
});

export class WelcomeView extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render = () => (
    <ViewContainer>
      <Centered>
        <PepperoniLogo />
        <Title>Hello, world!</Title>
        <IconButton name="perm-identity" onPress={this.props.openPeople} />
        <Description>
          This is a sample view from the
          <Bold>Pepperoni sapp kit</Bold>.
        </Description>
        <IconButton name="settings" onPress={this.props.openSettings} />
      </Centered>
    </ViewContainer>
  );
}

export default connect(undefined, mapDispatchToProps)(WelcomeView);
