import React from 'react';
import Slider from 'react-native-slider';
import styled from 'styled-components/native';
import { Text } from 'react-native';

export default class StyledSlider extends React.Component {
  render = () => (
    <Wrapper>
      <Slider
        trackStyle={style.track}
        thumbStyle={style.thumb}
        minimumTrackTintColor="#e8e9e8"
      />
      <TextWrapper>
        <Text style={style.sliderText}>Ei yhtään</Text>
        <Text style={style.sliderText}>En tiedä</Text>
        <Text style={style.sliderText}>Paljon</Text>
      </TextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`display: flex;`;
const TextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 5;
  margin-right: 5;
`;

const style = {
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e8e9e8',
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: '#89dd93',
    borderColor: '#89dd93',
    borderWidth: 14,
    borderRadius: 15,
  },
  sliderText: {
    fontFamily: 'NunitoSans-Light',
    fontSize: 13,
    color: '#2d4359',
  },
};
