import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Slider,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import PickerSelect from 'react-native-picker-select';
import { ImagePicker } from 'expo';
import styled from 'styled-components/native';

import { EventContainer } from '../Layout/Layout';
import MultiSelect from '../../utils/react-native-multiple-select/lib/react-native-multi-select';
import RoundTab from '../RoundTab';
import rest from '../../utils/rest';

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => {
    dispatch(rest.actions.locations());
  },
});

class EventForm extends Component {
  state = {
    title: '',
    description: '',
    city: '',
    address: '',
    minParticipants: '1',
    maxParticipants: '5',
    participantsMix: 1,
    error: false,
    validationError: '',
    hostId: '',
    cityTest: '',
    date: '',
    time: '',
  };

  componentWillMount() {
    this.props.getLocations();
    this.setState({ hostId: this.props.hostId });
    if (this.props.edit) {
      this.setState({
        title: this.props.eventDetails.title,
        description: this.props.eventDetails.description,
        city: this.props.eventDetails.city,
        address: this.props.eventDetails.address,
        minParticipants: this.props.eventDetails.minParticipants,
        maxParticipants: this.props.eventDetails.maxParticipants,
        participantsMix: parseInt(this.props.eventDetails.participantsMix),
        eventImage:
          'data:image/png;base64,' + this.props.eventDetails.eventImage,
      });
    }
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
      this.setState({ eventImage: result.uri, error: false });
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
  }

  submit() {
    const {
      title,
      description,
      city,
      address,
      minParticipants,
      maxParticipants,
      participantsMix,
      eventImage,
      hostId,
    } = this.state;

    let eventData = {
      title,
      description,
      city,
      address,
      minParticipants,
      maxParticipants,
      participantsMix,
      hostId,
    };

    if (!title || !city || !address) {
      return this.setState({
        validationError: 'Please enter all required fields',
      });
    }

    let formdata = this.createFormData(eventData, eventImage);
    if (this.props.edit) {
      this.props.updateEvent(this.props.eventDetails.id, formdata);
    } else {
      this.props.createEvent(formdata);
    }
  }

  createFormData(eventData, eventImage) {
    let tempFormData = new FormData();

    if (eventImage) {
      tempFormData.append('eventImage', {
        uri: eventImage,
        name: 'image.png',
        type: 'multipart/form-data',
      });
    }

    if (eventData) {
      for (var key in eventData) {
        if (eventData[key]) {
          tempFormData.append(key, eventData[key]);
        }
      }
    }

    return tempFormData;
  }

  renderPeopleMix(peopleMixValue) {
    switch (peopleMixValue) {
      case 1:
        return 'Diverse, open to all';
      case 2:
        return 'People mix num. 2';
      case 3:
        return 'People mix num. 3';
      case 4:
        return 'Me and my homies';
      case 5:
        return 'People mix num. 5';
    }
  }

