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
        ? this.props.data.username.substring(0, 8)
        : this.props.data.username;
    this.setState({ shortUser });
  };
  renderBox = () => {
    const srcImage = this.props.data.image
      ? {
          uri: 'data:image/png;base64,' + this.props.currentUser.data.image,
        }
      : require('../../assets/img/placeholder/grone.jpg');
    return (
      <TouchableOpacity
        style={styles.nameView}
        onPress={() =>
          this.props.openProfile(this.props.data.id, this.props.data.username)}
      >
        <Image style={styles.topPart} source={srcImage} />
        <View
          style={{
            flex: 70,
            backgroundColor: 'rgba(96, 104, 109, 0.55)',
            width: 220,
            height: 220,
            marginLeft: 20,
            position: 'absolute',
            top: 110,
          }}
        >
          <BoldDescription style={styles.topText}>
            {this.props.data.description}
          </BoldDescription>
          <LocationText style={{ textAlign: 'center', paddingTop: 20 }}>
            {this.state.locations}
          </LocationText>
        </View>
        <FlexRow style={styles.bottomPart}>
          {/* with flex:1 long username don't go exceed the bottom part  */}

          <View style={styles.flexRow}>
            <View style={styles.whiteCircle}>
              <Text style={styles.emoji}>{this.props.data.emoji}</Text>
            </View>
            <View style={styles.viewBottom}>
              <Text style={styles.textName}>{this.state.shortUser}</Text>
              <Text style={styles.textDetails}>
                {this.state.age}
                {this.state.genders}
              </Text>
              <CompatibilityText style={{ marginBottom: 0, marginTop: 3 }}>
                <YeahColor>
                  {this.props.data.loveCommon ? this.props.data.loveCommon : 0}
                  <FrienshipFont> YEAH</FrienshipFont>
                </YeahColor>{' '}
                &{' '}
                <NaahColor>
                  {this.props.data.hateCommon ? this.props.data.hateCommon : 0}
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
          </View>
        </FlexRow>
      </TouchableOpacity>
    );
  };

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
  renderLine = () => (
    <FlexRow style={styles.listItem}>
      <View>
        <Text style={styles.listEmoji}>{this.props.data.emoji}</Text>
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
  viewBottom: {
    justifyContent: 'flex-start',
    width: 121,
    flexDirection: 'column',
  },
  flexRow: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },

  textName: {
    color: '#60686D',
    fontFamily: 'NunitoSans-Bold',
    fontSize: 25,
  },
  textDetails: {
    color: '#60686D',
    fontSize: 12,
  },
  topPart: {
    height: 333,
    width: 220,
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
    width: 220,
    padding: 10,
    paddingVertical: 13,
    backgroundColor: '#f1f1f3',
    flex: 26,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  whiteCircle: {
    width: 66,
    height: 66,
    borderRadius: 132 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  emoji: {
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
    backgroundColor: 'transparent',
    margin: 5,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 35 : 45,
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
