

import RiskAssessmentsPage from './client/RiskAssessmentsPage';
import RiskAssessmentsTable from './client/RiskAssessmentsTable';
import { RiskAssessment, RiskAssessments, RiskAssessmentSchema } from './lib/RiskAssessments';

var DynamicRoutes = [{
  'name': 'RiskAssessmentsPage',
  'path': '/risk-assessments',
  'component': RiskAssessmentsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Risk Assessments',
  'to': '/risk-assessments',
  'href': '/risk-assessments'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  RiskAssessmentsPage,
  RiskAssessmentsTable,

  RiskAssessment,
  RiskAssessments,
  RiskAssessmentSchema
};


