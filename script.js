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
        const existingItem = orderList.find(item => item.id === product.id);

        if (existingItem){
            existingItem.qty+=1;
        }
        else{
            orderList.push({
                ...product,
                qty : 1
            });
        }
        renderOrders();
    }

    function renderOrders(){
        orders.innerHTML="";
        let total=0;

        if (orderList.length>0){
            noOrders.classList.add("hidden");
            ordersTotal.classList.remove("hidden");

            orderList.forEach((o)=>{
                total+= o.price * o.qty;
                const orderItem = document.createElement("div");
                orderItem.classList.add("order-item");

                orderItem.innerHTML=`
                
                <div class="item-name">${o.emoji}${o.name}</div>
                <div class="item-unit">₹${o.price}</div>

                <div class="qty-controls">
                    <button class="minus" data-id="${o.id}">-</button>
                    <span>${o.qty}</span>
                    <button class="plus" data-id="${o.id}">+</button>
                </div>

                <div class="item-total">₹${(o.price * o.qty).toFixed(2)}</div>
                <button class="remove" data-id="${o.id}">x</button>
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

    orders.addEventListener("click", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"));
        if (!id) return;

        if (e.target.classList.contains("plus")) {
            updateCart("plus", id);
        }

        if (e.target.classList.contains("minus")) {
            updateCart("minus", id);
        }

        if (e.target.classList.contains("remove")) {
            updateCart("remove", id);
        }
    });

    function updateCart(action, id) {
        const item = orderList.find(i => i.id === id);
        if (!item) return;

        if (action === "plus") {
            item.qty++;
        }

        if (action === "minus") {
            item.qty--;

            if (item.qty <= 0) {
                const index = orderList.findIndex(i => i.id === id);
                orderList.splice(index, 1);
            }
        }

        if (action === "remove") {
            const index = orderList.findIndex(i => i.id === id);
            orderList.splice(index, 1);
        }

        renderOrders();
}
    
    confirmBtn.addEventListener("click", ()=>{
        orderList.length=0;
        alert("Checkout Successful");
        renderOrders();
    });
 
});