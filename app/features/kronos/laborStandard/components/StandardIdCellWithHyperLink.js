import React from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';

class StandardIdCellWithHyperLink extends React.Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleOpenStandard() {
    const {router, dataItem} = this.props;
    router.push(`/standards/${dataItem.standardId}?kronosstandards=true`);
  }

  render() {
    const {className, style, dataItem} = this.props;
    return (
      <td className={`${className}`} style={style}>
        <a className="hyperlink" onClick={this.handleOpenStandard}>{dataItem.standardId}</a>
      </td>
    );
  }
}

export default withRouter(StandardIdCellWithHyperLink);
