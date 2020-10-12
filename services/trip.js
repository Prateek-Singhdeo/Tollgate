const Trip = require('../models/trip.model');
// const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = async (tripdetail) => {
   
    if(tripdetail.journeyType === 'One Way') {
        tripdetail.amount = 100;
    }
    else {
        tripdetail.amount = 200;
    }
    const trip = new Trip(tripdetail);
    let newTrip = await trip.save();
    return newTrip;
}

exports.findTrip = async (registrationNumber) => {

    let trip = await Trip.findOne({registrationNumber: registrationNumber}).exec();
    if(!trip) {
        return {error: `Toll not found for registraion number  ${registrationNumber}`};
    }
    return trip;
}