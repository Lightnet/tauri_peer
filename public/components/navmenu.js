
import van from 'vanjs-core';
import { Router, Link, getRouterParams, navigate } from "vanjs-routing";

const {div, button } = van.tags;

function NavMenu(){

  return div(
    button({onclick:()=>navigate("/")},' Home '),
    button({onclick:()=>navigate("/about")},' About '),
    button({onclick:()=>navigate("/signin")},' Sign In '),
    button({onclick:()=>navigate("/signup")},' Sign Up'),
    button({onclick:()=>navigate("/signout")},' Sign Out'),
    button({onclick:()=>navigate("/hyperbee")},' Hyperbee '),
    button({onclick:()=>navigate("/account")},'Account'),
  )

}

export {
  NavMenu
}