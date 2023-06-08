import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  showSelector,
  locationProfilesSelector,
  sortedPristineLocationProfilesArraySelector,
} from '../selectors/sidebars/profiles';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import LocationProfileListEntryContainer from './LocationProfileListEntryContainer';
import DeleteLocationProfileModal from './DeleteLocationProfileModal';
import {
  locationNameSelector,
} from '../../shared/selectors/components/settings';

class LocationProfilesSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {show, locationProfiles, pristineLocationProfiles, departments, locationName, reloadLocationsList} = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <div className="sidebar-scrollable">
          <SidebarSection title={`${locationName} Profiles`} className="action-buttons-none" collapsible={false}>
            {pristineLocationProfiles.map(plp => (
              <LocationProfileListEntryContainer
                key={plp.get('id')}
                pristineLocationProfile={plp}
                locationProfile={locationProfiles.get(plp.get('id'))}
                departments={departments}
                reloadLocationsList={reloadLocationsList} />
            ))}
          </SidebarSection>
        </div>
        <DeleteLocationProfileModal reloadLocationsList={reloadLocationsList} />
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  return {
    show: showSelector(state),
    locationProfiles: locationProfilesSelector(state),
    pristineLocationProfiles: sortedPristineLocationProfilesArraySelector(state),
    departments: departmentsSelector(state),
    locationName: locationNameSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {}
)(LocationProfilesSidebar);
