import React from 'react';
import { Alert, Image, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

import rest from '../../../utils/rest';
import { ViewContainer } from '../../../components/Layout/Layout';
import RoundTab from '../../../components/RoundTab';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import GenderBox from '../../../components/SignUp/GenderBox';
import SignUpEmoji from '../../../components/SignUp/SignUpEmoji';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { emojis } from '../../../../assets/misc/emojis';
import {
  incrementProgress,
  resetProgress,
  updateUserInfos,
} from '../../../state/signup';
import {
  UPDATE_EMOJI,
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_BIRTHYEAR,
  UPDATE_IMAGE,
  ADD_GENDER,
  REMOVE_GENDER,
  UPDATE_VALIDATION_ERROR,
} from '../../../state/signup';

const mapStateToProps = state => ({
  auth: state.auth,
  signup: state.signup,
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
  resetProgressBar: () => dispatch(resetProgress()),
  incProgress: () => dispatch(incrementProgress()),
  updateUserInfos: (credentials, actionType) =>
    dispatch(updateUserInfos(credentials, actionType)),
});

class SignUpView extends React.Component {
  componentWillMount() {
    this.props.resetProgressBar();
  }

  openImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.props.updateUserInfos(result, UPDATE_IMAGE);
    }
  };

  renderStatus() {
    if (this.props.signup.userInfos.validationError) {
      return Alert.alert(
        'Validation Error',
        this.props.signup.userInfos.validationError,
        [
          {
            text: 'OK',
            onPress: () =>
              this.props.updateUserInfos('', UPDATE_VALIDATION_ERROR),
          },
        ],
        { cancelable: false },
      );
    }
    /*if (this.props.auth.error) {
      return Alert.alert(
        'Error',
        this.props.auth.error.message,
        [{text: 'OK', onPress: () => {
          console.log(this.props.auth.error);
          }}],
        {cancelable: false},
      );
    }*/
  }

  signUp() {
    const {
      email,
      password,
      username,
      birthyear,
      genders,
      image,
      emoji,
    } = this.props.signup.userInfos;
    let userData = { email, password, username, birthyear, emoji };
    if (!email || !password || !username || !birthyear) {
      return this.props.updateUserInfos(
        'Please enter all required fields',
        UPDATE_VALIDATION_ERROR,
      );
    }
    let formdata = this.createFormData(userData, image, genders);
    this.props.incProgress();
    this.props.signUp(formdata);
  }

  createFormData(userData, image, genders) {
    let tempFormData = new FormData();

    if (image) {
      tempFormData.append('image', {
        uri: image,
        name: 'image.png',
        type: 'multipart/form-data',
      });
    }

    if (genders) {
      tempFormData.append('genders', JSON.stringify(genders));
    }

    if (userData) {
      for (let key in userData) {
        if (userData[key]) {
          tempFormData.append(key, userData[key]);
        }
      }
    }

    return tempFormData;
  }

  updateGenders(value) {
    if (this.props.signup.userInfos.genders.indexOf(value) > -1) {
      this.props.updateUserInfos(value, REMOVE_GENDER);
    } else {
      this.props.updateUserInfos(value, ADD_GENDER);
    }
  }

  updateEmoji(emoji) {
    this.props.updateUserInfos(
      emoji !== this.props.signup.userInfos.emoji ? emoji : null,
      UPDATE_EMOJI,
    );
  }

  renderEmojis() {
    return emojis.map(emoji => (
      <SignUpEmoji
        updateEmoji={() => this.updateEmoji(emoji)}
        selectedEmoji={this.props.signup.userInfos.emoji}
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

  //Verify the email
  verifyBirthYear() {
    console.log('Test');
  }

  render() {
    this.renderStatus();
    return (
      <KeyboardAwareScrollView
        extraHeight={30}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
      >
        <ViewContainer>
          <HeaderWrapper>
            <ProgressBar steps={this.props.signup.signupProgress} />
            <SignUpTitle>YOUR PROFILE</SignUpTitle>
            <LabelText style={{ marginTop: 21, marginLeft: 30 }}>
              PICK YOUR MOOD
            </LabelText>
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
                    this.props.updateUserInfos(username, UPDATE_USERNAME)}
                  value={this.props.signup.userInfos.username}
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
                    this.props.updateUserInfos(email, UPDATE_EMAIL)}
                  value={this.props.signup.userInfos.email}
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
                  placeholder="PASSWORD*"
                  onChangeText={password =>
                    this.props.updateUserInfos(password, UPDATE_PASSWORD)}
                  value={this.props.signup.userInfos.password}
                />
              </LabelView>
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
                    this.props.updateUserInfos(birthyear, UPDATE_BIRTHYEAR)}
                  onEndEditing={() => this.verifyBirthYear()}
                  value={this.props.signup.userInfos.birthyear}
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
                  updateGenders={() => this.updateGenders(1)}
                  gender="WOMAN"
                />
                <GenderBox
                  updateGenders={() => this.updateGenders(2)}
                  gender="MAN"
                />
              </GenderBoxContainer>
              <GenderBoxContainer style={{ height: 44, marginLeft: '38%' }}>
                <GenderBox
                  updateGenders={() => this.updateGenders(3)}
                  gender="HUMAN"
                />
                <GenderBox
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
              ADD PHOTO
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
                {this.props.signup.userInfos.image !== null &&
                this.props.signup.userInfos.image.uri ? (
                  <Image
                    style={{ width: 93, height: 93 }}
                    source={this.props.signup.userInfos.image}
                  />
                ) : (
                  <PlusSignText>+</PlusSignText>
                )}
              </PhotoBox>
            </ScrollViewPhoto>
            <RoundTabContainer>
              <RoundTab
                titleColor="white"
                tint="#2d4359"
                title="Next"
                style={{ flex: 1 }}
                onPress={() => this.signUp()}
              />
            </RoundTabContainer>
          </SecondLabelWrapper>
        </ViewContainer>
        {this.renderLoadingIndicator()}
      </KeyboardAwareScrollView>
    );
  }
}

const HeaderWrapper = styled.View`
  width: 100%;
  height: 505;
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
  margin-top: 37;
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
