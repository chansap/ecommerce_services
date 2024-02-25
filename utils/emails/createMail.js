const nodemailer = require("nodemailer");
const transporter = require("./mailTransport.js");
const emailHTMLTemplate = require("./mainGen.js");

const logger = require("../winstonLog.utils.js");

const createMail = (username) => {
  try {
    let message = {
      from: "vipin.raut10@gmail.com", // sender address
      to: username, // list of receivers
      subject: "Welcome to Ecommerce Website", // Subject line
      text: "This is a msg from our Ecom site for mail verification service", // plain text body
      html: emailHTMLTemplate(username), // html body
    };

    transporter.sendMail(message, (err, info) => {
      if (info) {
        // console.log(info);

        logger.info(`Mail sent to ${username}`);
        return true;
      } else {
        // res.status(500).json({ err });
        logger.error(`Mail can not be sent to ${username}`);
        console.log(err);
        return false;
      }
    });
  } catch (error) {
    logger.error(`Mail server problem`);
    console.log(error);
    return false;
  }
};

module.exports = {
  createMail,
};
