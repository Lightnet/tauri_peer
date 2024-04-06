

import van from 'van';
import { NavMenu } from '../navmenu.js';

const {div,label,button} = van.tags;

function HomePage(){
  return div(
    NavMenu(),
    div(
      label("HOME...")
    )
  )
}

export default HomePage;