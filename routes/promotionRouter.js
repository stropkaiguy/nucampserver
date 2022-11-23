const express = require("express");
const Promotion = require("../models/promotion");
const promotionRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

promotionRouter
  .route("/")

  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.create(req.body)
        .then((promotions) => {
          console.log("Promotion Created", promotion);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /promotions");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

promotionRouter
  .route("/:promotionId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotions) => {
        if (promotion) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        } else {
          err = new Error(`promotion ${req.params.promotionId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.findById(req.params.promotionId)
        .then((promotions) => {
          if (promotion) {
            promotion.comments.push(req.body);
            promotion
              .save()
              .then((promotion) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(promotion);
              })
              .catch((err) => next(err));
          } else {
            err = new Error(`promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
          }
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      promotion
        .findByIdAndUpdate(
          req.params.promotionId,
          {
            $set: req.body,
          },
          { new: true }
        )
        .then((promotion) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.findByIdAndDelete(req.params.promotionId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

module.exports = promotionRouter;
