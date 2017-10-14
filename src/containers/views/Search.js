import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import {
  ViewContainerTop,
  Centered,
  FlexRow,
  FullscreenCentered,
} from '../../components/Layout';
import Person from '../../components/Person';

const mapStateToProps = state => {
  return { tagId: state.tagId };
};

class SearchList extends React.Component {
  static navigationOptions = {
    title: 'Search for users with tag ',
  };

  state = { data: {}, tagId: this.props.navigation.state.params.tagId };

  keyExtractor = item => item.userId;
  renderItem = ({ item }) => <Person data={item} />;

  componentDidMount() {
    fetch('http://0.0.0.0:3888/tag_user/tag/' + this.state.tagId, {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render = () => (
    <ViewContainerTop>
      <FullscreenCentered>
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {/* {this.renderSpinner()} */}
      </FullscreenCentered>
    </ViewContainerTop>
  );
}

export default connect(mapStateToProps)(SearchList);
