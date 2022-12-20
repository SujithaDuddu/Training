 
var items=document.querySelector(".Items");
var itemslist=document.querySelector(".itemdata");
var btn=document.querySelector("#fun");
var req;
async function getData()
{
    let res=await fetch("http://localhost:3000/posts")
     req=await res.json();
    console.log(req);
    for(let i=0;i<req.length;i++){
    items.innerHTML+=`<button class="Items">
   
      <p>${req[i].name}</p>
     <p>${req[i].price}</p>
    
      </button>`
}}
getData();
 btn.addEventListener("click",displaydata)
async function displaydata(items)
{
  let res=await fetch(`http://localhost:3000/posts/${items}`);
     req=await res.json();
    console.log(req); 
    itemslist.innerHTML+=
    `<tr>
    <td>${req.name}</td>
    <td>${1}</td>
    <td>${req.price}</td>
    </tr>`
    
   
}
displaydata();