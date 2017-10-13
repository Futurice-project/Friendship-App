import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  Image,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { PepperoniLogo, IconButton } from '../../components/Pepperoni';
import { Title, Description, Bold } from '../../components/Text';
import {
  ViewContainer,
  Centered,
  FlexRow,
  IconImage,
} from '../../components/Layout';
import Emoji from '../../components/Emojis';
import TabProfile from '../../components/TabProfile';

//import { IconImage } from '../../components/Layout';

export class EmojiPickerView extends React.Component {
  static navigationOptions = {
    title: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/search0.png')}
        tintColor={tintColor}
      />
    ),
  };

  state = {
    data: {},
  };

  renderItem = ({ item }) => <Emoji data={item} />;

  componentDidMount() {}

  render = () => (
    <ViewContainer>
      <Title> Emoji Picker </Title>

      <Centered>
        <FlatList
          data={[
            { key: 'burger' },
            { key: 'cookies' },
            { key: 'eart' },
            { key: 'ghost' },
            { key: 'happy' },
            { key: 'lion' },
            { key: 'panda' },
            { key: 'pizza' },
            { key: 'star' },
            { key: 'tree' },
          ]}
          renderItem={this.renderItem}
          horizontal
        />
      </Centered>
    </ViewContainer>
  );
}

export default connect(undefined)(EmojiPickerView);
