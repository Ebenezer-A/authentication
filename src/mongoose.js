import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/authentication', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MogoDb connection successful");
    } catch(error) {
        console.log("Mongo connection failed");
        throw error
    }

}