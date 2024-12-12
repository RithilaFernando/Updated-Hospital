let shop = document.getElementById("container");

let generateShop = (shopItemsData) => {
    shop.innerHTML = shopItemsData.map((x) => {
        return `
            <div class="card">
                <img src="${x.img}" alt="${x.name}">
                <h2>${x.name}</h2>
                <p class="p">${x.quantity}</p>
                <div class="typenprice">
                    <p class="type">${x.type}</p>
                    <p class="price">$${x.price}</p>
                </div>
                <button class="AddToCart" onclick="addToCart('${x.id}', '${x.name}', ${x.price})">ADD TO CART</button>
            </div>
        `;
    }).join("");
};

let addToCart = (id, name, price) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
};


fetch('scripts/yes.json')
    .then(response => response.json())
    .then(data => generateShop(data))  
    .catch(error => console.error("Error loading the JSON data:", error));
