import {
  FieldContainer,
  FieldWrapper,
  HintWrapper,
  LabelTextHelper,
} from '../Layout/SignupLayout';
import { Field } from 'redux-form';
import React from 'react';
import { renderErrorMessage } from './validate';

export default class SignupField extends React.Component {
  render() {
    return (
      <FieldContainer>
        <FieldWrapper>
          <Field
            name={this.props.name}
            component={this.props.component}
            placeholder={this.props.placeholder}
            keyboardType={this.props.keyboardType}
            secureTextEntry={this.props.secureTextEntry}
          />
        </FieldWrapper>
        {this.props.hinttext ? (
          this.renderHintText(this.props.texthelper)
        ) : null}
        {this.props.err ? renderErrorMessage(this.props.err) : null}
      </FieldContainer>
    );
  }

  renderHintText(texthelper) {
    return (
      <HintWrapper>
        <LabelTextHelper>{texthelper}</LabelTextHelper>
      </HintWrapper>
    );
  }
}
