import app from "./src/express.js";
import { connectToDb } from "./src/mongoose.js";
import * as environments from './src/environments.js';

const start = async () => {
  await connectToDb();
  app.listen(environments.port, () => {
    console.log(`server running on port ${environments.port}`);
  });
};

start()