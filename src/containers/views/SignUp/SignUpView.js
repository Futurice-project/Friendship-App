import React from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { NavigationActions } from 'react-navigation';
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

import { Alert, Image, View } from 'react-native';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signUp: (userData, genders, imageUri) => {
    let formdata = new FormData();
    if (imageUri) {
      formdata.append('image', {
        uri: imageUri,
        name: 'image.png',
        type: 'multipart/form-data',
      });
    }
    if (genders) {
      formdata.append('genders', JSON.stringify(genders));
    }

    if (userData) {
      for (var key in userData) {
        if (userData[key]) formdata.append(key, userData[key]);
      }
    }

    dispatch(
      rest.actions.register(
        {},
        {
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        (err, data) => {
          if (!err) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'SignUpLocation',
              }),
            );
          } else {
            console.log('Error ', err);
            console.log('Data: ', data);
          }
        },
      ),
    );
  },
  openSignUpLocation: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpLocation',
      }),
    ),
  openWelcomeScreen: () =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
      }),
    ),
});

class SignUpView extends React.Component {
  componentWillMount() {
    // if (this.props.auth.data.decoded) {
    //   this.props.openSignUpLocation();
    // }
  }

  componentWillReceiveProps() {
    this.setState({ error: true });
  }

  static navigationOptions = {
    title: 'Sign up',
    header: () => null,
  };

  state = {
    email: '',
    password: '',
    username: '',
    birthyear: '',
    genders: '',
    loading: false,
    error: false,
    validationError: '',
  };

  openImageGallery = async () => {
    let { image } = this.state;
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, error: false });
      // later
      // this.props.saveImage(this.state.image);
    }
  };

  renderStatus() {
    if (this.state.validationError) {
      return Alert.alert(
        'Validation Error',
        this.state.validationError,
        [{ text: 'OK', onPress: () => console.log('OK') }],
        { cancelable: false },
      );
    }
    if (this.state.error && this.props.auth.error) {
      return Alert.alert(
        'Error',
        this.props.auth.error.message,
        [{ text: 'OK', onPress: () => console.log('OK') }],
        { cancelable: false },
      );
    }
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
    } = this.state;
    if (!email || !password || !username || !birthyear) {
      return this.setState({
        validationError: 'Please enter all required fields',
      });
    }
    this.props.signUp(
      { email, password, username, birthyear, emoji },
      genders,
      image,
    );
  }

  selectEmoji(emoji) {
    this.setState({ emoji });
  }

  updateGenders(value) {
    if (this.state.genders.indexOf(value) > -1) {
      const genders = this.state.genders.slice();
      genders.splice(this.state.genders.indexOf(value), 1);
      return this.setState({ genders, error: false });
    }
    return this.setState({
      genders: [...this.state.genders, value],
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
    this.renderStatus();
    const image = { uri: this.state.image };
    return (
      <KeyboardAwareScrollView
        extraHeight={250}
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
      >
        <ViewContainer>
          <HeaderWrapper>
            <ProgressBar color="#d8d8d8" steps="1" />
            <SignUpTitle>YOUR PROFILE</SignUpTitle>
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
                <LabelTextInput
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  blurOnSubmit={true}
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
                />
              </LabelView>
              <View style={{ width: 278 }}>
                <LabelTextHelper>(visible)</LabelTextHelper>
              </View>
            </LabelContainer>
            <LabelContainer>
              <LabelView>
                <LabelTextInput
                  autoCorrect={false}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  blurOnSubmit={true}
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
                <LabelTextInput
                  autoCorrect={false}
                  returnKeyType="next"
                  secureTextEntry
                  blurOnSubmit={true}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#4a4a4a"
                  placeholder="PASSWORD*"
                  onChangeText={password =>
                    this.setState({
                      password,
                      validationError: '',
                      error: false,
                    })}
                  value={this.state.password}
                />
              </LabelView>
            </LabelContainer>
          </HeaderWrapper>
          <FirstLabelWrapper>
            <LabelContainer style={{ marginTop: 19 }}>
              <LabelView>
                <LabelTextInput
                  autoCorrect={false}
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
                <LabelTextInput
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
                {image.uri ? (
                  <Image style={{ width: 93, height: 93 }} source={image} />
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

const LabelTextInput = styled.TextInput``;

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
