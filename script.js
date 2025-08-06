const products = [
    { id: 1, name: "Tie-Dye Lounge Set", price: 150, img: "assets/product-1.jpg" },
    { id: 2, name: "Sunburst Tracksuit", price: 150, img: "assets/product-2.jpg" },
    { id: 3, name: "Retro Red Streetwear", price: 150, img: "assets/product-3.jpg" },
    { id: 4, name: "Urban Sportwear Combo", price: 150, img: "assets/product-4.jpg" },
    { id: 5, name: "Oversized Knit & Coat", price: 150, img: "assets/product-5.jpg" },
    { id: 6, name: "Chic Monochrome Blazer", price: 150, img: "assets/product-6.jpg" },
];

// Change to array of objects with qty
let selectedProducts = [];

const productGrid = document.getElementById("productGrid");
const selectedProductsDiv = document.getElementById("selectedProducts");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const discountAmount = document.getElementById("discountAmount");
const subtotalAmount = document.getElementById("subtotalAmount");
const proceedButton = document.getElementById("proceedButton");

// Render product cards
products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button data-id="${product.id}">Add to Bundle &nbsp; +</button>
    `;
    productGrid.appendChild(card);
});


productGrid.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.getAttribute("data-id"));
        toggleProduct(id);
    }
});

function toggleProduct(id) {
    const existing = selectedProducts.find(p => p.id === id);

    if (existing) {
       
        return;
    } else {
        selectedProducts.push({ id: id, qty: 1 });
    }

    updateSidebar();
}

function updateSidebar() {
    // Progress Bar
    const count = selectedProducts.length;
    progressFill.style.width = `${Math.min((count / 3) * 100, 100)}%`;
    progressText.textContent = `${count}/3 added`;

    // Selected Items
    selectedProductsDiv.innerHTML = "";
    let subtotal = 0;

    selectedProducts.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.qty;
        subtotal += itemTotal;

        const div = document.createElement("div");
        div.className = "selected-item";
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="item-info">
                <p>${product.name}</p>
                <p>$${product.price}</p>
                <div class="qty-controls">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.qty}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                    <button class="delete" data-id="${item.id}">🗑</button>
                </div>
            </div>
        `;

        selectedProductsDiv.appendChild(div);
    });

    // Discount
    let discount = 0;
    if (count >= 3) {
        discount = subtotal * 0.3;
        proceedButton.disabled = false;
    } else {
        proceedButton.disabled = true;
    }

    discountAmount.textContent = `-$${discount.toFixed(2)}`;
    subtotalAmount.textContent = `$${(subtotal - discount).toFixed(2)}`;
}

// Quantity buttons
selectedProductsDiv.addEventListener("click", e => {
    const id = parseInt(e.target.getAttribute("data-id"));
    if (e.target.classList.contains("increase")) {
        const item = selectedProducts.find(p => p.id === id);
        item.qty += 1;
        updateSidebar();
    } else if (e.target.classList.contains("decrease")) {
        const item = selectedProducts.find(p => p.id === id);
        if (item.qty > 1) {
            item.qty -= 1;
        } else {
           
            selectedProducts = selectedProducts.filter(p => p.id !== id);
        }
        updateSidebar();
    } else if (e.target.classList.contains("delete")) {
        selectedProducts = selectedProducts.filter(p => p.id !== id);
        updateSidebar();
    }
});

// Proceed button click
proceedButton.addEventListener("click", () => {
    const selected = selectedProducts.map(item => {
        const product = products.find(p => p.id === item.id);
        return `${product.name} x${item.qty}`;
    });

    console.log("Selected Bundle:", selected);
    alert(`Bundle Added: ${selected.join(", ")}`);
});
