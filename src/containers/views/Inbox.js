import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { IconImage } from '../../components/Layout';
import InboxCard from '../../components/InboxCard';

export class InboxView extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
    header: {
      visible: false,
    },
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/inbox.png')}
        tintColor={tintColor}
      />
    ),
  };

  render() {
    return (
      <View>
        <InboxCard name={'Peter'} message={'Hello There!'} color={'orange'} />
        <InboxCard name={'John'} message={'Whats up'} color={'green'} />
      </View>
    );
  }
}

export default connect(undefined)(InboxView);
