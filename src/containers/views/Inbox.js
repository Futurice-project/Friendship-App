import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import {
  IconImage,
  MessageCard,
  ProfileIconCard,
  MessageContent,
  ViewContainerTop,
} from '../../components/Layout';
import { SenderName, LastMessage } from '../../components/Text';

export class InboxView extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/inbox.png')}
        tintColor={tintColor}
      />
    ),
  };
  render = () => (
    <ViewContainerTop>
      <MessageCard>
        <ProfileIconCard>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'orange',
              borderRadius: 50,
              justifyContent: 'flex-start',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 11,
                color: 'white',
                fontSize: 20,
              }}
            >
              P
            </Text>
          </View>
        </ProfileIconCard>
        <MessageContent>
          <SenderName>Peter</SenderName>
          <LastMessage>Hello there!</LastMessage>
        </MessageContent>
      </MessageCard>
      <MessageCard>
        <ProfileIconCard>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'green',
              borderRadius: 50,
              justifyContent: 'flex-start',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 11,
                color: 'white',
                fontSize: 20,
              }}
            >
              R
            </Text>
          </View>
        </ProfileIconCard>
        <MessageContent>
          <SenderName>Jack</SenderName>
          <LastMessage>What's up!</LastMessage>
        </MessageContent>
      </MessageCard>
    </ViewContainerTop>
  );
}

export default connect(undefined)(InboxView);
