document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
        filterProducts(category);
    } else {
        filterProducts('all');
    }

    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
    
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
    
            if (category === 'all' || productCategory === category) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.icon-button').forEach(button => {
        button.addEventListener('click', function () {
            const card = button.closest('.product-card');
            const productName = card.querySelector('.oversized-tshirt-heading').innerText;
            const productPrice = parseFloat(card.querySelector('.price-tag-bold-centered').innerText);
            const productImage = card.querySelector('.oversized-tshirt-card').src;
            addProductToCart(button.id, productName, productPrice, productImage);
            showToast("Товар добавлен в корзину");
        });
    });
});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}