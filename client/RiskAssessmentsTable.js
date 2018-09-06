import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

import { Table } from 'react-bootstrap';
import { get } from 'lodash';

export default class RiskAssessmentsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      riskAssessments: RiskAssessments.find().fetch()
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('riskAssessmentsUpsert', false);
    Session.set('selectedRiskAssessmentId', id);
    Session.set('riskAssessmentPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.riskAssessments.length; i++) {

      let newRow = {
        date: get(this.data.riskAssessments[i], 'date'),
        subjectDisplay: get(this.data.riskAssessments[i], 'subject.display'),
        conditionDisplay: get(this.data.riskAssessments[i], 'condition.display'),
        performerDisplay: get(this.data.riskAssessments[i], 'performer.display'),
        predictionOutcome: get(this.data.riskAssessments[i], 'prediction[0].outcome.text'),
        probabilityDecimal: get(this.data.riskAssessments[i], 'prediction[0].probabilityDecimal'),
      }
      tableRows.push(
        <tr key={i} className="riskAssessmentRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.riskAssessments[i]._id)} >

          <td className='date'>{ newRow.date }</td>
          <td className='subjectDisplay'>{ newRow.subjectDisplay }</td>
          <td className='conditionDisplay'>{ newRow.conditionDisplay }</td>
          <td className='performerDisplay'>{ newRow.performerDisplay }</td>
          <td className='predictionOutcome'>{ newRow.predictionOutcome }</td>
          <td className='probabilityDecimal'>{ newRow.probabilityDecimal }</td>
        </tr>
      )
    }

    return(
      <Table id='riskAssessmentsTable' responses hover >
        <thead>
          <tr>
            <th className='date'>Date</th>
            <th className='subjectDisplay'>Subject</th>
            <th className='conditionDisplay'>Condition</th>
            <th className='performerDisplay'>Performer</th>
            <th className='predictionOutcome'>Outcome</th>
            <th className='probabilityDecimal'>Probability</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(RiskAssessmentsTable.prototype, ReactMeteorData);
