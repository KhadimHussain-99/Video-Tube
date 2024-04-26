import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is listening at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection Failed !!! ", err);
  });

/*
// First approach

import express from "express"
const app = express()
(async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("ERROR:", error)
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
})();
*/
