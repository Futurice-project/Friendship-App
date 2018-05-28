import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Header from './Header';
// ## View Imports ##
import ChatView from '../views/Chat/ChatView';
import ChatRequest from '../views/Chat/ChatRequest';
import InboxView from '../views/Chat/ChatInbox';
import HeaderContainer from '../HeaderContainer';
import { Image, Text, View } from 'react-native';

const StackNavigatorConfig = {
  navigationOptions: {
    header: props => <Header {...props} />,
    headerStyle: {
      backgroundColor: '#e8e9e8',
      elevation: 0, // disable header elevation when TabNavigator visible
    },
    headerTintColor: '#ff8a65',
  },
};

export default StackNavigator(
  {
    InboxView: {
      screen: InboxView,
      navigationOptions: { header: () => null },
    },
    ChatView: {
      screen: ChatView,
      navigationOptions: {
        tabBarVisible: false,
        header: props => (
          <HeaderContainer
            titleComponent={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{
                    uri:
                      props.navigation.state.routes[
                        props.navigation.state.index
                      ].params.userEmoji,
                  }}
                  style={{ width: 35, height: 35, marginRight: 5 }}
                />
                <Text
                  style={{ fontFamily: 'NunitoSans-Regular', fontSize: 15 }}
                >
                  {
                    props.navigation.state.routes[props.navigation.state.index]
                      .params.username
                  }
                </Text>
              </View>
            }
            left="back"
            color="light"
            {...props}
          />
        ),
      },
    },
    ChatRequest: {
      screen: ChatRequest,
      navigationOptions: {
        header: () => null,
        tabBarVisible: false,
      },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
