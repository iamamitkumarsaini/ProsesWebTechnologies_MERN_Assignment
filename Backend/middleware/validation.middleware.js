// Regular expression pattern to validate a mobile number.
// he mobile number must be a non-zero digit followed by 0 to 9 digits.
const mobilePattern = /^[1-9]\d{0,9}$/;

// Regular expression pattern to validate an email address.
// The email address must follow the standard email format.
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// Checking if a mobile number is valid or not.
// If valid return true, else false
const isValidMobileNumber = (mobileNumber) => {
  return mobilePattern.test(mobileNumber);
};


// Checking if a email is valid or not.
// If valid return true, else false
const isValidEmail = (email) => {
  return emailPattern.test(email);
};


// Middleware function for data validation.
// It checks if the mobile number and email address are valid based on the defined patterns or not.
// - If all are valid then pass the req to next operation.
// - else send appropriate response to the user
const dataValidation = (req,res,next) => {

  if(req.url === "/user/add" || req.url === "/edit/:id"){
    
    const { email, mobileNum } = req.body;
    const number = mobileNum.toString();
    console.log(mobileNum);

    if(isValidMobileNumber(mobileNum) && isValidEmail(email) && mobileNum.length === 10){

            next()
    }
    else{
      if(!isValidMobileNumber(mobileNum) || mobileNum.length !== 10){
        res.send({message: "This Mobile Number is not valid"})
      }
      else{
        res.send({message: "This Email is not valid"})
      }
    }
  }

  else{
    next()
  }
}


module.exports = { dataValidation };
