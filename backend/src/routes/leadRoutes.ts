import express from "express";

import {
createLead,
getLeads,
getSingleLead,
updateLead,
deleteLead,
exportLeadsCSV
} from "../controllers/leadController";

import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { body } from "express-validator";
import { validate } from "../middleware/validationMiddleware";

const router=express.Router();

router.post(
"/",
protect,

body("name")
.notEmpty()
.withMessage("Name required"),

body("email")
.isEmail()
.withMessage("Valid email required"),

body("status")
.optional()
.isIn([
"new",
"contacted",
"qualified",
"lost"
])
.withMessage(
"Invalid status"
),

body("source")
.optional()
.isIn([
"website",
"instagram",
"linkedin",
"facebook",
"referral",
"other"
])
.withMessage(
"Invalid source"
),

validate,

createLead
);

router.get(
"/",
protect,
getLeads
);

router.get(
"/export/csv",
protect,
exportLeadsCSV
);

router.get(
"/:id",
protect,
getSingleLead
);

router.put(
"/:id",
protect,

body("status")
.optional()
.isIn([
"new",
"contacted",
"qualified",
"lost"
]),

validate,

updateLead
);

router.delete(
"/:id",
protect,
authorizeRoles("admin"),
deleteLead
);

export default router;