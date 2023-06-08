import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {
  showSelector,
  elementDetailsModelSelector,
} from '../selectors/sidebars/mostElementProfile';
import EditMOSTElementForm from './EditMOSTElementForm';
import {withRouter} from 'react-router';
class MOSTElementProfileSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      show,
      elementDetailsModel,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar closeable={false}>
        <div className="sidebar-scrollable">
          <SidebarSection
            title="Details" collapsible={false}>
            <EditMOSTElementForm
              model={elementDetailsModel} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {

  return state => ({
    show: showSelector(state),
    elementDetailsModel: elementDetailsModelSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps
)(MOSTElementProfileSidebar));
