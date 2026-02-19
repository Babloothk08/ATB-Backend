import express from "express";
import { searchFlights } from "../controllers/flight.controller.js";

const router = express.Router();

router.post("/search-flights", searchFlights);

export default router;
