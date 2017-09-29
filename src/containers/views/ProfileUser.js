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
import { ViewContainer, Centered, FlexRow } from '../../components/Layout';
import TextRectangle from '../../components/TextRectangle';
import TabProfile from '../../components/TabProfile';

const mapStateToProps = state => {
  return { personId: state.personId };
};

class ProfileUser extends React.Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    data: {},
    personId: this.props.navigation.state.params.personId,
    age: '',
  };

  getAge = () => {
    const birthDay = new Date(this.state.data.birthday);
    const now = new Date();
    let age = now.getFullYear() - birthDay.getFullYear();
    const m = now.getMonth() - birthDay.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDay.getDate())) {
      age--;
    }

    const early = [0, 1, 2, 3];
    const mid = [4, 5, 6];
    const late = [7, 8, 9];
    let ageName = '';
    const lastDigit = age.toString().substr(age.toString().length - 1);
    if (early.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'early ' + (age - parseInt(lastDigit)) + "'s";
    } else if (mid.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'mid ' + (age - parseInt(lastDigit)) + "'s";
    } else if (late.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'late ' + (age - parseInt(lastDigit)) + "'s";
    } else {
      ageName = "It's a mystery";
    }

    this.setState({ age: ageName });
  };

  setAge = () => {};
  componentDidMount() {
    fetch('http://0.0.0.0:3888/users/' + this.state.personId, {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
        this.getAge();
      });
  }

  //const birthYear = '99'//{ ...this.state.data.birthday.getFullYear()};
  //console.log(birthYear);

  render = () => {
    return (
      <ViewContainer style={styles.signUpFinalStepHate}>
        <View style={styles.topPart}>
          <View style={styles.oval}>
            <Text style={styles.emoji}>{this.state.data.emoji}</Text>
          </View>
          <Text style={styles.username}>{this.state.data.username}</Text>
          <Text style={styles.iLoveCampingRapA}>
            {this.state.age}, male, {this.state.data.location}
          </Text>
          <Text style={styles.iLoveCampingRapA}>I love ... and hate...</Text>
          <Text style={styles.lookingFor}>LOOKING FOR</Text>
          <Text style={styles.lookingForText}>
            The events you will actively look friends for will be visible here
          </Text>
        </View>
        <TabProfile />
      </ViewContainer>
    );
  };
}

const styles = StyleSheet.create({
  signUpFinalStepHate: {
    backgroundColor: '#e8e9e8',
    marginTop: 23,
  },
  topPart: {
    alignItems: 'center',
    height: 300,
  },
  botPart: {
    height: 500,
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

export default connect(mapStateToProps)(ProfileUser);
