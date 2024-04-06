

import van from 'vanjs-core';
import * as vanX from "vanjs-ext"
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

  async function getAll(){
    let urlpath = '/key';
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
    ),
    div(
      button({onclick:getAll},'get all')
    ),
    UIHyperbeeJson()
  )
}

function UIHyperbeeGetAll(){


  return div(

  );
}


function UIHyperbeeJson(){

  const objKeyId = van.state("a");
  const objProps = van.state([]);
  const keysvalues = div()

  function addKeyVal(){
    let objs = objProps.val;
    let id = Date.now();
    let item = {id:id,okey:"e",oval:"r"};
    objs.push(item);
    objProps.val = objs;
    van.add(keysvalues,
      ELKeyValue(item)
    )
  }

  const ELKeyValue=(item)=>{

    const isDel = van.state(false);

    function btnDelete(){
      //console.log("DELETE?");
      let objs = objProps.val;
      objProps.val = objs.filter(i=>i.id != item.id);
      isDel.val = true;
    }

    return ()=> isDel.val ? null : div(
      label("[ID: " + item.id + " ] "),
      label(" Key: "),
      input({value:item.okey, oninput:e=>updateObjectType(item.id,"key",e.target.value)}),
      label(" Value: "),
      input({value:item.oval, oninput:e=>updateObjectType(item.id,"value",e.target.value)}),
      //button('Add'),
      //button('Update'),
      button({onclick:()=>btnDelete()},'Delete')
    )
  }

  function updateObjectType(_id,_type,_data){
    console.log("_id",_id)
    console.log("_type",_type)
    console.log("_data",_data)

    let objs = objProps.val;
    for (let i=0; i< objs.length ;i++){
      console.log(objs[i])
      if(objs[i].id == _id){
        if(_type == "key"){
          objs[i].okey = _data;
          break;
        }
      }
    }
    objProps.val = objs;
    console.log(objs)
  }

  function checkObjectJson(){
    //console.log(objkeyvals)
    console.log(objProps.val)
  }

  function formatJson(){
    let obJson = {};
    let objs = objProps.val;;
    for (let i=0; i< objs.length ;i++){
      let _key = objs[i].okey;
      let _value = objs[i].oval;
      obJson[_key] = _value;
    }
    console.log(obJson);
  }

  return div(
    div(
      input({value:objKeyId, oninput:e=>objKeyId.val=e.target.value}),
      button({onclick:addKeyVal},'Add Key'),
      button({onclick:checkObjectJson},'keys and values'),
      button({onclick:formatJson},'format Json'),
      
    ),
    keysvalues,
  );
}

export {
  UIHyperBeeTest
}