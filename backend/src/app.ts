import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

import { protect } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";

const app=express();

app.use(cors());
app.use(express.json());

app.use(
"/api/auth",
authRoutes
);

app.get(
"/api/profile",
protect,
(req,res)=>{

res.json({

message:
"Protected route working"

});

}
);

app.use(
"/api/dashboard",
dashboardRoutes
);

app.use(
"/api/leads",
leadRoutes
);

app.get(
"/",
(req,res)=>{

res.send(
"API running"
);

}
);

app.use(
errorHandler
);

export default app;