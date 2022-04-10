// const btn = document.getElementById("button");
// const bigloops = document.getElementById("bigloop");
// function bigloop(params) {
//     let a = new Worker('./webworker.js');
//     a.onmessage = function(event){
//         console.log(event.data);
//     }
// }
// function button() {
//   alert("Normal Function");
// }
// btn.addEventListener("click", button);
// bigloops.addEventListener("click", bigloop);
let htag = document.getElementById('h1');
let a=[];
for(let i = 0; i<10000;i++){
  if(i%2==0){
    a.push(i);
  }
}
for(let i=0; i<a.length; i++){
  htag.innerText += a[i]+',';
}
console.log(a);
