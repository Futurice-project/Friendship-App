import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  viewStyle: {
    backgroundColor: colors.LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    flex: 60,
    justifyContent: 'center',
    marginLeft: 20,
  },
  rightStyle: {
    flex: 40,
  },
});
