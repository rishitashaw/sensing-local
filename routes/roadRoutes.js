import express from "express";
import { createRoad, deleteRoad, getAllRoads, getRoad, updateRoad } from "../controller/roadController.js";

const roadRoutes = express.Router();

//get all roads
roadRoutes.route("/").get(getAllRoads)

//create a new road
roadRoutes.route("/").post(createRoad)

//get road by id
roadRoutes.route("/:id").get(getRoad)


//delete road
roadRoutes.route("/:id").delete(deleteRoad)

//update a road
roadRoutes.route("/:id").put(updateRoad)



export default roadRoutes;