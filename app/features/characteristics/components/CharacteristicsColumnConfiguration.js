import React, {useCallback} from 'react';
import {MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS} from '../constants/columnConfiguration';
import {SidebarSection} from '../../layout/components';
import {CharacteristicsColumnConfigurationSidebarSwitch} from '.';

export default function CharacteristicsColumnConfigurationSidebar({show, characteristicSetcolumns, visibleCharacteristicSetsColumns, toggleConfigureColumnVisibility, disabled, showTab, tabIndex, changeTab}) {
  if (!show) return null;

  const toggleVisibility = useCallback(event => {
    toggleConfigureColumnVisibility(event.target.name, event.value);
  }, []);

  return (
    <SidebarSection
      className="grid-configuration"
      title="Allowed Characteristic Sets" collapsible showTab={showTab} tabIndex={tabIndex} changeTab={changeTab}>
      {visibleCharacteristicSetsColumns.size >= MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS && <h6 className="text-danger">Maximum {MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS} characteristic sets can be shown</h6>}

      <div className={`${showTab === tabIndex ? 'grid-configuration-open' : 'grid-configuration-closed' }`}>
        {characteristicSetcolumns.size ? characteristicSetcolumns.map((column, index) => (
          <div className="column-configuration-container" key={index}>
            <div className="column-configuration-title">{column.get('name')}</div>
            <div className="column-configuration-switch">
              <CharacteristicsColumnConfigurationSidebarSwitch toggleVisibility={toggleVisibility} column={column} disabled={disabled || (!column.get('visibleColumn') && visibleCharacteristicSetsColumns.size >= MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS)} />
            </div>
          </div>
        ))
          : <div><h5>Characteristic Sets not available.</h5></div>}
      </div>
    </SidebarSection>
  );
}
