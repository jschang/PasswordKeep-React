require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const util = require('../util.js');

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

var Model = require('../models/Model.js');
var PasswordEntryListForm = require('./PasswordEntryListForm.js')

const TAG = 'components.PasswordEntryListControllerForm';

class PasswordEntryListControllerForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {entries:null}
    this.state = {searchValue:'',searchField:'url'}
  }
  searchFieldChange(evt,index,value) {
    util.log(TAG+'.searchFieldChange',evt,index,value)
    this.setState({searchField:evt.target.value})
  }
  searchValueChange(evt,index,value) {
    util.log(TAG+'.searchValueChange',evt,index,value)
    this.setState({searchValue:evt.target.value})
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <Form inline onSubmit={(evt)=>{evt.preventDefault()}}>
              
                <br/><br/>
                <Button style={{width:'100%'}} onClick={()=>{}}>New Entry</Button>
                <br/><br/>
                
                <FormGroup style={{width:'100%'}} bsSize='lg'>
                  <FormControl style={{width:'100%'}}
                      componentClass="select" 
                      value={this.state.searchField}
                      onChange={this.searchFieldChange.bind(this)}>
                    <option value="url">URL</option>
                    <option value="description">Description</option>
                    <option value="username">Username</option>
                  </FormControl>
                </FormGroup>
                <br/><br/>
                
                <FormGroup style={{width:'100%'}} bsSize='lg'>
                  <FormControl style={{width:'100%'}}
                    componentClass='input'
                    placeholder='Search Field'
                    type='text'
                    onChange={this.searchValueChange.bind(this)} />
                </FormGroup>
                <br/><br/>
                
              </Form>
            </Col>
          </Row>
        </Grid>
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
