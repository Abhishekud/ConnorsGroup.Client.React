import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {Button} from 'react-bootstrap';
import {GridColumnConfiguration} from './';
import {
  SidebarSection,
} from '../../layout/components';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../constants/columnConfigurations';


export default function GridConfiguration({show, dropActionId, columns, toggleColumnVisibility, handleResetGridConfiguration, showResetGridConfiguration = false, toggleColumnLock, collapsible = false, showTab, tabIndex, changeTab}) {
  if (!show) return null;
  const onlyOneColumn = columns.count(c => c.get('included')) <= 1;
  const headerActions = showResetGridConfiguration ? <Button bsSize="small" onClick={handleResetGridConfiguration}>Reset</Button> : null;
  return (
    <SidebarSection
      className="grid-configuration"
      title="Configure Grid"
      headerActions={headerActions}
      collapsible={collapsible} showTab={showTab} tabIndex={tabIndex} changeTab={changeTab} >
      { toggleColumnLock && !columns.first().get('lockable') && <h6 className="text-danger">Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</h6>}
      <div className={`${showTab === tabIndex ? 'grid-configuration-open' : 'grid-configuration-closed' }`}>

        <Droppable droppableId={dropActionId}>
          {provided => (
            <div ref={provided.innerRef}>
              {columns.map((column, index) => (
                <GridColumnConfiguration key={column.get('columnId') || column.get('field')} column={column} index={index} toggleColumnVisibility={toggleColumnVisibility} onlyOneColumn={onlyOneColumn} toggleColumnLock={toggleColumnLock} />
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </SidebarSection>
  );
}
