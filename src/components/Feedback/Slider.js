import React from 'react';
import { Slider as Sliders } from 'react-native-elements';

export default class Slider extends React.Component {
  render() {
    const { rating, onRatingChange } = this.props;
    return (
      <Sliders
        style={{
          marginLeft: 20,
          marginRight: 30,
        }}
        thumbStyle={{
          width: 30,
          height: 30,
          borderRadius: 30,
        }}
        trackStyle={{ height: 10, borderRadius: 27 }}
        minimumTrackTintColor="#839297"
        maximumTrackTintColor="#e8e9e8"
        minimumValue={1}
        maximumValue={20}
        thumbTintColor="#839297"
        value={rating}
        onValueChange={rating => onRatingChange(rating)}
      />
    );
  }
}
