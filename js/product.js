function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('productId');
  }

  function loadProduct() {
    const productId = getProductIdFromUrl();
    fetch('products.xml')
      .then(response => response.text())
      .then(xmlData => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlData, "application/xml");
        const product = Array.from(xml.getElementsByTagName('product')).find(p =>
          p.getElementsByTagName('id')[0].textContent === productId
        );

        if (product) {
          const name = product.getElementsByTagName('name')[0].textContent;
          const price = product.getElementsByTagName('price')[0].textContent;
          const description = product.getElementsByTagName('description')[0].textContent;
          const imageUrl = product.getElementsByTagName('image')[0].textContent;

          document.querySelector('.oversized-tshirt-heading').innerText = name;
          document.querySelector('.price-tag-bold-centered').innerText = `${price} BYN`;
          document.querySelector('.urban-faith-bold').innerText = description;
          document.querySelector('.oversized-tshirt-card').src = imageUrl;

          const addToCartBtn = document.getElementById('add-to-cart');
          if (addToCartBtn) {
            addToCartBtn.setAttribute('data-id', productId);
            addToCartBtn.setAttribute('data-name', name);
            addToCartBtn.setAttribute('data-price', price);
            addToCartBtn.setAttribute('data-image', imageUrl);
          }
        }
      });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadProduct();

    const addToCartBtn = document.getElementById('add-to-cart');
    const sizeSelector = document.getElementById('size-selector');

    if (addToCartBtn && sizeSelector) {
      addToCartBtn.addEventListener('click', () => {
        const selectedSize = sizeSelector.value;

        const productId = addToCartBtn.getAttribute('data-id');
        const productName = addToCartBtn.getAttribute('data-name');
        const productPrice = parseFloat(addToCartBtn.getAttribute('data-price'));
        const productImage = addToCartBtn.getAttribute('data-image');

        addProductToCart(productId, productName, productPrice, productImage, selectedSize);
        showToast("Товар добавлен в корзину");
      });
    }
  });
  