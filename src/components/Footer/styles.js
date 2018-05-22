import { StyleSheet } from 'react-native';
import { colors, paddings } from '../../styles';

export default StyleSheet.create({
  footer: { position: 'absolute', bottom: 0 },
  footerWave: {
    resizeMode: 'stretch',
    alignSelf: 'flex-end',
  },
  footerContent: {
    backgroundColor: colors.ORANGE,
    flexDirection: 'row',
    paddingBottom: paddings.SM,
    paddingTop: paddings.XS,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
