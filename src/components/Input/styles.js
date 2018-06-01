import { StyleSheet } from 'react-native';
import { colors, fonts, paddings } from '../../styles';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginLeft: paddings.SM,
    paddingBottom: paddings.XS,
    fontFamily: fonts.SEMI_BOLD,
  },
  horizontalLine: {
    width: '90%',
    borderTopWidth: 1,
    borderColor: colors.BLACK,
    marginTop: -10,
    marginHorizontal: paddings.SM,
  },
  textInput: {
    height: 40,
    backgroundColor: colors.BEIGE,
    paddingHorizontal: paddings.SM,
    borderRadius: 50,
    width: '100%',
    fontFamily: fonts.ITALIC,
  },
  passwordIcon: {
    position: 'absolute',
    top: 40,
    right: 15,
  },
});
