import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FlexRow } from './Layout/Layout';
import {
  BoldDescription,
  CompatibilityText,
  FrienshipFont,
  LocationText,
  NaahColor,
  YeahColor,
} from './Layout/TextLayout';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  openProfile: (personId, personName) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: { personId, personName },
      }),
    ),
});

class Person extends React.Component {
  state = {
    age: '',
    genders: '',
    locations: '',
    shortUser: '',
  };

  componentDidMount() {
    if (this.props.data.username) {
      this.getGenders();
      this.getAge();
      this.getLocations();
      this.cutNames();
    }
  }

  getGenders = () => {
    const genders = this.props.data.genderlist
      ? this.props.data.genderlist.map(x => x && x.toLowerCase()).join(', ')
      : '';
    this.setState({ genders });
  };

  getAge = () => {
    const birthYear = parseInt(this.props.data.birthyear);
    const now = new Date();
    let age = now.getFullYear() - birthYear;

    let ageName = '';
    const lastDigit = age.toString().substr(age.toString().length - 1);
    if (age && age < 20) {
      ageName = age + ', ';
    } else if (age) {
      ageName = age - parseInt(lastDigit) + 's, ';
    } else {
      ageName = '';
    }
    this.setState({ age: ageName });
  };

  getLocations = () => {
    const locations = this.props.data.locations
      ? this.props.data.locations.join(',')
      : 'Narnia';
    this.setState({ locations });
  };

  cutNames = () => {
    const shortUser =
      this.props.data.username.length > 8
        ? `${this.props.data.username.substring(0, 8)}...`
        : this.props.data.username;
    this.setState({ shortUser });
  };

  renderBox = () => {
    return (
      <TouchableOpacity
        style={styles.mainView}
        onPress={() =>
          this.props.openProfile(this.props.data.id, this.props.data.username)}
      >
        <View style={styles.topPart}>
          <Image
            style={styles.peoplePicture}
            source={{ uri: this.props.data.image }}
          />
          <View
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: 'rgba(96, 104, 109, 0.55)',
              position: 'absolute',
              bottom: 0,
              left: 0,
              justifyContent: 'center',
            }}
          >
            <BoldDescription style={styles.topText}>
              {this.props.data.description}
            </BoldDescription>
            <LocationText style={{ textAlign: 'center', paddingTop: 20 }}>
              {this.state.locations}
            </LocationText>
          </View>
        </View>
        <FlexRow style={styles.bottomPart}>
          <Image
            source={{ uri: this.props.data.avatar }}
            style={styles.whiteCircle}
          />
          <View style={styles.viewBottom}>
            <Text style={styles.textName}>{this.state.shortUser}</Text>
            <Text style={styles.textDetails}>
              {this.state.age}
              {this.state.genders}
            </Text>
            <CompatibilityText style={{ marginBottom: 0, marginTop: 3 }}>
              <YeahColor>
                {this.props.data.lovecommon ? this.props.data.lovecommon : 0}
                <FrienshipFont> YEAH</FrienshipFont>
              </YeahColor>{' '}
              &{' '}
              <NaahColor>
                {this.props.data.hatecommon ? this.props.data.hatecommon : 0}
                <FrienshipFont> NAAH</FrienshipFont>
              </NaahColor>{' '}
            </CompatibilityText>
            <Text
              style={{
                flexWrap: 'wrap',
                fontSize: 12,
                color: '#4a4a4a',
                marginTop: -3,
              }}
            >
              in common
            </Text>
          </View>
        </FlexRow>
      </TouchableOpacity>
    );
  };

  renderLine = () => (
    <FlexRow style={styles.listItem}>
      <View>
        <Image
          source={{ uri: this.props.data.avatar }}
          style={styles.listEmoji}
        />
      </View>

      <TouchableOpacity
        style={styles.nameView}
        onPress={() => this.props.openProfile(this.props.data.userId)}
      >
        <Text style={styles.listName}>{this.props.data.username}</Text>
      </TouchableOpacity>
    </FlexRow>
  );

  render = () => (this.props.box ? this.renderBox() : this.renderLine());
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'column',
  },
  peoplePicture: {
    flex: 1,
  },
  viewBottom: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
  },
  flexRow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textName: {
    color: '#60686D',
    fontFamily: 'NunitoSans-Bold',
    fontSize: 24,
  },
  textDetails: {
    color: '#60686D',
    fontSize: 12,
  },
  topPart: {
    flex: 8,
    justifyContent: 'flex-end',
    width: 260,
    marginLeft: 20,
    backgroundColor: 'transparent',
    borderRadius: 3,
  },
  topText: {
    color: 'white',
    maxHeight: 140,
    marginTop: 23,
    marginHorizontal: 20,
  },

  bottomPart: {
    width: 260,
    padding: 10,
    marginLeft: 20,
    paddingVertical: 13,
    backgroundColor: '#f1f1f3',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    //borderWidth: 2,
    //borderStyle: 'dashed',
    //borderColor: 'red'
  },
  whiteCircle: {
    width: 66,
    height: 66,
    marginRight: 10,
    marginLeft: 10,
  },
  avatar: {
    backgroundColor: 'transparent',
    marginTop: 7,
    fontSize: Platform.OS === 'android' ? 35 : 45,
  },
  listItem: {
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    margin: 0,
    height: 70,
    backgroundColor: '#efebe9',
    width: Dimensions.get('window').width - 50,
    marginBottom: 5,
  },
  listName: {
    justifyContent: 'flex-start',
    fontSize: 20,
    fontWeight: '400',
  },
  listEmoji: {
    margin: 5,
    marginHorizontal: 10,
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
