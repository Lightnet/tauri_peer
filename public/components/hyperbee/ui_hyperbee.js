

import van from 'vanjs-core';
import * as vanX from "vanjs-ext"
//console.log(window);
const {div, button, input, label} = van.tags;

function UIHyperBeeTest(){

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
    UIHyperBeeKeyValue(),
    UIHyperbeeJson()
  )
}

function UIHyperbeeGetAll(){

  return div(

  );
}

function UIHyperBeeKeyValue(){
  const objKey = van.state("");
  const objValue = van.state("");

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
    div(
      label("[HyperBee Key and Value]"),
    ),
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

function UIHyperbeeJson(){

  const objKeyId = van.state("");
  const objProps = van.state([]);
  const keysvalues = div()

  function addProps(){
    let objs = objProps.val;
    let id = Date.now();
    let item = {id:id,okey:"",oval:""};
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
        if(_type == "value"){
          objs[i].oval = _data;
          break;
        }
      }
    }
    objProps.val = objs;
    console.log(objs)
  }

  function checkObjectProps(){
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

  function createObJson(){

  }

  function deleteObJson(){

  }

  return div(
    div(
      label('[HpyerBee Key and Json]')
    ),
    div(
      input({value:objKeyId, oninput:e=>objKeyId.val=e.target.value,placeholder:"ID Key"}),
      button({onclick:addProps},'Add Prop.'),
      button({onclick:checkObjectProps},'Object props'),
      button({onclick:formatJson},'format Json'),
      button({onclick:createObJson},'Create'),
      button({onclick:deleteObJson},'Delete'),
      
    ),
    keysvalues,
  );
}

export {
  UIHyperBeeTest
}