

import van from 'van';
import { UIHyperBeeTest } from './hyperbee/ui_hyperbee.js';

const {div, button, input,  label} = van.tags;

const App = ()=>{

  return div(
    label("Hello World Vanjs!"),
    UIHyperBeeTest()
  );
}

export default App;