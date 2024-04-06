

import van from 'van';
import { NavMenu } from '../navmenu.js';

const {div, label} = van.tags;

function AboutPage(){
  return div(
    NavMenu(),
    div(
      label("About")
    )
  )
}

export default AboutPage;