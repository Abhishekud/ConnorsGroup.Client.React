import {PropTypes} from 'prop-types';

export default function App({children}) {
  return children;
}

App.propTypes = {
  children: PropTypes.element,
};
