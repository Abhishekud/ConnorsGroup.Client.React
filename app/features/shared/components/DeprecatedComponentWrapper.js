import React, {PureComponent} from 'react';

const deprecatedComponentWrapper = (InnerComponent, message = '') => class ComponentWrapper extends PureComponent {
  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`${InnerComponent.name} is deprecated`, message);
    }
  }

  render() {
    // Render the wrapped component with the same props
    return (
      <InnerComponent {...this.props} />
    );
  }
};

export default deprecatedComponentWrapper;
