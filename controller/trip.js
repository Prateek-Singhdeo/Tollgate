const Trip = require('../models/trip.model');
const { errorHandler } = require('../helpers/dbErrorHandler');
const tripService = require('../services/trip');

exports.createToll = async (req,res) => {
   try {
        let data = await tripService.create(req.body);
        res.status(200).json({ data });
   } catch (error) {
            // let error=errorHandler(err);
            res.status(400).json({error});
   }
}

exports.getToll = async (tollid) => {
    let data = await tripService.findTrip(tollid);
    return data;
}

exports.checkValidity = async (req, res) => {
    try {
        let tolldata = await this.getToll(req.params.registrationNumber);
        if(tolldata.error) {
            res.status(400).json({error:tolldata.error});
        }
        if(tolldata) {
            if(tolldata.journeyType === 'One Way') {
                res.status(400).json({error: 'The bill was issued for one way not for return'});
            }
            let createdAt =  new Date(tolldata.createdAt);
            let currentTime  = Math.round(new Date().getTime() / 1000);
            let timeStamp_24_hrs_before = currentTime - (24 * 3600);
            let is24 = createdAt >= new Date(timeStamp_24_hrs_before*1000).getTime();
            if(is24) {
                res.status(200).json({valid: true, message: 'The bill was generated within 24hrs'});
            }
            else {
                res.status(400).json({error: 'The bill is not valid after 24hrs'});
            }
        }
    } catch (err) {
        let error = errorHandler(err);
        res.status(400).json({error});
    }
    
}