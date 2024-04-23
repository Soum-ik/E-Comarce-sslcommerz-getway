const express = require("express");
const router = express.Router();
import { payment } from "../controller/payment";

router.post("/sslcommerz/payment", payment);
