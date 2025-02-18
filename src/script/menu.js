document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.createElement('div');
    cartDropdown.classList.add('cart-dropdown');
    cartIcon.appendChild(cartDropdown);

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartItems = [];

    let menuPersonalizado = [];

    // Intentar recuperar elementos del carrito guardados anteriormente en la cookie
    const savedCartItems = getCookie('cartItems');
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
        updateCartDropdown(); // Actualizar el desplegable con los elementos guardados
        updateCartTotalAndCount(); // Actualizar el total y la cuenta del carrito
    }


    const addToMenuButtons = document.querySelectorAll('.add-to-menu');
    addToMenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platoId = this.getAttribute('data-plato');
            const itemName = this.getAttribute('data-name');

            // Obtener ingredientes adicionales si los hay
            const ingredientesAdicionales = [];
            document.querySelectorAll(`#ingredientes-${platoId} .ingredientes-adicionales input[type="checkbox"]:checked`).forEach((checkbox) => {
                ingredientesAdicionales.push(checkbox.value);
            });

            menuPersonalizado.push({ id: platoId, name: itemName, ingredientesAdicionales });
            alert(`Agregaste ${itemName} a tu menú personalizado`);
        });
    });

    const addMenuToCartButton = document.getElementById('add-menu-to-cart');
    addMenuToCartButton.addEventListener('click', () => {
        menuPersonalizado.forEach(item => {
            const precioBase = 10; // Precio base del plato
            const precioFinal = precioBase + item.ingredientesAdicionales.length * 0.5;
            const cartItem = {
                id: Date.now(),
                name: item.name,
                price: precioFinal,
                ingredientesAdicionales: item.ingredientesAdicionales
            };
            cartItems.push(cartItem);
        });
        updateCartDropdown();
        updateCartTotalAndCount();
        saveCartItems();
        menuPersonalizado = []; // Limpiar menú personalizado después de añadir al carrito
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platoId = this.getAttribute('data-plato');
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
        
            const ingredientesAdicionales = [];
            document.querySelectorAll(`#ingredientes-${platoId} .ingredientes-adicionales input[type="checkbox"]:checked`).forEach((checkbox) => {
                ingredientesAdicionales.push(checkbox.value);
            });
        
            // Aquí puedes ajustar el precio según los ingredientes adicionales, si es necesario
            const precioFinal = itemPrice + ingredientesAdicionales.length * 0.5; // Suponiendo 0.5€ por ingrediente extra
        
            const item = { 
                id: Date.now(), 
                name: itemName, 
                price: precioFinal,
                ingredientesAdicionales: ingredientesAdicionales
            };
        
            cartItems.push(item);
            updateCartDropdown();
            updateCartTotalAndCount();
            saveCartItems();
        });
    });
    
    

    function updateCartDropdown() {
        cartDropdown.innerHTML = '<h3>Carrito</h3>';
        let total = 0;
        cartItems.forEach(item => {
            let ingredientesAdicionalesTexto = item.ingredientesAdicionales.join(', ');
            total += item.price;
            cartDropdown.innerHTML += `<p>${item.name} - ${item.price}€ - Ingredientes adicionales: ${ingredientesAdicionalesTexto} <button class="remove-item" data-id="${item.id}">X</button></p>`;
        });
        cartDropdown.innerHTML += `<p>Total: ${total.toFixed(2)}€</p>`;    
        if (!document.getElementById('checkout-button')) {
            const checkoutButton = document.createElement('button');
            checkoutButton.id = 'checkout-button';
            checkoutButton.textContent = 'Pagar';
            checkoutButton.addEventListener('click', () => {
                window.location.href = 'pago.html';
            });
            cartDropdown.appendChild(checkoutButton);
        }
        attachRemoveItemEventListeners();
    }

    function attachRemoveItemEventListeners() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                cartItems = cartItems.filter(item => item.id !== itemId);
                updateCartDropdown();
                updateCartTotalAndCount();
                saveCartItems();
            });
        });
    }

    function updateCartTotalAndCount() {
        const cartCount = document.getElementById('cart-count');
        let total = 0;
        
        cartItems.forEach(item => {
            total += item.price;
        });
        
        cartCount.textContent = cartItems.length;
        document.cookie = 'cartTotal=' + total.toFixed(2) + ';path=/';
    }

    function saveCartItems() {
        const cartItemsString = JSON.stringify(cartItems);
        document.cookie = `cartItems=${cartItemsString};path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    cartIcon.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.cookie = 'cartItems=; Max-Age=0; path=/';
    document.cookie = 'cartTotal=; Max-Age=0; path=/';


});

