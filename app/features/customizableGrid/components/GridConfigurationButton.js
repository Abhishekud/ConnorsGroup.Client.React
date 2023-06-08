import React from 'react';
import {Button} from 'react-bootstrap';

export default function GridConfigurationButton({openSidebar, closeSidebar, showGridConfiguration}) {
  return (
    <div>
      <Button
        className={`btn-default header-button ${showGridConfiguration ? 'btn-wheat' : ''}`}
        onClick={showGridConfiguration ? closeSidebar : openSidebar}>
        <i className="fa fa-cogs" />
      </Button>
    </div>
  );
}
