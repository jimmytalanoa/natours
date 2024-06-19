// review / rating / createdAt / ref to tour / ref to user

//challenge
// create endpoint for getting review
// create endpoint for creating review
// create controller file reviewController
//create routes in file reviewRoutes
// create review
// retrieve review

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please provide your review.'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      default: 3,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a Tour'],
      },
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIRTUALS

// DOCUMENT MIDDLEWARE: runs before .save() and .create()

// QUERY MIDDLEWARE

// AGGREGATION MIDDLEWARE
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
