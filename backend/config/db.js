import mongoose from "mongoose";
const dbconnection = async (url) => {
    try {

        await mongoose.connect(url)

    }
    catch (e) {
        console.log(`${e}`.red.underline.bold);
        // process.exit(1)
    }
}
export default dbconnection