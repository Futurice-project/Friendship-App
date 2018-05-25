import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../../styles';

export default StyleSheet.create({
  statusTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f7',
    marginTop: 20,
  },
  footerText: {
    fontFamily: fonts.BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.WHITE,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    paddingHorizontal: paddings.MD,
    justifyContent: 'center',
  },
  keyboardView: {
    height: '100%',
    width: '100%',
  },
  input: {
    marginBottom: 30,
  },
});
