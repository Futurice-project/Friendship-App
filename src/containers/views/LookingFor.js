import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import Label from '../../components/Label';
import Toggle from '../../components/Toggle';
import RoundTab from '../../components/RoundTab';

const Row = styled.View`
  flex-direction: row;
  margin: 5px;
`;

export default class LabelView extends React.Component {
  static navigationOptions = {
    title: 'Label',
    header: () => null,
  };

  state = {
    Hieman: false,
    Tunnollinen: false,
    Melko: false,
    Viihdyn: false,
    Pohdiskelija: false,
    Spontaani: false,
    kahden: false,
    Puhelias: false,
    Avoin: false,
  };

  render = () => (
    <ViewContainer>
      <Padding>
        <Centered>
          <Text style={styles.titleStyle}>
            Etsin ihmisiä, joita kuvaavat seuraavat asiat
          </Text>
          <Text style={styles.warningStyle}>(Not visible in your profile)</Text>
          <Row>
            <Label
              title="HIEMAN UJO"
              selected={this.state.Hieman}
              onPress={() => this.setState({ Hieman: !this.state.Hieman })}
            />
            <Label
              title="TUNNOLLINEN"
              selected={this.state.Tunnollinen}
              onPress={() =>
                this.setState({ Tunnollinen: !this.state.Tunnollinen })}
            />
          </Row>
          <Row>
            <Label
              style={{ alignSelf: 'stretch' }}
              title="MELKO VOIMAKASTAHTOINEN"
              selected={this.state.Melko}
              onPress={() => this.setState({ Melko: !this.state.Melko })}
            />
          </Row>
          <Row>
            <Label
              title="VIIHYDYN PAREMMIN PORUKASSA KUIN"
              selected={this.state.Viihdyn}
              onPress={() => this.setState({ Viihdyn: !this.state.Viihdyn })}
            />
          </Row>
          <Row>
            <Label
              title="POHDISKELIJA"
              selected={this.state.Pohdiskelija}
              onPress={() =>
                this.setState({ Pohdiskelija: !this.state.Pohdiskelija })}
            />
            <Label
              title="SPONTAANI"
              selected={this.state.Spontaani}
              onPress={() =>
                this.setState({ Spontaani: !this.state.Spontaani })}
            />
          </Row>

          <Row>
            <Label
              title="KAHDEN KESKEN"
              selected={this.state.kahden}
              onPress={() => this.setState({ kahden: !this.state.kahden })}
            />
            <Label
              title="PUHELIAS"
              selected={this.state.Puhelias}
              onPress={() => this.setState({ Puhelias: !this.state.Puhelias })}
            />
          </Row>
          <Row>
            <Label
              title="AVOIN UUSILLE ASIOILLE "
              selected={this.state.Avoin}
              onPress={() => this.setState({ Avoin: !this.state.Avoin })}
            />
          </Row>
        </Centered>
      </Padding>
      <RoundTab style={{ justifyContent: 'flex-end' }} title="Seuraava" />
    </ViewContainer>
  );
}

const styles = {
  titleStyle: {
    marginTop: 50,
    width: 300,
    height: 123,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 41,
    textAlign: 'left',
    color: '#faf6f0',
  },
  warningStyle: {
    marginTop: 50,
    marginBottom: 50,
    width: 300,
    height: 16,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 1.59,
    textAlign: 'left',
    color: '#ffffff',
  },
};
