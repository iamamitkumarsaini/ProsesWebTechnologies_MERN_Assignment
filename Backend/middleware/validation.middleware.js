const mobilePattern = /^[1-9]\d{0,9}$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidMobileNumber = (mobileNumber) => {
  return mobilePattern.test(mobileNumber);
};

const isValidEmail = (email) => {
  return emailPattern.test(email);
};



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