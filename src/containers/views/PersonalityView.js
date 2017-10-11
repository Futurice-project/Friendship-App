import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import styled from 'styled-components/native';

import { Description, Bold } from '../../components/Text';
import { SignUpWrapper, Padding, Centered } from '../../components/Layout';
import Label from '../../components/Label';
import { TouchableOpacity, Text } from 'react-native';
import StyledSlider from '../../components/StyledSlider';

class PersonalityView extends React.Component {
  static navigationOptions = {
    title: 'Personality',
    header: () => null,
  };

  render() {
    return (
      <SignUpWrapper>
        <Padding>
          <Header>
            <HeaderRectangle>
              <Text style={styles.title}>Asiat, jotka kuvaavaat minua</Text>
              <Text style={styles.subTitle}>
                (Nämä tulevat näkymään profiilisasi)
              </Text>
            </HeaderRectangle>
          </Header>
          <TagWrapper>
            <Text style={styles.tagTitle}>TESTTESTESTEST</Text>
            <StyledSlider />
          </TagWrapper>
          <TagWrapper>
            <Text style={styles.tagTitle}>
              STILL HAVE TO CONVERT THIS TO CAPS AND ADD SPACING
            </Text>
            <StyledSlider />
          </TagWrapper>
        </Padding>
      </SignUpWrapper>
    );
  }
}

const Header = styled.View`
  display: flex;
  height: 200;
  width: 100%;
`;
const HeaderRectangle = styled.View`
  flex: 1;
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
    marginTop: 5,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 15,
    color: '#2d4359',
  },
  tagTitle: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    color: '#4a4a4a',
    fontFamily: 'NunitoSans-Regular',
  },
};

export default connect(undefined)(PersonalityView);
