import autoBind from 'react-autobind';
import React, {Component} from 'react';

export default function (modelIdentifier = 'id') {
  return function (FormComponent) {
    return class AutoFocusOnEditForm extends Component {
      constructor(props, context) {
        super(props, context);

        autoBind(this);
      }

      componentDidMount() {
        const {primaryInput} = this;
        if (primaryInput) setTimeout(() => primaryInput.focus());
      }

      componentDidUpdate(prevProps) {
        const {primaryInput} = this;
        if (!primaryInput) return;

        const {editing, model} = this.props;
        const {editing: prevEditing, model: prevModel} = prevProps;

        if ((editing && !prevEditing) || ((editing || typeof editing === 'undefined') && this.didModelIdChange(model, prevModel))) {
          primaryInput.focus();
        }
      }

      didModelIdChange(model, prevModel) {
        if (!model && !prevModel) return false;
        if (model && !prevModel) return true;

        return model.get(modelIdentifier) !== prevModel.get(modelIdentifier);
      }

      primaryInputRef(input) {
        this.primaryInput = input;
      }

      render() {
        return <FormComponent {...this.props} primaryInputRef={this.primaryInputRef} />;
      }
    };
  };
}
