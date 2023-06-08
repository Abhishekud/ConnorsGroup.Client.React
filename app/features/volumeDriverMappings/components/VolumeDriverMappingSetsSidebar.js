import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {
  showSelector,
  volumeDriverMappingSetsSelector,
  sortedPristineVolumeDriverMappingSetsArraySelector,
} from '../selectors/sidebars/sets';
import VolumeDriverMappingSetListEntryContainer from './VolumeDriverMappingSetListEntryContainer';
import DeleteVolumeDriverMappingSetModel from './DeleteVolumeDriverMappingSetModal';

class VolumeDriverMappingSetsSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      show,
      pristineVolumeDriverMappingSets,
      volumeDriverMappingSets,
      reloadVolumeDriverMappings,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <div className="sidebar-scrollable">
          <SidebarSection
            title="Volume Driver Mapping Sets"
            className="action-buttons-none"
            collapsible={false}>
            {pristineVolumeDriverMappingSets.map(pcc => (
              <VolumeDriverMappingSetListEntryContainer
                key={pcc.get('id')}
                pristineVolumeDriverMappingSet={pcc}
                volumeDriverMappingSet={volumeDriverMappingSets.get(pcc.get('id'))} />
            ))}
            <DeleteVolumeDriverMappingSetModel reloadVolumeDriverMappings={reloadVolumeDriverMappings} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    pristineVolumeDriverMappingSets: sortedPristineVolumeDriverMappingSetsArraySelector(state),
    volumeDriverMappingSets: volumeDriverMappingSetsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {}
)(VolumeDriverMappingSetsSidebar);
