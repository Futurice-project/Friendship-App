import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import styled from 'styled-components/native';

import _ from 'lodash';
import RoundTab from '../../components/RoundTab';
import { SignUpWrapper, Padding, Centered } from '../../components/Layout';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import StyledSlider from '../../components/StyledSlider';

class PersonalityView extends React.Component {
  static navigationOptions = {
    title: 'Personality',
    header: () => null,
  };

  componentDidMount() {
    this.props.getPersonalities();
  }

  // React-native Android does not support letter spacing
  // This function hacks space between letters together
  applyLetterSpacing(string, count = 1) {
    return string.split('').join('\u200A'.repeat(count));
  }

  renderTags() {
    if (this.props.personalities) {
      return _.map(this.props.personalities.data.data, (personality, index) => (
        <TagWrapper key={index}>
          <Text style={styles.tagTitle}>{personality.name.toUpperCase()}</Text>
          <StyledSlider />
        </TagWrapper>
      ));
    }
  }

  render() {
    return (
      <ScrollView>
        <SignUpWrapper>
          <Padding>
            <Header>
              <HeaderRectangle>
                <Text style={styles.title}>Asiat, jotka kuvaavaat minua</Text>
              </HeaderRectangle>
              <Text style={styles.subTitle}>
                {this.applyLetterSpacing(
                  '(Nämä tulevat näkymään profiilisasi)',
                )}
              </Text>
            </Header>
            {this.renderTags()}
          </Padding>
        </SignUpWrapper>
      </ScrollView>
    );
  }
}

const Header = styled.View`
  display: flex;
  height: 200;
  width: 100%;
`;
const HeaderRectangle = styled.View`
  height: 80%
  justify-content: center;
  align-items: center;
  width: 400;
`;
const TagWrapper = styled.View`
  justify-content: center;
  width: 400;
  margin-top: 20;
`;

const styles = {
  title: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 40,
    color: '#2d4359',
  },
  subTitle: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 13,
    color: '#2d4359',
  },
  tagTitle: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    color: '#4a4a4a',
    fontFamily: 'NunitoSans-Regular',
  },
};

const mapStateToProps = state => ({
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: credentials => {
    dispatch(rest.actions.personalities());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalityView);
