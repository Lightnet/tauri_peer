

import van from 'van';
//console.log(window);
const {div, button, input, label} = van.tags;

function UIHyperBeeTest(){

  const objKey = van.state("a");
  const objValue = van.state("sd");

  async function keyPut(){
    let resp = await fetch('/key',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        key:objKey.val,
        value:objValue.val
      })
    })
    let data = await resp.json();
    console.log(data);
  }

  async function valueGet(){
    if(typeof objKey.val === 'string' && objKey.val.length ===0){
      console.log('EMPTY');
      return;
    }
    let urlpath = '/key/'+objKey.val;
    let resp = await fetch(urlpath,{
      method:'GET',
      headers:{
        "Content-Type":"application/json"
      }
    })
    let data = await resp.json();
    console.log(data);
    console.log(data.value);
  }

  return div(
    label("HyperBee:"),
    div(
      label(" KEY: "),
      input({value:objKey, oninput:e=>objKey.val=e.target.value}),
      label(" VALUE: "),
      input({value:objValue, oninput:e=>objValue.val=e.target.value}),
      button({onclick:keyPut},'put'),
      button({onclick:valueGet},'get')
    )
  )
}

export {
  UIHyperBeeTest
}