  render() {
    console.log(this.props.eventDetails);
    const cities = this.props.locations.data.map(city => {
      return { label: city.name, value: city.name, key: city.name };
    });
    const eventImage = { uri: this.state.eventImage };
    this.renderStatus();
    const minParticipantsData = [
      {
        label: '1',
        value: '1',
        key: '1',
      },
      {
        label: '5',
        value: '5',
        key: '5',
      },
      {
        label: '10',
        value: '10',
        key: '10',
      },
    ];
    const maxParticipantsData = [
      {
        label: '5',
        value: '5',
        key: '5',
      },
      {
        label: '10',
        value: '10',
        key: '10',
      },
      {
        label: 'Unlimited',
        value: 'Unlimited',
        key: 'Unlimited',
      },
    ];
    return (
      <View>
        <View style={{ backgroundColor: '#f9f7f6' }}>
          <TouchableOpacity
            onPress={this.props.navigateBack}
            style={styles.backButton}
          >
            <Text style={{ fontSize: 22 }}> {'<'} </Text>
          </TouchableOpacity>
          <Text style={styles.formTitle}>
            {this.props.edit ? 'EDIT EVENT' : 'NEW EVENT'}
          </Text>
        </View>
        <View style={{ backgroundColor: '#e8e9e8' }}>
          <LabelContainer>
            <LabelView>
              <TextInput
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                placeholderTextColor="#4a4a4a"
                placeholder="TITLE*"
                onChangeText={title =>
                  this.setState({
                    title,
                    validationError: '',
                    error: false,
                  })}
                value={this.state.title}
                // onSubmitEditing={() => {
                //   this._emailInput.focus();
                // }}
              />
            </LabelView>
          </LabelContainer>

          <LabelContainer>
            <LabelView>
              <TextInput
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                placeholderTextColor="#4a4a4a"
                placeholder="DESCRIPTION"
                onChangeText={description =>
                  this.setState({
                    description,
                  })}
                value={this.state.description}
                // onSubmitEditing={() => {
                //   this._emailInput.focus();
                // }}
              />
            </LabelView>
          </LabelContainer>

          <LabelContainer style={{ marginBottom: 10, marginTop: 10 }}>
            <View
              style={{
                width: 250,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <DatePicker
                style={{ width: 150 }}
                date={this.state.date}
                mode="date"
                placeholder="DATE*"
                format="MMMM Do YYYY"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: 2,
                    borderBottomColor: '#979797',
                    alignItems: 'flex-start',
                    // justifyContent: 'flex-start',
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: '#4a4a4a',
                    textAlign: 'left',
                  },
                  dateText: {
                    fontSize: 17,
                    textAlign: 'center',
                    width: 150,
                  },
                }}
                onDateChange={date => {
                  this.setState({
                    date,
                    validationError: '',
                    error: false,
                  });
                }}
              />
              <DatePicker
                style={{ width: 80 }}
                date={this.state.time}
                mode="time"
                placeholder="TIME*"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour
                customStyles={{
                  dateInput: {
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: 2,
                    borderBottomColor: '#979797',
                    alignItems: 'flex-start',
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: '#4a4a4a',
                    textAlign: 'left',
                  },
                  dateText: {
                    fontSize: 17,
                    textAlign: 'center',
                    width: 80,
                  },
                }}
                onDateChange={time => {
                  this.setState({
                    time,
                    validationError: '',
                    error: false,
                  });
                }}
              />
            </View>
          </LabelContainer>

          <LabelContainer style={{ marginBottom: 20 }}>
            <View style={{ width: 278 }}>
              <PickerSelect
                placeholder={{
                  label: 'CITY*',
                  value: null,
                }}
                items={cities}
                value={this.state.city}
                onValueChange={city =>
                  this.setState({
                    city,
                    validationError: '',
                    error: false,
                  })}
                style={{ ...pickerSelectStyles }}
              />
            </View>
          </LabelContainer>

          <LabelContainer>
            <LabelView>
              <TextInput
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                placeholderTextColor="#4a4a4a"
                placeholder="STREET ADDRESS*"
                onChangeText={address =>
                  this.setState({
                    address,
                    validationError: '',
                    error: false,
                  })}
                value={this.state.address}
                // onSubmitEditing={() => {
                //   this._emailInput.focus();
                // }}
              />
            </LabelView>
          </LabelContainer>
        </View>

        <View
          style={{
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#f9f7f6',
          }}
        >
          <Text
            style={{
              width: 278,
              marginTop: 40,
              marginBottom: 10,
              paddingLeft: 21,
              color: '#4a4a4a',
              fontSize: 18,
            }}
          >
            MIN. PARTICIPANTS
          </Text>
          <View style={{ width: 278 }}>
            <PickerSelect
              items={minParticipantsData}
              value={this.state.minParticipants}
              onValueChange={minParticipants =>
                this.setState({
                  minParticipants,
                  validationError: '',
                  error: false,
                })}
              style={{ ...pickerSelectStyles }}
            />
          </View>
          <Text
            style={{
              width: 270,
              color: '#abaaaa',
              textAlign: 'center',
              marginTop: 7,
            }}
          >
            * Hangout is considered off if less people
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#f9f7f6',
          }}
        >
          <Text
            style={{
              width: 278,
              marginTop: 40,
              marginBottom: 10,
              paddingLeft: 21,
              color: '#4a4a4a',
              fontSize: 18,
            }}
          >
            MAX. PARTICIPANTS
          </Text>
          <View style={{ width: 278 }}>
            <PickerSelect
              items={maxParticipantsData}
              value={this.state.maxParticipants}
              onValueChange={maxParticipants =>
                this.setState({
                  maxParticipants,
                  validationError: '',
                  error: false,
                })}
              style={{ ...pickerSelectStyles }}
            />
          </View>
          <Text
            style={{
              width: 270,
              color: '#abaaaa',
              textAlign: 'center',
              marginTop: 7,
            }}
          >
            * New joiners not accepted beyond this number
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#f9f7f6',
          }}
        >
          <Text style={{ color: '#2e4358', marginTop: 40, fontSize: 21 }}>
            PEOPLE MIX
          </Text>
          <View style={{ width: 278 }}>
            <Slider
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={this.state.participantsMix}
              onValueChange={participantsMix =>
                this.setState({
                  participantsMix,
                })}
              minimumTrackTintColor="#e8e9e8"
              maximumTrackTintColor="#e8e9e8"
            />
          </View>
          <Text
            style={{
              width: 278,
              marginBottom: 20,
              marginTop: 10,
              color: '#2e4358',
              fontSize: 16,
            }}
          >
            {this.renderPeopleMix(this.state.participantsMix)}
          </Text>
          <Text
            style={{
              width: 270,
              color: '#abaaaa',
              textAlign: 'center',
              marginBottom: 50,
            }}
          >
            * This controls who can see and join the happening. It's based on
            profile personality types and number of shared Yeahs and Nahs
            between participants. Select what might work best for your
            happening.
          </Text>
        </View>
        <BottomLabelWrapper
          style={
            this.props.edit ? (
              { backgroundColor: '#f9f7f6', height: 385 }
            ) : (
              { backgroundColor: '#e8e9e8', height: 276 }
            )
          }
        >
          <View
            style={{
              paddingTop: 29,
              paddingBottom: 31,
              backgroundColor: '#e8e9e8',
            }}
          >
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
                Add a photo that best describes the event.
              </LabelTextHelper>
            </View>
            <ScrollViewPhoto
              contentContainerStyle={styles.scrollViewPhotoContainer}
              horizontal
            >
              <PhotoBox onPress={this.openImageGallery}>
                {eventImage.uri ? (
                  <Image
                    style={{ width: 93, height: 93 }}
                    source={eventImage}
                  />
                ) : (
                  <PlusSignText>+</PlusSignText>
                )}
              </PhotoBox>
            </ScrollViewPhoto>
          </View>
          {this.props.edit ? (
            <View style={{ backgroundColor: '#f9f7f6' }}>
              <ButtonOption>
                <TouchableOpacity
                  onPress={() =>
                    this.props.deleteEvent(this.props.eventDetails.id)}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.textButtonStyle}>Cancel Event</Text>
                </TouchableOpacity>
              </ButtonOption>
            </View>
          ) : null}
          <RoundTabContainer>
            <RoundTab
              titleColor="white"
              tint="#2d4359"
              title={this.props.edit ? 'Update' : 'Create'}
              style={{ flex: 1 }}
              onPress={() => this.submit()}
            />
          </RoundTabContainer>
        </BottomLabelWrapper>
      </View>
    );
  }
}

const ButtonOption = styled.View`
  flex: 1;
  align-items: center;
  marginBottom: 30;
  marginTop: 30;
`;

const LabelContainer = styled.View`
  height: 50;
  align-items: center;
  width: 100%;
  margin-top: 20;
  background-color: #e8e9e8;
`;

const LabelView = styled.View`
  width: 250;
  border-bottom-width: 2;
  border-bottom-color: #979797;
  padding-bottom: 7;
`;

const BottomLabelWrapper = styled.View`
  width: 100%;
  flex-direction: column;
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

const RoundTabContainer = styled.View`margin-top: auto;`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingTop: 13,
    paddingRight: 10,
    paddingLeft: 20,
    paddingBottom: 12,
    borderRadius: 100,
    backgroundColor: 'white',
  },
});

const styles = StyleSheet.create({
  backButton: {
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: 'transparent',
  },
  formTitle: {
    alignSelf: 'center',
    fontSize: 40,
    color: '#839297',
    marginBottom: 20,
  },
  scrollViewPhotoContainer: {
    justifyContent: 'space-around',
    height: 93,
    paddingLeft: 30,
  },

  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
    backgroundColor: '#eb7a63',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
