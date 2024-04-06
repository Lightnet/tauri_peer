

import van from 'van';
import { NavMenu } from '../navmenu.js';
import { UIHyperBeeTest } from '../hyperbee/ui_hyperbee.js';

const {div} = van.tags;

function HyperbeePage(){
  return div(
    NavMenu(),
    UIHyperBeeTest()
  )
}

export default HyperbeePage;