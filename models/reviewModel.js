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
reviewSchema.pre(/^find/, function (next) {
  // populate user and tour within the review
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

// AGGREGATION MIDDLEWARE
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
