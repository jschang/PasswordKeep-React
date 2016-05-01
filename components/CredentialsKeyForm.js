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
import FormControl from 'react-bootstrap/lib/FormControl';

const Model = require('../models/Model.js');
const TAG = 'components.CredentialsKeyForm';

class CredentialsKeyForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {value:''}
  }
  onKeyUp(evt) {
    if(evt.keyCode==13) {
      this.props.onEnterPressed(evt);
    }
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    return (
      <Grid>
        <br/><br/><br/>
        <Row>
          <Col xs={6} xsOffset={3}>
            <Form inline onSubmit={(evt)=>{evt.preventDefault()}}>
              <FormGroup style={{width:'100%'}} bsSize='lg'>
                <FormControl style={{width:'100%'}}
                  componentClass='input'
                  placeholder='Password'
                  type='password'
                  onKeyUp={this.onKeyUp.bind(this)} />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
      )
  }
}

CredentialsKeyForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  util.log(TAG,'mapStateToProps: state=',state,', props=',props);
  return {value:state.key.value}
},{
  // map dispatchable events to props
  onEnterPressed: (evt) => {
    return {type:'SET_STORE_PASSWORD',value:evt.target.value}
  }
})(CredentialsKeyForm);

module.exports = CredentialsKeyForm
