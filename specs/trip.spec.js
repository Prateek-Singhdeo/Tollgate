let trip = require("../controller/trip");
let tripservice = require("../services/trip")
let sinon = require("sinon");
let chai = require("chai");
let expect = chai.expect;

describe("check the validty of toll receipt", function() {

    beforeEach(function() {
      sinon.restore();
    });
  
    it("getToll method getting called", function() {
      var spy = sinon.spy(trip, "getToll");
      let req = {
        params: {
            registrationNumber: '12345'
        }
      };
      let res = {};
      trip.checkValidity(req, res);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith('12345')).to.be.true;
    });

    it("findTrip method getting called", function() {
        var spy = sinon.spy(tripservice, "findTrip");
        trip.getToll('1234');
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith('1234')).to.be.true;
      });
  });
  
describe("Test for getToll method", function() {
    beforeEach(function() {
        sinon.restore();
      });
    it("Test for getToll method", function() {
        var stub = sinon.stub(tripservice, "findTrip");
        stub
        .withArgs('123')
        .resolves({
            "registrationNumber" : "123",
            "journeyType" : "Two Way",
            "amount" : 200,
            "tollnumber": 1
        });
        this.timeout(0);
        trip.getToll().then(function(result) {
            expect(result).to.be.equal({
                "registrationNumber" : "123",
                "journeyType" : "Two Way",
                "amount" : 200,
                "tollnumber": 1
            });
            done();
        });
    });
});