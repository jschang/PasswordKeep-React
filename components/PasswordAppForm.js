require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const util = require('../util.js');

const Model = require('../models/Model.js')

import Snackbar from 'material-ui/lib/snackbar';

const CredentialsKeyForm = require('./CredentialsKeyForm.js')
const NewCredentialsKeyForm = require('./NewCredentialsKeyForm.js')
const PasswordEntryListControllerForm = require('./PasswordEntryListControllerForm.js')
const PasswordEntryForm = require('./PasswordEntryForm.js')

import Alert from 'react-bootstrap/lib/Alert';

const TAG = 'components.PasswordAppForm';

class PasswordAppForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {
      entry:null,
      entries:null,
      secretKey:null,
      secretKeyAccepted:false,
      serviceMessage:'No problemo',
      showNewCredentialsKeyForm:null
    }
  }
  onCloseServiceMessage() {
    this.props.onCloseServiceMessage();
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    var ret = [];
    if(this.props.serviceMessage.length>0) {
      ret.push(
        <Alert key={'serviceMessage'} bsStyle={'warning'} closeLabel={'Close'}
            onDismiss={this.onCloseServiceMessage.bind(this)}>
          {this.props.serviceMessage}
        </Alert>
      );
    }
    if(this.props.secretKeyAccepted) {
      if(this.props.entry.entry) {
        ret.push(<PasswordEntryForm key="primary" entry={this.props.entry.entry} entryIndex={this.props.entry.index}/>);
      } else {
        ret.push(<PasswordEntryListControllerForm key="primary" entries={this.props.entries}/>);
      }
    } else {
      if(this.props.showNewCredentialsKeyForm) {
        ret.push(<NewCredentialsKeyForm key="primary" />);
      } else {
        ret.push(<CredentialsKeyForm key="primary" />);
      }
    }
    var state = this.state;
    return (
        <div>
          {ret}
        </div>
      );
  }
}

PasswordAppForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  return {
    entry:state.entry,
    entries:state.entries,
    secretKey:state.key.value,
    secretKeyAccepted:state.key.accepted,
    serviceMessage:state.serviceMessage,
    showNewCredentialsKeyForm:state.storeStatus.created===false
  };
},{
  onCloseServiceMessage:()=>{
    return {type:'CLEAR_SERVICE_MESSAGE'}
  }
})(PasswordAppForm);

module.exports = PasswordAppForm
