const { Model } = require("mongoose");
const aws = require("../middleware/aws");

const Models = require("../model/cardModel");
const validator = require("../validator/validator");

const createCard = async function (req, res) {
  try {
    let data = req.body;

    const {
      title,
      firstName,
      lastName,
      companyName,
      websiteURL,
      socialURLs,
      contactNumber,
      emailId,
      designation,
    } = data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "Please provide some data like (title, firstName...)",
      });
    }

    // title
    if (!validator.isValid(title)) {
      return res.status(400).send({
        status: false,
        message: "Please provide  title for example : Mr, Miss, Mrs",
      });
    }
    let titles = ["Mr", "Miss", "Mrs"];
    if (!titles.includes(title)) {
      return res.status(400).send({
        status: false,
        message: " Please provide title in correct format : Mr, Miss, Mrs",
      });
    }

    // First Name
    if (!validator.isValid(firstName)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  firstName" });
    }

    // Last Name
    if (!validator.isValid(lastName)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  lastName" });
    }

    // Company Name
    if (!validator.isValid(companyName)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  companyName" });
    }

    // Web Site URL
    if (!validator.isValid(websiteURL)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  websiteurl" });
    }
    let uniqueWebsiteURL = await Models.findOne({ websiteURL: websiteURL });
    if (uniqueWebsiteURL) {
      return res.status(400).send({
        status: false,
        message: " Please provide unique website URL ",
      });
    }
    if (!validator.isValidURL(websiteURL)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid websiteurl" });
    }

    // Social URL
    if (typeof socialURLs == "undefined") {
      return res
        .status(400)
        .send({ status: false, message: "Please provide atleast 1 socialURL" });
    }
    if (!validator.isValid(socialURLs[0])) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  socialURL" });
    }

    let uniqueSocialURL = await Models.findOne({ socialURLs: socialURLs });
    if (uniqueSocialURL) {
      return res.status(400).send({
        status: false,
        message: "Please provide different Social URL",
      });
    }
    if (socialURLs.length >= 4) {
      return res.status(400).send({
        status: false,
        message: "Please Don't provide more than 3 Social URL",
      });
    }

    if (socialURLs.length >= 1 || socialURLs.length <= 3) {
      for (let i = 0; i < socialURLs.length; i++) {
        if (!validator.isValidURL(socialURLs[i])) {
          return res.status(400).send({
            status: false,
            message: `Please enter valid socialURLs at ${i + 1}`,
          });
        }
      }
    }

    if (!validator.isValid(contactNumber)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  phone" });
    }
    if (!validator.isValidPhone(contactNumber)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid phone Number" });
    }

    if (!validator.isValid(emailId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  emailId" });
    }
    if (!validator.isValidEmail(emailId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid emailId" });
    }
    let uniqueEmailId = await Models.findOne({ emailId: emailId });
    if (uniqueEmailId) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide unique email Id" });
    }

    if (!validator.isValid(designation)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide  designation " });
    }

    let companylogo = req.files;
    if (companylogo && companylogo.length > 0) {
      let updateFileURL = await aws.uploadFile(companylogo[0]);
      console.log(updateFileURL);

      data.companyLogo = updateFileURL;
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Please upload company Logo  " });
    }

    const user = await Models.create(data);
    return res.status(201).send({
      status: true,
      message: " card created successfully",
      data: user,
    });
  } catch (err) {
    return res.send({ status: true, error: err.message });
  }
};

// GET

const getCard = async function (req, res) {
  try {
    let cardId = req.params.id;

    if (!validator.isValidObjectId(cardId)) {
      return res
        .status(400)
        .send({ status: false, message: " Please provide valid card Id" });
    }

    const cardDetails = await Models.findById(cardId);
    if (!cardDetails) {
      return res
        .status(404)
        .send({ status: false, message: " Card is not found " });
    }
    return res
      .status(200)
      .send({ status: true, message: "Successefully ", data: cardDetails });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createCard = createCard;
module.exports.getCard = getCard;
