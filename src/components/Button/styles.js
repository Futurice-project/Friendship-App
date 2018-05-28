import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  button: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: paddings.XS,
  },
  buttonSecondary: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: paddings.XS,
    borderWidth: 2,
    borderColor: colors.BEIGE,
  },
  headerButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: paddings.XXS,
  },
  text: {
    color: colors.BEIGE,
    fontSize: fontSizes.BODY_TEXT,
    fontFamily: fonts.REGULAR,
  },
  buttonText: {
    color: colors.ORANGE,
    fontSize: fontSizes.BODY_TEXT,
    fontFamily: fonts.REGULAR,
  },
});
