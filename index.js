import app from "./src/express.js";
import { connectToDb } from "./src/mongoose.js";

const start = async () => {
    await connectToDb();
    app.listen(5000, ()=>{
        console.log("server running on port 5000");
    })
}

start()