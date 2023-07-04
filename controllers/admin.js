const Restaurant = require("../models/resturant");
const Review = require("../models/review");
const sequelize = require('sequelize');


exports.getPerformance = async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        attributes: [
          'id',
          'name',
          [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'total_reviews'],
        ],
        include: [
          {
            model: Review,
            attributes: [],
            required: false,
          },
        ],
        group: ['resturants.id', 'resturants.name'],
      });
  
      res.status(200).json(restaurants);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred while retrieving the restaurant performance data.' });
    }
  };

exports.postRestaurant = async (req, res, next) => {
  const name = req.body.name;
  const location = req.body.location;
  const description = req.body.description;
  try {
    const response = await Restaurant.create({
      name: name,
      location: location,
      description: description,
    });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
