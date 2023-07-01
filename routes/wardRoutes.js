import express from "express";
import { createWard, deleteWard, getAllWards, getWard, updateWard, addRoadsToWard } from "../controller/wardController.js";

const wardRoutes = express.Router();

//get all wards
wardRoutes.route("/").get(getAllWards)

//create a new ward
wardRoutes.route("/").post(createWard)

//get ward by id
wardRoutes.route("/:id").get(getWard)


//delete ward
wardRoutes.route("/:id").delete(deleteWard)

//update a ward
wardRoutes.route("/:id").put(updateWard)

//add ward to route
wardRoutes.route("/add-roads/:id").post(addRoadsToWard)


export default wardRoutes;