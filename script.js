// main.js
// import { products } from './products';

const products = [
  {
    id: 1,
    title: "Smartphone X",
    price: 699.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    title: "Laptop Pro",
    price: 1299.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 3,
    title: "Classic T-Shirt",
    price: 29.99,
    category: "clothing",
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    id: 4,
    title: "Programming Guide",
    price: 49.99,
    category: "books",
    image: "https://picsum.photos/400/300?random=4",
  },
  {
    id: 5,
    title: "Wireless Headphones",
    price: 199.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=5",
  },
  {
    id: 6,
    title: "Designer Jeans",
    price: 89.99,
    category: "clothing",
    image: "https://picsum.photos/400/300?random=6",
  },
  {
    id: 7,
    title: "Web Development Book",
    price: 39.99,
    category: "books",
    image: "https://picsum.photos/400/300?random=7",
  },
  {
    id: 8,
    title: "Smart Watch",
    price: 299.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=8",
  },
  {
    id: 9,
    title: "Gaming Mouse",
    price: 79.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=9",
  },
  {
    id: 10,
    title: "Leather Jacket",
    price: 199.99,
    category: "clothing",
    image: "https://picsum.photos/400/300?random=10",
  },
  {
    id: 11,
    title: "Data Structures Book",
    price: 45.99,
    category: "books",
    image: "https://picsum.photos/400/300?random=11",
  },
  {
    id: 12,
    title: "4K Monitor",
    price: 499.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=12",
  },
  {
    id: 13,
    title: "Running Shoes",
    price: 129.99,
    category: "clothing",
    image: "https://picsum.photos/400/300?random=13",
  },
  {
    id: 14,
    title: "AI Fundamentals",
    price: 59.99,
    category: "books",
    image: "https://picsum.photos/400/300?random=14",
  },
  {
    id: 15,
    title: "Mechanical Keyboard",
    price: 149.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=15",
  },
  {
    id: 16,
    title: "Winter Coat",
    price: 159.99,
    category: "clothing",
    image: "https://picsum.photos/400/300?random=16",
  },
  {
    id: 17,
    title: "Cloud Computing Guide",
    price: 49.99,
    category: "books",
    image: "https://picsum.photos/400/300?random=17",
  },
  {
    id: 18,
    title: "USB-C Hub",
    price: 69.99,
    category: "electronics",
    image: "https://picsum.photos/400/300?random=18",
  },
  {
    id: 19,
    title: "Formal Suit",
    price: 299.99,
    category: "clothing",
    image: "https://picsum.photos/400/300?random=19",
  },
  {
    id: 20,
    title: "Machine Learning Basics",
    price: 54.99,
    category: "books",
    image: "https://picsum.photos/400/300?random=20",
  },
].map(product => ({
  ...product,
  ratings: Array.from({ length: Math.floor(Math.random() * 50) + 10 }, () => ({
    score: Math.floor(Math.random() * 5) + 1,
    review: Math.random() > 0.5 ? "Great product!" : "Could be better",
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  })),
  stock: Math.floor(Math.random() * 100),
  variants:
    Math.random() > 0.5
      ? [
          { color: "Black", size: "M", price: product.price },
          { color: "White", size: "L", price: product.price * 1.1 },
        ]
      : null,
  specifications: {
    dimensions: `${Math.floor(Math.random() * 100)}x${Math.floor(
      Math.random() * 100
    )}x${Math.floor(Math.random() * 100)} cm`,
    weight: `${Math.floor(Math.random() * 1000)}g`,
    material: ["Cotton", "Polyester", "Metal", "Plastic"][
      Math.floor(Math.random() * 4)
    ],
  },
}));
// State Management
const state = {
  filters: {
    category: "all",
    search: "",
    priceRange: 1500,
    sortBy: "price",
    sortOrder: "asc",
  },
  viewMode: "grid",
  wishlist: new Set(),
  comparison: new Set(),
  maxComparisonItems: 4,
  viewedProducts: [],
  cart: [],
  cartVisible: false,
};

