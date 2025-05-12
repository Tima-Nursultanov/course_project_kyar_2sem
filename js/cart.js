let cart = [];
let mobileMenuVisible = false;

function openCart() {
    document.getElementById("cart-modal").style.display = "block";
    document.body.style.overflow = 'hidden';
    updateCart();

    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu && mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
        mobileMenuVisible = false;
    }
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
    document.body.style.overflow = '';
    mobileMenuVisible = false;
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (!mobileMenu) return;

    if (mobileMenuVisible) {
        mobileMenu.style.display = "none";
        mobileMenuVisible = false;
    } else {
        mobileMenu.style.display = "flex";
        mobileMenuVisible = true;
    }
}

function addProductToCart(productId, productName, productPrice, productImage, selectedSize) {
    const existingProduct = cart.find(item => item.id === productId && item.size === selectedSize);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1,
            size: selectedSize
        });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartSummary = document.getElementById("cart-summary");
    const payButton = document.getElementById("pay-button");

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Корзина пуста</p>';
        if (cartSummary) {
            cartSummary.style.display = 'none';
            payButton.style.display = 'none';
        }
        return;
    }

    let totalPrice = 0;

    cart.forEach(product => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>${product.name}</div>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${product.id}', -1)">-</button>
                <span>${product.quantity}</span>
                <button onclick="changeQuantity('${product.id}', 1)">+</button>
            </div>
            <div>
                <select onchange="updateSize('${product.id}', this.value)">
                    <option value="">Выберите размер</option>
                    <option value="XS" ${product.size === "XS" ? "selected" : ""}>XS</option>
                    <option value="S" ${product.size === "S" ? "selected" : ""}>S</option>
                    <option value="M" ${product.size === "M" ? "selected" : ""}>M</option>
                    <option value="L" ${product.size === "L" ? "selected" : ""}>L</option>
                    <option value="XL" ${product.size === "XL" ? "selected" : ""}>XL</option>
                </select>
            </div>
            <div>${(product.price * product.quantity).toFixed(2)} BYN</div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += product.price * product.quantity;
    });

    if (cartSummary) {
        cartSummary.style.display = 'flex';
        totalPriceElement.innerText = totalPrice.toFixed(2) + ' BYN';
        payButton.style.display = 'flex';
    }
}

function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(item => !(item.id === productId && item.size === product.size));
        }
        updateCart();
    }
}

function updateSize(productId, newSize) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.size = newSize;
        updateCart();
    }
}

function proceedToPayment() {
    for (let item of cart) {
        if (!item.size || item.size === "") {
            alert(`Пожалуйста, выберите размер для товара "${item.name}"`);
            return false;
        }
    }

    const items = cart.map(item =>
        `${encodeURIComponent(item.name)}-${item.price}-${item.quantity}-${item.size}`
    ).join(',');
    const paymentUrl = `payment.html?items=${items}`;
    window.location.href = paymentUrl;
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const payButton = document.getElementById("pay-button");
    if (payButton) {
        payButton.addEventListener("click", function(event) {
            event.preventDefault();
            proceedToPayment();
        });
    }
});
