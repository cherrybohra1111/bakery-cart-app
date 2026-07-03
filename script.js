document.addEventListener("DOMContentLoaded", ()=>{
    const products = [
        {
            id: 1,
            name: "Chocolate Cookie",
            price: 80,
            emoji: "🍪"
        },
        {
            id: 2,
            name: "Strawberry Cake",
            price: 450,
            emoji: "🍓"
        },
        {
            id: 3,
            name: "Vanilla Cupcake",
            price: 150,
            emoji: "🧁"
        },
        {
            id: 4,
            name: "Butter Croissant",
            price: 120,
            emoji: "🥐"
        },
        {
            id: 5,
            name: "Cinnamon Roll",
            price: 180,
            emoji: "🥮"
        }
    ];

    const orderList = [];

    const menuBox= document.getElementById("menu-box");
    const productList= document.getElementById("product-list");
    const orders= document.getElementById("orders");
    const ordersTotal= document.getElementById("orders-total");
    const noOrders= document.getElementById("no-orders");
    const totalCost= document.getElementById("total-cost");
    const confirmBtn = document.getElementById("confirm-order");

    products.forEach((product)=>{
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <span class="product-name">${product.emoji} ${product.name}</span>
            <span class="product-price">₹${product.price.toFixed(2)}</span>
            <button class="add-btn" data-id="${product.id}">Add</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e)=>{
        if (e.target.classList.contains("add-btn")){
            const productId= parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p)=> p.id === productId);
            addToOrders(product);
        }
    });

    function addToOrders(product){
        orderList.push(product);
        renderOrders();
    }

    function renderOrders(){
        orders.innerHTML="";
        let total=0;

        if (orderList.length>0){
            noOrders.classList.add("hidden");
            ordersTotal.classList.remove("hidden");

            orderList.forEach((o)=>{
                total+=o.price;
                const orderItem = document.createElement("div");
                orderItem.innerHTML=`
                ${o.emoji}${o.name} - ₹${o.price.toFixed(2)}
                `;

                orders.appendChild(orderItem);
                totalCost.textContent=` ₹${total.toFixed(2)}`;
            });

        }
        else{
            noOrders.classList.remove("hidden");
            ordersTotal.classList.add("hidden");
            totalCost.textContent=`₹0.00`;
        }
    }
    
    confirmBtn.addEventListener("click", ()=>{
        orderList.length=0;
        alert("Checkout Successful");
        renderOrders();
    });
 
});