import React from 'react';
import Slider from 'react-native-slider';

export default class StyledSlider extends React.Component {
  render = () => (
    <Slider
      trackStyle={style.track}
      thumbStyle={style.thumb}
      minimumTrackTintColor="#e8e9e8"
    />
  );
}

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
};
