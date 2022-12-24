var listItems=document.querySelector(".left_part");
var rightPart=document.querySelector(".right_part");
var item_button=document.querySelector("#recipe_btn");
var tabledata=document.querySelector("#tbody");
var order_button=document.querySelector("#order");
var order_btn=document.querySelector(".order_btn");
var order_summary=document.querySelector("#order_summary");
var getdata_btn=document.querySelector(".getdata_btn");
var elements=document.querySelector(".history");
var quantity_change=document.querySelector("#quan");
let b;
let add=0;
var btnClearitem = document.getElementById("btnClear");
btnClearitem.addEventListener("click",clearinfo);

let amt=0;
let totamt=0;
let dis=0;
let tax=0;
let finalPrice=0;
var recipes=[];

async function items(){
    let a=await fetch("http://localhost:3000/posts")
     b=await a.json();
    console.log(b);
    for(let i=0;i<b.length;i++){
        listItems.innerHTML+=`<button type="button" class="btns" onclick="dataitems('${i}')">${b[i].name}<br>${b[i].price}</button>`
    }

}
items();

function dataitems(id){
    console.log(id);
    recipes.push({
        name:`${b[id].name}`,
        price:`${b[id].price}`,
        quantity:1

    });  
    table();
}


    function table(){
        totamt=0;
        tabledata.innerHTML="";
    
    for(let j in recipes){
        tabledata.innerHTML+=`<tr>
        <td>${recipes[j].name}</td>
        <td><input type="number" value=${recipes[j].quantity} class="td" onchange="quantity(${j})"></td>
        <td>${(recipes[j].price)*(recipes[j].quantity)}</td>
        <tr>`
        totamt+=parseInt(`${recipes[j].price*(recipes[j].quantity)}`);
        console.log(totamt);
        Amountvalues(j);
    }
}

    function Amountvalues(amount){
        dis=(totamt/100)*10;
        console.log("discount:"+dis);
        document.querySelector("#discount").innerHTML=`${dis}`;
        tax=(totamt/100)*5;
        console.log("tax:"+tax);
        document.querySelector("#tax").innerHTML=`${tax}`;
        finalPrice=totamt-dis+parseInt(tax);
        console.log(finalPrice);
        document.querySelector("#charge").innerHTML="charge:"+`${finalPrice}`;     
    }


order_button.addEventListener("click",info)
async function info(){
    alert("successfully submitted");
    let num=document.querySelector("#numer");
    let objects={
        customer_name:num.value,
        charge:finalPrice,
        discount_amount:dis,
        recipelist:recipes
    }
    let order_api=await fetch("http://localhost:3000/data",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(objects)
    });
    let getOrder=await order_api.json();
    console.log(getOrder);
}



function clearinfo(){
    tabledata.innerHTML="";
    recipes=[];
    document.querySelector("#discount").innerHTML="";
    document.querySelector("#tax").innerHTML="";
}


order_btn.addEventListener("click",orders_history);
async function orders_history(){
    listItems.style.display="none";
    rightPart.style.display="none";
    order_summary.style.display="block";
    let tableapi=await fetch("http://localhost:3000/data")
    let get_tableapi=await tableapi.json();
    for(let k=0;k<get_tableapi.length;k++){
    order_summary.innerHTML+=`<tr>
    <td>${get_tableapi[k].id}</td>
    <td>${get_tableapi[k].customer_name}</td>
    <td>${get_tableapi[k].charge}</td>
    <td><button class="getdata_btn" onclick="billHistory('${k+1}')">GET DATA</button></td>
    </tr>`
    }
}

async function billHistory(customer){
    console.log(customer);
   elements.style.display="block";
    let billapi=await fetch(`http://localhost:3000/data/${customer}`);
    let getBillapi=await billapi.json();
    console.log(getBillapi);
        elements.innerHTML+=`
        <div class="datas">
        <center><h3>DETAILS</h3></center> 
        <p>S.No:${getBillapi.id}</p>
        <p>Customer_name:${getBillapi.customer_name}</p>
        <p>Discount_amount:${getBillapi.discount_amount}</p>
        <p>Total_amount:${getBillapi.charge}</p>
        <h4>----------------</h4>
        <p class="itemList">Items:<br></p>
        </div>`
        for(let h=0;h<getBillapi.recipelist.length;h++){
            console.log(`${getBillapi.recipelist.length}`);
            document.querySelector(".itemList").innerHTML+=`${getBillapi.recipelist[h].name}=${getBillapi.recipelist[h].price}`
           
        }

    
}

function quantity(data) {
    var quantityInput = document.querySelectorAll(".td"); 
    console.log(data); 
    recipes[data].quantity = quantityInput[data].value;
    console.log(recipes[data].quantity);
    table();
  }

  function currentClass(){
    listItems.style.display="block";
    rightPart.style.display="block";
    order_summary.style.display="none";
    elements.style.display="none";
  }