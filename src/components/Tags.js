import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  componentWillMount() {
    this.setState({ selected: this.props.selected });
  }

  updateTag = () => {
    this.props.updateTags(this.props.data, this.state.selected);
    this.setState(prevState => ({
      selected: prevState.selected >= 1 ? -1 : prevState.selected === 0 ? 1 : 0,
    }));
  };

  renderIcon = () => {
    if (this.props.edit) {
      let icon = '';
      let color = 'green';
      switch (this.state.selected) {
        case -1:
          icon = 'md-thumbs-down';
          color = 'red';
          break;
        case 1:
          icon = 'md-thumbs-up';
          break;
        default:
          return;
      }
      return (
        <Icon
          name={icon}
          size={20}
          color={color}
          style={{ position: 'absolute', top: 0, right: 30, zIndex: 1 }}
        />
      );
    }
  };

  render() {
    let color = this.props.dark ? '#6eb1ea' : '#ff8a65';
    return (
      <View>
        {this.props.amount && (
          <View
            style={{
              height: 25,
              width: 25,
              borderRadius: 100,
              backgroundColor: '#6c6c85',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              right: 0,
              zIndex: 1,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {this.props.amount}
            </Text>
          </View>
        )}
        {this.renderIcon()}
        <TouchableOpacity
          style={[
            styles.rectangle,
            this.props.style,
            { backgroundColor: color },
          ]}
          onPress={() => {
            this.props.edit
              ? this.updateTag()
              : this.props.openSearchTag(this.props.data.id);
          }}
        >
          <Text style={styles.item}>{this.props.data.name}</Text>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'NunitoSans-Bold',
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
