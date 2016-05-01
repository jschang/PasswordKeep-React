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

const Model = require('../models/Model.js');
const TAG = 'components.CredentialsKeyForm';

const newStore = require('../requests/NewStore.js');

class NewCredentialsKeyForm extends React.Component {
  componentWillMount() {
    this.state = {password:'',passwordConfirm:''}
  }
  onKeyUpPass(evt) {
    this.setState({password:evt.target.value});
  }
  onKeyUpPassConf(evt) {
    this.setState({passwordConfirm:evt.target.value});
  }
  onSubmit(evt) {
    if(this.state.password!=this.state.passwordConfirm) {
    }
    newStore(this.state.password,this.state.passwordConfirm,(data) => {
      if(data.error==false) {
        Model.dispatch({type:'SERVICE_MESSAGE',message:data.message});
        this.props.onSuccess(this.state.password);
      } else {
        Model.dispatch({type:'SERVICE_MESSAGE',message:data.message});
      }
    });
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    return (
      <Grid>
        <br/><br/><br/>
        <Row>
          <Col xs={6} xsOffset={3}>
            <Form onSubmit={(evt)=>{evt.preventDefault()}}>
              <FormGroup style={{width:'100%'}} bsSize='lg'>
                <FormControl style={{width:'100%'}}
                  componentClass='input'
                  placeholder='Password'
                  type='password'
                  onKeyUp={this.onKeyUpPass.bind(this)} />
              </FormGroup>
              <br/><br/>
              <FormGroup style={{width:'100%'}} bsSize='lg'>
                <FormControl style={{width:'100%'}}
                  componentClass='input'
                  placeholder='Password Confirm'
                  type='password'
                  onKeyUp={this.onKeyUpPassConf.bind(this)} />
              </FormGroup>
              <br/><br/>
              <Button onClick={this.onSubmit.bind(this)}>Create Credentials Store</Button>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

NewCredentialsKeyForm = ReactRedux.connect(null,{
  // map dispatchable events to props
  onSuccess:(password)=>{
    return {type:'SET_STORE_PASSWORD',value:password};
  }
})(NewCredentialsKeyForm);

module.exports = NewCredentialsKeyForm
