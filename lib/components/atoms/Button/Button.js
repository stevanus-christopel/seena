import React, { PureComponent } from 'react';
import { string } from 'prop-types';

class Button extends PureComponent {
  render() {
    const {
      type,
    } = this.props;

    return (
      <button type={type}>
        Steve
      </button>
    );
  }
}

Button.propTypes = {
  type: string,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