// DOM Elements
const elements = {
  productGrid: document.getElementById("productGrid"),
  categoryFilter: document.getElementById("categoryFilter"),
  searchInput: document.getElementById("searchInput"),
  priceRange: document.getElementById("priceRange"),
  priceValue: document.getElementById("priceValue"),
  sortBy: document.getElementById("sortBy"),
  sortOrder: document.getElementById("sortOrder"),
  gridView: document.getElementById("gridView"),
  listView: document.getElementById("listView"),
  mobileFilterToggle: document.getElementById("mobileFilterToggle"),
  filters: document.querySelector(".filters"),
  wishlistToggle: document.getElementById("wishlistToggle"),
  wishlistCount: document.getElementById("wishlistCount"),
  compareFloatBtn: document.getElementById("compareFloatBtn"),
  compareCount: document.getElementById("compareCount"),
  cartModal: document.getElementById("cartModal"),
  cartContainer: document.getElementById("cartContainer"),
  cartSubtotal: document.getElementById("cartSubtotal"),
  cartShipping: document.getElementById("cartShipping"),
  cartTotal: document.getElementById("cartTotal"),
  clearCart: document.getElementById("clearCart"),
  checkoutBtn: document.getElementById("checkoutBtn"),
  cartToggle: document.getElementById("cartToggle"),
  cartCount: document.getElementById("cartCount"),
};

// Initialize Application
function init() {
  renderProducts(products);
  setupEventListeners();
  updatePriceDisplay();
  initializeChatbot();
  updateComparisonUI();
}

// Render Products
function renderProducts(productsToRender) {
  elements.productGrid.innerHTML = "";

  const filteredProducts = filterProducts(productsToRender);
  const sortedProducts = sortProducts(filteredProducts);

  if (sortedProducts.length === 0) {
    elements.productGrid.innerHTML =
      '<div class="no-results">No products match your filters</div>';
    return;
  }

  sortedProducts.forEach(product => {
    elements.productGrid.appendChild(createProductCard(product));
  });
}

