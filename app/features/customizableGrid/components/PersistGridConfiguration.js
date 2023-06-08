import {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {debounce} from 'lodash';

class PersistGridConfiguration extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.persist = debounce(this.persist, 3000);
  }

  componentDidMount() {
    this.retrieve();
  }

  componentDidUpdate() {
    this.persist();
    this.update();
  }

  retrieve() {
    const {retrieve, gridId} = this.props;
    retrieve(gridId);
  }

  persist() {
    const {gridId, persist, configuration} = this.props;
    persist(gridId, configuration);
  }

  update() {
    const {gridId, updateCachedConfiguration, configuration} = this.props;
    if (updateCachedConfiguration) updateCachedConfiguration(gridId, configuration);
  }

  render() {
    return null;
  }
}

PersistGridConfiguration.propTypes = {
  configuration: PropTypes.object,
  persist: PropTypes.func.isRequired,
  retrieve: PropTypes.func.isRequired,
};

export default PersistGridConfiguration;
