import React from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {elementTypeSelector} from '../selectors/pages/selectStandards';
import {connect} from 'react-redux';
import {toggleShowMassUpdate} from '../actions';

class StandardIdCellWithHyperLink extends React.Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleOpenStandard() {
    const {router, dataItem, elementType, params} = this.props;
    router.push(`/standards/${dataItem.id}?element=true&elementType=${elementType}&elementId=${params.id}`);
    this.props.toggleShowMassUpdate();
  }

  render() {
    const {className, style, dataItem} = this.props;
    return (
      <td className={`${className}`} style={style}>
        <a className="hyperlink" onClick={this.handleOpenStandard}>{dataItem.id}</a>
      </td>
    );
  }
}
function mapStateToProps(state) {
  return {
    elementType: elementTypeSelector(state),
  };
}
export default withRouter(connect(
  mapStateToProps, {
    toggleShowMassUpdate,
  }
)(StandardIdCellWithHyperLink));
