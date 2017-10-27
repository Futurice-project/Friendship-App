import React from 'react';
import { Text, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { ViewContainer, Padding } from '../../components/Layout';
import DescriptionBubble from '../../components/DescriptionBubble';
import Toggle from '../../components/Toggle';
import DropDown from '../../components/DropDown';

const Title = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 45;
  font-weight: bold;
  text-align: center;
  color: #60686d;
  margin-top: 50;
  margin-bottom: 50;
`;
const P = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 16;
  font-weight: 300;
  line-height: 24;
  text-align: left;
  color: #4a4a4a;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 13;
  margin-top: 10;
`;
const SubTitle = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 20;
  font-weight: 600;
  letter-spacing: 1.7;
  text-align: center;
  color: #60686d;
  margin-top: 20;
  margin-bottom: 5;
  margin-left: 30;
`;

export default class Matching extends React.Component {
  static navigationOptions = {
    title: 'Matching',
    header: () => null,
  };
  state = {
    suggestion: false,
    description: '',
  };
  render = () => {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ViewContainer style={{ backgroundColor: '#e8e9e8' }}>
          <Padding>
            <Title>Oikeiden ihmisten löytäminen</Title>
            <P>Haluan, että minulle ehdotetaan sopivia ihmisiä?</P>
            <Toggle
              leftText="EI KIITOS"
              rightText="HALUAN"
              value={this.state.suggestion}
              onPress={() =>
                this.setState({ suggestion: !this.state.suggestion })}
            />
            <P style={{ textAlign: 'center' }}>
              Tämä tarkoittaa, että profiilisi on julkinen, kun osallistut
              johonkin tekemiseen tai olet kiinnostunut jostakin porukasta,
              mutta sinulle ei ehdoteta sopivia ihmisiä läheltäsi
            </P>
            <SubTitle>
              Valitse asiat, joita rakastat eniten tai joista et todellakaan
              innostu
            </SubTitle>
            <Text style={styles.infoStyle}>(Visible)</Text>
            <DropDown style={styles.dropdownStyle} />
            <DropDown style={styles.dropdownStyle} />
            <SubTitle>Haluatko kertoa lisää itsestäsi?</SubTitle>
            <DescriptionBubble
              style={{ alignSelf: 'center' }}
              text="ADD A DESCRIPTION"
              value={this.state.description}
              placeholder="Kerro lisää vaikka kiinnostuksen kohteistasi, mitä etsit täältä tai mitä ystävyys mielestäsi on..."
              onChangeText={description => this.setState({ description })}
            />
            <P style={{ textAlign: 'center' }}>
              You can always add and change this information
            </P>
          </Padding>
        </ViewContainer>
      </KeyboardAvoidingView>
    );
  };
}
const styles = {
  infoStyle: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'left',
    color: '#9b9b9b',
    alignSelf: 'center',
  },
  dropdownStyle: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
};
