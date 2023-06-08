import React from 'react';

import {filterFormatTMUs} from '../../shared/services';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';

class ElementTimeCell extends React.Component {
  render() {
    const {className, style, dataItem, field, timeFormat} = this.props;
    const value = dataItem[field];
    const title = (dataItem[field]) + timeFormat[0].toLowerCase();
    const defaultStyle = {
      textAlign: 'right',
      verticalAlign: 'top'};
    const mergedStyle = {...style, ...defaultStyle};
    return (
      <td className={className} style={mergedStyle} title={title}>
        {filterFormatTMUs(value, timeFormat)}
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
)(ElementTimeCell));

