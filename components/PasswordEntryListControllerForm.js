require("babel-polyfill");
var React = require('react');
var ReactRedux = require('react-redux');
var Redux = require('redux');

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import TextField from 'material-ui/lib/text-field';

var Model = require('../models/Model.js');
var PasswordEntryListForm = require('./PasswordEntryListForm.js')

class PasswordEntryListControllerForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {entries:null}
    this.state = {searchValue:'',searchField:'url'}
  }
  searchFieldChange(evt,index,value) {
    console.log(evt,index,value)
    this.setState({searchField:value})
  }
  searchValueChange(evt,index,value) {
    console.log(evt,index,value)
    this.setState({searchValue:evt.target.value})
  }
  render() {
    console.log('PasswordEntryListControllerForm.render: props=',this.props,' state=',this.state)
    return (
      <div style={Model.getState().css.centerDiv}>
        <SelectField style={Model.getState().css.searchField}
            value={this.state.searchField}
            onChange={this.searchFieldChange.bind(this)}>
          <MenuItem value="url" primaryText="URL"/>
          <MenuItem value="description" primaryText="Description"/>
          <MenuItem value="username" primaryText="Username"/>
        </SelectField>
        <TextField style={Model.getState().css.searchValue}
            floatingLabelText="Search Field"
            value={this.state.value}
            onChange={this.searchValueChange.bind(this)} />
        <PasswordEntryListForm
            entries={this.props.entries}
            searchField={this.state.searchField}
            searchValue={this.state.searchValue} />
      </div>
    )
  }
}

PasswordEntryListForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  return {entries:state.entries};
},null)(PasswordEntryListForm);

module.exports = PasswordEntryListControllerForm
