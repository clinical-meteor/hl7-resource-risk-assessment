import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import RiskAssessmentDetail from './RiskAssessmentDetail';
import RiskAssessmentsTable from './RiskAssessmentsTable';

Session.setDefault('selectedRiskAssessmentId', false);

export class RiskAssessmentsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('riskAssessmentPageTabIndex'),
      riskAssessmentSearchFilter: Session.get('riskAssessmentSearchFilter'),
      selectedRiskAssessmentId: Session.get('selectedRiskAssessmentId'),
      fhirVersion: Session.get('fhirVersion'),
      selectedRiskAssessment: false
    };

    if (Session.get('selectedRiskAssessmentId')){
      data.selectedDevice = RiskAssessments.findOne({_id: Session.get('selectedRiskAssessmentId')});
    } else {
      data.selectedDevice = false;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('riskAssessmentPageTabIndex', index);
  }f

  onNewTab(){
    Session.set('selectedRiskAssessmentId', false);
    Session.set('riskAssessmentUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In RiskAssessmentsPage render');
    return (
      <div id='riskAssessmentsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='RiskAssessments' />
            <CardText>
              <Tabs id="riskAssessmentsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newRiskAssessmentTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <RiskAssessmentDetail 
                  id='newRiskAssessment'
                  fhirVersion={ this.data.fhirVersion }
                  riskAssessment={ this.data.selectedRiskAssessment }
                  riskAssessmentId={ this.data.selectedRiskAssessmentId }  />
               </Tab>
               <Tab className="riskAssessmentListTab" label='RiskAssessments' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <RiskAssessmentsTable />
               </Tab>
               <Tab className="riskAssessmentDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <RiskAssessmentDetail 
                  id='riskAssessmentDetails' 
                  fhirVersion={ this.data.fhirVersion }
                  riskAssessment={ this.data.selectedRiskAssessment }
                  riskAssessmentId={ this.data.selectedRiskAssessmentId } />  
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(RiskAssessmentsPage.prototype, ReactMeteorData);

export default RiskAssessmentsPage;