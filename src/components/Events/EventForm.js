import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { ImagePicker } from 'expo';
import styled from 'styled-components/native';

import { EventContainer } from '../Layout/Layout';
import MultiSelect from '../../utils/react-native-multiple-select/lib/react-native-multi-select';
import RoundTab from '../RoundTab';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class EventForm extends Component {
  state = {
    error: false,
  };

  openImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, error: false });
    }
  };

  render() {
    const image = { uri: this.state.image };
    return (
      <EventContainer>
        <View style={{ backgroundColor: '#f9f7f6' }}>
          <TouchableOpacity
            onPress={this.props.navigateBack}
            style={styles.backButton}
          >
            <Text style={{ fontSize: 22 }}> {'<'} </Text>
          </TouchableOpacity>
          <Text style={styles.formTitle}>NEW EVENT</Text>
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
                // onChangeText={username =>
                //   this.setState({
                //     username,
                //     validationError: '',
                //     error: false,
                //   })}
                // value={this.state.username}
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
                // onChangeText={username =>
                //   this.setState({
                //     username,
                //     validationError: '',
                //     error: false,
                //   })}
                // value={this.state.username}
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
                placeholder="CITY*"
                // onChangeText={username =>
                //   this.setState({
                //     username,
                //     validationError: '',
                //     error: false,
                //   })}
                // value={this.state.username}
                // onSubmitEditing={() => {
                //   this._emailInput.focus();
                // }}
              />
            </LabelView>
          </LabelContainer>

          {/* <MultiSelect
          hideTags
          // items={this.props.locations.data}
          // uniqueKey="id"
          hideSubmitButton={true}
          fixedHeight={true}
          // onSelectedItemsChange={this.onSelectedItemsChange}
          // selectedItems={selectedLocations}
          selectText="CITY*"
          searchInputPlaceholderText="Search municipalities..."
          selectedItemTextColor="#ff8a65"
          selectedItemIconColor="#ff8a65"
          title="CITY*"
        /> */}
          <LabelContainer>
            <LabelView>
              <TextInput
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                placeholderTextColor="#4a4a4a"
                placeholder="STREET ADDRESS*"
                // onChangeText={username =>
                //   this.setState({
                //     username,
                //     validationError: '',
                //     error: false,
                //   })}
                // value={this.state.username}
                // onSubmitEditing={() => {
                //   this._emailInput.focus();
                // }}
              />
            </LabelView>
          </LabelContainer>
        </View>
        <View style={{ backgroundColor: '#f9f7f6', height: 100 }} />
        <BottomLabelWrapper>
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
              title="Create"
              style={{ flex: 1 }}
              // onPress={() => this.signUp()}
            />
          </RoundTabContainer>
        </BottomLabelWrapper>
      </EventContainer>
    );
  }
}

const LabelContainer = styled.View`
  height: 50;
  align-items: center;
  width: 100%;
  margin-top: 20;
  background-color: #e8e9e8;
`;

const LabelView = styled.View`
  width: 278;
  border-bottom-width: 2;
  border-bottom-color: #979797;
`;

const BottomLabelWrapper = styled.View`
  padding-top: 29;
  width: 100%;
  height: 276;
  flex-direction: column;
  background-color: #e8e9e8;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