// Create Product Card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = `product-card ${
    state.viewMode === "list" ? "list-view" : ""
  }`;

  const averageRating = calculateAverageRating(product.ratings);
  const isInWishlist = state.wishlist.has(product.id);
  const isInComparison = state.comparison.has(product.id);
  const isLowStock = product.stock < 10;

  card.innerHTML = `
    <div class="product-image-container">
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="stock-badge ${isLowStock ? "low-stock" : ""}">
        ${product.stock} left
      </div>
      <div class="hover-actions">
        <button class="quick-view-btn" data-id="${product.id}">
          <i class="fas fa-eye"></i> Quick View
        </button>
        <button class="wishlist-btn ${isInWishlist ? "active" : ""}" data-id="${
    product.id
  }">
          <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i> 
          ${isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
    <div class="product-content">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-rating">
        ${generateStarRating(averageRating)}
        <span>(${product.ratings.length})</span>
      </div>
      <div class="product-category">${product.category}</div>
      <div class="product-actions">
        <button class="compare-button ${
          isInComparison ? "active" : ""
        }" data-id="${product.id}">
          <i class="fas fa-${isInComparison ? "check" : "exchange-alt"}"></i> 
          ${
            isInComparison
              ? `Added (${state.comparison.size}/${state.maxComparisonItems})`
              : "Compare"
          }
        </button>
        <button class="add-to-cart" data-id="${product.id}">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  `;

  return card;
}

// Filter Products
function filterProducts(products) {
  return products.filter(product => {
    const matchesCategory =
      state.filters.category === "all" ||
      product.category === state.filters.category;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(state.filters.search.toLowerCase());
    const matchesPrice = product.price <= state.filters.priceRange;

    return matchesCategory && matchesSearch && matchesPrice;
  });
}

// Sort Products
function sortProducts(products) {
  return [...products].sort((a, b) => {
    const order = state.filters.sortOrder === "asc" ? 1 : -1;

    switch (state.filters.sortBy) {
      case "price":
        return (a.price - b.price) * order;
      case "rating":
        return (
          (calculateAverageRating(a.ratings) -
            calculateAverageRating(b.ratings)) *
          order
        );
      case "name":
        return a.title.localeCompare(b.title) * order;
      default:
        return 0;
    }
  });
}

// Helper Functions
function calculateAverageRating(ratings) {
  return (
    ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
  );
}

function generateStarRating(averageRating) {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }

  return stars;
}

function updatePriceDisplay() {
  elements.priceValue.textContent = `$${state.filters.priceRange}`;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Wishlist Functions
function toggleWishlist(productId) {
  if (state.wishlist.has(productId)) {
    state.wishlist.delete(productId);
    showToast("Removed from wishlist");
  } else {
    state.wishlist.add(productId);
    showToast("Added to wishlist");
  }

  elements.wishlistCount.textContent = state.wishlist.size;
  updateWishlistButtons(productId);
}

function updateWishlistButtons(productId) {
  document
    .querySelectorAll(`.wishlist-btn[data-id="${productId}"]`)
    .forEach(btn => {
      const isInWishlist = state.wishlist.has(productId);
      btn.classList.toggle("active", isInWishlist);
      btn.innerHTML = `
        <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i> 
        ${isInWishlist ? "In Wishlist" : "Add to Wishlist"}
      `;
    });
}

// Comparison Functions
function toggleComparison(productId) {
  if (state.comparison.has(productId)) {
    state.comparison.delete(productId);
    showToast("Removed from comparison");
  } else {
    if (state.comparison.size >= state.maxComparisonItems) {
      showToast(`Maximum ${state.maxComparisonItems} products for comparison`);
      return;
    }
    state.comparison.add(productId);
    showToast("Added to comparison");
  }

  updateComparisonUI();
}

function updateComparisonUI() {
  document.querySelectorAll(".compare-button").forEach(btn => {
    const productId = parseInt(btn.dataset.id);
    const isInComparison = state.comparison.has(productId);

    btn.classList.toggle("active", isInComparison);
    btn.innerHTML = `
      <i class="fas fa-${isInComparison ? "check" : "exchange-alt"}"></i> 
      ${
        isInComparison
          ? `Added (${state.comparison.size}/${state.maxComparisonItems})`
          : "Compare"
      }
    `;
  });

  elements.compareCount.textContent = state.comparison.size;
  elements.compareFloatBtn.style.display =
    state.comparison.size > 0 ? "flex" : "none";
}

function showComparisonModal() {
  if (state.comparison.size < 2) {
    showToast("Select at least 2 products to compare");
    return;
  }

  const modal = document.getElementById("comparisonModal");
  const container = document.getElementById("comparisonContainer");

  const comparisonProducts = Array.from(state.comparison).map(id =>
    products.find(p => p.id === id)
  );

  container.innerHTML = generateComparisonTable(comparisonProducts);
  modal.classList.add("active");
}

function generateComparisonTable(products) {
  const allSpecs = new Set();
  products.forEach(p => {
    Object.keys(p.specifications).forEach(spec => allSpecs.add(spec));
  });

  return `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Feature</th>
          ${products.map(p => `<th>${p.title}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Price</td>
          ${products.map(p => `<td>$${p.price.toFixed(2)}</td>`).join("")}
        </tr>
        <tr>
          <td>Rating</td>
          ${products
            .map(
              p => `
              <td>
                ${generateStarRating(calculateAverageRating(p.ratings))}
                (${p.ratings.length})
              </td>
            `
            )
            .join("")}
        </tr>
        ${Array.from(allSpecs)
          .map(
            spec => `
            <tr>
              <td>${spec}</td>
              ${products
                .map(
                  p => `
                  <td>${p.specifications[spec] || "N/A"}</td>
                `
                )
                .join("")}
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// Product Details Modal
function showProductDetails(product) {
  const modal = document.getElementById("productDetailsModal");
  const container = document.getElementById("productDetailsContainer");
  trackProductView(product);

  container.innerHTML = `
    <div class="product-details-image">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="product-details-info">
      <h3>${product.title}</h3>
      <div class="price">$${product.price.toFixed(2)}</div>
      <div class="rating">
        ${generateStarRating(calculateAverageRating(product.ratings))} 
        (${product.ratings.length} reviews)
      </div>
      <p class="description">${
        product.description || "No description available."
      }</p>
      <div class="specifications">
        <h4>Specifications</h4>
        <ul>
          ${Object.entries(product.specifications)
            .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
            .join("")}
        </ul>
      </div>
      ${
        product.variants
          ? `
        <div class="variants">
          <h4>Variants</h4>
          <div class="variant-options">
            ${product.variants
              .map(
                variant => `
                <div class="variant">
                  <div>Color: ${variant.color}</div>
                  <div>Size: ${variant.size}</div>
                  <div>Price: $${variant.price.toFixed(2)}</div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }
      <button class="add-to-cart" data-id="${product.id}">
        <i class="fas fa-shopping-cart"></i> Add to Cart
      </button>
    </div>
  `;

  modal.classList.add("active");
}

// Chatbot Functionality
function initializeChatbot() {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotModal = document.getElementById("chatbotModal");
  const chatInput = document.getElementById("chatInput");
  const chatSubmit = document.getElementById("chatSubmit");
  const chatMessages = document.getElementById("chatMessages");

  chatbotToggle.addEventListener("click", () => {
    chatbotModal.classList.toggle("active");
    if (chatbotModal.classList.contains("active")) {
      chatInput.focus();
    }
  });

  function addChatMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addChatMessage(message, "user");
    chatInput.value = "";

    setTimeout(() => {
      const responses = [
        "I can help you find products. Try asking about specific categories or price ranges.",
        "We have great deals on electronics right now. Would you like to see them?",
        "How can I assist you with your product search today?",
        "You might like our new arrivals. Shall I show you some recommendations?",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addChatMessage(randomResponse, "bot");
    }, 1000);
  }

  chatSubmit.addEventListener("click", processMessage);
  chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") processMessage();
  });

  addChatMessage(
    "Hello! I'm your product assistant. How can I help you today?",
    "bot"
  );
}

// Event Listeners
function setupEventListeners() {
  elements.categoryFilter.addEventListener("change", () => {
    state.filters.category = elements.categoryFilter.value;
    renderProducts(products);
  });

  elements.searchInput.addEventListener(
    "input",
    debounce(() => {
      state.filters.search = elements.searchInput.value.trim().toLowerCase();
      renderProducts(products);
    }, 300)
  );

  elements.priceRange.addEventListener("input", () => {
    state.filters.priceRange = parseFloat(elements.priceRange.value);
    updatePriceDisplay();
    renderProducts(products);
  });

  elements.sortBy.addEventListener("change", () => {
    state.filters.sortBy = elements.sortBy.value;
    renderProducts(products);
  });

  elements.sortOrder.addEventListener("click", () => {
    state.filters.sortOrder =
      state.filters.sortOrder === "asc" ? "desc" : "asc";
    elements.sortOrder.querySelector("i").className =
      state.filters.sortOrder === "asc"
        ? "fas fa-sort-amount-down"
        : "fas fa-sort-amount-up";
    renderProducts(products);
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.classList.contains("close-modal")) {
        modal.classList.remove("active");

        if (modal.id === "wishlistModal") {
          renderProducts(products);
        }
      }
    });
  });

  elements.wishlistToggle.addEventListener("click", showWishlistModal);
  elements.cartToggle.addEventListener("click", showCartModal);
  elements.clearCart.addEventListener("click", clearCart);
  elements.checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Your cart is empty");
      return;
    }
    showToast("Proceeding to checkout");
  });

  elements.gridView.addEventListener("click", () => {
    state.viewMode = "grid";
    elements.gridView.classList.add("active");
    elements.listView.classList.remove("active");
    elements.productGrid.classList.remove("list-view");
    elements.productGrid.classList.add("grid-view");
  });

  elements.listView.addEventListener("click", () => {
    state.viewMode = "list";
    elements.listView.classList.add("active");
    elements.gridView.classList.remove("active");
    elements.productGrid.classList.remove("grid-view");
    elements.productGrid.classList.add("list-view");
  });

  elements.mobileFilterToggle.addEventListener("click", () => {
    elements.filters.classList.toggle("active");
  });

  elements.wishlistToggle.addEventListener("click", showWishlistModal);
  document
    .getElementById("clearWishlist")
    .addEventListener("click", clearWishlist);
  document
    .getElementById("shareWishlist")
    .addEventListener("click", shareWishlist);

  document.addEventListener("click", e => {
    const target = e.target.closest("[data-id]");
    if (!target) return;

    const productId = parseInt(target.dataset.id);
    const product = products.find(p => p.id === productId);

    if (target.classList.contains("wishlist-btn")) {
      toggleWishlist(productId);
    } else if (target.classList.contains("remove-wishlist")) {
      toggleWishlist(productId);
      showWishlistModal();
    } else if (target.classList.contains("compare-button")) {
      toggleComparison(productId);
    } else if (target.classList.contains("quick-view-btn")) {
      showProductDetails(product);
    } else if (target.classList.contains("add-to-cart")) {
      addToCart(product);
      showToast(`${product.title} added to cart`);
    }

    if (e.target.closest(".quantity-increase")) {
      const productId = parseInt(e.target.closest("[data-id]").dataset.id);
      updateQuantity(productId, 1);
    } else if (e.target.closest(".quantity-decrease")) {
      const productId = parseInt(e.target.closest("[data-id]").dataset.id);
      updateQuantity(productId, -1);
    } else if (e.target.closest(".remove-item")) {
      const productId = parseInt(e.target.closest("[data-id]").dataset.id);
      removeFromCart(productId);
    }
  });

  elements.compareFloatBtn.addEventListener("click", showComparisonModal);

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.classList.contains("close-modal")) {
        modal.classList.remove("active");
      }
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach(modal => {
        modal.classList.remove("active");
      });
    }
  });
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = state.cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }
}

