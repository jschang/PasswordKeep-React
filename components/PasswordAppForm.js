require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const util = require('../util.js');

const Model = require('../models/Model.js')

import Snackbar from 'material-ui/lib/snackbar';

const PasswordEntryForm = require('./PasswordEntryForm.js')
const CredentialsKeyForm = require('./CredentialsKeyForm.js')
const PasswordEntryListControllerForm = require('./PasswordEntryListControllerForm.js')

const TAG = 'components.PasswordAppForm';

class PasswordAppForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {
      entry:null,
      entries:null,
      secretKey:null,
      secretKeyAccepted:false,
      serviceMessage:'No problemo'
    }
    this.state = {showServiceMessage:true};
  }
  onCloseServiceMessage() {
    this.setState({showServiceMessage:false});
    this.props.onCloseServiceMessage();
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    var ret = [];
    if(this.props.secretKeyAccepted) {
      if(this.props.entry.entry) {
        ret.push(<PasswordEntryForm key="primary" entry={this.props.entry.entry} entryIndex={this.props.entry.index}/>);
      } else {
        ret.push(<PasswordEntryListControllerForm key="primary" entries={this.props.entries}/>);
      }
    } else {
      ret.push(<CredentialsKeyForm key="primary" />);
    }
    var state = this.state;
    return (
        <div>
          {ret}
          <Snackbar
            open={this.props.serviceMessage.length>0}
            message={this.props.serviceMessage}
            autoHideDuration={4000}
            onRequestClose={this.onCloseServiceMessage.bind(this)}
          />
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
    serviceMessage:state.serviceMessage
  };
},{
  onCloseServiceMessage:()=>{
    return {type:'CLEAR_SERVICE_MESSAGE'}
  }
})(PasswordAppForm);

module.exports = PasswordAppForm
