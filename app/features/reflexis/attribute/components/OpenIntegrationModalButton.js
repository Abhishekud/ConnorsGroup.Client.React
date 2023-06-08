import React from 'react';
import {Button} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

export function OpenIntegrationModalButton({onClick, isSubmitting}) {
  if (isSubmitting) {
    return (
      <Button title="Submission in progress" disabled>
        <i className="fa fa-spinner fa-spin" />
      </Button>
    );
  }

  return (
    <Button title="Submit Integration Request" onClick={onClick}>
      <i className="fa fa-share" />
    </Button>
  );
}

OpenIntegrationModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default OpenIntegrationModalButton;
