import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import CharacteristicSetListEntry from './CharacteristicSetListEntry';
import CharacteristicSetListEntryEditor from './CharacteristicSetListEntryEditor';
import {
  editCharacteristicSet,
  cancelEditCharacteristicSet,
  setCharacteristicSetModelProperty,
  updateCharacteristicSet,
  showDeleteCharacteristicSet,
  loadCharacteristicSetSelectListOptions,
  reorderCharacteristicsColumn,
} from '../actions';
import {
  makeEditingCharacteristicSetSelector,
  makeSavingCharacteristicSetSelector,
  makeCharacteristicSetValidationErrorsSelector,
} from '../selectors/sidebars/sets';
import {
  selectedDepartmentIdSelector,
  columnsSelector,
} from '../selectors/pages/list';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CharacteristicSetListEntryContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {characteristicSet, editCharacteristicSet} = this.props;

    editCharacteristicSet(characteristicSet.get('id'));
  }

  handleCancelEdit() {
    const {characteristicSet, cancelEditCharacteristicSet} = this.props;

    cancelEditCharacteristicSet(characteristicSet.get('id'));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    const {characteristicSet, setCharacteristicSetModelProperty} = this.props;

    setCharacteristicSetModelProperty(characteristicSet.get('id'), name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {
      characteristicSet,
      updateCharacteristicSet,
      selectedDepartmentId,
      loadCharacteristicSetSelectListOptions,
      router, reorderCharacteristicsColumn,
    } = this.props;

    updateCharacteristicSet(characteristicSet, selectedDepartmentId)
      .then(response => {
        loadCharacteristicSetSelectListOptions();
        const {columns, reloadCharacteristics} = this.props;
        const responseData = response.value.data;
        const updatedColumn = columns.find(c => c.get('title') === responseData.name);
        if (responseData.default && updatedColumn && !updatedColumn.get('locked')) {
          reloadCharacteristics().then(() => {
            const newIndex = columns.filter(c => c.get('locked')).size;
            reorderCharacteristicsColumn(updatedColumn.get('field'), updatedColumn.get('orderIndex'), newIndex);
          });
        }
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Characteristic Set.'));
  }

  handleDelete() {
    const {characteristicSet, showDeleteCharacteristicSet} = this.props;

    showDeleteCharacteristicSet(characteristicSet);
  }

  render() {
    const {
      characteristicSet,
      validationErrors,
      pristineCharacteristicSet,

      editing,
      saving,
      canEdit,
    } = this.props;

    if (editing) {
      return (
        <CharacteristicSetListEntryEditor
          characteristicSet={characteristicSet}
          validationErrors={validationErrors}
          defaultSet={pristineCharacteristicSet.get('default')}
          saving={saving}
          onFieldChange={this.handleFieldChange}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onDelete={this.handleDelete} />
      );
    }

    return (
      <CharacteristicSetListEntry
        canEdit={canEdit}
        characteristicSet={pristineCharacteristicSet}
        onEdit={this.handleEdit} />
    );
  }
}

CharacteristicSetListEntryContainer.propTypes = {
  pristineCharacteristicSet: PropTypes.instanceOf(Map).isRequired,
  characteristicSet: PropTypes.instanceOf(Map).isRequired,
  canEdit: PropTypes.bool,
};

function makeMapStateToProps() {
  const editingSelector = makeEditingCharacteristicSetSelector();
  const savingSelector = makeSavingCharacteristicSetSelector();
  const validationErrorsSelector = makeCharacteristicSetValidationErrorsSelector();

  return (state, ownProps) => ({
    editing: editingSelector(state, ownProps),
    saving: savingSelector(state, ownProps),
    validationErrors: validationErrorsSelector(state, ownProps),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    columns: columnsSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    editCharacteristicSet,
    cancelEditCharacteristicSet,
    setCharacteristicSetModelProperty,
    updateCharacteristicSet,
    showDeleteCharacteristicSet,
    loadCharacteristicSetSelectListOptions,
    reorderCharacteristicsColumn,
  }
)(CharacteristicSetListEntryContainer));
