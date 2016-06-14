
// create the object using our BaseModel
RiskAssessment = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
RiskAssessment.prototype._collection = RiskAssessments;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
RiskAssessments = new Mongo.Collection('RiskAssessments');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
RiskAssessments._transform = function (document) {
  return new RiskAssessment(document);
};


if (Meteor.isClient){
  Meteor.subscribe("RiskAssessments");
}

if (Meteor.isServer){
  Meteor.publish("RiskAssessments", function (argument){
    if (this.userId) {
      return RiskAssessments.find();
    } else {
      return [];
    }
  });
}



RiskAssessmentSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "RiskAssessment"
  },
  "text" : {
    optional: true,
    type: String
   },
  "subject" : {
    optional: true,
    blackbox: true,
    type: ReferenceSchema
   }, // Who/what does assessment apply to?
  "date" : {
    optional: true,
    type: Date
  }, // When was assessment made?
  "condition" : {
    optional: true,
    blackbox: true,
    type: ReferenceSchema
  }, // (Condition) assessed
  "encounter" : {
    optional: true,
    blackbox: true,
    type: ReferenceSchema
  }, // (Encounter) Where was assessment performed?
  "performer" : {
    optional: true,
    blackbox: true,
    type: ReferenceSchema
  }, // (Practitioner|Device) Who did assessment?
  "identifier" : {
    optional: true,
    type: IdentifierSchema
  }, // Unique identifier for the assessment
  "method" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Evaluation mechanism
  "basis" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, // Information used in assessment

  "prediction.$.outcome" : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  Possible outcome for the subject
  // probability[x]: Likelihood of specified outcome. One of these 3:
  "prediction.$.probabilityDecimal" : {
    optional: true,
    decimal: true,
    type: Number
  },
  "prediction.$.probabilityRange" : {
    optional: true,
    type: RangeSchema
  },
  "prediction.$.probabilityCodeableConcept" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "prediction.$.relativeRisk" : {
    optional: true,
    type: Number
  }, // Relative likelihood
  // when[x]: Timeframe or age range. One of these 2:
  "prediction.$.whenPeriod" : {
    optional: true,
    type: PeriodSchema
  },
  "prediction.$.whenRange" : {
    optional: true,
    type: RangeSchema
  },
  "prediction.$.rationale" : {
    optional: true,
    type: String
  }, // Explanation of prediction
  "mitigation" : {
    optional: true,
    type: String
  }

});
RiskAssessments.attachSchema(RiskAssessmentSchema);
