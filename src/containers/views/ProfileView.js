import React from 'react';
import { Image, View, Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Title } from '../../components/Text';
import { ViewContainer, Centered } from '../../components/Layout';

const mapStateToProps = state => {
  return { personId: state.personId };
};

class ProfileView extends React.Component {
  static navigationOptions = {
    title: '',
  };

  state = { data: {}, personId: this.props.navigation.state.params.personId };

  componentDidMount() {
    fetch('http://0.0.0.0:3888/users/' + this.state.personId, {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render = () => (
    <ViewContainer style={signUpFinalStepHate}>
      <Centered>
        <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 30,
            paddingTop: 8,
          }}
        >
          {this.state.data.emoji}
        </Text>
        <Title>{this.state.data.username}</Title>
        <Text>age, gender, location data</Text>
        <Text>Compatible? {this.state.data.compatibility}</Text>
        <Text>I love ... and hate...</Text>
        <Text>LOOKING FOR</Text>
      </Centered>
    </ViewContainer>
  );
}

const signUpFinalStepHate = {
  backgroundColor: '#ededed',
};

export default connect(mapStateToProps)(ProfileView);
