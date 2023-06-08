import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';

export default class ConflictingIndustryAllowancesRestList extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      duplicateRestAllowances,
    } = this.props;

    return (
      <div className="allowance-time-group-container">
        <div className="content">
          <div className="header">
            <h5>Conflicting Industry Allowances Rest List:</h5>
            <div>{duplicateRestAllowances.map((allowance, index) => <div key={index}>{index + 1}. {allowance}</div>)}</div>
          </div>
        </div>
      </div>
    );
  }
}
