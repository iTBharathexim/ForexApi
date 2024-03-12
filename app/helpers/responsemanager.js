let responseJson = {
  "2000": {
    status: 200,
    errorCode: 2000,
    developerMessage: "success",
    userMessage: ""
  },
  "2001": {
    status: 200,
    errorCode: 2001,
    developerMessage: "success",
    userMessage: "Thank you for sign up, welcome to wrked"
  },
  "5000": {
    status: 500,
    errorCode: 5000,
    developerMessage: "errors",
    userMessage: ""
  },
  "5001": {
    status: 500,
    errorCode: 5001,
    developerMessage: "errors",
    userMessage: "Your email is not verified"
  },
  "5002": {
    status: 500,
    errorCode: 5002,
    developerMessage: "errors",
    userMessage: "You have already registered with us please signin"
  },
  "5003": {
    status: 500,
    errorCode: 5003,
    developerMessage: "errors",
    userMessage: "Your token on signup is expired please signup again or contact administrator"
  },
  "5004": {
    status: 500,
    errorCode: 5004,
    developerMessage: "errors",
    userMessage: "Invalid email, Seems you haven't registered with us try signing up"
  },
  "5005": {
    status: 500,
    errorCode: 5005,
    developerMessage: "errors",
    userMessage: "Invalid credentials, Check if your email or password is incorrect."
  }

};
module.exports = {
    responseManager : (res, code, userresponse, developerMessage, userMessage) => {
        let response = responseJson[code];
        if (developerMessage) {
            response.developerMessage = developerMessage;
        }
        if (userMessage) {
            response.userMessage = userMessage;
        }
        response.data = userresponse;
        res.status(response.status);
        res.send(response);
    }
};