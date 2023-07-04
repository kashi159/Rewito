const Restaurant = require('../models/resturant');
const Review = require('../models/review');
const Sequelize = require('sequelize');

exports.getRestaurants = async (req, res, next) => {
    try{
        const restaurants = await Restaurant.findAll();
        return res.status(200).json(restaurants);
    } catch(err) {
        console.log(err);
    }
}

exports.getDetails = async (req, res, next) =>{
    const id = req.params.id;
    try{
        const restaurant = await Restaurant.findByPk(id, {
            include: [{ model: Review }],
          });
          if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
          }
          return res.status(200).json(restaurant);
    } catch(err) {
        console.log(err);
    }
}

exports.postReview = async (req, res, next) =>{
    const id = req.params.id;
    const review = req.body.review;
    console.log(review)
    try{
        const response = await Review.create({
            review: review,
            resturantId: id
        });
        return res.json(response);
    }catch(err) {
        console.log(err);
    }
}