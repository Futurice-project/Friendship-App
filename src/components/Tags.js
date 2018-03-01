import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  openSearchTag: tagId =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'UsersForTag',
        params: { tagId },
      }),
    ),
});

class Tag extends React.Component {
  render() {
    let color = this.props.dark ? '#6eb1ea' : '#ff8a65';
    return (
      <TouchableOpacity
        style={[styles.rectangle, { backgroundColor: color }]}
        onPress={() => this.props.openSearchTag(this.props.data.id)}
      >
        <Text style={styles.item}>{this.props.data.name}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  rectangle: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 7,
    height: 39,
    borderRadius: 76,
  },

  item: {
    height: 20,
    // fontFamily: "NunitoSans",
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.43,
    textAlign: 'center',
    color: '#2d4359',
  },
  nameView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 60,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Tag);
