import { CardActions, CardText } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';
import { get, set } from 'lodash';




export class RiskAssessmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riskAssessmentId: false,
      riskAssessment: {
        resourceType: "RiskAssessment",
        subject: {
          display: "",
          reference: ""
        },
        date: null,
        condition: {
          reference: "",
          display: ""
        },
        encounter: {},
        performer: {
          display: "",
          reference: ""
        },
        basis:[{
          display: "",
          reference: ""
        }],
        prediction: [{
          title: "",
          outcome: {
            text: ""
          },
          probabilityDecimal: 0,
          rational: ""
        }],
        mitigation: ""
      },
      form: {
        subjectDisplay: '',
        subjectReference: '',
        conditionDisplay: '',
        conditionReference: '',
        performerDisplay: '',
        performerReference: '',
        text: '',
        date: '',
        predictionOutcome: '',
        probabilityDecimal: ''
      }
    }
  }
  dehydrateFhirResource(assessment) {
    let formData = Object.assign({}, this.state.form);

    formData.subjectDisplay = get(assessment, 'subject.display')
    formData.subjectReference = get(assessment, 'subject.reference')    
    formData.conditionDisplay = get(assessment, 'condition.display')
    formData.conditionReference = get(assessment, 'condition.reference')
    formData.performerDisplay = get(assessment, 'performer.display')
    formData.performerReference = get(assessment, 'performer.reference')
    formData.date = get(assessment, 'date')
    formData.predictionOutcome = get(assessment, 'prediction[0].outcome.text')
    formData.probabilityDecimal = get(assessment, 'prediction[0].probabilityDecimal')

    return formData;
  }
  shouldComponentUpdate(nextProps){
    process.env.NODE_ENV === "test" && console.log('RiskAssessmentDetail.shouldComponentUpdate()', nextProps, this.state)
    let shouldUpdate = true;

    // both false; don't take any more updates
    if(nextProps.riskAssessment === this.state.riskAssessment){
      shouldUpdate = false;
    }

    // received an riskAssessment from the table; okay lets update again
    if(nextProps.riskAssessmentId !== this.state.riskAssessmentId){
      this.setState({riskAssessmentId: nextProps.riskAssessmentId})
      
      if(nextProps.riskAssessment){
        this.setState({riskAssessment: nextProps.riskAssessment})     
        this.setState({form: this.dehydrateFhirResource(nextProps.riskAssessment)})       
      }
      shouldUpdate = true;
    }
 
    return shouldUpdate;
  }
  getMeteorData() {
    let data = {
      riskAssessmentId: this.props.riskAssessment,
      riskAssessment: false,
      form: this.state.form
    };

    if(this.props.riskAssessment){
      data.riskAssessment = this.props.riskAssessment;
    }

    return data;
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('RiskAssessmentDetail.render()', this.state)
    let formData = this.state.form;

    return (
      <div id={this.props.id} className="riskAssessmentDetail">
        <CardText>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={8}>
                  <TextField
                    id='subjectDisplayInput'
                    ref='subjectDisplay'
                    name='subjectDisplay'
                    floatingLabelText='Subject'
                    value={ get(formData, 'subjectDisplay') }
                    onChange={ this.changeState.bind(this, 'subjectDisplay')}
                    hintText='Jane Doe'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>
                </Col>
                <Col md={4}>
                  <TextField
                    id='subjectReferenceInput'
                    ref='subjectReference'
                    name='subjectReference'
                    floatingLabelText='Subject'
                    value={ get(formData, 'subjectReference') }
                    onChange={ this.changeState.bind(this, 'subjectReference')}
                    hintText='Patient/12345'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <TextField
                    id='conditionDisplayInput'
                    ref='conditionDisplay'
                    name='conditionDisplay'
                    floatingLabelText='Condition'
                    value={ get(formData, 'conditionDisplay') }
                    onChange={ this.changeState.bind(this, 'conditionDisplay')}
                    hintText='Breast Cancer - Stage IV'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>
                </Col>
                <Col md={4}>
                  <TextField
                    id='conditionReferenceInput'
                    ref='conditionReference'
                    name='conditionReference'
                    floatingLabelText='Condition'
                    value={ get(formData, 'conditionReference') }
                    onChange={ this.changeState.bind(this, 'conditionReference')}
                    hintText='Condition/777788'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>  
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <TextField
                    id='performerDisplayInput'
                    ref='performerDisplay'
                    name='performerDisplay'
                    floatingLabelText='Performer'
                    value={ get(formData, 'performerDisplay') }
                    onChange={ this.changeState.bind(this, 'performerDisplay')}
                    hintText='Dr. James Wilson'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>
                </Col>
                <Col md={4}>
                  <TextField
                    id='performerReferenceInput'
                    ref='performerReference'
                    name='performerReference'
                    floatingLabelText='Performer'
                    value={ get(formData, 'performerReference') }
                    onChange={ this.changeState.bind(this, 'performerReference')}
                    hintText='Practitioner/3333445'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>                      
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <TextField
                    id='dateInput'
                    ref='date'
                    name='date'
                    type='date'
                    floatingLabelText='Date'
                    value={ get(formData, 'date') }
                    onChange={ this.changeState.bind(this, 'date')}
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>   
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <TextField
                    id='predictionOutcomeInput'
                    ref='predictionOutcome'
                    name='predictionOutcome'
                    floatingLabelText='Prediction Outcome'
                    value={ get(formData, 'predictionOutcome') }
                    onChange={ this.changeState.bind(this, 'predictionOutcome')}
                    hintText='Melignancy; Death'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>
                  <TextField
                    id='probabilityDecimalInput'
                    ref='probabilityDecimal'
                    name='probabilityDecimal'
                    floatingLabelText='Probability Decimal'
                    value={ get(formData, 'probabilityDecimal') }
                    onChange={ this.changeState.bind(this, 'probabilityDecimal')}
                    hintText='18%'
                    floatingLabelFixed={true}
                    fullWidth
                    /><br/>
                </Col>
              </Row>
            </Col>
          </Row>
         
        </CardText>
        <CardActions>
          { this.determineButtons(this.state.riskAssessmentId) }
        </CardActions>
      </div>
    );
  }

  determineButtons(riskAssessmentId){
    if (riskAssessmentId) {
      return (
        <div>
          <RaisedButton id="updateRiskAssessmentButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteRiskAssessmentButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveRiskAssessmentButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }
  updateFormData(formData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("RiskAssessmentDetail.updateFormData", formData, field, textValue);

    switch (field) {
      case "subjectDisplay":
        set(formData, 'subjectDisplay', textValue)
        break;
      case "subjectReference":
        set(formData, 'subjectReference', textValue)
        break;        
      case "conditionDisplay":
        set(formData, 'conditionDisplay', textValue)
        break;
      case "conditionReference":
        set(formData, 'conditionReference', textValue)
        break;
      case "performerDisplay":
        set(formData, 'performerDisplay', textValue)
        break;
      case "performerReference":
        set(formData, 'performerReference', textValue)
        break;
      case "date":
        set(formData, 'date', textValue)
        break;
      case "predictionOutcome":
        set(formData, 'predictionOutcome', textValue)
        break;
      case "probabilityDecimal":
        set(formData, 'probabilityDecimal', textValue)
        break;
    }

    if(process.env.NODE_ENV === "test") console.log("formData", formData);
    return formData;
  }
  updateRiskAssessment(riskAssessmentData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("RiskAssessmentDetail.updateRiskAssessment", riskAssessmentData, field, textValue);

    switch (field) {
      case "subjectDisplay":
        set(riskAssessmentData, 'subject.display', textValue)
        break;
      case "subjectReference":
        set(riskAssessmentData, 'subject.reference', textValue)
        break;        
      case "conditionDisplay":
        set(riskAssessmentData, 'condition.display', textValue)
        break;
      case "conditionReference":
        set(riskAssessmentData, 'condition.reference', textValue)
        break;
      case "performerDisplay":
        set(riskAssessmentData, 'performer.display', textValue)
        break;
      case "performerReference":
        set(riskAssessmentData, 'performer.reference', textValue)
        break;
      case "date":
        set(riskAssessmentData, 'date', textValue)
        break;
      case "predictionOutcome":
        set(riskAssessmentData, 'prediction[0].outcome.text', textValue)
        break;
      case "probabilityDecimal":
        set(riskAssessmentData, 'prediction[0].probabilityDecimal', textValue)
        break;   
    }
    return riskAssessmentData;
  }

  changeState(field, event, textValue){
    if(process.env.NODE_ENV === "test") console.log("   ");
    if(process.env.NODE_ENV === "test") console.log("RiskAssessmentDetail.changeState", field, textValue);
    if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

    let formData = Object.assign({}, this.state.form);
    let riskAssessmentData = Object.assign({}, this.state.riskAssessment);

    formData = this.updateFormData(formData, field, textValue);
    riskAssessmentData = this.updateRiskAssessment(riskAssessmentData, field, textValue);

    if(process.env.NODE_ENV === "test") console.log("riskAssessmentData", riskAssessmentData);
    if(process.env.NODE_ENV === "test") console.log("formData", formData);

    this.setState({riskAssessment: riskAssessmentData})
    this.setState({form: formData})
  }

  handleSaveButton(){
    if(process.env.NODE_ENV === "test") console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&')
    console.log('Saving a new Risk Assessment...', this.state)

    let self = this;
    let fhirRiskAssessmentData = Object.assign({}, this.state.riskAssessment);

    if(process.env.NODE_ENV === "test") console.log('fhirRiskAssessmentData', fhirRiskAssessmentData);


    let riskAssessmentValidator = RiskAssessmentSchema.newContext();
    riskAssessmentValidator.validate(fhirRiskAssessmentData)

    console.log('IsValid: ', riskAssessmentValidator.isValid())
    console.log('ValidationErrors: ', riskAssessmentValidator.validationErrors());

    if (this.state.riskAssessmentId) {
      if(process.env.NODE_ENV === "test") console.log("Updating riskAssessment...");
      delete fhirRiskAssessmentData._id;

      RiskAssessments.update(
        {_id: this.state.riskAssessmentId}, {$set: fhirRiskAssessmentData }, {
          validate: false, 
          filter: false, 
          removeEmptyStrings: false
        }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "RiskAssessments", recordId: self.state.riskAssessmentId});
            Session.set('riskAssessmentPageTabIndex', 1);
            Session.set('selectedRiskAssessment', false);
            Bert.alert('RiskAssessment updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new riskAssessment", fhirRiskAssessmentData);

      RiskAssessments.insert(fhirRiskAssessmentData, {
        validate: false, 
        filter: false, 
        removeEmptyStrings: false
      }, function(error, result) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "RiskAssessments", recordId: self.state.riskAssessmentId});
          Session.set('riskAssessmentPageTabIndex', 1);
          Session.set('selectedRiskAssessment', false);
          Bert.alert('RiskAssessment added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('riskAssessmentPageTabIndex', 1);
  }

  handleDeleteButton(){
    let self = this;
    RiskAssessments.remove({_id: this.state.riskAssessmentId}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "RiskAssessments", recordId: self.state.riskAssessmentId});
        Session.set('riskAssessmentPageTabIndex', 1);
        Session.set('selectedRiskAssessment', false);
        Bert.alert('RiskAssessment removed!', 'success');
      }
    });
  }
}

RiskAssessmentDetail.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,
  riskAssessmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  riskAssessment: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
ReactMixin(RiskAssessmentDetail.prototype, ReactMeteorData);
export default RiskAssessmentDetail;