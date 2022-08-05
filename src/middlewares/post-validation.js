const { body } = require("express-validator");
exports.validate = (method) => {
  // use method for validation
  switch (method) {
    case "addPost": {
      return [
        body("title", "Invalid title").exists(),
        body("body", "there should be a proper boby").exists(),
        body("isPublish", "Invalid isPublish Value").exists().isBoolean(),
        body("userId", "There should be a proper userID").isMongoId(),
      ];
    }
    case "editPost": {
      return [
        body("title", "Invalid title").exists(),
        body("body", "there should be a proper boby").exists(),
        body("isPublish", "Invalid isPublish Value").exists().isBoolean(),
        body("userId", "There should be a proper userID").isMongoId(),
      ];
    }
  }
};
