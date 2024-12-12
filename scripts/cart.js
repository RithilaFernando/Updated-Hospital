document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cartContainer");
    const addToFavouritesButton = document.getElementById("addToFavourites");
    const applyFavouritesButton = document.getElementById("applyFavourites");
    const totalContainer = document.getElementById("totalContainer");
    const checkoutButton = document.getElementById("checkout");


    addToFavouritesButton.addEventListener("click", saveFavourites);
    applyFavouritesButton.addEventListener("click", loadFavourites);
    cartContainer.addEventListener("input", handleQuantityChange);
    cartContainer.addEventListener("click", handleDelete);
    checkoutButton.addEventListener("click", () => {
        localStorage.setItem("checkoutCart", JSON.stringify(cart)); // Save cart data for checkout
        window.location.href = "checkout.html"; // Redirect to checkout page
    });

    
    renderCart();
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render the cart as a table
function renderCart() {
    const cartContainer = document.getElementById("cartContainer");
    const totalContainer = document.getElementById("totalContainer");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalContainer.textContent = "";
        return;
    }

    cartContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price per Unit ($)</th>
                    <th>Quantity</th>
                    <th>Total ($)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${cart.map((item, index) => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.price || 0}</td>
                        <td>
                            <input type="number" value="${item.quantity || 1}" 
                                   min="1" class="quantity-input" 
                                   data-index="${index}" />
                        </td>
                        <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                        <td>
                            <button class="delete-btn" data-index="${index}"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    totalContainer.textContent = `Grand Total: $${calculateGrandTotal()}`;
}

// Handle quantity changes
function handleQuantityChange(event) {
    if (event.target.classList.contains("quantity-input")) {
        const index = parseInt(event.target.dataset.index);
        const quantity = Math.max(1, parseInt(event.target.value) || 1);
        cart[index].quantity = quantity;
        saveCart();
        renderCart();
    }
}

// Handle delete button click
function handleDelete(event) {
    if (event.target.classList.contains("delete-btn")) {
        const index = parseInt(event.target.dataset.index);
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Calculate the grand total
function calculateGrandTotal() {
    return cart.reduce((total, item) => {
        const quantity = item.quantity || 1;
        const price = item.price || 0;
        return total + quantity * price;
    }, 0).toFixed(2);
}

// Save favourites
function saveFavourites() {
    localStorage.setItem("favourites", JSON.stringify(cart));
    alert("Your favourites have been saved!");
}

// Load favourites
function loadFavourites() {
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites && favourites.length > 0) {
        cart = favourites;
        saveCart();
        renderCart();
        alert("Favourite items have been added to your cart!");
    } else {
        alert("No favourites found!");
    }
}
