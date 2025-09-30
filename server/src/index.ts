import express from "express";
import dotenv from "dotenv";
import requestLogger from "./middlewares/requestLogger";
import unknownEndPoint from "./middlewares/unknownEndPoint";
import NewsRoute from "./routes/news";


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(requestLogger)

NewsRoute(app)

app.use(unknownEndPoint)

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
