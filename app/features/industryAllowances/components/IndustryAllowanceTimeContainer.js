import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {AllowanceTimeModel} from '../models';
import IndustryAllowanceTime from './IndustryAllowanceTime';

export default class IndustryAllowanceTimeContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {allowanceTime} = this.props;

    return (
      <IndustryAllowanceTime
        allowanceTime={allowanceTime} />
    );
  }
}

IndustryAllowanceTimeContainer.propTypes = {
  allowanceTime: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
};
