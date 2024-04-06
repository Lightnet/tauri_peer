

import van from 'vanjs-core';
import { Router, Link, getRouterParams, navigate } from "vanjs-routing";
import { UIHyperBeeTest } from './hyperbee/ui_hyperbee.js';
import HomePage from './pages/home.js';
import AboutPage from './pages/about.js';
import HyperbeePage from './pages/hyperbee.js';
import { SignUpPage } from './pages/auth.js';
import SignIn from './auth/signin.js';
import SignOut from './auth/signout.js';

const {div, button, input,  label} = van.tags;

const App = ()=>{

  return Router({
    routes: [
      { path: "/", component: HomePage },
      { path: "/about", component: AboutPage },
      { path: "/signup", component: SignUpPage },
      { path: "/signin", component: SignIn },
      { path: "/signout", component: SignOut },

      { path: "/hyperbee", component: HyperbeePage },
    ]
  });
}

export default App;