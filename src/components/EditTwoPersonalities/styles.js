import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes } from '../../styles';

export default StyleSheet.create({
  twoPersonalities: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.BEIGE,
  },
});
