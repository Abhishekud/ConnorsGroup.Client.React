import {Component} from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';
import {styles, footer, header} from '../../standards/services/methodReport';

export default class ReportComponent extends Component {

  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  styles() {
    return styles();
  }

  footer(landscape) {
    const time = moment().format('MM/DD/YYYY hh:mm:ss A');
    return footer(landscape, time);
  }

  header(title, clientName, id, landscape) {
    return header(title, clientName, id, landscape);
  }
}
