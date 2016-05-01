require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const util = require('../util.js');

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

var Model = require('../models/Model.js');
var PasswordEntryListForm = require('./PasswordEntryListForm.js')

const TAG = 'components.PasswordEntryListControllerForm';

class PasswordEntryListControllerForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {entries:null}
    this.state = {searchValue:'',searchField:'url'}
  }
  searchFieldChange(evt,index,value) {
    util.log(TAG,evt,index,value)
    this.setState({searchField:value})
  }
  searchValueChange(evt,index,value) {
    util.log(TAG,evt,index,value)
    this.setState({searchValue:evt.target.value})
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
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
