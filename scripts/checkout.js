document.addEventListener("DOMContentLoaded", () => {
    const orderSummary = document.getElementById("orderSummary");
    const summaryContainer = document.getElementById("summaryContainer");
    const cardDetailsSection = document.querySelector(".card-details");
    const checkoutButton = document.getElementById("checkout");

    // Hide card details section initially
    cardDetailsSection.style.display = "none";

    // Load cart data
    const checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    if (checkoutCart.length === 0) {
        orderSummary.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Render order summary
    const grandTotal = checkoutCart.reduce((total, item) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        return total + itemTotal;
    }, 0).toFixed(2);

    orderSummary.innerHTML = `
        <table>
            <thead>
                <tr><th>Item</th><th>Price ($)</th><th>Quantity</th><th>Total ($)</th></tr>
            </thead>
            <tbody>
                ${checkoutCart.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.price || 0}</td>
                        <td>${item.quantity || 1}</td>
                        <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
    summaryContainer.textContent = `Grand Total: $${grandTotal}`;

    // Toggle card details section
    document.querySelectorAll('input[name="paymentMethod"]').forEach(method => {
        method.addEventListener("change", () => {
            cardDetailsSection.style.display = method.value === "card" ? "block" : "none";
        });
    });

    // Validate form and redirect
    checkoutButton.addEventListener("click", (event) => {
        event.preventDefault();

        const requiredFields = ["customerName", "customerAddress", "customerPhone"];
        for (const id of requiredFields) {
            if (!document.getElementById(id).value.trim()) {
                alert("Please fill all required fields.");
                return;
            }
        }

        if (document.querySelector('input[name="paymentMethod"]:checked').value === "card") {
            const cardFields = ["cardNumber", "expiryDate", "cvv"];
            for (const id of cardFields) {
                if (!document.getElementById(id).value.trim()) {
                    alert("Please fill all card details.");
                    return;
                }
            }
        }

        window.location.href = "success.html";
    });
});
