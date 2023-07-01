import express from "express";
import { createLine } from "../controller/lineController.js";

const lineRoutes = express.Router();

//create line record

lineRoutes.route("/").post(createLine)