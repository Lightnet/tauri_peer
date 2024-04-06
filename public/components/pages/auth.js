

import SignIn from "../auth/signin.js";
import SignOut from "../auth/signout.js";
import SignUp from "../auth/signup.js";

function SignInPage(){
  return SignIn()
}

function SignOutPage(){
  return SignOut()
}

function SignUpPage(){
  return SignUp()
}


export {
  SignInPage,
  SignOutPage,
  SignUpPage,
}