import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CHARACTERISTICS_EDIT} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {
  showSelector,
  characteristicSetsSelector,
  sortedPristineCharacteristicSetsArraySelector,
} from '../selectors/sidebars/sets';
import CharacteristicSetListEntryContainer from './CharacteristicSetListEntryContainer';
import DeleteCharacteristicSetModel from './DeleteCharacteristicSetModal';

class CharacteristicSetsSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      show,
      pristineCharacteristicSets,
      characteristicSets,
      canEdit,
      reloadCharacteristics,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <div className="sidebar-scrollable">
          <SidebarSection
            title="Characteristic Sets"
            className="action-buttons-none"
            collapsible={false}>
            {pristineCharacteristicSets.map(pcs => (
              <CharacteristicSetListEntryContainer
                key={pcs.get('id')}
                canEdit={canEdit}
                pristineCharacteristicSet={pcs}
                characteristicSet={characteristicSets.get(pcs.get('id'))}
                reloadCharacteristics={reloadCharacteristics} />
            ))}
            <DeleteCharacteristicSetModel reloadCharacteristics={reloadCharacteristics} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(CHARACTERISTICS_EDIT);
  return {
    show: showSelector(state),
    pristineCharacteristicSets: sortedPristineCharacteristicSetsArraySelector(state),
    characteristicSets: characteristicSetsSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {}
)(CharacteristicSetsSidebar);
