import React from 'react';
import {PropTypes} from 'prop-types';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default function LinkWithTooltip({id, tooltip, placement, children}) {
  const actualTooltip = <Tooltip id={id}>{tooltip}</Tooltip>;

  return (
    <OverlayTrigger
      overlay={actualTooltip} placement={placement || 'top'}
      delayShow={300} delayHide={150}>
      {children}
    </OverlayTrigger>
  );
}

LinkWithTooltip.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.element,
};
