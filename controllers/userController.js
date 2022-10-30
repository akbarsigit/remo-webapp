const User = require('./../models/userModel');
const MakeError = require('./../utils/makeError');
const Booking = require('../models/bookingModel');
const Rental = require('../models/rentalModel');

//TODO
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const reqdelete = await User.findByIdAndDelete(req.params.id);
    if (!reqdelete) {
      return next(
        new MakeError(`Cannot delete an user with id=${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: 'An account has been deleted', data: {} });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.params.id);
    if (!user) {
      return next(new MakeError(`No user with id=${req.params.id}`, 404));
    }
  } catch (err) {
    next(err);
  }
};

exports.profileInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return next(new MakeError(`No user with id=${req.params.id}`, 404));
    }

    // const rental = await Rental.find({ _id: [...user.borrowedMotorId] });
    const rental = await Rental.find({ _id: user.borrowedMotorId });

    res.status(200).json({
      status: 'success',
      data: {
        user,
        rental
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const rental = await Rental.find({ _id: user.rentalId });

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(
        new MakeError(`Cannot find booking with id= ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        rental,
        user
      }
    });
  } catch (err) {
    next(err);
  }
};
