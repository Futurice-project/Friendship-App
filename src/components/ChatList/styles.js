import { StyleSheet } from 'react-native';
import { colors, fonts, paddings } from '../../styles';

export default StyleSheet.create({
  chatList: {
    flex: 1,
    marginTop: paddings.SM,
  },
  chats: {
    flex: 1,
    backgroundColor: colors.WHITE,
    minHeight: 300,
  },
  emptyChat: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: paddings.MD,
  },
  title: {
    fontFamily: fonts.BOLD,
  },
  message: {
    paddingBottom: paddings.MD,
  },
  redirect: {
    textDecorationLine: 'underline',
    color: colors.ORANGE,
  },
});
