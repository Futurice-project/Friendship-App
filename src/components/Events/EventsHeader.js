import React from 'react';
import { Text, View } from 'react-native';

const EventsHeader = ({ headerText, rightText }) => {
  const { textStyle, viewStyle, rightStyle, leftStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={leftStyle} />
      <Text style={textStyle}>{headerText}</Text>
      <View style={rightStyle}>{rightText}</View>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    flex: 33,
    justifyContent: 'center',
    marginLeft: 40,
  },
  rightStyle: {
    flex: 33,
  },
  leftStyle: {
    flex: 33,
  },
};

export default EventsHeader;
