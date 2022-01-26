export const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const validatePhone = (phone) => {
  // TODO: use a module for this
  let re = /^(\+\d{1,3}[- ]?)?\d{10}$/; // \d{1,3} accepts country code with up to 3 digit
  return re.test(phone);
};

export const checkPhoneOrEmail = (value) => {
  if (validateEmail(value)) {
    return "email";
  }
  if (validatePhone(value)) {
    return "phone";
  }

  return "invalid";
};
