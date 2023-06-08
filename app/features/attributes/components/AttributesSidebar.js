import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {loadAttributesList} from '../actions';
import {
  showSelector,
  attributesSelector,
  sortedPristineAttributesArraySelector,
} from '../selectors/sidebars/attributes';
import AttributeListEntryContainer from './AttributeListEntryContainer';
import DeleteAttributeModel from './DeleteAttributeModal';
import {withRouter} from 'react-router';

class AttributesSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      show,
      attributes,
      pristineAttributes,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <div className="sidebar-scrollable">
          <SidebarSection
            title="Attributes"
            className="action-buttons-none"
            collapsible={false}>
            {pristineAttributes.map(pa => (
              <AttributeListEntryContainer
                key={pa.get('id')}
                pristineAttribute={pa}
                attribute={attributes.get(pa.get('id'))} />
            ))}
            <DeleteAttributeModel />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    attributes: attributesSelector(state),
    pristineAttributes: sortedPristineAttributesArraySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadAttributesList,
  }
)(AttributesSidebar));