function addToCart(product) {
  const existingItem = state.cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartUI();
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Wishlist Functions
function showWishlistModal() {
  const modal = document.getElementById("wishlistModal");
  const container = document.getElementById("wishlistContainer");

  const wishlistProducts = Array.from(state.wishlist).map(id =>
    products.find(p => p.id === id)
  );

  if (wishlistProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="far fa-heart"></i>
        <h3>Your wishlist is empty</h3>
        <p>Add products to your wishlist to see them here</p>
      </div>
    `;
  } else {
    container.innerHTML = "";
    wishlistProducts.forEach(product => {
      container.appendChild(createWishlistItem(product));
    });
  }

  modal.classList.add("active");
}

function createWishlistItem(product) {
  const item = document.createElement("div");
  item.className = "wishlist-item";
  item.innerHTML = `
    <div class="wishlist-item-image">
      <img src="${product.image}" alt="${product.title}">
      <button class="remove-wishlist" data-id="${product.id}">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="wishlist-item-info">
      <h4>${product.title}</h4>
      <div class="price">$${product.price.toFixed(2)}</div>
      <button class="add-to-cart" data-id="${product.id}">
        <i class="fas fa-shopping-cart"></i> Add to Cart
      </button>
    </div>
  `;
  return item;
}

function clearWishlist() {
  if (
    state.wishlist.size === 0 ||
    !confirm("Are you sure you want to clear your wishlist?")
  )
    return;
  state.wishlist.clear();
  elements.wishlistCount.textContent = "0";
  showWishlistModal();
  showToast("Wishlist cleared");
}

function shareWishlist() {
  if (state.wishlist.size === 0) {
    showToast("Your wishlist is empty");
    return;
  }

  const shareData = {
    title: "My Wishlist",
    text: `My Wishlist:\n${Array.from(state.wishlist)
      .map(id => {
        const p = products.find(p => p.id === id);
        return `- ${p.title} ($${p.price.toFixed(2)})`;
      })
      .join("\n")}`,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => copyToClipboard(shareData.text));
  } else {
    copyToClipboard(shareData.text);
  }
}

function showCartModal() {
  renderCartItems();
  updateCartSummary();
  elements.cartModal.classList.add("active");
}

function renderCartItems() {
  elements.cartContainer.innerHTML = "";

  if (state.cart.length === 0) {
    elements.cartContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Add some products to your cart</p>
      </div>
    `;
    return;
  }

  state.cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <div class="price">$${item.price.toFixed(2)}</div>
        <div class="quantity-controls">
          <button class="quantity-decrease" data-id="${item.id}">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-increase" data-id="${item.id}">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="cart-item-actions">
        <button class="remove-item" data-id="${item.id}">
          <i class="fas fa-times"></i>
        </button>
        <div class="item-total">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `;
    elements.cartContainer.appendChild(cartItem);
  });
}

function updateCartSummary() {
  const subtotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  elements.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  elements.cartShipping.textContent = `$${shipping.toFixed(2)}`;
  elements.cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCount.textContent = count;
}

function addToCart(product) {
  const existingItem = state.cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartCount();
  showToast(`${product.title} added to cart`);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  updateCartCount();
  if (elements.cartModal.classList.contains("active")) {
    renderCartItems();
    updateCartSummary();
  }
}

function updateQuantity(productId, change) {
  const item = state.cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity < 1) {
    removeFromCart(productId);
  } else {
    updateCartCount();
    if (elements.cartModal.classList.contains("active")) {
      renderCartItems();
      updateCartSummary();
    }
  }
}

function clearCart() {
  if (
    state.cart.length === 0 ||
    !confirm("Are you sure you want to clear your cart?")
  )
    return;
  state.cart = [];
  updateCartCount();
  renderCartItems();
  updateCartSummary();
  showToast("Cart cleared");
}

// Recommendations Functions
function showRecommendationsModal() {
  const modal = document.getElementById("recommendationsModal");
  const container = document.getElementById("recommendationsContainer");

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="far fa-star"></i>
        <h3>No recommendations yet</h3>
        <p>View more products to get personalized recommendations</p>
      </div>
    `;
  } else {
    container.innerHTML = "";
    recommendations.forEach(product => {
      container.appendChild(createProductCard(product));
    });
  }

  modal.classList.add("active");
}

function getRecommendations() {
  if (state.viewedProducts.length === 0) {
    return products.slice(0, 4);
  }

  const lastViewed = state.viewedProducts[state.viewedProducts.length - 1];
  return products
    .filter(p => p.category === lastViewed.category && p.id !== lastViewed.id)
    .slice(0, 4);
}

function trackProductView(product) {
  if (!state.viewedProducts.some(p => p.id === product.id)) {
    state.viewedProducts.push(product);
    if (state.viewedProducts.length > 5) {
      state.viewedProducts.shift();
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
