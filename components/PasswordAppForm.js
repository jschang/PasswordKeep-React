require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const util = require('../util.js');

const Model = require('../models/Model.js')

const PasswordEntryForm = require('./PasswordEntryForm.js')
const CredentialsKeyForm = require('./CredentialsKeyForm.js')
const PasswordEntryListControllerForm = require('./PasswordEntryListControllerForm.js')

const TAG = 'components.PasswordAppForm';

class PasswordAppForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {entry:null,entries:null,secretKey:null}
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    if(this.props.secretKeyAccepted) {
      if(this.props.entry.entry) {
        return <PasswordEntryForm entry={this.props.entry.entry} entryIndex={this.props.entry.index}/>;
      } else {
        return <PasswordEntryListControllerForm entries={this.props.entries}/>;
      }
    } else {
      return <CredentialsKeyForm/>;
    }
  }
}

PasswordAppForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  return {
    entry:state.entry,
    entries:state.entries,
    secretKey:state.key.value,
    secretKeyAccepted:state.key.accepted
  };
})(PasswordAppForm);

module.exports = PasswordAppForm
