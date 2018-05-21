import React from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import rest from '../../utils/rest';
import { ViewContainer } from '../Layout/Layout';
import RoundTab from '../RoundTab';
import GenderBox from '../SignUp/GenderBox';
import Avatar from '../SignUp/Avatar';
import LoadingIndicator from '../LoadingIndicator';
import Modal from 'react-native-modal';
import apiRoot from '../../utils/api.config';
import { getPreSignedUrl } from '../../utils/aws';

const mapStateToProps = state => ({
  auth: state.auth,
  avatars: state.avatars,
});

const mapDispatchToProps = dispatch => ({
  fetchAvatars: () => dispatch(rest.actions.avatars()),
});

class EditForm extends React.Component {
  initialState = {
    newEmail: '',
    newPassword: '',
    newUsername: '',
    newBirthyear: '',
    loading: false,
    error: false,
    validationError: '',
    newImage: '',
    newAvatar: '',
    genders: [],
    isModalVisible: false, //for error handling,
  };

  componentWillMount() {
    this.props.fetchAvatars();
    const genders = this.getGendersById(this.props.userData.genderlist);
    this.setState({ oldGenders: genders });
  }

  constructor() {
    super();
    this.state = this.initialState;
  }

  componentWillReceiveProps() {
    this.setState({ error: true });
  }

  getGendersById(exsitingGenders) {
    // a helper function to get the current user's exsitingGenders
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

  openImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ newImage: result, error: false });
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
    fetch(`${apiRoot}/users/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: this.props.auth.data.token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(() => this.props.closeEditForm()) //close the form
      .then(() => this.props.onRefresh()) //do a fetch to fetch the latest user data
      .catch(() => this.setState({ isModalVisible: true })); //show error modal if fail!
  };

  async onSubmit() {
    let formValues = {
      email: this.state.newEmail,
      password: this.state.newPassword,
      username: this.state.newUsername,
      birthyear: this.state.newBirthyear,
      image: this.state.newImage,
      avatar: this.state.newAvatar,
    };

    for (let field in formValues) {
      if (formValues[field].length <= 0) {
        delete formValues[field];
      }
    }

    if (this.state.genders.length > 0) {
      formValues['genders'] = this.state.genders;
    }

    if (Object.keys(formValues).length > 0) {
      let formdata = await this.createFormData(formValues);
      this.updateProfile(this.props.userData.id, formdata);
    } else {
      this.props.closeEditForm();
    }
  }

  async createFormData(formValues) {
    if (!formValues.image) {
      return this.appendFieldToFormdata(formValues);
    }

    return await getPreSignedUrl(
      'PROFILE',
      formValues,
      this.props.userData.username,
    )
      .then(url => this.appendFieldToFormdata(formValues, url))
      .catch(e => {
        console.error(e);
      });
  }

  appendFieldToFormdata(userData, url = '') {
    let tempFormData = new FormData();

    for (const field in userData) {
      if (field !== 'image' && field !== 'genders') {
        tempFormData.append(field, userData[field]);
      }
    }

    if (userData.genders) {
      tempFormData.append('genders', JSON.stringify(userData.genders));
    }

    if (url) {
      tempFormData.append('image', url);
    }

    return tempFormData;
  }

  updateGenders(value) {
    let newSelectedGenders = this.state.genders
      ? this.state.genders
      : this.state.oldGenders;
    const pos = newSelectedGenders.indexOf(value);
    if (pos < 0) {
      newSelectedGenders.push(value);
    } else {
      newSelectedGenders.slice();
      newSelectedGenders.splice(pos, 1);
    }
    newSelectedGenders.sort();
    this.setState({ genders: newSelectedGenders });
  }

  updateAvatar(avatarUri) {
    if (avatarUri === this.state.avatarUri) {
      return this.setState({ newAvatar: '', error: false });
    }
    return this.setState({ newAvatar: avatarUri, error: false });
  }

  renderAvatars() {
    return this.props.avatars.data.map(avatar => {
      let sel = this.state.newAvatar
        ? this.state.newAvatar === avatar.uri
        : this.props.userData.avatar === avatar.uri;
      return (
        <Avatar
          updateAvatar={avatarUri => this.updateAvatar(avatarUri)}
          selected={sel}
          key={avatar.id}
          avatar={avatar.uri}
        />
      );
    });
  }

  renderLoadingIndicator() {
    if (this.props.auth.loading) {
      return <LoadingIndicator />;
    }
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
              {this.renderAvatars()}
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
                      newUsername: username,
                      validationError: '',
                      error: false,
                    })}
                  value={
                    this.state.newUsername ? (
                      this.state.newUsername
                    ) : (
                      this.props.userData.username
                    )
                  }
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
                    this.setState({
                      newEmail: email,
                      validationError: '',
                      error: false,
                    })}
                  value={
                    this.state.newEmail ? (
                      this.state.newEmail
                    ) : (
                      this.props.userData.email
                    )
                  }
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
                      newPassword: password,
                      validationError: '',
                      error: false,
                    })}
                  value={this.state.newPassword}
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
                      newBirthyear: birthyear,
                      validationError: '',
                      error: false,
                    })}
                  value={
                    this.state.newBirthyear ? (
                      this.state.newBirthyear.toString()
                    ) : (
                      this.props.userData.birthyear.toString()
                    )
                  }
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
                  existingGenders={
                    this.state.genders.length > 0 ? (
                      this.state.genders
                    ) : (
                      this.state.oldGenders
                    )
                  }
                  updateGenders={() => this.updateGenders(1)}
                  gender="WOMAN"
                />
                <GenderBox
                  updateGenderById={value => this.updateGenders(value)}
                  existingGenders={
                    this.state.genders.length > 0 ? (
                      this.state.genders
                    ) : (
                      this.state.oldGenders
                    )
                  }
                  updateGenders={() => this.updateGenders(2)}
                  gender="MAN"
                />
              </GenderBoxContainer>
              <GenderBoxContainer style={{ height: 44, marginLeft: '38%' }}>
                <GenderBox
                  updateGenderById={value => this.updateGenders(value)}
                  existingGenders={
                    this.state.genders.length > 0 ? (
                      this.state.genders
                    ) : (
                      this.state.oldGenders
                    )
                  }
                  updateGenders={() => this.updateGenders(3)}
                  gender="HUMAN"
                />
                <GenderBox
                  updateGenderById={value => this.updateGenders(value)}
                  existingGenders={
                    this.state.genders.length > 0 ? (
                      this.state.genders
                    ) : (
                      this.state.oldGenders
                    )
                  }
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
                <Image
                  style={{ width: 93, height: 93 }}
                  source={{
                    uri: this.state.newImage
                      ? this.state.newImage.uri
                      : this.props.userData.image,
                  }}
                />
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
