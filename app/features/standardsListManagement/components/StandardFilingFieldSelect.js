import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Select} from '../../forms/components';
import {Button} from 'react-bootstrap';
import {handleApiError} from '../../shared/services';
import {selectStandardsListType} from '../actions';
import {
  selectedStandardsListTypeSelector,
  standardFilingFieldsSelector,
} from '../selectors';
import {
  selectStandardFilingField,
  loadStandardFilingFieldsList,
} from '../../standardFilingFields/actions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_FILING_FIELDS_EDIT} from '../../authentication/constants/permissions';

const comparator = (a, b) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};

const toSelectItem = ({id, name}) => ({value: id, label: name});

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const buttonStyle = {
  marginLeft: 5,
  height: 36,
};

export class StandardFilingFieldSelect extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    const {router, loadStandardFilingFieldsList} = this.props;
    loadStandardFilingFieldsList()
      .catch(error => handleApiError(error, router, 'An error occurred loading standard filing fields.', 'Error'));
  }

  handleListTypeChange(e) {
    const {selectStandardsListType} = this.props;
    return selectStandardsListType(e.target.value);
  }

  handleEditCustomStandardFilingFieldClick() {
    const {selectedStandardsListType, selectStandardFilingField, standardFilingFields} = this.props;
    selectStandardFilingField(standardFilingFields.get(Number.parseInt(selectedStandardsListType, 10)));
  }

  render() {
    const {standardFilingFields, selectedStandardsListType, canEditFilingFields} = this.props;
    const isCustomFilingField = Number.isInteger(Number.parseInt(selectedStandardsListType, 10));

    return (
      <div style={containerStyle}>
        <Select
          id="standardFilingFieldId"
          formGroupClassName="standard-filing-field-selector"
          onChange={this.handleListTypeChange}
          value={selectedStandardsListType}
          options={standardFilingFields.toList().toJS().map(toSelectItem).sort(comparator)} />
        {isCustomFilingField && canEditFilingFields ? <Button onClick={this.handleEditCustomStandardFilingFieldClick} style={buttonStyle} ><i className="fa fa-pencil" /></Button> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const canEditFilingFields = makeCurrentUserHasPermissionSelector(STANDARDS_FILING_FIELDS_EDIT);
  return {
    loading: false,
    standardFilingFields: standardFilingFieldsSelector(state),
    selectedStandardsListType: selectedStandardsListTypeSelector(state),
    canEditFilingFields: canEditFilingFields(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    selectStandardsListType,
    loadStandardFilingFieldsList,
    selectStandardFilingField,
  }
)(StandardFilingFieldSelect));

