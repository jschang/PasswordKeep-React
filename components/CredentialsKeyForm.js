require("babel-polyfill");
var React = require('react');
var ReactRedux = require('react-redux');
var Redux = require('redux');

import TextField from 'material-ui/lib/text-field';

var Model = require('../models/Model.js');

class CredentialsKeyForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {value:''}
  }
  render() {
    console.log('in render: props=',this.props,' state=',this.state)
    return (<TextField
      floatingLabelText="Credentials Store Key"
      style={Model.getState().css.key}
      id="storePasswordInput"
      type="password"
      onKeyUp={this.props.onKeyUp}/>)
  }
}

CredentialsKeyForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  console.log('CredentialsKeyForm: ',state,props);
  return {value:state.key.value}
},{
  // map dispatchable events to props
  onKeyUp: (evt) => {
    if(evt.keyCode==13) {
      return {
        type:'SET_STORE_PASSWORD',
        value:evt.target.value
      }
    }
    return {type:null}
  }
})(CredentialsKeyForm);

module.exports = CredentialsKeyForm
