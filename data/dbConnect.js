const Mongoose = require("mongoose");

const dbConnection = () => {
  Mongoose.connect(
    process.env.DB_LOCAL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    },
    (error, data) => {
      if (error) throw error;
      console.log(`DB connected successfully with ${data.connection.host}`);
    }
  );
};

module.exports = dbConnection;
