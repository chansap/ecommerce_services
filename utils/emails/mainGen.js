var Mailgen = require("mailgen");

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
  theme: "salted",
  product: {
    // Appears in header & footer of e-mails
    name: "Ecommerce website by Chandra",
    link: "https://mailgen.js/",
  },
});

const emailHTMLTemplate = (userName) => {
  var emailBody = {
    body: {
      name: userName,
      intro:
        "Welcome to Ecommerce App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Ecom App, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://google.co.in",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailTemplate = mailGenerator.generate(emailBody);
  return emailTemplate;
};

module.exports = emailHTMLTemplate;
