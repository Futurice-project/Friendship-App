import React from 'react';
import {
  Alert,
  Image,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

import rest from '../../utils/rest';
import { ViewContainer } from '../Layout/Layout';
import RoundTab from '../RoundTab';
import ProgressBar from '../SignUp/ProgressBar';
import GenderBox from '../SignUp/GenderBox';
import SignUpEmoji from '../SignUp/SignUpEmoji';
import LoadingIndicator from '../LoadingIndicator';
import { emojis } from '../../../assets/misc/emojis';
import { YOUR_PROFILE } from '../SignUp/Constants';
import Modal from 'react-native-modal';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signUp: formData => {
    dispatch(
      rest.actions.register(
        {},
        { body: formData, headers: { 'Content-Type': 'multipart/form-data' } },
      ),
    );
  },
});

class EditForm extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    birthyear: '',
    genderArr: '',
    loading: false,
    error: false,
    validationError: '',
    exsitingGenders: '',
    image: '',
    isModalVisible: false,
  };
  componentDidMount() {
    console.log(this.props.userData);
    if (this.props.userData) {
      this.setState({
        email: this.props.userData.email,
        username: this.props.userData.username,
        birthyear: this.props.userData.birthyear.toString(),
        genderArr: this.getGendersById(this.props.userData.genderlist),
        emoji: this.props.userData.emoji,
      });
    }
  }

  renderImage(Image) {
    if (Image) {
      return `uri: 'data:image/png;base64,' + ${Image}`;
    }
    return;
  }
  //const srcImage = this.props.currentUser.data.image
  //? { uri: 'data:image/png;base64,' + this.props.currentUser.data.image }
  //: require('../../../assets/img/placeholder/grone.jpg');
  getGendersById(exsitingGenders) {
    let genderArry = [];
    exsitingGenders.forEach(gender => {
      if (gender === 'WOMAN') {
        genderArry.push(1);
      } else if (gender === 'MAN') {
        genderArry.push(2);
      } else if (gender === 'HUMAN') {
        genderArry.push(3);
      } else {
        genderArry.push(4);
      }
    });
    return genderArry;
  }

  componentWillReceiveProps() {
    this.setState({ error: true });
  }

  openImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, error: false });
      console.log('changing phoneo1');
    }
  };

  renderStatus() {
    if (this.state.validationError) {
      return Alert.alert(
        'Validation Error',
        this.state.validationError,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false },
      );
    }
    if (this.state.error && this.props.auth.error) {
      return Alert.alert(
        'Error',
        this.props.auth.error.message,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false },
      );
    }
  }

  updateProfile = (id, formData) => {
    fetch(`http://localhost:3888/users/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: this.props.auth.data.token,
      },
      body: formData,
    })
      .then(() => this.props.closeEditForm())
      .then(() => this.props.onRefresh())
      .catch(() => this.setState({ isModalVisible: true }));
  };

  onSubmit() {
    const {
      email,
      password,
      username,
      birthyear,
      genderArr,
      image,
      emoji,
    } = this.state;
    let userData = { email, password, birthyear, username, emoji };

    if (!email || !username || !birthyear) {
      return this.setState({
        validationError: 'Please enter all required fields',
      });
    }
    let formdata = this.createFormData(userData, image, genderArr);
    this.updateProfile(this.props.userData.id, formdata);
  }

  createFormData(userData, image, genderArr) {
    let tempFormData = new FormData();

    if (image) {
      tempFormData.append('image', {
        uri: image,
        name: 'image.png',
        type: 'multipart/form-data',
      });
    }

    if (genderArr) {
      tempFormData.append('genderArr', JSON.stringify(genderArr));
    }

    if (userData) {
      for (var key in userData) {
        if (userData[key]) {
          tempFormData.append(key, userData[key]);
        }
      }
    }
    console.log(tempFormData);
    return tempFormData;
  }

  selectEmoji(emoji) {
    this.setState({ emoji });
  }

  updateGenders(value) {
    if (this.state.genderArr.indexOf(value) > -1) {
      const genders = this.state.genderArr.slice();
      genders.splice(this.state.genderArr.indexOf(value), 1);
      return this.setState({ genderArr: genders, error: false });
    }
    return this.setState({
      genderArr: [...this.state.genderArr, value],
      error: false,
    });
  }

  updateEmoji(emoji) {
    if (emoji === this.state.emoji) {
      return this.setState({ emoji: '', error: false });
    }
    return this.setState({ emoji, error: false });
  }

  renderEmojis() {
    return emojis.map(emoji => (
      <SignUpEmoji
        updateEmoji={() => this.updateEmoji(emoji)}
        selectedEmoji={this.state.emoji}
        key={emoji}
        emoji={emoji}
      />
    ));
  }

  renderLoadingIndicator() {
    if (this.props.auth.loading) {
      return <LoadingIndicator />;
    }
  }

  render() {
    const srcImage = require('../../../assets/img/placeholder/grone.jpg');
    this.renderStatus();
    const image =
      this.props.userData.image && !this.state.image
        ? { uri: 'data:image/png;base64,' + this.props.userData.image }
        : { uri: this.state.image };
    return (
      <KeyboardAwareScrollView
        extraHeight={30}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
      >
        <ViewContainer>
          <HeaderWrapper>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <TouchableOpacity onPress={() => this.props.closeEditForm()}>
                <Text style={styles.headerText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onSubmit()}>
                <Text style={styles.headerText}>SAVE</Text>
              </TouchableOpacity>
            </View>
            <SignUpTitle>EDIT PROFILE</SignUpTitle>
            <LabelText style={{ marginTop: 21, marginLeft: 30 }}>
              PICK YOUR MOOD
            </LabelText>
            {/* change to FlatList later on to render form database? */}
            <ScrollViewPhoto
              contentContainerStyle={styles.scrollViewMoodContainer}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{ height: 70, marginTop: 22 }}
            >
              {this.renderEmojis()}
            </ScrollViewPhoto>
            <LabelContainer>
              <LabelView>
                <TextInput
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#4a4a4a"
                  placeholder="(NICK)NAME*"
                  onChangeText={username =>
                    this.setState({
                      username,
                      validationError: '',
                      error: false,
                    })}
                  value={this.state.username}
                  onSubmitEditing={() => {
                    this._emailInput.focus();
                  }}
                />
              </LabelView>
              <View style={{ width: 278 }}>
                <LabelTextHelper>(visible)</LabelTextHelper>
              </View>
            </LabelContainer>
            <LabelContainer>
              <LabelView>
                <TextInput
                  autoCorrect={false}
                  ref={component => (this._emailInput = component)}
                  onSubmitEditing={() => {
                    this._passwordInput.focus();
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#4a4a4a"
                  placeholder="EMAIL*"
                  onChangeText={email =>
                    this.setState({ email, validationError: '', error: false })}
                  value={this.state.email}
                />
              </LabelView>
              <View style={{ width: 278 }}>
                <LabelTextHelper>(private)</LabelTextHelper>
              </View>
            </LabelContainer>
            <LabelContainer style={{ height: 55, marginBottom: 18 }}>
              <LabelView>
                <TextInput
                  autoCorrect={false}
                  ref={component => (this._passwordInput = component)}
                  onSubmitEditing={() => {
                    this._birthYear.focus();
                  }}
                  blurOnSubmit={true}
                  returnKeyType="next"
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#4a4a4a"
                  placeholder="PASSWORD"
                  onChangeText={password =>
                    this.setState({
                      password,
                      validationError: '',
                      error: false,
                    })}
                  value={this.state.password}
                />
              </LabelView>
              <View style={{ width: 278 }}>
                <LabelTextHelper>
                  (Leave it blank if not changing)
                </LabelTextHelper>
              </View>
            </LabelContainer>
          </HeaderWrapper>
          <FirstLabelWrapper>
            <LabelContainer style={{ marginTop: 19 }}>
              <LabelView>
                <TextInput
                  autoCorrect={false}
                  ref={component => (this._birthYear = component)}
                  underlineColorAndroid="transparent"
                  keyboardType="numeric"
                  placeholderTextColor="#4a4a4a"
                  blurOnSubmit={true}
                  returnKeyType="next"
                  placeholder="BIRTH YEAR*"
                  onChangeText={birthyear =>
                    this.setState({
                      birthyear,
                      validationError: '',
                      error: false,
                    })}
                  value={this.state.birthyear}
                />
              </LabelView>
              <View style={{ width: 278 }}>
                <LabelTextHelper>
                  (This will be displayed as age range)
                </LabelTextHelper>
              </View>
            </LabelContainer>
            <LabelContainer>
              <View style={{ width: 278 }}>
                <TextInput
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#4a4a4a"
                  placeholder="GENDER*"
                  value=""
                  editable={false}
                />
              </View>
              <View style={{ width: 278 }}>
                <LabelTextHelper>(visible)</LabelTextHelper>
              </View>
              <GenderBoxContainer style={{ height: 44 }}>
                <GenderBox
                  updateGenderById={value => this.updateGenders(value)}
                  exsitingGenders={this.props.userData.genderlist}
                  updateGenders={() => this.updateGenders(1)}
                  gender="WOMAN"
                />
                <GenderBox
                  updateGenderById={value => this.updateGenders(value)}
                  exsitingGenders={this.props.userData.genderlist}
                  updateGenders={() => this.updateGenders(2)}
                  gender="MAN"
                />
              </GenderBoxContainer>
              <GenderBoxContainer style={{ height: 44, marginLeft: '38%' }}>
                <GenderBox
                  updateGenderById={value => this.updateGenders(value)}
                  exsitingGenders={this.props.userData.genderlist}
                  updateGenders={() => this.updateGenders(3)}
                  gender="HUMAN"
                />
                <GenderBox
                  updateGenderById={value => this.updateGenders(value)}
                  exsitingGenders={this.props.userData.genderlist}
                  updateGenders={() => this.updateGenders(4)}
                  gender="OTHER"
                />
              </GenderBoxContainer>
            </LabelContainer>
          </FirstLabelWrapper>

          <SecondLabelWrapper>
            <LabelText
              style={{
                marginLeft: 30,
                color: '#4a4a4a',
                fontSize: 15,
                fontFamily: 'NunitoSans-SemiBold',
              }}
            >
              CHANGE PHOTO
            </LabelText>
            <View style={{ width: 278, marginLeft: 30 }}>
              <LabelTextHelper>
                This can be a photo of anything you like
              </LabelTextHelper>
            </View>
            <ScrollViewPhoto
              contentContainerStyle={styles.scrollViewPhotoContainer}
              horizontal
            >
              <PhotoBox onPress={this.openImageGallery}>
                {image.uri ? (
                  <Image style={{ width: 93, height: 93 }} source={image} />
                ) : (
                  <Image style={{ width: 93, height: 93 }} source={srcImage} />
                )}
              </PhotoBox>
            </ScrollViewPhoto>
            <RoundTabContainer>
              <RoundTab
                titleColor="white"
                tint="#2d4359"
                title="Submit"
                style={{ flex: 1 }}
                onPress={() => this.onSubmit()}
              />
            </RoundTabContainer>
          </SecondLabelWrapper>
        </ViewContainer>
        {this.renderLoadingIndicator()}
        <Modal
          transparent
          animationType="slide"
          isVisible={this.state.isModalVisible}
        >
          <View
            style={{
              height: 150,
              borderRadius: 5,
              backgroundColor: '#F1F1F3',
              padding: 20,
              paddingLeft: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                paddingBottom: 15,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.8,
              }}
            >
              Profile edit fail!
            </Text>
            <Text
              style={{ textAlign: 'center', fontSize: 16, color: '#60686d' }}
            >
              Check your input or network connection!
            </Text>
            <TouchableOpacity
              title="OK"
              style={{
                alignItems: 'center',
                backgroundColor: '#ed5249',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#14B28B',
                padding: 10,
              }}
              onPress={() => this.setState({ isModalVisible: false })}
            >
              <Text
                style={{
                  color: '#F9F1EF',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}

const HeaderWrapper = styled.View`
  width: 100%;
  height: 550;
  display: flex;
  flex-direction: column;
  background-color: #e8e9e8;
`;

const FirstLabelWrapper = styled.View`
  width: 100%;
  height: 306;
  display: flex;
  flex-direction: column;
  background-color: #f9f7f6;
  padding-bottom: 16;
`;

const SecondLabelWrapper = styled.View`
  padding-top: 29;
  width: 100%;
  height: 276;
  flex-direction: column;
  background-color: #e8e9e8;
`;

const SignUpTitle = styled.Text`
  width: 320;
  height: 45;
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 45;
  text-align: justify;
  color: #839297;
  margin-left: 30;
  margin-right: 10;
`;

const LabelView = styled.View`
  width: 278;
  border-bottom-width: 2;
  border-bottom-color: #979797;
`;

const LabelText = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 18;
  color: #4a4a4a;
  text-align: left;
`;

const LabelTextHelper = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 14;
  color: #9b9b9b;
`;

const PlusSignText = styled.Text`
  padding: 0;
  font-size: 50;
  font-weight: 400;
  color: #60686d;
  text-align: center;
`;

const PhotoBox = styled.TouchableOpacity`
  width: 93;
  height: 93;
  background-color: #e8e9e8;
  margin-right: 15;
  border-width: 1;
  border-color: #839297;
  justify-content: center;
`;

const ScrollViewPhoto = styled.ScrollView`margin-top: 11;`;

const LabelContainer = styled.View`
  height: 77;
  align-items: center;
  width: 100%;
  margin-top: 10;
`;

const GenderBoxContainer = styled.View`
  height: 44;
  width: 100%;
  margin-left: 26%;
  flex-direction: row;
  margin-top: 12;
`;

const RoundTabContainer = styled.View`margin-top: auto;`;

const styles = {
  headerText: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 20,
    color: '#ff8a65',
  },
  buttonTextStyle: {
    width: 230,
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
    color: 'white',
  },
  statusTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f7',
    marginBottom: 10,
  },
  textStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f9f7f6',
    marginBottom: 10,
  },
  scrollViewPhotoContainer: {
    justifyContent: 'space-around',
    height: 93,
    paddingLeft: 30,
  },
  scrollViewMoodContainer: {
    justifyContent: 'space-around',
    height: 70,
    paddingRight: 23,
    paddingLeft: 23,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
