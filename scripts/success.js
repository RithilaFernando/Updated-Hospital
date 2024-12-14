
const deliveryDateElement = document.getElementById('delivery-date');

function calculateDeliveryDate() {
    const today = new Date(); // Get today's date
    const deliveryDays = 5; // Estimated delivery time in days
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays); // Add delivery days

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return deliveryDate.toLocaleDateString('en-US', options);
}

deliveryDateElement.textContent = calculateDeliveryDate();
