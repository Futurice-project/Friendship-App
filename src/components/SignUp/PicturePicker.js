import PhotoBox from './PhotoBox';
import React from 'react';
import {
  Container,
  FieldContainer,
  HintWrapper,
  LabelText,
  LabelTextHelper,
  Part,
} from '../Layout/SignupLayout';
import { Text, TouchableOpacity, View } from 'react-native';
import { Field } from 'redux-form';
import styled from 'styled-components/native/index';

/**
 * Renders the picture picker so that the user can add his/her own picture
 * */
export default class PicturePicker extends React.Component {
  render() {
    return (
      <Container>
        <Part>
          <FieldContainer>
            <View style={{ width: 278 }}>
              <LabelText>ADD PHOTO</LabelText>
            </View>
            <HintWrapper>
              <LabelTextHelper>
                This can be a photo of anything you like
              </LabelTextHelper>
            </HintWrapper>
            <View style={{ width: 278 }}>
              <Field name="image" component={PhotoBox} />
              {/*<ScrollViewPhoto
                contentContainerStyle={styles.scrollViewPhotoContainer}
                horizontal
              >
              </ScrollViewPhoto>*/}
            </View>
          </FieldContainer>
        </Part>
      </Container>
    );
  }
}

const ScrollViewPhoto = styled.ScrollView`
  margin-top: 11;
  align-self: flex-start;
`;

const styles = {
  scrollViewPhotoContainer: {
    justifyContent: 'space-around',
    height: 93,
  },
};
