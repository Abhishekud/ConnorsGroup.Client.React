import React from 'react';

import {filterFormatTMUs} from '../../shared/services';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';

class IndustryElementTimeCell extends React.Component {
  render() {
    const value = this.props.dataItem[this.props.field];
    const title = (this.props.dataItem[this.props.field]) + this.props.timeFormat[0].toLowerCase();
    const style = {
      textAlign: 'right',
      verticalAlign: 'top'};
    return (
      <td style={style} title={title}>
        {filterFormatTMUs(value, this.props.timeFormat)}
      </td>
    );
  }
}

function mapStateToProps(state) {
  return {
    timeFormat: timeFormatSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps
)(IndustryElementTimeCell));

