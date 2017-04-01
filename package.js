Package.describe({
  name: 'clinical:hl7-resource-risk-assessment',
  version: '1.4.1',
  summary: 'HL7 FHIR Resource - Risk Assessment',
  git: 'https://github.com/clinical-meteor/hl7-resource-risk-assessment',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('aldeed:collection2@2.5.0');
  api.use('simple:json-routes@2.1.0');

  api.use('clinical:base-model@1.3.5');
  api.use('clinical:hl7-resource-datatypes@3.0.0');

  api.addFiles('lib/hl7-resource-risk-assessment.js', ['client', 'server']);
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  // clinical:fhir-vault-server is a licensed product, so may not exist
  try {
    api.use('clinical:fhir-vault-server@0.0.3');        
  } catch (error) {
    console.log('clinical:fhir-vault-server not found; Skipping.');
  }

  api.export('RiskAssessment');
  api.export('RiskAssessments');
  api.export('RiskAssessmentSchema');
});
