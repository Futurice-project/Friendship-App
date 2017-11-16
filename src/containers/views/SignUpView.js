import React from 'react';
import { connect } from 'react-redux';
// import ImagePicker from 'react-native-image-picker';
// import ImageResizer from 'react-native-image-resizer';
import { ImagePicker } from 'expo';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';

import rest from '../../utils/rest';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import ProgressBar from '../../components/ProgressBar';
import GenderBox from '../../components/GenderBox';

import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,
  FlatList,
  Image,
} from 'react-native';

const mapStateToProps = state => ({
  auth: state.auth,
  userDetails: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
  signUp: credentials => {
    dispatch(rest.actions.register({}, { body: JSON.stringify(credentials) }))
      .then(() =>
        dispatch(
          NavigationActions.navigate({
            routeName: 'SignUpLocation',
          }),
        ),
      )
      .catch(err => console.log(err));
  },
  openSignUpLocation: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpLocation',
      }),
    ),
  openSignIn: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignIn',
      }),
    ),
  openWelcomeScreen: () =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
      }),
    ),
  saveImage: imageUri => {
    // const { id } = this.props.auth.data.decoded;
    let formdata = new FormData();

    if (imageUri) {
      formdata.append('image', {
        uri: imageUri,
        name: 'image.png',
        type: 'multipart/form-data',
      });
    }

    dispatch(
      rest.actions.userDetails.patch(
        // { userId: 54 }, replace with real userId here later
        {
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        (err, data) => {
          if (!err) {
            console.log('Uploaded successfully!!! Testing here');
          } else {
            console.log('Error ', err);
            console.log('Data: ', data);
          }
        },
      ),
    );
  },
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
      this.setState({ image: result.uri });

      // later
      // this.props.saveImage(this.state.image);
    }

    // console.log('Opening gallery??');
    // console.log(ImagePicker);
    // this.setState({ disableSave: true });
    // const options = {
    //   title: 'Choose Profile Picture',
    //   takePhotoButtonTitle: 'Take Photo',
    //   chooseFromLibraryButtonTitle: 'Choose From Library',
    //   cancelButtonTitle: 'Cancel',
    //   mediaType: 'photo',
    //   allowsEditing: true,
    //   permissionDenied: {
    //     title: 'Denied permission',
    //     text: 'Cannot access gallery',
    //     reTryTitle: 'Retry',
    //     okTitle: 'OK now!!',
    //   },
    // };
    // ImagePicker.showImagePicker(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //     // this.setState({ disableSave: false });
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //     // this.setState({ disableSave: false });
    //   } else {
    //     ImageResizer.createResizedImage(response.uri, 512, 512, 'PNG', 100)
    //       .then(resizedImage => {
    //         // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
    //         this.setState({
    //           // disableSave: false,
    //           image: resizedImage.uri,
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    // });
  };

  renderStatus() {
    if (this.state.validationError) {
      return (
        <Text style={styles.statusTextStyle}>{this.state.validationError}</Text>
      );
    }
    const { data, error, loading } = this.props.auth;
    let status = '';
    if (data.decoded) {
      status = `Signed in as ${data.decoded.email}`;
    }
    if (this.state.error && error) {
      status = `Error ${error.statusCode}: ${error.message}`;
    }
    if (loading) {
      status = `Loading ...`;
    }

    return <Text style={styles.statusTextStyle}>{status}</Text>;
  }

  signUp() {
    const { email, password, username, birthyear, genders } = this.state;
    if (!email || !password || !username) {
      return this.setState({
        validationError: 'Please enter at least username, email & password!',
      });
    }
    this.props.signUp({ email, password, username, birthyear, genders });
  }

  updateGenders(value) {
    if (this.state.genders.indexOf(value) > -1) {
      const genders = this.state.genders.slice();
      genders.splice(this.state.genders.indexOf(value), 1);
      return this.setState({ genders });
    }
    return this.setState({ genders: [...this.state.genders, value] });
  }

  // renderMoodImageContainer, remove later when getting emoji from db?
  renderEmojis() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return array.map(num => (
      <MoodImageContainer key={num}>
        <MoodImage
          source={{
            uri:
              'https://www.emojibase.com/resources/img/emojis/apple/x1f422.png.pagespeed.ic.Kl0AHX0uMQ.png',
          }}
        />
      </MoodImageContainer>
    ));
  }

  render() {
    console.log(this.state.genders);
    const image = { uri: this.state.image };
    return (
      <KeyboardAvoidingView behavior="padding">
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
              horizontal
              style={{ height: 70, marginTop: 22 }}
            >
              {this.renderEmojis()}
            </ScrollViewPhoto>
            <LabelContainer>
              <LabelView>
                <LabelTextInput
                  autoCorrect={false}
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
                <LabelTextInput
                  returnKeyType="go"
                  secureTextEntry
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
                  placeholderTextColor="#4a4a4a"
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
      </KeyboardAvoidingView>
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

const MoodImageContainer = styled.View`
  height: 70;
  width: 70;
  background-color: #ffffff;
  border-radius: 35;
  justify-content: center;
  align-items: center;
  margin-right: 12;
`;

const MoodImage = styled.Image`
  width: 48;
  height: 48;
`;

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

// const GenderBox = styled.View`
//   height: 44;
//   background-color: #ffffff;
//   width: 36%;
//   border-radius: 27;
//   padding-left: 15;
//   margin-right: 11;
//   justify-content: center;
// `;

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
