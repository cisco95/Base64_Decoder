const REG = new RegExp(/from :|to :|cc :|date.time :|subject :|content :|email body|encoding:|charset|--|^$|^\s*$|[^A-Za-z0-9\+\/\=]/i);
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function subForm() {
  let userInput = document.getElementById("data").value;
  let outputString = base64Decode(userInput);
  let output = document.getElementById("output");
  document.getElementById("results").innerHTML = "Results:";
  output.innerHTML = outputString;
}

function makeBinary(item){
  return item
  .split("")
  .map((itm) => {
    return ("000000"+CHARS.indexOf(itm).toString(2)).slice(-6)
  }).join("")
}

function fillLine(item, index, arr){
  while(item.length % 4 !== 0){
    item += "=";
  }
  arr[index] = item;
}

function clean(newArr, item){
  if(!REG.test(item)){
    newArr.push(item)
  } 
  
  return newArr;
}

function base64Decode(inp) {
  
  
  let input = inp.split("\n").reduce(clean, []);
  let output = '';
  input.forEach(fillLine);
  input = input
  .map(makeBinary)
  .join("")
  .match(/.{1,8}/g)
  .map((item)=>{
    if (item.length < 8 || item.includes("-")){
      return "00000000"
    } else return item;
  });
    
  input.forEach((item, index, arr)=>{
    if(arr.slice(index, index+3).every((item, index) => parseInt(item, 2) == [226, 128, 153][index] )){
      output += "'";
      arr.splice(index+1, 2)
    }
    else {
      output += String.fromCharCode(parseInt(item, 2))
    }
  });
  
  return output;
}
