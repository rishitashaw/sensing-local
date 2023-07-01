import express from "express";
import { getAllUpcomingVisits, getAllPastVisits, createVisit, deleteVisit, updateVisit, getVisit, addRoadsToVisit } from "../controller/visitController.js";
import { createLine } from "../controller/lineController.js";
import { createSpot } from "../controller/spotController.js";

const visitRoutes = express.Router();

//get all upcming visits for user
visitRoutes.route("/").get(getAllUpcomingVisits)

//get all past visits for user
visitRoutes.route("/past").get(getAllPastVisits)

//create a new visit
visitRoutes.route("/").post(createVisit)

visitRoutes.route("/:id").get(getVisit)

//update a visit
visitRoutes.route("/:id").put(updateVisit)

//delete a visit
visitRoutes.route("/:id").delete(deleteVisit)

visitRoutes.route("/addLine/:id").post(createLine)

//add spots
visitRoutes.route("/addSpot/:id").post(createSpot)

//add roads to visit
visitRoutes.route("/addRoad/:id").post(addRoadsToVisit)

export default visitRoutes;