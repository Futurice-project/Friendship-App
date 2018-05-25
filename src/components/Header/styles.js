import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
});
