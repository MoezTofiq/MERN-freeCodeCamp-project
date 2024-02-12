import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

// Middleware for parsing request body
app.use(express.json());

// middleware allow cors :
// option 1 : allow all origins, cors(*)
app.use(cors());
// option 2 : allow custom origins:
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["content-Type"],
//   })
// );

// use the routs defined at "bookRoute.js" for '/books' so because of the middle ware in bookRoute.js /books will be / for it
app.use("/books", booksRoute);

// root index
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("reply");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to mongoose");

    // running only if the database was able to connect
    app.listen(PORT, () => {
      console.log(`app is listenting to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "un-able to connect to mogoose database");
  });
