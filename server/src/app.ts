import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WHITELISTED_ORIGINS } from "./config";
import morgan from "morgan";
import { errorHandler } from "./services/errorHandling";
import apiRoutes from "./routes";
import { ENVIRONMENT } from "./config/constants";
import { connectToMongo } from "./config/dbConnection";

const app: Express = express();

app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (
        ENVIRONMENT === "development"
          ? true
          : WHITELISTED_ORIGINS.indexOf(origin) !== -1
      ) {
        callback(null, true);
      } else {
        callback(new Error("You are very chalak bro....."));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectToMongo()
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(apiRoutes);
app.use(errorHandler);

export { app };
