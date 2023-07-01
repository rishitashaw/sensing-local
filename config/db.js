
import mongoose from "mongoose";
import colors from "colors";

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${ conn.connection.host }`.blue.underline);
    } catch (error) {
        console.log(`Error: ${ error.message }`.red.bold);
        process.exit();
    }
};

export { connectMongoDB };
