document.addEventListener('DOMContentLoaded', () => {
    // Ensure productsData is loaded from products.js
    if (typeof productsData === 'undefined') {
        console.error("products.js not loaded or productsData is not defined!");
        // You could display an error to the user on the page here
        return;
    }

    const cart = [];
    let currentPage = "home";
    // let selectedProductId = null; // Not strictly needed if we pass product object directly

    const pageSections = document.querySelectorAll("main > section");
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalPriceElement = document.getElementById("cart-total-price");
    const checkoutButton = document.getElementById("checkout-btn");
    const navLinks = document.querySelectorAll("nav a");
    const checkoutForm = document.getElementById('checkout-form');
    const orderConfirmationDiv = document.getElementById('order-confirmation'); // Get reference

    // Update copyright year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    function updateCartDisplay() {
        cartItemsDiv.innerHTML = ""; // Clear previous items
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
            checkoutButton.classList.add("hidden");
        } else {
            cart.forEach((item) => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                // You might want to add quantity later
                cartItemDiv.textContent = `${item.name} - $${item.price}`;
                cartItemsDiv.appendChild(cartItemDiv);
                totalPrice += item.price;
            });
            checkoutButton.classList.remove("hidden");
        }
        cartTotalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function showPage(pageId) {
        pageSections.forEach((section) => {
            section.classList.add("hidden");
        });
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.remove("hidden");
            currentPage = pageId;
            if (currentPage === 'cart') {
                updateCartDisplay();
            }
            // Hide order confirmation when navigating away from it, unless it's the target page
            if (pageId !== 'order-confirmation' && !orderConfirmationDiv.classList.contains('hidden')) {
                 orderConfirmationDiv.classList.add('hidden');
            }
        } else {
            console.error(`Page section with ID ${pageId}-page not found.`);
            // Show home page as a fallback
            document.getElementById("home-page").classList.remove("hidden");
            currentPage = "home";
        }
        window.scrollTo(0,0); // Scroll to top on page change
    }

    function showProductDetails(productId) {
        const product = productsData.find((p) => p.id === productId);

        if (product) {
            const productDetailImg = document.querySelector("#product-image-gallery img");
            const productNameElement = document.getElementById("product-name");
            const productDescriptionElement = document.getElementById("product-description");
            const productPriceElement = document.getElementById("product-price");
            const productVideoContainer = document.getElementById("product-video-container");
            const productSpecsContainer = document.getElementById("product-specifications");

            // Main Image
            if (product.images && product.images.length > 0) {
                productDetailImg.src = product.images[0]; // Display the first image
                productDetailImg.alt = product.name;
            } else {
                productDetailImg.src = "assets/images/general/placeholder.jpg"; // Default placeholder
                productDetailImg.alt = "No image available";
            }
            // TODO: Implement thumbnail gallery display here later

            productNameElement.textContent = product.name;
            productDescriptionElement.textContent = product.description;
            productPriceElement.textContent = `$${product.price.toFixed(2)}`;

            // Specifications
            productSpecsContainer.innerHTML = ""; // Clear previous
            if (product.specifications && Object.keys(product.specifications).length > 0) {
                const specsTitle = document.createElement('h4');
                specsTitle.textContent = 'Specifications:';
                productSpecsContainer.appendChild(specsTitle);
                const specsList = document.createElement('ul');
                for (const key in product.specifications) {
                    const listItem = document.createElement('li');
                    let displayName = key.replace(/_/g, ' ');
                    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
                    
                    // If the value is an array (like sizes_available), join it into a string
                    let specValue = product.specifications[key];
                    if (Array.isArray(specValue)) {
                        specValue = specValue.join(', ');
                    }
                    listItem.innerHTML = `<strong>${displayName}:</strong> ${specValue}`;
                    specsList.appendChild(listItem);
                }
                productSpecsContainer.appendChild(specsList);
            }


            // Video
            productVideoContainer.innerHTML = ""; // Clear previous video
            if (product.videos && product.videos.length > 0) {
                const videoElement = document.createElement("video");
                videoElement.src = product.videos[0]; // Display the first video
                videoElement.controls = true;
                // videoElement.width = 400; // Let CSS handle width
                videoElement.setAttribute("playsinline", ""); // Good for mobile
                // videoElement.autoplay = false;
                // videoElement.loop = false;
                productVideoContainer.appendChild(videoElement);
            }

            const addToCartBtn = document.getElementById("add-to-cart-btn");
            addToCartBtn.onclick = () => { // Re-assign onclick to ensure correct product closure
                if (product.stock === 0) {
                    alert(`${product.name} is currently out of stock.`);
                    return;
                }
                cart.push(product);
                alert(`${product.name} has been added to your cart!`);
                updateCartDisplay(); // Update cart immediately
                showPage('cart');    // Navigate to cart page
            };

            showPage("product-detail");
        } else {
            console.error(`Product with ID ${productId} not found in productsData.`);
            alert("Sorry, product details could not be loaded.");
            showPage("products"); // Go back to products list
        }
    }

    // Navigation Links
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const page = link.dataset.page;
            showPage(page);
        });
    });

    // Product Card "View Details" Buttons
    // This needs to be more robust if product cards are dynamically added later.
    // For now, it works with the static cards if their data-product-id is correct.
    document.querySelectorAll(".product-card button").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.closest(".product-card").dataset.productId;
            if (productId) {
                showProductDetails(productId);
            } else {
                console.error("Product ID not found on card.");
            }
        });
    });

    // Checkout Button on Cart Page
    if(checkoutButton) { // Ensure it exists
        checkoutButton.addEventListener('click', () => {
            showPage('checkout');
        });
    }


    // Checkout Form Submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const email = document.getElementById('email').value;

            let orderDetails = `Order Details:\n`;
            orderDetails += `Name: ${name}\n`;
            orderDetails += `Phone Number: ${phone}\n`;
            orderDetails += `Address: ${address}\n`;
            orderDetails += `Email: ${email}\n`;
            orderDetails += `Date: ${new Date().toLocaleString()}\n`;
            orderDetails += `----\nItems:\n`;

            cart.forEach(item => {
                orderDetails += `- ${item.name} - $${item.price.toFixed(2)}\n`;
            });
            orderDetails += `----\nTotal Price: $${cartTotalPriceElement.textContent}\n`;

            const blob = new Blob([orderDetails], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `VamaGems_Order_${name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            cart.length = 0; // Clear the cart array
            updateCartDisplay();
            checkoutForm.reset(); // Clear the form fields
            
            showPage('order-confirmation'); // Show the new confirmation page
        });
    } else {
        console.error("Checkout form not found!");
    }

    // Initial Page Load
    showPage("home");
    updateCartDisplay(); // Initialize cart display (e.g., "Your cart is empty")
});
