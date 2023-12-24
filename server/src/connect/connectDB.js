import mongoose from 'mongoose';

const connect = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1/foodsviet_blog");
        console.log("Connect Database Successfully!!!");

        const db = conn.connection;
        const changeStream = db.watch(); // create change stream on the entire database

        changeStream.on('change', (change) => {
            console.log('change :', change);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
module.exports = { connect };
