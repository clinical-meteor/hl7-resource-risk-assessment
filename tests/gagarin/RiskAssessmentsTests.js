describe('clinical:hl7-resources-risk-assessment', function () {
  var server = meteor();
  var client = browser(server);

  it('RiskAssessments should exist on the client', function () {
    return client.execute(function () {
      expect(RiskAssessments).to.exist;
    });
  });

  it('RiskAssessments should exist on the server', function () {
    return server.execute(function () {
      expect(RiskAssessments).to.exist;
    });
  });

});
