const urlParams = new URLSearchParams(window.location.search);
const items = urlParams.get('items');
console.log(items);

const cartItems = items ? items.split(',').map(item => {
    const [name, price, quantity, size] = item.split('-');
    return {
        name,
        price: parseFloat(price),
        size,
        quantity: parseInt(quantity) || 1
    };
}) : [];


function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    let total = 0;
    orderSummary.innerHTML = '';

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        const itemTotal = item.price * item.quantity;

        itemDiv.innerHTML = `<span>${item.name} (${item.size}) × ${item.quantity}</span><span>${itemTotal.toFixed(2)} BYN</span>`;
        orderSummary.appendChild(itemDiv);
        total += itemTotal;
    });


    document.getElementById('total-price').innerText = `${total.toFixed(2)} BYN`;
}

document.addEventListener('DOMContentLoaded', updateOrderSummary);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("payment-form");
  const cardInput = document.getElementById("card-number");
  const expiryInput = document.getElementById("expiry-date");
  const cvcInput = document.getElementById("cvc");

  cardInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").substring(0, 16);
    let formatted = value.match(/.{1,4}/g);
    e.target.value = formatted ? formatted.join(" ") : "";
  });

  expiryInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4);
    e.target.value = value.length > 2 ? value.substring(0, 2) + "/" + value.substring(2) : value;
  });

  cvcInput.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const cardNumber = cardInput.value.replace(/\s/g, "");
    const expiry = expiryInput.value;
    const cvc = cvcInput.value;

    if (cardNumber.length !== 16 || !/^\d{16}$/.test(cardNumber)) {
      alert("Введите корректный номер карты (16 цифр).");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Введите срок действия в формате MM/YY.");
      return;
    }

    if (!/^\d{3}$/.test(cvc)) {
      alert("Введите корректный CVC (3 цифры).");
      return;
    }

    form.style.display = "none";
    document.getElementById("right-section").style.display = "none";
    document.querySelector(".delivery-text").style.display = "none";
    document.getElementById("success-message").style.display = "block";
  });
});
