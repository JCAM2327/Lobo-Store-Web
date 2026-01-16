// ============================================
// LOBO STORE - JavaScript Principal
// ============================================

// Estado de la aplicación
let products = [
    {
        id: 1,
        name: 'Zapatillas Deportivas Urban',
        price: 15999,
        category: 'calzado',
        emoji: '👟',
        size: '39-44',
        stock: 5,
        description: 'Zapatillas urbanas de alta calidad con diseño moderno'
    },
    {
        id: 2,
        name: 'Remera Oversize Street',
        price: 4999,
        category: 'ropa',
        emoji: '👕',
        size: 'S, M, L, XL',
        stock: 10,
        description: 'Remera 100% algodón con corte oversize'
    },
    {
        id: 3,
        name: 'Jean Cargo Negro',
        price: 12999,
        category: 'ropa',
        emoji: '👖',
        size: '28-38',
        stock: 7,
        description: 'Jean cargo con múltiples bolsillos, perfecto para el estilo urbano'
    },
    {
        id: 4,
        name: 'Gorra Snapback',
        price: 6999,
        category: 'accesorios',
        emoji: '🧢',
        size: 'Única',
        stock: 15,
        description: 'Gorra ajustable con diseño exclusivo'
    }
];

let cart = [];
let currentFilter = 'all';
let searchQuery = '';
let editingProductId = null;

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    const noResults = document.getElementById('no-results');

    // Filtrar productos
    let filteredProducts = products.filter(product => {
        const matchesCategory = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Mostrar/ocultar estados
    if (products.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        noResults.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    if (filteredProducts.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    // Renderizar productos (usar imagen si existe)
    grid.innerHTML = filteredProducts.map((product, index) => {
        const media = product.image
            ? `<img src="${product.image}" alt="${product.name}" class="w-32 h-32 object-cover rounded-lg mx-auto mb-4">`
            : `<div class="text-6xl mb-4">${product.emoji || '👗'}</div>`;

        return `
        <div class="card fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="relative p-6 text-center">
                ${media}
                <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-red-500/30 text-red-400 border border-red-500/50">
                    ${getCategoryLabel(product.category)}
                </span>
            </div>
            <div class="p-4 border-t border-white/10">
                <h4 class="font-bold text-lg mb-1 truncate" title="${product.name}">${product.name}</h4>
                <p class="text-red-500 font-black text-2xl mb-2">$${formatPrice(product.price)}</p>
                ${product.size ? `<p class="text-gray-400 text-sm mb-2">📏 ${product.size}</p>` : ''}
                ${product.stock !== undefined ? `<p class="text-gray-500 text-xs mb-3">Stock: ${product.stock} unidades</p>` : ''}
                <div class="flex gap-2">
                    <button onclick="addToCart(${product.id})" 
                        class="flex-1 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors text-sm">
                        AGREGAR 🛒
                    </button>
                    <button onclick="editProduct(${product.id})" 
                        class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        title="Editar producto">
                        ✏️
                    </button>
                    <button onclick="deleteProduct(${product.id})" 
                        class="p-2 rounded-lg bg-white/10 hover:bg-red-500/50 transition-colors"
                        title="Eliminar producto">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

function getCategoryLabel(category) {
    const labels = {
        ropa: 'ROPA',
        calzado: 'CALZADO',
        accesorios: 'ACCESORIOS'
    };
    return labels[category] || category.toUpperCase();
}

function formatPrice(price) {
    return Number(price).toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

// ============================================
// FUNCIONES DE FILTRADO Y BÚSQUEDA
// ============================================

function filterCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.category === category);
    });
    renderProducts();
}

function searchProducts(query) {
    searchQuery = query;
    renderProducts();
}

// ============================================
// FUNCIONES DE PRODUCTOS (modificadas/adicionales)
// ============================================

function openAddProduct() {
    editingProductId = null;
    document.getElementById('modal-title').textContent = 'AGREGAR PRODUCTO';
    document.getElementById('product-form').reset();
    document.getElementById('product-emoji').value = '👗';
    document.getElementById('product-id').value = '';
    clearImage(); // asegurar estado inicial sin imagen
    enableEmojiUI();
    document.getElementById('product-modal').classList.remove('hidden');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingProductId = id;
    document.getElementById('modal-title').textContent = 'EDITAR PRODUCTO';
    document.getElementById('product-id').value = id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-emoji').value = product.emoji || '👗';
    document.getElementById('product-size').value = product.size || '';
    document.getElementById('product-stock').value = product.stock || '';
    document.getElementById('product-description').value = product.description || '';

    // Mostrar imagen si existe y deshabilitar emojis
    if (product.image) {
        document.getElementById('product-image-data').value = product.image;
        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">`;
        disableEmojiUI();
        document.getElementById('product-emoji').value = '';
    } else {
        clearImage();
        enableEmojiUI();
        document.getElementById('product-emoji').value = product.emoji || '👗';
    }

    document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    editingProductId = null;
    // opcional: mantener preview o limpiar
}

// Selección de emoji: limpia imagen si se selecciona emoji
function selectEmoji(emoji) {
    // si hay imagen activa, ignorar selección
    const imageData = document.getElementById('product-image-data').value;
    if (imageData) return;
    document.getElementById('product-emoji').value = emoji;
}

// Manejo del submit: incluir image en el objeto producto
function handleProductSubmit(event) {
    event.preventDefault();

    const productData = {
        id: editingProductId || Date.now(),
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value,
        emoji: document.getElementById('product-emoji').value,
        image: document.getElementById('product-image-data').value || null,
        size: document.getElementById('product-size').value,
        stock: parseInt(document.getElementById('product-stock').value) || 0,
        description: document.getElementById('product-description').value
    };

    if (editingProductId) {
        const index = products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            products[index] = productData;
            showToast('Producto actualizado correctamente', 'success');
        }
    } else {
        products.push(productData);
        showToast('Producto agregado correctamente', 'success');
    }

    saveToLocalStorage();
    closeProductModal();
    renderProducts();
}

// ============================================
// FUNCIONES DE IMAGEN (nuevas)
// ============================================

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        document.getElementById('product-image-data').value = imageData;

        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img src="${imageData}" alt="Preview" class="w-full h-full object-cover">`;

        // cuando hay imagen, deshabilitar emojis y limpiar valor emoji
        disableEmojiUI();
        document.getElementById('product-emoji').value = '';
    };
    reader.readAsDataURL(file);
}

function clearImage() {
    const fileInput = document.getElementById('product-image');
    if (fileInput) fileInput.value = '';
    document.getElementById('product-image-data').value = '';
    const preview = document.getElementById('image-preview');
    if (preview) preview.innerHTML = '<span class="text-gray-500 text-sm">Sin imagen</span>';
    enableEmojiUI();
}

// Deshabilitar/Habilitar UI de emojis
function disableEmojiUI() {
    document.getElementById('product-emoji').setAttribute('disabled', 'disabled');
    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.setAttribute('disabled', 'disabled');
        btn.classList.add('opacity-50', 'pointer-events-none');
    });
}

function enableEmojiUI() {
    document.getElementById('product-emoji').removeAttribute('disabled');
    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.removeAttribute('disabled');
        btn.classList.remove('opacity-50', 'pointer-events-none');
    });
}

// ============================================
// FUNCIONES DEL CARRITO
// ============================================

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            product: product,
            quantity: 1
        });
    }

    updateCartUI();
    showToast(`${product.name} agregado al carrito`, 'success');
}

function updateCartUI() {
    const countElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        countElement.textContent = totalItems;
        countElement.classList.remove('hidden');
    } else {
        countElement.classList.add('hidden');
    }
}

function openCart() {
    renderCartItems();
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const emptyElement = document.getElementById('cart-empty');
    const footerElement = document.getElementById('cart-footer');
    const totalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = '';
        emptyElement.classList.remove('hidden');
        footerElement.classList.add('hidden');
        return;
    }

    emptyElement.classList.add('hidden');
    footerElement.classList.remove('hidden');

    let total = 0;
    container.innerHTML = cart.map(item => {
        const subtotal = item.product.price * item.quantity;
        total += subtotal;
        const media = item.product.image
            ? `<img src="${item.product.image}" alt="${item.product.name}" class="w-12 h-12 object-cover rounded">`
            : `<div class="text-3xl">${item.product.emoji || '👗'}</div>`;

        return `
            <div class="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                ${media}
                <div class="flex-1 min-w-0">
                    <h4 class="font-medium truncate">${item.product.name}</h4>
                    <p class="text-red-500 text-sm font-bold">$${formatPrice(item.product.price)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateCartQuantity(${item.id}, -1)" 
                        class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-bold">
                        -
                    </button>
                    <span class="w-8 text-center font-bold">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)" 
                        class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-bold">
                        +
                    </button>
                </div>
                <button onclick="removeFromCart(${item.id})" 
                    class="p-2 text-red-400 hover:text-red-300 transition-colors text-xl">
                    ✕
                </button>
            </div>
        `;
    }).join('');

    totalElement.textContent = `$${formatPrice(total)}`;
}

function updateCartQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            renderCartItems();
            updateCartUI();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCartItems();
    updateCartUI();
}

function sendWhatsAppOrder() {
    if (cart.length === 0) return;

    // Número de WhatsApp (cambiar por el tuyo)
    const whatsappNumber = '5492235023826'; // Formato: código país + número sin espacios

    let message = '🐺 *PEDIDO LOBO STORE*\n\n';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.product.price * item.quantity;
        total += subtotal;
        message += `• ${item.product.emoji} *${item.product.name}*\n`;
        message += `  Cantidad: ${item.quantity}\n`;
        message += `  Subtotal: $${formatPrice(subtotal)}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL: $${formatPrice(total)}*\n\n`;
    message += `¡Gracias por tu compra! 🙌`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-bold z-50 fade-in ${
        type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`;
    toast.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// PERSISTENCIA DE DATOS
// ============================================

function saveToLocalStorage() {
    try {
        localStorage.setItem('lobo-store-products', JSON.stringify(products));
    } catch (error) {
        console.error('Error al guardar productos:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('lobo-store-products');
        if (saved) {
            products = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderProducts();
    updateCartUI();

    // Smooth scroll para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🐺 LOBO STORE cargado correctamente');
});

// Cerrar modales con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCart();
    }
});