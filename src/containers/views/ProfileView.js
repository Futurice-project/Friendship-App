import React from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

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
    <View style={styles.signUpFinalStepHate}>
      <View style={styles.topPart}>
        <View style={styles.oval}>
          <Text style={styles.emoji}>{this.state.data.emoji}</Text>
        </View>
        <Text style={styles.username}>{this.state.data.username}</Text>
        <Text style={styles.iLoveCampingRapA}>25, male, Helsinki</Text>
        <Text style={styles.iLoveCampingRapA}>I love ... and hate...</Text>
        <Text style={styles.lookingFor}>LOOKING FOR</Text>
        <Text style={styles.lookingForText}>
          The events you will actively look friends for will be visible here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpFinalStepHate: {
    backgroundColor: '#e8e9e8',
    marginTop: 23,
  },
  topPart: {
    height: 300,
    alignItems: 'center',
  },
  oval: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: '#ffffff',
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: 8,
  },
  username: {
    width: 223,
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2.44,
    textAlign: 'center',
    color: '#60686d',
    marginTop: 7,
  },
  iLoveCampingRapA: {
    width: 300,
    height: 24,
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    textAlign: 'center',
    color: '#4a4a4a',
    marginBottom: 14,
  },
  lookingFor: {
    height: 18,
    fontSize: 13,
    letterSpacing: 1.59,
    textAlign: 'center',
    color: '#3b3b3d',
    marginBottom: 14,
  },
  lookingForText: {
    width: 300,
    height: 72,
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    textAlign: 'left',
    color: '#4a4a4a',
  },
});

export default connect(mapStateToProps)(ProfileView);
