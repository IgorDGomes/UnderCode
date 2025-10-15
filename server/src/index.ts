import express from "express";
import dotenv from "dotenv";
import requestLogger from "./middlewares/requestLogger";
import unknownEndPoint from "./middlewares/unknownEndPoint";
import NewsRoute from "./routes/news";
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = { origin: process.env.ORIGIN || "*" }
console.log(corsOptions);
app.use(cors(corsOptions))

app.use(requestLogger)

NewsRoute(app)

app.use(unknownEndPoint)

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
