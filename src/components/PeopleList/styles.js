import { StyleSheet } from 'react-native';
import { paddings } from '../../styles';

export default StyleSheet.create({
  peopleList: {
    flex: 1,
    marginTop: paddings.SM,
  },
  people: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    maxHeight: 500,
  },
});
