// catalogo.js - Gestión del catálogo
document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        {
            id: 1,
            nombre: "Laptop Gaming RYZEN 7",
            precio: 1299990,
            categoria: "laptop",
            imagen: "https://media.falabella.com/falabellaCL/17116449_01/w=800,h=800,fit=pad",
            descripcion: "RTX 4060, 16GB RAM, 1TB SSD, 144Hz. Ideal para gaming y streaming.",
            badges: ['Nuevo', 'Gaming'],
            stock: true
        },
        {
            id: 2,
            nombre: "Audífonos Sony WH-1000XM5",
            precio: 299990,
            categoria: "audio",
            imagen: "https://www.sony.cl/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
            descripcion: "Cancelación de ruido premium, 30h batería, calidad de sonido excepcional.",
            badges: ['Oferta', 'Wireless'],
            stock: true,
            precioAnterior: 399990
        },
        {
            id: 3,
            nombre: "Teclado Mecánico Razer BlackWidow",
            precio: 89990,
            categoria: "periferico",
            imagen: "https://assets2.razerzone.com/images/pnx.assets/f83991a174978c3f88c089758ea9fa3c/blackwidow-v3-tenkeyless-usp1-mobile-v2.jpg",
            descripcion: "Switches verdes, iluminación RGB Chroma, construcción durable.",
            badges: ['RGB', 'Mecánico'],
            stock: true
        },
        {
            id: 4,
            nombre: "Monitor Gaming 27\" 4K",
            precio: 459990,
            categoria: "monitor",
            imagen: "https://assets.pcfactory.cl/public/foto/53606/1_1000.jpg?t=1758629277039",
            descripcion: "IPS panel, HDR400, FreeSync Premium, tiempo de respuesta 1ms.",
            badges: ['4K', '144Hz'],
            stock: true
        },
        {
            id: 5,
            nombre: "Mouse Logitech G Pro X",
            precio: 64990,
            categoria: "periferico",
            imagen: "https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/0/9/097855158024-01.jpg",
            descripcion: "Sensor HERO 25K, ligero (63g), Lightsync RGB, 70h batería.",
            badges: ['Wireless', 'RGB'],
            stock: true
        },
        {
            id: 6,
            nombre: "SSD Samsung 980 Pro 2TB",
            precio: 129990,
            categoria: "almacenamiento",
            imagen: "https://m.media-amazon.com/images/I/61JkTXrgYxS._AC_SL1500_.jpg",
            descripcion: "Velocidades hasta 7000MB/s, ideal para gaming y trabajo profesional.",
            badges: ['NVMe', '2TB'],
            stock: true
        }
    ];

    // Función para mostrar productos en la página
    function renderProductos(productosArray) {
        const grid = document.getElementById('productGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        productosArray.forEach(producto => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 mb-4';
            
            col.innerHTML = `
                <div class="card product-card border-0 shadow-sm h-100">
                    <div class="position-relative">
                        <div class="product-image rounded-top">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" loading="lazy" style="height: 200px; object-fit: cover; width: 100%;">
                        </div>
                        <div class="position-absolute top-0 start-0 m-3">
                            ${producto.badges.map(badge => `<span class="badge bg-success bg-opacity-90 me-1">${badge}</span>`).join('')}
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${producto.nombre}</h5>
                        <p class="card-text text-muted flex-grow-1">${producto.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div>
                                <span class="price fw-bold">$${producto.precio.toLocaleString('es-CL')}</span>
                                ${producto.precioAnterior ? `<small class="text-muted"><s>$${producto.precioAnterior.toLocaleString('es-CL')}</s></small>` : ''}
                                <small class="text-success d-block">${producto.stock ? 'En stock' : 'Agotado'}</small>
                            </div>
                            <div class="btn-group" role="group">
                                <button class="btn btn-outline-primary btn-sm" onclick="verDetalle(${producto.id})">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-primary btn-sm" ${!producto.stock ? 'disabled' : ''}>
                                    <i class="bi bi-cart-plus"></i> Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            grid.appendChild(col);
        });
    }

    // Configurar filtros
    function setupFiltros() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Quitar active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar active al botón clickeado
                this.classList.add('active');

                // Filtrar productos
                let productosFiltrados;
                if (filter === 'all') {
                    productosFiltrados = productos;
                } else {
                    productosFiltrados = productos.filter(p => p.categoria === filter);
                }
                
                renderProductos(productosFiltrados);
            });
        });
    }

    // Configurar búsqueda
    function setupBusqueda() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                renderProductos(productos);
                return;
            }

            const productosFiltrados = productos.filter(p => 
                p.nombre.toLowerCase().includes(searchTerm) || 
                p.descripcion.toLowerCase().includes(searchTerm)
            );
            
            renderProductos(productosFiltrados);
        });
    }

    // Inicializar todo
    function init() {
        renderProductos(productos);
        setupFiltros();
        setupBusqueda();
    }

    // Iniciar cuando el DOM esté listo
    init();
});

// Función global para ver detalles
function verDetalle(id) {
    alert(`Ver detalles del producto ${id} - Esta función se implementará después`);
}