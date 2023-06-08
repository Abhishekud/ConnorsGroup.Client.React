import autoBind from 'react-autobind';
import $ from 'jquery';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Button, MenuItem} from 'react-bootstrap';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import pdfMake from '../pdfMake';
import {
  generatePdf,
  createPdfDownload,
} from '../actions';
import {
  generatingSelector,
} from '../selectors/components/generatePdfButton';
import {handleApiError, makeClasses} from '../../shared/services';

class GeneratePdfButton extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClick() {
    const {router, generatePdf, reportFileName} = this.props;

    $('body').click();

    generatePdf(this.tryGeneratePdf)
      .then(result => this.downloadPdf(reportFileName, result.value))
      .catch(error => handleApiError(error, router, 'An error occurred while generating the PDF.'));
  }

  tryGeneratePdf(resolve, reject) {
    try {
      this.generatePdf(resolve);
    } catch (error) {
      reject(error);
    }
  }

  generatePdf(resolve) {
    this.props.buildPdfDefinition(pdfDefinition => {
      const pdfGenerator = pdfMake.createPdf(pdfDefinition);
      pdfGenerator.getBuffer(resolve);
    });
  }

  downloadPdf(fileName, base64EncodedPdf) {
    const {createPdfDownload, router} = this.props;

    createPdfDownload(fileName, base64EncodedPdf)
      .then(response => {
        window.location.href = `${process.env.API_BASE_URL}pdf-generation/download/${response.action.payload.data}`;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while generating the PDF download.'));
  }

  render() {
    const {generating, title, asMenuItem, disabled} = this.props;
    const classes = makeClasses({
      'fa': true,
      'fa-file-pdf-o': !generating,
      'fa-spinner fa-spin': generating,
    });

    if (asMenuItem) {
      return (
        <MenuItem eventKey={title} title={title} onSelect={this.handleClick}>
          {title}
        </MenuItem>
      );
    }

    return (
      <Button bsStyle="default" className="report-button" disabled={disabled || generating} onClick={this.handleClick} title={title}>
        <i className={classes} />
      </Button>
    );
  }
}

GeneratePdfButton.propTypes = {
  buildPdfDefinition: PropTypes.func.isRequired,
  reportFileName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    generating: generatingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    generatePdf,
    createPdfDownload,
  }
)(GeneratePdfButton));
