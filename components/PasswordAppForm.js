require("babel-polyfill");
var React = require('react');
var ReactRedux = require('react-redux');

var Model = require('../models/Model.js')

var PasswordEntryForm = require('./PasswordEntryForm.js')
var CredentialsKeyForm = require('./CredentialsKeyForm.js')
var PasswordEntryListControllerForm = require('./PasswordEntryListControllerForm.js')

class PasswordAppForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {entry:null,entries:null,secretKey:null}
  }
  render() {
    console.log('PasswordAppForm.render: props=',this.props,' state=',this.state)
    if(this.props.secretKey) {
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
  console.log('PasswordAppForm.mapStateToProps: ',state,props)
  return {
    entry:state.entry,
    entries:state.entries,
    secretKey:state.key.value
  };
})(PasswordAppForm);

module.exports = PasswordAppForm
