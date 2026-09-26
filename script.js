/* ═══════════════════════════════════════════════════════════
   NORTH — Always Move Forward
   Premium Streetwear Full Interactive Engine
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── 1. COMPLETE PRODUCT CATALOG DATABASE ───
    const PRODUCTS = [
        {
            id: 'p1',
            name: 'North 240 GSM Oversized Heavyweight Tee',
            category: 'tshirts',
            gsm: '240',
            price: 1499,
            originalPrice: 2799,
            discountPercent: '46% OFF',
            rating: 4.9,
            reviewCount: 148,
            badge: 'NEW',
            viewers: 26,
            stockLeft: 4,
            isBestSeller: true,
            colors: [
                { name: 'Vintage Onyx Black', hex: '#1a1a1a', colorKey: 'black', img: 'images/product-1.jpg' },
                { name: 'Bone Cream Graphic', hex: '#f4f2ec', colorKey: 'white', img: 'images/product-white-tee.jpg' },
                { name: 'Vintage Sage', hex: '#657b64', colorKey: 'sage', img: 'images/product-sage-tee.jpg' },
                { name: 'Cobalt Blue', hex: '#1d4ed8', colorKey: 'blue', img: 'images/product-blue-tee.jpg' }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            description: 'Engineered from 240 GSM combed ring-spun cotton. Features an authentic drop-shoulder boxy drape, thick 1.25" rib collar that never wrinkles or sags, and enzyme bio-wash for anti-pilling durability.',
            specs: '100% Combed Ring-Spun Cotton | 240 GSM Single Jersey | Enzyme Bio-Washed | Thermal Pre-Shrunk | Heavy Ribbed Collar | Made in India'
        },
        {
            id: 'p2',
            name: 'Heavyweight Loop-Knit Boxy Hoodie',
            category: 'hoodies',
            gsm: '360',
            price: 2999,
            originalPrice: 4999,
            discountPercent: '40% OFF',
            rating: 4.8,
            reviewCount: 92,
            badge: 'SALE',
            viewers: 19,
            stockLeft: 3,
            isBestSeller: true,
            colors: [
                { name: 'Cloud White', hex: '#ffffff', colorKey: 'white', img: 'images/product-2.jpg' },
                { name: 'Midnight Black', hex: '#111111', colorKey: 'black', img: 'images/look-midnight-nomad.jpg' }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            description: '360 GSM French terry cotton with deep double-layer hood, hidden kangaroo pouch, and relaxed drop-shoulder cut. Engineered for harsh metropolitan chills.',
            specs: '100% French Terry Cotton | 360 GSM Heavyweight | Double-Layered Hood | No Drawstrings (Clean Street Aesthetic) | Heavy Lycra Ribbing'
        },
        {
            id: 'p3',
            name: 'Tactical 6-Pocket Cargo Joggers',
            category: 'pants',
            gsm: '280',
            price: 2499,
            originalPrice: 3999,
            discountPercent: '38% OFF',
            rating: 4.9,
            reviewCount: 214,
            badge: 'HOT',
            viewers: 32,
            stockLeft: 5,
            isBestSeller: true,
            colors: [
                { name: 'Olive Green', hex: '#556b2f', colorKey: 'olive', img: 'images/product-olive-cargo.jpg' },
                { name: 'Navy Blue', hex: '#0d1b2a', colorKey: 'blue', img: 'images/product-3.jpg' },
                { name: 'Midnight Black', hex: '#111111', colorKey: 'black', img: 'images/product-3.jpg' }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            sizeLabels: ['30(S)', '32(M)', '34(L)', '36(XL)', '38(XXL)'],
            description: 'Military-grade 280 GSM cotton twill with articulated knee panels, deep dual bellows cargo pockets with matte tactical hardware, and custom elasticized ankle cuffs.',
            specs: '98% Heavy Cotton Twill, 2% Spandex | 280 GSM | 6 Deep Utility Pockets | Heavy-Duty YKK Hardware | Reinforced Gusseted Crotch'
        },
        {
            id: 'p4',
            name: 'Tokyo Drift Flight Bomber Jacket',
            category: 'jackets',
            gsm: '320',
            price: 4999,
            originalPrice: 7999,
            discountPercent: '38% OFF',
            rating: 4.9,
            reviewCount: 67,
            badge: 'HOT',
            viewers: 14,
            stockLeft: 2,
            isBestSeller: false,
            colors: [
                { name: 'Olive Drab', hex: '#556b2f', colorKey: 'olive', img: 'images/product-4.jpg' },
                { name: 'Jet Black', hex: '#111111', colorKey: 'black', img: 'images/look-tokyo-drift.jpg' }
            ],
            sizes: ['M', 'L', 'XL'],
            description: 'Custom flight nylon shell with water-repellent DWR coating, utility sleeve pocket with pull ribbon, heavy brass zipper, and quilted orange diamond lining.',
            specs: '100% High-Density Flight Nylon | 320 GSM Construction | Diamond Quilted Polyfill Thermal Insulation | Utility Arm Pocket'
        },
        {
            id: 'p5',
            name: 'Minimalist Washed Crewneck Pullover',
            category: 'hoodies',
            gsm: '320',
            price: 2299,
            originalPrice: 3499,
            discountPercent: '34% OFF',
            rating: 4.7,
            reviewCount: 78,
            badge: 'NEW',
            viewers: 11,
            stockLeft: 6,
            isBestSeller: false,
            colors: [
                { name: 'Heather Grey', hex: '#9ca3af', colorKey: 'grey', img: 'images/product-5.jpg' },
                { name: 'Pitch Black', hex: '#111111', colorKey: 'black', img: 'images/product-1.jpg' }
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            description: '320 GSM combed loop-back cotton sweatshirt with ribbed collar triangle stitch, relaxed oversized drape, and vintage garment acid wash treatment.',
            specs: '100% Combed Cotton | 320 GSM Terry Loop | Garment Pigment-Dyed | Seamless Side Construction | Ribbed Cuffs and Hem'
        },
        {
            id: 'p6',
            name: 'Embroidered Heavyweight Dad Cap',
            category: 'accessories',
            gsm: '280',
            price: 899,
            originalPrice: 1499,
            discountPercent: '40% OFF',
            rating: 4.8,
            reviewCount: 165,
            badge: 'NEW',
            viewers: 22,
            stockLeft: 8,
            isBestSeller: true,
            colors: [
                { name: 'Pitch Black', hex: '#111111', colorKey: 'black', img: 'images/product-6.jpg' },
                { name: 'Chalk White', hex: '#ffffff', colorKey: 'white', img: 'images/product-white-tee.jpg' }
            ],
            sizes: ['Free Size'],
            description: 'Unstructured 6-panel low profile dad cap crafted from heavy washed cotton chino twill. Features high-density 3D tonal "NORTH" embroidery and brass buckle backstrap.',
            specs: '100% Washed Cotton Chino Twill | Custom Matte Brass Clasp | 6-Panel Low Profile | Moisture-Wicking Interior Sweatband'
        },
        {
            id: 'p7',
            name: 'Raw Edge Acid Wash Drop-Shoulder Tee',
            category: 'tshirts',
            gsm: '260',
            price: 1699,
            originalPrice: 2999,
            discountPercent: '43% OFF',
            rating: 4.9,
            reviewCount: 112,
            badge: 'SALE',
            viewers: 28,
            stockLeft: 3,
            isBestSeller: true,
            colors: [
                { name: 'Vintage Sage', hex: '#657b64', colorKey: 'sage', img: 'images/product-sage-tee.jpg' },
                { name: 'Cobalt Blue', hex: '#1d4ed8', colorKey: 'blue', img: 'images/product-blue-tee.jpg' },
                { name: 'Raw Off-White', hex: '#f4f2ec', colorKey: 'white', img: 'images/product-white-tee.jpg' }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            description: '260 GSM extra-heavy single jersey subjected to individual hand-acid washing for unique one-of-one distress variations. Raw cut hemline with safety lock stitching.',
            specs: '100% Combed Cotton | 260 GSM Heavyweight | Hand Acid-Washed Treatment | Raw-Cut Hem with Reinforced Stitch | Made in India'
        },
        {
            id: 'p8',
            name: 'Tactical Relaxed Track Pant',
            category: 'pants',
            gsm: '320',
            price: 2699,
            originalPrice: 4299,
            discountPercent: '37% OFF',
            rating: 4.8,
            reviewCount: 84,
            badge: 'NEW',
            viewers: 17,
            stockLeft: 5,
            isBestSeller: false,
            colors: [
                { name: 'Midnight Black', hex: '#111111', colorKey: 'black', img: 'images/look-urban-transit.jpg' },
                { name: 'Olive Green', hex: '#556b2f', colorKey: 'olive', img: 'images/product-olive-cargo.jpg' }
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            sizeLabels: ['30(S)', '32(M)', '34(L)', '36(XL)'],
            description: 'Heavy loop-knit cotton track pants with nylon utility knee panels, concealed ankle zip expanders, and extra-long tonal drawstrings.',
            specs: '100% Heavy French Terry & Ripstop Nylon | 320 GSM | Ankle Zipper Expanders | Matte Black Hardware'
        }
    ];

    // ─── 2. LOOKBOOK DATA ───
    const LOOKS = {
        urban: {
            title: 'The Urban Transit Look',
            tag: 'HEAD-TO-TOE STREETWEAR OUTFIT',
            image: 'images/look-urban-transit.jpg',
            badge: 'LOOK 01 / 03',
            desc: 'Crafted for high-frequency metropolitan pace. Heavyweight oversized black tee layered with utilitarian tactical cargo joggers and our signature embroidered cap.',
            items: [
                { name: 'Essential 240 GSM Boxy Tee', spec: 'Midnight Black • Size L', price: 1499, img: 'images/product-1.jpg' },
                { name: 'Tactical 6-Pocket Cargo Joggers', spec: 'Olive Green • Size 32', price: 2499, img: 'images/product-olive-cargo.jpg' },
                { name: 'Embroidered Dad Cap', spec: 'Pitch Black • Free Size', price: 899, img: 'images/product-6.jpg' }
            ],
            mrp: 4897,
            bundledPrice: 3999,
            saving: 898
        },
        nomad: {
            title: 'The Midnight Nomad Look',
            tag: 'OVERSIZED MONOCHROME OUTFIT',
            image: 'images/look-midnight-nomad.jpg',
            badge: 'LOOK 02 / 03',
            desc: 'Ultra-clean Tokyo street aesthetic. 360 GSM Cloud White loop-knit boxy hoodie paired with relaxed charcoal cargo pants and city utility sling.',
            items: [
                { name: 'Heavyweight Loop-Knit Boxy Hoodie', spec: 'Cloud White • Size L', price: 2999, img: 'images/product-2.jpg' },
                { name: 'Tactical 6-Pocket Cargo Joggers', spec: 'Midnight Black • Size 32', price: 2499, img: 'images/product-3.jpg' },
                { name: 'Embroidered Dad Cap', spec: 'Pitch Black • Free Size', price: 899, img: 'images/product-6.jpg' }
            ],
            mrp: 6397,
            bundledPrice: 4999,
            saving: 1398
        },
        tokyo: {
            title: 'Tokyo Cyber Drift Look',
            tag: 'HEAVYWEIGHT LAYERED ENSEMBLE',
            image: 'images/look-tokyo-drift.jpg',
            badge: 'LOOK 03 / 03',
            desc: 'The definitive cold-weather streetwear uniform. Tokyo Drift flight bomber jacket over a 240 GSM raw drop-shoulder tee and tactical cargos.',
            items: [
                { name: 'Tokyo Drift Flight Bomber Jacket', spec: 'Olive Drab • Size L', price: 4999, img: 'images/product-4.jpg' },
                { name: 'North 240 GSM Oversized Tee', spec: 'Midnight Black • Size L', price: 1499, img: 'images/product-1.jpg' },
                { name: 'Tactical 6-Pocket Cargo Joggers', spec: 'Olive Green • Size 32', price: 2499, img: 'images/product-olive-cargo.jpg' }
            ],
            mrp: 8997,
            bundledPrice: 6999,
            saving: 1998
        }
    };

    // Default initial demo order if none in localStorage
    const DEFAULT_INITIAL_ORDERS = [
        {
            id: 'NORTH-849201',
            date: '19 Sep 2026, 02:45 PM',
            deliveryDate: '23 Sep 2026 (Express)',
            customer: {
                name: 'Aryan Mehta',
                phone: '9820149201',
                email: 'aryan.mehta@gmail.com',
                address: 'Flat 402, Sea Green Apts, Linking Road, Bandra West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400050'
            },
            items: [
                {
                    id: 'p1',
                    name: 'North 240 GSM Oversized Heavyweight Tee',
                    color: 'Midnight Black',
                    size: 'L',
                    qty: 1,
                    price: 1499,
                    originalPrice: 2799,
                    img: 'images/product-1.jpg'
                },
                {
                    id: 'p3',
                    name: 'Tactical 6-Pocket Cargo Joggers',
                    color: 'Olive Green',
                    size: '32(M)',
                    qty: 1,
                    price: 2499,
                    originalPrice: 3999,
                    img: 'images/product-olive-cargo.jpg'
                }
            ],
            paymentMethod: 'Instant UPI (GPay)',
            mrpTotal: 6798,
            grandTotal: '₹3,998',
            status: 'In Transit',
            carrier: 'Bluedart Express',
            awb: 'BLU-84920194',
            currentStep: 3
        }
    ];

    // Default initial verified reviews
    const DEFAULT_INITIAL_REVIEWS = [
        {
            id: 'rev-1',
            author: 'Aryan Mehta',
            city: 'Mumbai',
            productName: 'North 240 GSM Oversized Heavyweight Tee',
            rating: 5,
            size: 'L',
            height: "5'11\"",
            fit: 'True to Boxy Oversized',
            comment: 'The 240 GSM collar does NOT stretch out or bacon even after 8 machine washes. The boxy drop shoulder drape is exactly what I was looking for. Easily beats luxury brands charging 4x.',
            date: '18 Sep 2026',
            helpful: 24,
            isVerified: true
        },
        {
            id: 'rev-2',
            author: 'Sahil Kapoor',
            city: 'Delhi',
            productName: 'Tactical 6-Pocket Cargo Joggers',
            rating: 5,
            size: '32(M)',
            height: "6'0\"",
            fit: 'True to Boxy Oversized',
            comment: 'Built quality of the tactical cargo joggers is insane. Sturdy zippers, deep pockets, and tapers perfectly with high-top sneakers. Delivery to Delhi took just 2 days!',
            date: '15 Sep 2026',
            helpful: 19,
            isVerified: true
        },
        {
            id: 'rev-3',
            author: 'Varun Rao',
            city: 'Bengaluru',
            productName: 'Heavyweight Loop-Knit Boxy Hoodie',
            rating: 5,
            size: 'L',
            height: "5'10\"",
            fit: 'True to Boxy Oversized',
            comment: 'Used the "Find My Fit" tool and it recommended Size L for my 5\'10 athletic build. The fit is 10/10 boxy perfection. Customer support on email responded in 15 minutes.',
            date: '12 Sep 2026',
            helpful: 15,
            isVerified: true
        },
        {
            id: 'rev-4',
            author: 'Riya Sen',
            city: 'Kolkata',
            productName: 'Tokyo Drift Flight Bomber Jacket',
            rating: 5,
            size: 'M',
            height: "5'7\"",
            fit: 'True to Boxy Oversized',
            comment: 'Heavy nylon shell with the orange quilted interior feels authentic and luxurious. Perfect streetwear layering piece.',
            date: '10 Sep 2026',
            helpful: 11,
            isVerified: true
        }
    ];

    // ─── 3. APPLICATION STATE & PERSISTENCE ───
    const STATE = {
        cart: JSON.parse(localStorage.getItem('north_cart') || '[]'),
        wishlist: JSON.parse(localStorage.getItem('north_wishlist') || '[]'),
        appliedCoupon: JSON.parse(localStorage.getItem('north_coupon') || 'null'),
        orders: JSON.parse(localStorage.getItem('north_orders') || 'null') || DEFAULT_INITIAL_ORDERS,
        reviews: JSON.parse(localStorage.getItem('north_reviews') || 'null') || DEFAULT_INITIAL_REVIEWS,
        activeTrackOrderId: 'NORTH-849201',
        activeReviewFilter: 'all',
        newReviewRating: 5,
        stylerOutfit: {
            topId: 'p1',
            topColorIdx: 0,
            topSize: 'L',
            bottomId: 'p3',
            bottomColorIdx: 0,
            bottomSize: '32(M)',
            capId: 'p6',
            capColorIdx: 0,
            capSize: 'Free Size'
        },
        activeFilter: 'all',
        maxPrice: 5000,
        activeGsm: 'all',
        activeColor: 'all',
        activeSize: 'all',
        activeSort: 'featured',
        quickViewProduct: null,
        quickViewColorIndex: 0,
        quickViewSize: 'L',
        quickViewQty: 1,
        comboSlot1: {
            productId: 'p1',
            colorName: 'Vintage Onyx Black',
            colorImg: 'images/product-1.jpg',
            size: 'L',
            price: 1499,
            mrp: 2799
        },
        comboSlot2: {
            type: 'cargo', // 'tee' or 'cargo'
            productId: 'p3',
            name: 'Tactical 6-Pocket Cargo Joggers',
            colorName: 'Olive Green',
            colorImg: 'images/product-olive-cargo.jpg',
            size: '32(M)',
            price: 2499,
            mrp: 3999,
            discount: 299
        }
    };

    function saveCart() {
        localStorage.setItem('north_cart', JSON.stringify(STATE.cart));
        updateCartBadges();
        renderCartDrawer();
    }

    function saveWishlist() {
        localStorage.setItem('north_wishlist', JSON.stringify(STATE.wishlist));
        updateWishlistBadges();
        renderWishlistDrawer();
    }

    function saveCoupon() {
        localStorage.setItem('north_coupon', JSON.stringify(STATE.appliedCoupon));
    }

    function saveOrders() {
        localStorage.setItem('north_orders', JSON.stringify(STATE.orders));
        updateTrackOrderBadges();
    }

    function saveReviews() {
        localStorage.setItem('north_reviews', JSON.stringify(STATE.reviews));
    }

    // ─── 4. TOAST NOTIFICATION SYSTEM ───
    function showToast(message, icon = 'fa-check', isError = false) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : ''}`;
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.35s ease forwards';
            setTimeout(() => toast.remove(), 350);
        }, 3200);
    }

    // ─── 5. CATALOG RENDERING & FILTER ENGINE ───
    function renderCatalog() {
        const grid = document.getElementById('mainProductGrid');
        const emptyState = document.getElementById('emptyCatalogState');
        if (!grid) return;

        let filtered = PRODUCTS.filter(p => {
            // Category filter
            if (STATE.activeFilter === 'bestseller') {
                if (!p.isBestSeller) return false;
            } else if (STATE.activeFilter !== 'all' && p.category !== STATE.activeFilter) {
                return false;
            }

            // Price filter
            if (p.price > STATE.maxPrice) return false;

            // GSM filter
            if (STATE.activeGsm !== 'all' && p.gsm !== STATE.activeGsm) return false;

            // Color filter
            if (STATE.activeColor !== 'all') {
                const hasColor = p.colors.some(c => c.colorKey === STATE.activeColor);
                if (!hasColor) return false;
            }

            // Size filter
            if (STATE.activeSize !== 'all') {
                const hasSize = p.sizes.includes(STATE.activeSize);
                if (!hasSize) return false;
            }

            return true;
        });

        // Sorting
        if (STATE.activeSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (STATE.activeSort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (STATE.activeSort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (STATE.activeSort === 'popular') {
            filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        }

        if (filtered.length === 0) {
            grid.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        grid.innerHTML = filtered.map(product => {
            const isWishlisted = STATE.wishlist.some(item => item.id === product.id);
            const defaultColor = product.colors[0];

            return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-container">
                    <img src="${defaultColor.img}" alt="${product.name}" class="product-card-img" id="img-${product.id}">
                    
                    <div class="product-badge-group">
                        <span class="card-badge badge-new">${product.badge}</span>
                        <span class="card-badge badge-sale">${product.discountPercent}</span>
                    </div>

                    <div class="card-floating-actions">
                        <button class="card-action-btn quick-view-btn" data-id="${product.id}" title="Quick View" aria-label="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="card-action-btn wishlist-toggle-btn ${isWishlisted ? 'active-wishlist' : ''}" data-id="${product.id}" title="Wishlist" aria-label="Save to Wishlist">
                            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>

                    <!-- Quick Size Selector Bar on Card Hover -->
                    <div class="card-quick-size-bar">
                        <span class="quick-size-label">QUICK ADD:</span>
                        ${product.sizes.map(s => `
                            <button class="quick-size-btn" data-id="${product.id}" data-size="${s}" title="1-Click Add Size ${s}">${s}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="product-card-info">
                    <div class="product-card-top-meta">
                        <span class="product-card-category">${product.category.toUpperCase()} • ${product.gsm} GSM</span>
                        <div class="product-card-rating">
                            <i class="fas fa-star"></i> ${product.rating} <span>(${product.reviewCount})</span>
                        </div>
                    </div>

                    <h3 class="product-card-title">${product.name}</h3>

                    <div class="product-card-prices">
                        <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
                        <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                        <span class="price-discount-tag">${product.discountPercent}</span>
                    </div>

                    <!-- Urgency / Scarcity Badge -->
                    <div class="card-scarcity-alert">
                        <i class="fas fa-fire"></i> ${product.viewers} viewing • Only ${product.stockLeft} left
                    </div>

                    <!-- True-to-Color Swatches Bar -->
                    <div class="product-card-swatches-wrap">
                        <div class="card-swatches-list">
                            ${product.colors.map((c, i) => `
                                <span class="card-swatch-dot ${i === 0 ? 'active' : ''}" 
                                      style="background:${c.hex}; ${c.hex === '#ffffff' ? 'border:1px solid #ccc;' : ''}" 
                                      data-id="${product.id}" 
                                      data-index="${i}" 
                                      data-img="${c.img}" 
                                      data-name="${c.name}"
                                      title="${c.name}"></span>
                            `).join('')}
                        </div>
                        <span class="card-selected-color-label" id="colorlabel-${product.id}">${defaultColor.name}</span>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        attachCatalogEventListeners();
        updateActiveFilterBadge();
    }

    function attachCatalogEventListeners() {
        // Color Swatch Swapping with Crossfade
        document.querySelectorAll('.card-swatch-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = dot.dataset.id;
                const imgUrl = dot.dataset.img;
                const colorName = dot.dataset.name;

                // Parent card swatches
                const parent = dot.closest('.card-swatches-list');
                parent.querySelectorAll('.card-swatch-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                // Label update
                const label = document.getElementById(`colorlabel-${id}`);
                if (label) label.textContent = colorName;

                // Image Swap with Crossfade
                const img = document.getElementById(`img-${id}`);
                if (img && img.src !== imgUrl) {
                    img.style.opacity = '0.3';
                    setTimeout(() => {
                        img.src = imgUrl;
                        img.style.opacity = '1';
                    }, 180);
                }
            });
        });

        // Quick Size 1-Click Add
        document.querySelectorAll('.quick-size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const size = btn.dataset.size;
                const product = PRODUCTS.find(p => p.id === id);
                if (!product) return;

                // Determine active color on the card
                const card = btn.closest('.product-card');
                const activeSwatch = card.querySelector('.card-swatch-dot.active');
                const activeColor = activeSwatch ? activeSwatch.dataset.name : product.colors[0].name;
                const activeImg = activeSwatch ? activeSwatch.dataset.img : product.colors[0].img;

                addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    color: activeColor,
                    img: activeImg,
                    size: size,
                    qty: 1
                });

                showToast(`Added ${product.name} (${size}) to your bag!`, 'fa-shopping-bag');
                openDrawer('cart');
            });
        });

        // Quick View button
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                openQuickView(id);
            });
        });

        // Click card title or image opens Quick View
        document.querySelectorAll('.product-card-title, .product-image-container').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.closest('.card-floating-actions') || e.target.closest('.card-quick-size-bar')) return;
                const card = el.closest('.product-card');
                const id = card.dataset.id;
                openQuickView(id);
            });
        });

        // Wishlist toggle
        document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const product = PRODUCTS.find(p => p.id === id);
                if (!product) return;

                const index = STATE.wishlist.findIndex(item => item.id === product.id);
                if (index > -1) {
                    STATE.wishlist.splice(index, 1);
                    btn.classList.remove('active-wishlist');
                    btn.innerHTML = '<i class="far fa-heart"></i>';
                    showToast(`Removed from saved drops`, 'fa-heart-broken');
                } else {
                    STATE.wishlist.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        img: product.colors[0].img,
                        color: product.colors[0].name,
                        size: product.sizes[0]
                    });
                    btn.classList.add('active-wishlist');
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                    showToast(`Saved ${product.name} to wishlist!`, 'fa-heart');
                }
                saveWishlist();
            });
        });
    }

    function updateActiveFilterBadge() {
        const badge = document.getElementById('activeFilterBadge');
        if (!badge) return;

        let activeCount = 0;
        if (STATE.maxPrice < 5000) activeCount++;
        if (STATE.activeGsm !== 'all') activeCount++;
        if (STATE.activeColor !== 'all') activeCount++;
        if (STATE.activeSize !== 'all') activeCount++;

        if (activeCount > 0) {
            badge.textContent = activeCount;
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    }

    // ─── 6. QUICK VIEW MODAL & PINCODE CHECKER ───
    function openQuickView(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        STATE.quickViewProduct = product;
        STATE.quickViewColorIndex = 0;
        STATE.quickViewSize = product.sizes.includes('L') ? 'L' : product.sizes[0];
        STATE.quickViewQty = 1;

        renderQuickViewModal();
        openModal('quickViewModal');
    }

    function renderQuickViewModal() {
        const modalContent = document.getElementById('quickViewContent');
        const p = STATE.quickViewProduct;
        if (!modalContent || !p) return;

        const activeColor = p.colors[STATE.quickViewColorIndex];
        const isWishlisted = STATE.wishlist.some(item => item.id === p.id);

        modalContent.innerHTML = `
            <div class="quick-view-gallery">
                <div class="quick-view-main-image">
                    <img id="qvMainImg" src="${activeColor.img}" alt="${p.name}">
                    <span class="qv-badge">${p.badge}</span>
                </div>
                <div class="quick-view-thumbnails">
                    ${p.colors.map((c, i) => `
                        <img src="${c.img}" alt="${c.name}" class="qv-thumb ${i === STATE.quickViewColorIndex ? 'active' : ''}" data-index="${i}">
                    `).join('')}
                </div>
            </div>

            <div class="quick-view-details">
                <span class="qv-category">${p.category.toUpperCase()} • ${p.gsm} GSM LUXURY COTTON</span>
                <h2 class="qv-title">${p.name}</h2>

                <div class="qv-ratings-row">
                    <span class="qv-stars">★★★★★</span>
                    <span class="qv-rating-val">${p.rating}</span>
                    <span class="qv-reviews-count">(${p.reviewCount} verified buyer reviews)</span>
                </div>

                <div class="qv-urgency-banner">
                    <div class="viewers-count"><i class="fas fa-fire"></i> ${p.viewers} people viewing this drop right now</div>
                    <div class="stock-alert"><i class="fas fa-bolt"></i> Low Stock Alert: Only ${p.stockLeft} items left in central inventory!</div>
                </div>

                <div class="qv-price-box">
                    <div class="qv-price-row">
                        <span class="qv-current-price">₹${p.price.toLocaleString('en-IN')}</span>
                        <span class="qv-original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
                        <span class="qv-discount-pill">${p.discountPercent}</span>
                    </div>
                    <div class="qv-vip-price-tag">
                        <i class="fas fa-crown"></i> Exclusive Drop: Free delivery on all prepaid orders
                    </div>
                </div>

                <!-- Color Swatches -->
                <div>
                    <span class="qv-label">Color: <strong id="qvColorLabel">${activeColor.name}</strong></span>
                    <div class="qv-color-swatches" id="qvColorSwatches">
                        ${p.colors.map((c, i) => `
                            <span class="qv-color-dot ${i === STATE.quickViewColorIndex ? 'active' : ''}" 
                                  style="background:${c.hex}; ${c.hex === '#ffffff' ? 'border:1px solid #ccc;' : ''}" 
                                  data-index="${i}" 
                                  title="${c.name}"></span>
                        `).join('')}
                    </div>
                </div>

                <!-- Size Selector -->
                <div>
                    <div class="qv-size-header">
                        <span class="qv-label" style="margin:0;">Select Size: <strong id="qvSizeLabel">${STATE.quickViewSize}</strong></span>
                        <div class="qv-fit-links">
                            <button type="button" class="fit-link-btn" id="qvOpenFitBtn">
                                <i class="fas fa-magic"></i> Find My Fit (AI)
                            </button>
                            <button type="button" class="fit-link-btn" id="qvOpenSizeGuideBtn">
                                <i class="fas fa-ruler-horizontal"></i> Size Chart
                            </button>
                        </div>
                    </div>
                    <div class="qv-size-chips" id="qvSizeChips">
                        ${p.sizes.map(s => `
                            <button class="size-chip ${s === STATE.quickViewSize ? 'active' : ''}" data-size="${s}">${s}</button>
                        `).join('')}
                    </div>
                </div>

                <!-- Indian PIN Code Delivery Checker -->
                <div class="qv-pincode-checker-box">
                    <div class="pincode-label">
                        <i class="fas fa-map-marker-alt" style="color:var(--accent);"></i> Check Indian Delivery & COD
                    </div>
                    <div class="pincode-input-group">
                        <input type="text" id="pincodeInput" placeholder="Enter 6-digit PIN code (e.g. 110001)" maxlength="6">
                        <button type="button" class="pincode-btn" id="checkPincodeBtn">CHECK</button>
                    </div>
                    <div class="pincode-status-message" id="pincodeStatusMsg"></div>
                </div>

                <!-- Fabric & Care Accordion -->
                <div>
                    <div class="accordion-header" id="specsAccordionToggle">
                        <span><i class="fas fa-shield-alt" style="margin-right:6px;"></i> Specifications & Fabric Details</span>
                        <i class="fas fa-chevron-down" id="specsAccordionIcon"></i>
                    </div>
                    <div class="accordion-content" id="specsAccordionContent">
                        ${p.specs}<br><br>
                        ${p.description}
                    </div>
                </div>

                <!-- Actions: Stepper + Add to Bag + Wishlist -->
                <div class="qv-actions-row">
                    <div class="quantity-stepper">
                        <button class="qty-btn" id="qvQtyMinus"><i class="fas fa-minus"></i></button>
                        <span class="qty-val" id="qvQtyVal">${STATE.quickViewQty}</span>
                        <button class="qty-btn" id="qvQtyPlus"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="btn btn-primary qv-add-to-cart-btn" id="qvAddToCartBtn">
                        <i class="fas fa-shopping-bag" style="margin-right:6px;"></i> ADD TO BAG • ₹${(p.price * STATE.quickViewQty).toLocaleString('en-IN')}
                    </button>
                    <button class="qv-wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" id="qvWishlistBtn" title="Wishlist">
                        <i class="${isWishlisted ? 'fas' : 'far'} fa-heart" style="${isWishlisted ? 'color:#ef4444;' : ''}"></i>
                    </button>
                </div>
            </div>
        `;

        attachQuickViewEventListeners();
    }

    function attachQuickViewEventListeners() {
        const p = STATE.quickViewProduct;
        if (!p) return;

        // Color Swatches inside modal
        document.querySelectorAll('.qv-color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.dataset.index);
                STATE.quickViewColorIndex = idx;
                const activeColor = p.colors[idx];

                document.querySelectorAll('.qv-color-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                const label = document.getElementById('qvColorLabel');
                if (label) label.textContent = activeColor.name;

                const mainImg = document.getElementById('qvMainImg');
                if (mainImg) {
                    mainImg.style.opacity = '0.3';
                    setTimeout(() => {
                        mainImg.src = activeColor.img;
                        mainImg.style.opacity = '1';
                    }, 180);
                }

                document.querySelectorAll('.qv-thumb').forEach((t, i) => {
                    t.classList.toggle('active', i === idx);
                });
            });
        });

        // Thumbnails inside modal
        document.querySelectorAll('.qv-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const idx = parseInt(thumb.dataset.index);
                const dot = document.querySelector(`.qv-color-dot[data-index="${idx}"]`);
                if (dot) dot.click();
            });
        });

        // Size chips
        document.querySelectorAll('#qvSizeChips .size-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                STATE.quickViewSize = chip.dataset.size;
                document.querySelectorAll('#qvSizeChips .size-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const sizeLabel = document.getElementById('qvSizeLabel');
                if (sizeLabel) sizeLabel.textContent = STATE.quickViewSize;
            });
        });

        // Quantity adjuster
        const minusBtn = document.getElementById('qvQtyMinus');
        const plusBtn = document.getElementById('qvQtyPlus');
        const qtyVal = document.getElementById('qvQtyVal');
        const addToCartBtn = document.getElementById('qvAddToCartBtn');

        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                if (STATE.quickViewQty > 1) {
                    STATE.quickViewQty--;
                    qtyVal.textContent = STATE.quickViewQty;
                    addToCartBtn.innerHTML = `<i class="fas fa-shopping-bag" style="margin-right:6px;"></i> ADD TO BAG • ₹${(p.price * STATE.quickViewQty).toLocaleString('en-IN')}`;
                }
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                if (STATE.quickViewQty < 10) {
                    STATE.quickViewQty++;
                    qtyVal.textContent = STATE.quickViewQty;
                    addToCartBtn.innerHTML = `<i class="fas fa-shopping-bag" style="margin-right:6px;"></i> ADD TO BAG • ₹${(p.price * STATE.quickViewQty).toLocaleString('en-IN')}`;
                }
            });
        }

        // Add to bag button
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const activeColor = p.colors[STATE.quickViewColorIndex];
                addToCart({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    originalPrice: p.originalPrice,
                    color: activeColor.name,
                    img: activeColor.img,
                    size: STATE.quickViewSize,
                    qty: STATE.quickViewQty
                });

                closeModal('quickViewModal');
                showToast(`Added ${STATE.quickViewQty} × ${p.name} (${STATE.quickViewSize}) to bag!`, 'fa-shopping-bag');
                openDrawer('cart');
            });
        }

        // Wishlist button
        const wishlistBtn = document.getElementById('qvWishlistBtn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                const activeColor = p.colors[STATE.quickViewColorIndex];
                const index = STATE.wishlist.findIndex(item => item.id === p.id);
                if (index > -1) {
                    STATE.wishlist.splice(index, 1);
                    wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
                    showToast(`Removed from saved drops`, 'fa-heart-broken');
                } else {
                    STATE.wishlist.push({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        originalPrice: p.originalPrice,
                        img: activeColor.img,
                        color: activeColor.name,
                        size: STATE.quickViewSize
                    });
                    wishlistBtn.innerHTML = '<i class="fas fa-heart" style="color:#ef4444;"></i>';
                    showToast(`Saved to wishlist!`, 'fa-heart');
                }
                saveWishlist();
                renderCatalog();
            });
        }

        // Indian Pincode Checker
        const checkPinBtn = document.getElementById('checkPincodeBtn');
        const pinInput = document.getElementById('pincodeInput');
        const pinStatus = document.getElementById('pincodeStatusMsg');

        if (checkPinBtn && pinInput && pinStatus) {
            checkPinBtn.addEventListener('click', () => {
                const pin = pinInput.value.trim();
                if (/^[1-9][0-9]{5}$/.test(pin)) {
                    pinStatus.innerHTML = `
                        <span style="color:#22c55e;"><i class="fas fa-check-circle"></i> Delivery Available to PIN ${pin}!</span><br>
                        <span style="color:var(--text); font-weight:600;">Estimated Delivery: 2-3 Business Days • COD Available ✓</span>
                    `;
                } else {
                    pinStatus.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-exclamation-circle"></i> Please enter a valid 6-digit Indian PIN code.</span>`;
                }
            });
        }

        // Accordion
        const accordionToggle = document.getElementById('specsAccordionToggle');
        const accordionContent = document.getElementById('specsAccordionContent');
        const accordionIcon = document.getElementById('specsAccordionIcon');

        if (accordionToggle && accordionContent) {
            accordionToggle.addEventListener('click', () => {
                const isHidden = accordionContent.style.display === 'none';
                accordionContent.style.display = isHidden ? 'block' : 'none';
                accordionIcon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            });
        }

        // Links to Fit and Size Guide
        const openFitBtn = document.getElementById('qvOpenFitBtn');
        if (openFitBtn) {
            openFitBtn.addEventListener('click', () => openModal('fitModal'));
        }

        const openSizeGuideBtn = document.getElementById('qvOpenSizeGuideBtn');
        if (openSizeGuideBtn) {
            openSizeGuideBtn.addEventListener('click', () => openModal('sizeGuideModal'));
        }
    }

    // ─── 7. CART DRAWER & SHIPPING METER & PROMO ENGINE ───
    function addToCart(item) {
        const existingIndex = STATE.cart.findIndex(i =>
            i.id === item.id && i.size === item.size && i.color === item.color
        );

        if (existingIndex > -1) {
            STATE.cart[existingIndex].qty += item.qty;
        } else {
            STATE.cart.push(item);
        }

        saveCart();
    }

    function renderCartDrawer() {
        const container = document.getElementById('cartItemsContainer');
        const countBadge = document.getElementById('cartHeaderBadge');
        const mrpTotalEl = document.getElementById('billMrpTotal');
        const discountEl = document.getElementById('billDiscount');
        const shippingFeeEl = document.getElementById('billShippingFee');
        const grandTotalEl = document.getElementById('billGrandTotal');
        const meterText = document.getElementById('shippingMeterText');
        const meterBar = document.getElementById('shippingProgressBar');
        const tierShipping = document.getElementById('tierShipping');
        const tierGift = document.getElementById('tierGift');
        const couponRow = document.getElementById('couponDiscountRow');
        const couponVal = document.getElementById('couponDiscountVal');
        const couponLabel = document.getElementById('couponDiscountLabel');

        const totalItemsCount = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
        if (countBadge) countBadge.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'ITEM' : 'ITEMS'}`;

        if (STATE.cart.length === 0) {
            if (container) {
                container.innerHTML = `
                    <div class="empty-cart-state">
                        <i class="fas fa-shopping-bag empty-icon"></i>
                        <h4>Your bag is empty</h4>
                        <p>Discover our 240 GSM drops and curate your streetwear collection.</p>
                        <a href="#collection" class="btn btn-primary" onclick="window.northApp.closeDrawers()">EXPLORE DROPS</a>
                    </div>
                `;
            }
            if (mrpTotalEl) mrpTotalEl.textContent = '₹0';
            if (discountEl) discountEl.textContent = '-₹0';
            if (shippingFeeEl) shippingFeeEl.textContent = 'FREE';
            if (grandTotalEl) grandTotalEl.textContent = '₹0';
            if (meterText) meterText.innerHTML = `Add <strong>₹799</strong> more for <strong>FREE Express Delivery</strong>!`;
            if (meterBar) meterBar.style.width = '0%';
            if (tierShipping) tierShipping.classList.remove('achieved');
            if (tierGift) tierGift.classList.remove('achieved');
            if (couponRow) couponRow.style.display = 'none';
            return;
        }

        // Render Items
        if (container) {
            container.innerHTML = STATE.cart.map((item, index) => `
                <div class="cart-item-card">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-variants">
                            <span>Color: <strong>${item.color}</strong></span>
                            <span>Size: <strong>${item.size}</strong></span>
                        </div>
                        <div class="cart-item-price-row">
                            <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                            <div class="cart-qty-adjuster">
                                <button class="cart-qty-btn" onclick="window.northApp.updateCartQty(${index}, -1)">-</button>
                                <span class="cart-qty-num">${item.qty}</span>
                                <button class="cart-qty-btn" onclick="window.northApp.updateCartQty(${index}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="cart-item-remove-btn" onclick="window.northApp.removeCartItem(${index})" title="Remove">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `).join('');
        }

        // Calculations
        const rawMrpTotal = STATE.cart.reduce((sum, item) => sum + (item.originalPrice || item.price * 1.5) * item.qty, 0);
        const sellingSubtotal = STATE.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const itemDiscount = rawMrpTotal - sellingSubtotal;

        // Dynamic Free Shipping Meter (Threshold ₹799)
        const shippingThreshold = 799;
        const giftThreshold = 2999;
        const percentToShipping = Math.min(100, Math.round((sellingSubtotal / shippingThreshold) * 100));

        if (meterBar) meterBar.style.width = `${percentToShipping}%`;

        if (sellingSubtotal >= shippingThreshold) {
            if (meterText) meterText.innerHTML = `🎉 <strong>FREE Express Delivery Unlocked!</strong>`;
            if (tierShipping) tierShipping.classList.add('achieved');
            if (shippingFeeEl) shippingFeeEl.textContent = 'FREE';
        } else {
            const diff = shippingThreshold - sellingSubtotal;
            if (meterText) meterText.innerHTML = `Add <strong>₹${diff.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Delivery</strong>!`;
            if (tierShipping) tierShipping.classList.remove('achieved');
            if (shippingFeeEl) shippingFeeEl.textContent = '₹99';
        }

        if (sellingSubtotal >= giftThreshold) {
            if (tierGift) tierGift.classList.add('achieved');
        } else {
            if (tierGift) tierGift.classList.remove('achieved');
        }

        // Promo Coupon Calculation
        let couponDiscount = 0;
        if (STATE.appliedCoupon) {
            if (STATE.appliedCoupon.code === 'NORTH300') {
                if (sellingSubtotal >= 1999) {
                    couponDiscount = 300;
                    if (couponRow) couponRow.style.display = 'flex';
                    if (couponLabel) couponLabel.textContent = `Promo (NORTH300)`;
                    if (couponVal) couponVal.textContent = `-₹300`;
                } else {
                    STATE.appliedCoupon = null;
                    saveCoupon();
                    if (couponRow) couponRow.style.display = 'none';
                    showToast('NORTH300 requires a minimum bag total of ₹1,999', 'fa-exclamation-triangle', true);
                }
            } else if (STATE.appliedCoupon.code === 'MOVEFORWARD10') {
                couponDiscount = Math.round(sellingSubtotal * 0.10);
                if (couponRow) couponRow.style.display = 'flex';
                if (couponLabel) couponLabel.textContent = `Promo (MOVEFORWARD10 - 10%)`;
                if (couponVal) couponVal.textContent = `-₹${couponDiscount.toLocaleString('en-IN')}`;
            }
        } else {
            if (couponRow) couponRow.style.display = 'none';
        }

        const deliveryFee = sellingSubtotal >= shippingThreshold ? 0 : 99;
        const grandTotal = Math.max(0, sellingSubtotal - couponDiscount + deliveryFee);

        if (mrpTotalEl) mrpTotalEl.textContent = `₹${Math.round(rawMrpTotal).toLocaleString('en-IN')}`;
        if (discountEl) discountEl.textContent = `-₹${Math.round(itemDiscount).toLocaleString('en-IN')}`;
        if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

        // Also update checkout strip
        const checkoutStripPrice = document.getElementById('checkoutStripPrice');
        if (checkoutStripPrice) checkoutStripPrice.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    }

    function updateCartBadges() {
        const count = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
        const navCount = document.getElementById('navCartCount');
        const mobCount = document.getElementById('mobileCartBadge');

        if (navCount) navCount.textContent = count;
        if (mobCount) mobCount.textContent = count;
    }

    // ─── 8. WISHLIST DRAWER ───
    function renderWishlistDrawer() {
        const container = document.getElementById('wishlistItemsContainer');
        const badge = document.getElementById('wishlistHeaderBadge');
        if (!container) return;

        if (badge) badge.textContent = `${STATE.wishlist.length} ${STATE.wishlist.length === 1 ? 'ITEM' : 'ITEMS'}`;

        if (STATE.wishlist.length === 0) {
            container.innerHTML = `
                <div class="empty-cart-state">
                    <i class="far fa-heart empty-icon"></i>
                    <h4>No saved drops yet</h4>
                    <p>Tap the heart icon on any drop to save items for future releases.</p>
                    <a href="#collection" class="btn btn-primary" onclick="window.northApp.closeDrawers()">EXPLORE COLLECTION</a>
                </div>
            `;
            return;
        }

        container.innerHTML = STATE.wishlist.map((item, index) => `
            <div class="wishlist-item-card">
                <img src="${item.img}" alt="${item.name}" class="wishlist-item-img">
                <div class="wishlist-item-info">
                    <div class="wishlist-item-title">${item.name}</div>
                    <div class="cart-item-variants">
                        <span>Color: <strong>${item.color}</strong></span>
                        <span>Size: <strong>${item.size}</strong></span>
                    </div>
                    <div class="cart-item-price-row">
                        <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
                        <button class="btn btn-primary" style="padding:0.35rem 0.75rem; font-size:0.65rem;" onclick="window.northApp.moveWishlistToCart(${index})">
                            <i class="fas fa-shopping-bag"></i> MOVE TO BAG
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove-btn" onclick="window.northApp.removeWishlistItem(${index})" title="Remove">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }

    function updateWishlistBadges() {
        const count = STATE.wishlist.length;
        const navCount = document.getElementById('navWishlistCount');
        const mobCount = document.getElementById('mobileWishlistBadge');

        if (navCount) navCount.textContent = count;
        if (mobCount) mobCount.textContent = count;
    }

    // ─── 9. CUSTOM COMBO BUNDLER ENGINE ───
    function initComboBundler() {
        // Slot 1 style dropdown
        const slot1Select = document.getElementById('comboSlot1Style');
        if (slot1Select) {
            slot1Select.addEventListener('change', (e) => {
                const val = e.target.value;
                if (val === 'p7') {
                    STATE.comboSlot1.productId = 'p7';
                    STATE.comboSlot1.price = 1699;
                    STATE.comboSlot1.mrp = 2999;
                } else {
                    STATE.comboSlot1.productId = 'p1';
                    STATE.comboSlot1.price = 1499;
                    STATE.comboSlot1.mrp = 2799;
                }
                updateComboPricing();
            });
        }

        // Slot 1 Color Swatches
        document.querySelectorAll('#comboSlot1Colors .combo-color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('#comboSlot1Colors .combo-color-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                STATE.comboSlot1.colorName = dot.dataset.color;
                STATE.comboSlot1.colorImg = dot.dataset.img;

                const nameLabel = document.getElementById('comboSlot1ColorName');
                if (nameLabel) nameLabel.textContent = STATE.comboSlot1.colorName;

                const previewImg = document.getElementById('comboPreviewImg1');
                if (previewImg) previewImg.src = STATE.comboSlot1.colorImg;
            });
        });

        // Slot 1 Size chips
        document.querySelectorAll('#comboSlot1Sizes .combo-size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#comboSlot1Sizes .combo-size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                STATE.comboSlot1.size = btn.dataset.size;

                const tag = document.getElementById('comboPreviewTag1');
                if (tag) tag.textContent = `SLOT 1 • ${STATE.comboSlot1.size}`;
            });
        });

        // Slot 2 Pairing Type Switcher (Tee vs Cargo)
        const pairTabTee = document.getElementById('pairTabTee');
        const pairTabCargo = document.getElementById('pairTabCargo');
        const slot2Select = document.getElementById('comboSlot2Style');
        const slot2ColorsContainer = document.getElementById('comboSlot2Colors');
        const slot2SizesContainer = document.getElementById('comboSlot2Sizes');

        function setPairingType(type) {
            STATE.comboSlot2.type = type;
            if (type === 'tee') {
                pairTabTee.classList.add('active');
                pairTabCargo.classList.remove('active');

                STATE.comboSlot2.productId = 'p1';
                STATE.comboSlot2.name = 'Secondary 240 GSM Boxy Tee';
                STATE.comboSlot2.price = 1499;
                STATE.comboSlot2.mrp = 2799;
                STATE.comboSlot2.discount = 199;
                STATE.comboSlot2.colorImg = 'images/product-sage-tee.jpg';
                STATE.comboSlot2.colorName = 'Vintage Sage';
                STATE.comboSlot2.size = 'L';

                if (slot2Select) {
                    slot2Select.innerHTML = `
                        <option value="tee-sage" selected>240 GSM Oversized Tee (₹1,499)</option>
                        <option value="tee-white">Raw Off-White Boxy Tee (₹1,499)</option>
                    `;
                }

                if (slot2ColorsContainer) {
                    slot2ColorsContainer.innerHTML = `
                        <span class="combo-color-dot active" style="background:#657b64;" data-color="Vintage Sage" data-img="images/product-sage-tee.jpg"></span>
                        <span class="combo-color-dot" style="background:#f4f2ec; border:1px solid #ddd;" data-color="Raw Off-White" data-img="images/product-white-tee.jpg"></span>
                        <span class="combo-color-dot" style="background:#1d4ed8;" data-color="Cobalt Blue" data-img="images/product-blue-tee.jpg"></span>
                    `;
                    attachSlot2ColorEvents();
                }

                if (slot2SizesContainer) {
                    slot2SizesContainer.innerHTML = `
                        <button class="combo-size-btn" data-size="S">S</button>
                        <button class="combo-size-btn" data-size="M">M</button>
                        <button class="combo-size-btn active" data-size="L">L</button>
                        <button class="combo-size-btn" data-size="XL">XL</button>
                        <button class="combo-size-btn" data-size="XXL">XXL</button>
                    `;
                    attachSlot2SizeEvents();
                }

                const previewImg = document.getElementById('comboPreviewImg2');
                if (previewImg) previewImg.src = STATE.comboSlot2.colorImg;
                const tag = document.getElementById('comboPreviewTag2');
                if (tag) tag.textContent = `TEE • L`;
            } else {
                pairTabCargo.classList.add('active');
                pairTabTee.classList.remove('active');

                STATE.comboSlot2.productId = 'p3';
                STATE.comboSlot2.name = 'Tactical 6-Pocket Cargo Joggers';
                STATE.comboSlot2.price = 2499;
                STATE.comboSlot2.mrp = 3999;
                STATE.comboSlot2.discount = 299;
                STATE.comboSlot2.colorImg = 'images/product-olive-cargo.jpg';
                STATE.comboSlot2.colorName = 'Olive Green';
                STATE.comboSlot2.size = '32(M)';

                if (slot2Select) {
                    slot2Select.innerHTML = `
                        <option value="cargo-olive" selected>Tactical 6-Pocket Cargo Joggers (₹2,499)</option>
                        <option value="cargo-navy">Navy Relaxed Cargo Joggers (₹2,499)</option>
                    `;
                }

                if (slot2ColorsContainer) {
                    slot2ColorsContainer.innerHTML = `
                        <span class="combo-color-dot active" style="background:#556b2f;" data-color="Olive Green" data-img="images/product-olive-cargo.jpg"></span>
                        <span class="combo-color-dot" style="background:#0d1b2a;" data-color="Navy Blue" data-img="images/product-3.jpg"></span>
                        <span class="combo-color-dot" style="background:#111;" data-color="Midnight Black" data-img="images/product-3.jpg"></span>
                    `;
                    attachSlot2ColorEvents();
                }

                if (slot2SizesContainer) {
                    slot2SizesContainer.innerHTML = `
                        <button class="combo-size-btn" data-size="30(S)">30</button>
                        <button class="combo-size-btn active" data-size="32(M)">32</button>
                        <button class="combo-size-btn" data-size="34(L)">34</button>
                        <button class="combo-size-btn" data-size="36(XL)">36</button>
                    `;
                    attachSlot2SizeEvents();
                }

                const previewImg = document.getElementById('comboPreviewImg2');
                if (previewImg) previewImg.src = STATE.comboSlot2.colorImg;
                const tag = document.getElementById('comboPreviewTag2');
                if (tag) tag.textContent = `CARGO • 32`;
            }

            const colorLabel = document.getElementById('comboSlot2ColorName');
            if (colorLabel) colorLabel.textContent = STATE.comboSlot2.colorName;

            updateComboPricing();
        }

        function attachSlot2ColorEvents() {
            document.querySelectorAll('#comboSlot2Colors .combo-color-dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    document.querySelectorAll('#comboSlot2Colors .combo-color-dot').forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                    STATE.comboSlot2.colorName = dot.dataset.color;
                    STATE.comboSlot2.colorImg = dot.dataset.img;

                    const label = document.getElementById('comboSlot2ColorName');
                    if (label) label.textContent = STATE.comboSlot2.colorName;

                    const previewImg = document.getElementById('comboPreviewImg2');
                    if (previewImg) previewImg.src = STATE.comboSlot2.colorImg;
                });
            });
        }

        function attachSlot2SizeEvents() {
            document.querySelectorAll('#comboSlot2Sizes .combo-size-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('#comboSlot2Sizes .combo-size-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    STATE.comboSlot2.size = btn.dataset.size;

                    const tag = document.getElementById('comboPreviewTag2');
                    if (tag) tag.textContent = `${STATE.comboSlot2.type.toUpperCase()} • ${STATE.comboSlot2.size}`;
                });
            });
        }

        if (pairTabTee) pairTabTee.addEventListener('click', () => setPairingType('tee'));
        if (pairTabCargo) pairTabCargo.addEventListener('click', () => setPairingType('cargo'));
        attachSlot2ColorEvents();
        attachSlot2SizeEvents();

        // Add Combo to Bag Button
        const addComboBtn = document.getElementById('addComboToBagBtn');
        if (addComboBtn) {
            addComboBtn.addEventListener('click', () => {
                // Add Item 1
                addToCart({
                    id: STATE.comboSlot1.productId,
                    name: `[COMBO] North 240 GSM Tee`,
                    price: STATE.comboSlot1.price,
                    originalPrice: STATE.comboSlot1.mrp,
                    color: STATE.comboSlot1.colorName,
                    img: STATE.comboSlot1.colorImg,
                    size: STATE.comboSlot1.size,
                    qty: 1
                });

                // Add Item 2 with direct discount subtracted
                const item2Price = STATE.comboSlot2.price - STATE.comboSlot2.discount;
                addToCart({
                    id: STATE.comboSlot2.productId,
                    name: `[COMBO] ${STATE.comboSlot2.name} (Save ₹${STATE.comboSlot2.discount})`,
                    price: item2Price,
                    originalPrice: STATE.comboSlot2.mrp,
                    color: STATE.comboSlot2.colorName,
                    img: STATE.comboSlot2.colorImg,
                    size: STATE.comboSlot2.size,
                    qty: 1
                });

                showToast(`Streetwear Combo added to your bag with ₹${STATE.comboSlot2.discount} discount!`, 'fa-fire');
                openDrawer('cart');
            });
        }

        updateComboPricing();
    }

    function updateComboPricing() {
        const totalMrp = STATE.comboSlot1.mrp + STATE.comboSlot2.mrp;
        const totalDiscount = (STATE.comboSlot1.mrp - STATE.comboSlot1.price) +
            (STATE.comboSlot2.mrp - STATE.comboSlot2.price) +
            STATE.comboSlot2.discount;
        const finalPrice = totalMrp - totalDiscount;

        const mrpEl = document.getElementById('comboTotalMrp');
        const savingsEl = document.getElementById('comboSavings');
        const finalPriceEl = document.getElementById('comboFinalPrice');

        if (mrpEl) mrpEl.textContent = `₹${totalMrp.toLocaleString('en-IN')}`;
        if (savingsEl) savingsEl.textContent = `-₹${STATE.comboSlot2.discount}`;
        if (finalPriceEl) finalPriceEl.textContent = `₹${finalPrice.toLocaleString('en-IN')}`;
    }

    // ─── 10. "SHOP THE LOOK" LOOKBOOK ───
    function initLookbook() {
        const tabs = document.querySelectorAll('#lookTabsWrapper .look-tab');
        const lookImg = document.getElementById('lookMainImage');
        const lookTag = document.getElementById('lookTag');
        const lookTitle = document.getElementById('lookTitle');
        const lookDesc = document.getElementById('lookDesc');
        const itemsContainer = document.getElementById('lookItemsList');
        const mrpEl = document.getElementById('lookMrp');
        const bundledPriceEl = document.getElementById('lookBundledPrice');
        const savePillEl = document.getElementById('lookSavePill');
        const addLookBtn = document.getElementById('addLookToBagBtn');

        let currentLookKey = 'urban';

        function updateLook(key) {
            const look = LOOKS[key];
            if (!look) return;
            currentLookKey = key;

            if (lookImg) lookImg.src = look.image;
            if (lookTag) lookTag.textContent = look.tag;
            if (lookTitle) lookTitle.textContent = look.title;
            if (lookDesc) lookDesc.textContent = look.desc;
            if (mrpEl) mrpEl.textContent = `Total MRP: ₹${look.mrp.toLocaleString('en-IN')}`;
            if (bundledPriceEl) bundledPriceEl.textContent = `₹${look.bundledPrice.toLocaleString('en-IN')}`;
            if (savePillEl) savePillEl.textContent = `YOU SAVE ₹${look.saving} ON THIS LOOK`;

            if (itemsContainer) {
                itemsContainer.innerHTML = look.items.map(item => `
                    <div class="look-item-row">
                        <img src="${item.img}" alt="${item.name}" class="look-item-thumb">
                        <div class="look-item-meta">
                            <div class="look-item-name">${item.name}</div>
                            <div class="look-item-spec">${item.spec}</div>
                        </div>
                        <div class="look-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                    </div>
                `).join('');
            }
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                updateLook(tab.dataset.look);
            });
        });

        if (addLookBtn) {
            addLookBtn.addEventListener('click', () => {
                const look = LOOKS[currentLookKey];
                if (!look) return;

                // Add each item in look with bundled savings
                look.items.forEach(item => {
                    addToCart({
                        id: 'look-' + Math.random().toString(36).substring(7),
                        name: `[${look.title}] ${item.name}`,
                        price: Math.round(item.price * (look.bundledPrice / look.mrp)),
                        originalPrice: item.price,
                        color: item.spec.split('•')[0].trim(),
                        img: item.img,
                        size: item.spec.split('•')[1] ? item.spec.split('•')[1].trim().replace('Size ', '') : 'Free Size',
                        qty: 1
                    });
                });

                showToast(`Complete ${look.title} added to your bag!`, 'fa-shopping-bag');
                openDrawer('cart');
            });
        }
    }

    // ─── 11. PREDICTIVE SEARCH ENGINE ───
    function initPredictiveSearch() {
        const input = document.getElementById('predictiveSearchInput');
        const clearBtn = document.getElementById('clearSearchInputBtn');
        const resultsList = document.getElementById('searchResultsList');

        function doSearch(query) {
            const q = query.toLowerCase().trim();
            if (!q) {
                if (clearBtn) clearBtn.style.display = 'none';
                if (resultsList) resultsList.innerHTML = '';
                return;
            }

            if (clearBtn) clearBtn.style.display = 'block';

            const matches = PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.gsm.includes(q) ||
                p.colors.some(c => c.name.toLowerCase().includes(q)) ||
                p.description.toLowerCase().includes(q)
            );

            if (matches.length === 0) {
                resultsList.innerHTML = `
                    <div style="text-align:center; padding:2rem 0; color:var(--text-light);">
                        <i class="fas fa-search" style="font-size:2rem; margin-bottom:0.75rem; color:var(--light-grey);"></i>
                        <p>No drops found for "${query}". Try searching "240 GSM", "Cargo", "Hoodie", or "Black".</p>
                    </div>
                `;
                return;
            }

            resultsList.innerHTML = matches.map(p => `
                <div class="search-result-item" data-id="${p.id}">
                    <img src="${p.colors[0].img}" alt="${p.name}" class="search-item-thumb">
                    <div class="search-item-info">
                        <div class="search-item-cat">${p.category.toUpperCase()} • ${p.gsm} GSM</div>
                        <div class="search-item-title">${p.name}</div>
                    </div>
                    <div class="search-item-price">₹${p.price.toLocaleString('en-IN')}</div>
                    <button class="btn btn-primary" style="padding:0.4rem 0.8rem; font-size:0.68rem;">VIEW</button>
                </div>
            `).join('');

            resultsList.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    closeModal('searchModal');
                    openQuickView(item.dataset.id);
                });
            });
        }

        if (input) {
            input.addEventListener('input', (e) => doSearch(e.target.value));
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                input.value = '';
                doSearch('');
                input.focus();
            });
        }

        // Quick search pills
        document.querySelectorAll('.quick-search-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const term = pill.dataset.search;
                input.value = term;
                doSearch(term);
            });
        });
    }

    // ─── 12. "FIND MY FIT" AI RECOMMENDER ───
    function initFitRecommender() {
        const heightSelect = document.getElementById('fitHeightSelect');
        const frameButtons = document.querySelectorAll('#fitBodyFrameOptions .fit-opt-btn');
        const styleButtons = document.querySelectorAll('#fitStyleOptions .fit-opt-btn');
        const sizeText = document.getElementById('fitRecommendedSizeText');
        const rationaleText = document.getElementById('fitRationaleText');
        const applyBtn = document.getElementById('applyFitSizeBtn');

        let selectedFrame = 'regular';
        let selectedStyle = 'boxy';

        function computeFit() {
            const h = parseFloat(heightSelect.value);
            let size = 'L';
            let rationale = '';

            if (h <= 5.4) {
                size = selectedFrame === 'slim' ? 'S' : (selectedFrame === 'broad' ? 'L' : 'M');
            } else if (h <= 5.7) {
                size = selectedFrame === 'slim' ? 'M' : (selectedFrame === 'broad' ? 'XL' : 'M');
            } else if (h <= 5.10) {
                size = selectedFrame === 'slim' ? 'M' : (selectedFrame === 'broad' ? 'XL' : 'L');
            } else if (h <= 6.1) {
                size = selectedFrame === 'slim' ? 'L' : (selectedFrame === 'broad' ? 'XXL' : 'XL');
            } else {
                size = selectedFrame === 'slim' ? 'XL' : 'XXL';
            }

            if (selectedStyle === 'baggy' && size !== 'XXL') {
                const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];
                const curIdx = sizeOrder.indexOf(size);
                if (curIdx < sizeOrder.length - 1) {
                    size = sizeOrder[curIdx + 1];
                }
            } else if (selectedStyle === 'tailored' && size !== 'S') {
                const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];
                const curIdx = sizeOrder.indexOf(size);
                if (curIdx > 0) {
                    size = sizeOrder[curIdx - 1];
                }
            }

            rationale = `Size ${size} provides the ideal 240 GSM drop shoulder allowance with a clean ${selectedStyle} streetwear drape calibrated for your frame.`;

            if (sizeText) sizeText.textContent = `SIZE ${size}`;
            if (rationaleText) rationaleText.textContent = rationale;
            return size;
        }

        if (heightSelect) heightSelect.addEventListener('change', computeFit);

        frameButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                frameButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedFrame = btn.dataset.frame;
                computeFit();
            });
        });

        styleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                styleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedStyle = btn.dataset.style;
                computeFit();
            });
        });

        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                const recSize = computeFit();
                STATE.quickViewSize = recSize;

                // Update quick view size chips if quick view open
                const qvChip = document.querySelector(`#qvSizeChips .size-chip[data-size="${recSize}"]`);
                if (qvChip) qvChip.click();

                closeModal('fitModal');
                showToast(`Applied recommended Size ${recSize}!`, 'fa-check');
            });
        }
    }

    // ─── 13. 3-STEP EXPRESS CHECKOUT MODAL ───
    function initCheckout() {
        const modal = document.getElementById('checkoutModal');
        const form = document.getElementById('checkoutShippingForm');
        const backBtn = document.getElementById('backToShippingBtn');
        const placeOrderBtn = document.getElementById('placeOrderBtn');
        const continueBtn = document.getElementById('continueShoppingBtn');

        // Step 1: Submit Shipping Form -> Go to Step 2
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                setCheckoutStep(2);
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => setCheckoutStep(1));
        }

        // Step 2: Place Order -> Go to Step 3
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', () => {
                // Generate Unique Order ID
                const randomId = 'NORTH-' + Math.floor(100000 + Math.random() * 900000);
                const orderIdEl = document.getElementById('confirmedOrderId');
                const delDateEl = document.getElementById('confirmedDeliveryDate');
                const cityEl = document.getElementById('confirmedCustomerCity');
                const totalEl = document.getElementById('confirmedTotalAmount');
                const itemsSummaryEl = document.getElementById('confirmedItemsSummary');

                const name = document.getElementById('shipFullName')?.value || 'Valued Customer';
                const city = document.getElementById('shipCity')?.value || 'Delhi NCR';
                const pin = document.getElementById('shipPincode')?.value || '110001';

                // Calculate delivery date 3 days from now
                const d = new Date();
                d.setDate(d.getDate() + 3);
                const dateString = d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

                if (orderIdEl) orderIdEl.textContent = randomId;
                if (delDateEl) delDateEl.textContent = `${dateString} (Express)`;
                if (cityEl) cityEl.textContent = `${name}, ${city} - ${pin}`;

                const grandTotalEl = document.getElementById('billGrandTotal');
                if (totalEl && grandTotalEl) totalEl.textContent = grandTotalEl.textContent;

                if (itemsSummaryEl) {
                    itemsSummaryEl.innerHTML = STATE.cart.map(i => `
                        <div style="display:flex; justify-content:space-between; font-size:0.75rem; padding:0.25rem 0; color:var(--text-light);">
                            <span>${i.qty}× ${i.name} (${i.color}, ${i.size})</span>
                            <span style="font-weight:700; color:var(--text);">₹${(i.price * i.qty).toLocaleString('en-IN')}</span>
                        </div>
                    `).join('');
                }

                // Construct full order record
                const newPlacedOrder = {
                    id: randomId,
                    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    deliveryDate: `${dateString} (Express)`,
                    customer: {
                        name: name,
                        phone: document.getElementById('shipPhone')?.value || '9876543210',
                        email: document.getElementById('shipEmail')?.value || 'customer@gmail.com',
                        address: document.getElementById('shipAddress')?.value || 'Customer Delivery Address',
                        city: city,
                        state: document.getElementById('shipState')?.value || 'India',
                        pincode: pin
                    },
                    items: [...STATE.cart],
                    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value === 'cod' ? 'Cash on Delivery (COD)' : 'Instant UPI (256-bit Encrypted)',
                    mrpTotal: STATE.cart.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.qty, 0),
                    grandTotal: grandTotalEl ? grandTotalEl.textContent : '₹0',
                    status: 'In Transit',
                    carrier: 'Bluedart Express Priority',
                    awb: 'BLU-' + Math.floor(10000000 + Math.random() * 90000000),
                    currentStep: 3
                };

                STATE.orders.unshift(newPlacedOrder);
                STATE.activeTrackOrderId = randomId;
                saveOrders();

                // Wire confirmation pane action buttons
                const confirmedTrackBtn = document.getElementById('confirmedTrackLiveBtn');
                if (confirmedTrackBtn) {
                    confirmedTrackBtn.onclick = function() {
                        closeModal('checkoutModal');
                        openTrackOrderModal(randomId);
                    };
                }

                const confirmedInvBtn = document.getElementById('confirmedInvoiceBtn');
                if (confirmedInvBtn) {
                    confirmedInvBtn.onclick = function() {
                        openInvoice(randomId);
                    };
                }

                setCheckoutStep(3);

                // Clear Cart
                STATE.cart = [];
                STATE.appliedCoupon = null;
                saveCart();
                saveCoupon();

                showToast(`Order Placed Successfully! Order #${randomId}`, 'fa-check-circle');
            });
        }

        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                closeModal('checkoutModal');
                setCheckoutStep(1);
            });
        }
    }

    function setCheckoutStep(step) {
        // Steps indicators
        const s1 = document.getElementById('wizardStep1');
        const s2 = document.getElementById('wizardStep2');
        const s3 = document.getElementById('wizardStep3');
        const l1 = document.getElementById('wizardLine1');
        const l2 = document.getElementById('wizardLine2');

        const p1 = document.getElementById('checkoutPane1');
        const p2 = document.getElementById('checkoutPane2');
        const p3 = document.getElementById('checkoutPane3');

        [p1, p2, p3].forEach(p => p && p.classList.remove('active'));
        [s1, s2, s3].forEach(s => s && s.classList.remove('active', 'completed'));
        [l1, l2].forEach(l => l && l.classList.remove('active'));

        if (step === 1) {
            p1.classList.add('active');
            s1.classList.add('active');
        } else if (step === 2) {
            p2.classList.add('active');
            s1.classList.add('completed');
            l1.classList.add('active');
            s2.classList.add('active');
        } else if (step === 3) {
            p3.classList.add('active');
            s1.classList.add('completed');
            l1.classList.add('active');
            s2.classList.add('completed');
            l2.classList.add('active');
            s3.classList.add('active');
        }
    }

    // ─── 14. HERO SLIDER AUTO-PLAY & ARROWS ───
    function initHeroSlider() {
        const slides = document.querySelectorAll('#heroSliderTrack .hero-slide');
        const prevBtn = document.getElementById('sliderPrevBtn');
        const nextBtn = document.getElementById('sliderNextBtn');
        if (slides.length <= 1) return;

        let currentIdx = 0;
        let timer = null;

        function showSlide(index) {
            slides.forEach((s, i) => s.classList.toggle('active', i === index));
            currentIdx = index;
        }

        function nextSlide() {
            const next = (currentIdx + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentIdx - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(timer);
                nextSlide();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(timer);
                prevSlide();
                startAutoplay();
            });
        }

        function startAutoplay() {
            timer = setInterval(nextSlide, 6000);
        }

        startAutoplay();
    }

    // ─── 15. GLOBAL MODAL & DRAWER CONTROLLER ───
    function openDrawer(drawerId) {
        const drawerBackdrop = document.getElementById('drawerBackdrop');
        const target = drawerId === 'cart' ? document.getElementById('cartDrawer') : document.getElementById('wishlistDrawer');

        // Close other drawer
        document.querySelectorAll('.slide-drawer').forEach(d => d.classList.remove('open'));

        if (drawerBackdrop && target) {
            drawerBackdrop.classList.add('active');
            target.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeDrawers() {
        const drawerBackdrop = document.getElementById('drawerBackdrop');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        document.querySelectorAll('.slide-drawer').forEach(d => d.classList.remove('open'));
        document.body.style.overflow = '';
    }

    function openModal(modalId) {
        const modalBackdrop = document.getElementById('modalBackdrop');
        const target = document.getElementById(modalId);

        if (modalBackdrop && target) {
            modalBackdrop.classList.add('active');
            target.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modalBackdrop = document.getElementById('modalBackdrop');
        const target = document.getElementById(modalId);

        if (target) target.classList.remove('open');
        const anyOpen = document.querySelector('.product-quick-view-modal.open, .fit-modal.open, .size-guide-modal.open, .checkout-modal.open, .search-modal.open, .track-order-modal.open, .write-review-modal.open, .invoice-modal.open');
        if (!anyOpen && modalBackdrop) {
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function closeAllModals() {
        const modalBackdrop = document.getElementById('modalBackdrop');
        if (modalBackdrop) modalBackdrop.classList.remove('active');
        document.querySelectorAll('.product-quick-view-modal, .fit-modal, .size-guide-modal, .checkout-modal, .search-modal, .track-order-modal, .write-review-modal, .invoice-modal').forEach(m => m.classList.remove('open'));
        document.body.style.overflow = '';
    }

    // ─── 18. FEATURE A: LIVE ORDER TRACKING & MY ORDERS HISTORY ENGINE ───
    function updateTrackOrderBadges() {
        const badge = document.getElementById('trackHistoryCountBadge');
        if (badge) badge.textContent = STATE.orders.length;
    }

    function openTrackOrderModal(prefillOrderId) {
        if (prefillOrderId) {
            STATE.activeTrackOrderId = prefillOrderId;
            const input = document.getElementById('trackSearchInput');
            if (input) input.value = prefillOrderId;
        }
        renderOrderTracking(STATE.activeTrackOrderId);
        renderPastOrdersList();
        openModal('trackOrderModal');
    }

    function renderOrderTracking(searchQuery) {
        const cardContainer = document.getElementById('trackStatusCard');
        if (!cardContainer) return;

        const q = (searchQuery || '').trim().toUpperCase();
        let order = STATE.orders.find(o => o.id.toUpperCase() === q);

        // Fallback search by phone number or substring
        if (!order && q.length > 3) {
            order = STATE.orders.find(o => (o.customer && o.customer.phone && o.customer.phone.includes(q)) || o.id.includes(q));
        }

        // If still not found and query exists, generate an on-the-fly realistic tracking record for demo
        if (!order) {
            if (q.startsWith('NORTH-') || q.length >= 6) {
                order = {
                    id: q.startsWith('NORTH-') ? q : 'NORTH-' + q,
                    date: 'Yesterday, 11:30 AM',
                    deliveryDate: '2-3 Business Days',
                    customer: {
                        name: 'Verified Streetwear Buyer',
                        phone: '98******10',
                        email: 'customer@wearnorth.com',
                        address: 'Delivery Hub Address',
                        city: 'Metro City',
                        state: 'India',
                        pincode: '400001'
                    },
                    items: [
                        {
                            name: 'North 240 GSM Oversized Heavyweight Tee',
                            color: 'Midnight Black',
                            size: 'L',
                            qty: 1,
                            price: 1499,
                            img: 'images/product-1.jpg'
                        }
                    ],
                    paymentMethod: 'Instant UPI',
                    mrpTotal: 2799,
                    grandTotal: '₹1,499',
                    status: 'In Transit',
                    carrier: 'Bluedart Express',
                    awb: 'BLU-98421049',
                    currentStep: 3
                };
            } else if (STATE.orders.length > 0) {
                order = STATE.orders[0];
            }
        }

        if (!order) {
            cardContainer.innerHTML = `
                <div style="text-align:center; padding:2.5rem 1rem; color:var(--text-light);">
                    <i class="fas fa-box-open" style="font-size:2.5rem; color:var(--mid-grey); margin-bottom:0.8rem; display:block;"></i>
                    <h4 style="color:var(--text); font-weight:800; margin-bottom:0.4rem;">No Order Found</h4>
                    <p style="font-size:0.82rem;">We could not locate an order matching "${searchQuery}". Please check your 11-digit Order ID (e.g. NORTH-849201).</p>
                </div>
            `;
            return;
        }

        const step = order.currentStep || 3;

        cardContainer.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--light-grey); padding-bottom:1rem; margin-bottom:1.5rem; flex-wrap:wrap; gap:0.5rem;">
                <div>
                    <span style="font-size:0.7rem; font-weight:800; color:var(--accent-dark); letter-spacing:1px; text-transform:uppercase;">OFFICIAL DISPATCH TRACKING</span>
                    <h3 style="font-size:1.35rem; font-weight:900; letter-spacing:-0.5px; color:var(--text);">${order.id}</h3>
                    <span style="font-size:0.75rem; color:var(--text-light);">Placed on: ${order.date}</span>
                </div>
                <div style="text-align:right;">
                    <span class="past-order-status-tag status-tag-transit">
                        <i class="fas fa-circle" style="font-size:0.5rem; margin-right:4px;"></i> ${order.status}
                    </span>
                    <div style="margin-top:0.4rem;">
                        <button type="button" class="btn btn-outline btn-sm" id="trackViewInvBtn" style="padding:0.35rem 0.75rem; font-size:0.72rem;">
                            <i class="fas fa-file-invoice"></i> View Invoice
                        </button>
                    </div>
                </div>
            </div>

            <!-- Visual Stepper Timeline -->
            <div class="track-stepper">
                <div class="stepper-step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}">
                    <div class="stepper-node"><i class="fas ${step > 1 ? 'fa-check' : 'fa-receipt'}"></i></div>
                    <div class="stepper-content">
                        <h5>Order Confirmed &amp; Payment Verified</h5>
                        <p>Payment authorized via ${order.paymentMethod}. Transmitted to Central Warehouse fulfillment queue.</p>
                        <span class="stepper-time">${order.date}</span>
                    </div>
                </div>

                <div class="stepper-step ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}">
                    <div class="stepper-node"><i class="fas ${step > 2 ? 'fa-check' : 'fa-box-check'}"></i></div>
                    <div class="stepper-content">
                        <h5>240 GSM Quality Inspection &amp; Sealed</h5>
                        <p>Fabric density inspected, bio-wash verified, barcode tagged, and packaged in tamper-evident eco-polybag.</p>
                        <span class="stepper-time">Passed QC Inspection</span>
                    </div>
                </div>

                <div class="stepper-step ${step >= 3 ? (step > 3 ? 'completed' : 'active') : ''}">
                    <div class="stepper-node"><i class="fas ${step > 3 ? 'fa-check' : 'fa-truck-fast'}"></i></div>
                    <div class="stepper-content">
                        <h5>Dispatched via ${order.carrier || 'Bluedart Express'}</h5>
                        <p>AWB Tracking Number: <strong>${order.awb || 'BLU-84920194'}</strong>. Package en route from Mumbai Air Cargo Hub.</p>
                        <span class="stepper-time">Estimated Delivery: ${order.deliveryDate}</span>
                    </div>
                </div>

                <div class="stepper-step ${step >= 4 ? (step > 4 ? 'completed' : 'active') : ''}">
                    <div class="stepper-node"><i class="fas ${step > 4 ? 'fa-check' : 'fa-shipping-fast'}"></i></div>
                    <div class="stepper-content">
                        <h5>Out For Doorstep Delivery</h5>
                        <p>Assigned to courier partner in ${order.customer ? order.customer.city : 'your city'}. OTP will be shared before arrival.</p>
                    </div>
                </div>

                <div class="stepper-step ${step >= 5 ? 'completed' : ''}">
                    <div class="stepper-node"><i class="fas fa-home"></i></div>
                    <div class="stepper-content">
                        <h5>Delivered</h5>
                        <p>Package delivered into customer hands with 7-day hassle-free return window open.</p>
                    </div>
                </div>
            </div>

            <!-- Meta Information Grid -->
            <div class="dispatch-meta-grid">
                <div class="dispatch-meta-item">
                    <span>COURIER PARTNER</span>
                    <strong>${order.carrier || 'Bluedart Express'}</strong>
                </div>
                <div class="dispatch-meta-item">
                    <span>AIRWAY BILL (AWB)</span>
                    <strong>${order.awb || 'BLU-84920194'}</strong>
                </div>
                <div class="dispatch-meta-item">
                    <span>DELIVERING TO</span>
                    <strong>${order.customer ? `${order.customer.name} (${order.customer.city})` : 'Customer'}</strong>
                </div>
            </div>

            <!-- Package Items List -->
            <div class="tracking-items-list">
                <span style="font-size:0.75rem; font-weight:700; color:var(--text); display:block; margin-bottom:0.7rem; text-transform:uppercase; letter-spacing:1px;">Package Contents (${order.items.length} Drops):</span>
                ${order.items.map(item => `
                    <div class="track-item-mini">
                        <img src="${item.img || 'images/product-1.jpg'}" alt="${item.name}">
                        <div style="flex:1;">
                            <strong style="font-size:0.8rem; color:var(--text);">${item.name}</strong>
                            <span style="font-size:0.72rem; color:var(--text-light); display:block;">${item.color} • Size ${item.size} • Qty: ${item.qty || 1}</span>
                        </div>
                        <span style="font-size:0.82rem; font-weight:800; color:var(--primary);">₹${((item.price || 1499) * (item.qty || 1)).toLocaleString('en-IN')}</span>
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('trackViewInvBtn')?.addEventListener('click', () => {
            closeModal('trackOrderModal');
            openInvoice(order.id);
        });
    }

    function renderPastOrdersList() {
        const container = document.getElementById('pastOrdersList');
        if (!container) return;

        if (STATE.orders.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:3rem 1rem; color:var(--text-light);">
                    <i class="fas fa-box" style="font-size:2.8rem; color:var(--mid-grey); margin-bottom:1rem; display:block;"></i>
                    <h4 style="color:var(--text); font-weight:800;">No Orders Placed Yet</h4>
                    <p style="font-size:0.85rem; margin-top:0.3rem;">When you place an order, it will appear here with live tracking and tax invoices.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = STATE.orders.map(order => `
            <div class="past-order-card">
                <div class="past-order-header">
                    <div>
                        <strong style="font-size:0.92rem; color:var(--text);">${order.id}</strong>
                        <span style="font-size:0.72rem; color:var(--text-light); display:block;">Placed on ${order.date}</span>
                    </div>
                    <span class="past-order-status-tag status-tag-transit">${order.status || 'In Transit'}</span>
                </div>
                <div style="font-size:0.8rem; color:var(--text-light); margin-bottom:0.8rem;">
                    <strong>Items:</strong> ${order.items.map(i => `${i.name} (${i.size})`).join(', ')}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--light-grey); padding-top:0.75rem;">
                    <div>
                        <span style="font-size:0.72rem; color:var(--text-light);">Total Amount:</span>
                        <strong style="font-size:0.95rem; color:var(--primary); display:block;">${order.grandTotal}</strong>
                    </div>
                    <div style="display:flex; gap:0.5rem;">
                        <button type="button" class="btn btn-outline btn-sm track-order-select-btn" data-id="${order.id}">
                            <i class="fas fa-truck-fast"></i> Track
                        </button>
                        <button type="button" class="btn btn-primary btn-sm past-order-invoice-btn" data-id="${order.id}">
                            <i class="fas fa-receipt"></i> Invoice
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Attach buttons
        container.querySelectorAll('.track-order-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                // Switch to active tab
                const tabs = document.querySelectorAll('.track-nav-tabs .track-tab');
                tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === 'active'));
                document.getElementById('trackPaneActive')?.classList.add('active');
                document.getElementById('trackPaneHistory')?.classList.remove('active');
                renderOrderTracking(id);
            });
        });

        container.querySelectorAll('.past-order-invoice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                closeModal('trackOrderModal');
                openInvoice(btn.dataset.id);
            });
        });
    }

    function initOrderTracking() {
        // Nav tab switching inside tracking modal
        document.querySelectorAll('.track-nav-tabs .track-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.track-nav-tabs .track-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const target = tab.dataset.tab;
                if (target === 'active') {
                    document.getElementById('trackPaneActive')?.classList.add('active');
                    document.getElementById('trackPaneHistory')?.classList.remove('active');
                } else {
                    document.getElementById('trackPaneActive')?.classList.remove('active');
                    document.getElementById('trackPaneHistory')?.classList.add('active');
                    renderPastOrdersList();
                }
            });
        });

        // Search trigger
        const searchInput = document.getElementById('trackSearchInput');
        const searchBtn = document.getElementById('trackSearchBtn');

        function triggerTrackSearch() {
            if (searchInput && searchInput.value.trim()) {
                renderOrderTracking(searchInput.value.trim());
            }
        }

        if (searchBtn) searchBtn.addEventListener('click', triggerTrackSearch);
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    triggerTrackSearch();
                }
            });
        }

        // Header and footer triggers
        document.getElementById('trackOrderNavBtn')?.addEventListener('click', () => openTrackOrderModal());
        document.getElementById('footerOpenTrack')?.addEventListener('click', () => openTrackOrderModal());
        document.getElementById('closeTrackOrderModalBtn')?.addEventListener('click', () => closeModal('trackOrderModal'));
    }

    // ─── 19. FEATURE B: INTERACTIVE CUSTOMER REVIEW SYSTEM ENGINE ───
    function renderReviewsGrid(filter = 'all') {
        const container = document.getElementById('reviewsGridContainer');
        if (!container) return;

        STATE.activeReviewFilter = filter;

        let list = [...STATE.reviews];
        if (filter === '5star') {
            list = list.filter(r => r.rating >= 5);
        } else if (filter === 'tshirts') {
            list = list.filter(r => r.productName.toLowerCase().includes('tee'));
        } else if (filter === 'pants') {
            list = list.filter(r => r.productName.toLowerCase().includes('cargo') || r.productName.toLowerCase().includes('pant'));
        } else if (filter === 'hoodies') {
            list = list.filter(r => r.productName.toLowerCase().includes('hoodie'));
        }

        // Compute average rating
        const totalRating = STATE.reviews.reduce((acc, r) => acc + r.rating, 0);
        const avg = (totalRating / (STATE.reviews.length || 1)).toFixed(1);
        const avgScoreEl = document.getElementById('reviewAvgScore');
        if (avgScoreEl) avgScoreEl.textContent = avg;

        const countEl = document.getElementById('countAllReviews');
        if (countEl) countEl.textContent = STATE.reviews.length;

        container.innerHTML = list.map((rev, index) => {
            const initials = rev.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'NB';
            const starString = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
            return `
                <div class="testimonial-card" data-review-id="${rev.id || index}">
                    <div>
                        <div class="review-card-top-row">
                            <div class="testimonial-stars" style="color:#eab308; letter-spacing:2px; font-size:1.05rem;">${starString}</div>
                            <span class="review-verified-badge"><i class="fas fa-check-circle"></i> VERIFIED FIT</span>
                        </div>
                        <span class="review-fit-tag">${rev.fit || 'True to Boxy Oversized'} • ${rev.height || "5'10\""}</span>
                        <p class="testimonial-body" style="font-size:0.85rem; line-height:1.6; color:var(--text); margin:0.6rem 0;">"${rev.comment}"</p>
                    </div>

                    <div class="review-card-footer">
                        <div class="testimonial-author">
                            <div class="author-avatar">${initials}</div>
                            <div class="author-details">
                                <strong>${rev.author}</strong>
                                <span>${rev.city} • ${rev.productName} (${rev.size})</span>
                            </div>
                        </div>
                        <button type="button" class="review-helpful-btn" data-index="${index}">
                            <i class="far fa-thumbs-up"></i> Helpful (<span>${rev.helpful || 0}</span>)
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach helpful upvote listeners
        container.querySelectorAll('.review-helpful-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                if (!btn.classList.contains('voted') && list[idx]) {
                    list[idx].helpful = (list[idx].helpful || 0) + 1;
                    saveReviews();
                    btn.classList.add('voted');
                    const span = btn.querySelector('span');
                    if (span) span.textContent = list[idx].helpful;
                    showToast('Thank you for your feedback!', 'fa-heart');
                }
            });
        });
    }

    function initReviewsSystem() {
        // Tab buttons
        document.querySelectorAll('#reviewsFilterTabs .review-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#reviewsFilterTabs .review-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderReviewsGrid(btn.dataset.filter);
            });
        });

        // Open modal
        document.getElementById('openWriteReviewBtn')?.addEventListener('click', () => {
            openModal('writeReviewModal');
        });
        document.getElementById('closeWriteReviewModalBtn')?.addEventListener('click', () => {
            closeModal('writeReviewModal');
        });

        // Interactive 5-Star picker
        const starPicks = document.querySelectorAll('#interactiveStarPicker .star-pick');
        const starCaption = document.getElementById('starRatingCaption');
        const captions = {
            1: '1.0 / 5.0 (Poor Fit / Quality)',
            2: '2.0 / 5.0 (Below Average)',
            3: '3.0 / 5.0 (Decent Standard Fit)',
            4: '4.0 / 5.0 (Very Good Silhouette)',
            5: '5.0 / 5.0 (Absolute Fire Streetwear)'
        };

        starPicks.forEach(star => {
            star.addEventListener('click', () => {
                const score = parseInt(star.dataset.score, 10);
                STATE.newReviewRating = score;
                starPicks.forEach(s => {
                    const sScore = parseInt(s.dataset.score, 10);
                    s.classList.toggle('active', sScore <= score);
                });
                if (starCaption) starCaption.textContent = captions[score] || `${score}.0 / 5.0`;
            });
        });

        // Form Submit
        const form = document.getElementById('writeReviewForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const newRev = {
                    id: 'rev-' + Date.now(),
                    author: document.getElementById('reviewAuthorName')?.value || 'Anonymous Drip',
                    city: document.getElementById('reviewAuthorCity')?.value || 'India',
                    productName: document.getElementById('reviewDropSelect')?.value || 'North 240 GSM Oversized Tee',
                    rating: STATE.newReviewRating || 5,
                    size: document.getElementById('reviewSizeSelect')?.value || 'L',
                    height: document.getElementById('reviewAuthorHeight')?.value || "5'10\"",
                    fit: document.getElementById('reviewFitExperience')?.value || 'True to Boxy Oversized',
                    comment: document.getElementById('reviewCommentText')?.value || 'Great heavyweight fit.',
                    date: 'Today',
                    helpful: 1,
                    isVerified: true
                };

                STATE.reviews.unshift(newRev);
                saveReviews();
                renderReviewsGrid('all');
                closeModal('writeReviewModal');
                form.reset();

                // Reset star rating to 5
                starPicks.forEach(s => s.classList.add('active'));
                if (starCaption) starCaption.textContent = captions[5];

                showToast('Review submitted successfully! Thank you for backing North.', 'fa-star');

                // Scroll to reviews
                document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    // ─── 20. FEATURE C: LUXURY TAX INVOICE GENERATOR ENGINE ───
    function openInvoice(orderId) {
        const printArea = document.getElementById('invoicePrintArea');
        if (!printArea) return;

        let order = STATE.orders.find(o => o.id === orderId);
        if (!order) {
            order = STATE.orders[0];
        }

        if (!order) return;

        const customer = order.customer || {
            name: 'Aryan Mehta',
            phone: '9820149201',
            email: 'aryan@gmail.com',
            address: 'Flat 402, Sea Green Apts, Linking Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050'
        };

        const totalNum = parseInt((order.grandTotal || '0').replace(/[^0-9]/g, ''), 10) || 3998;
        const subtotal = order.mrpTotal || 6798;
        const discount = subtotal - totalNum;
        const gstAmount = Math.round(totalNum * (12 / 112));
        const netBeforeTax = totalNum - gstAmount;

        printArea.innerHTML = `
            <div class="inv-header-row">
                <div>
                    <div class="inv-brand-logo">NORTH</div>
                    <p style="font-size:0.75rem; color:#555; margin-top:0.25rem;">ALWAYS MOVE FORWARD • LUXURY STREETWEAR</p>
                    <p style="font-size:0.72rem; color:#777; margin-top:0.35rem;">
                        North Apparel Private Limited<br>
                        GSTIN: 27AABCN8492L1Z8 • SAC / HSN Code: 61091000<br>
                        4th Floor, High Street Phoenix, Lower Parel, Mumbai, MH - 400013<br>
                        Official Support: rohit@wearnorth.com
                    </p>
                </div>
                <div class="inv-meta-right">
                    <h3 style="font-size:1.15rem; font-weight:900; letter-spacing:1px; margin-bottom:0.25rem;">TAX INVOICE</h3>
                    <p><strong>Invoice No:</strong> INV-${order.id.replace('NORTH-', '2026-')}</p>
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Date &amp; Time:</strong> ${order.date}</p>
                    <p><strong>Payment Mode:</strong> ${order.paymentMethod}</p>
                    <div style="margin-top:0.6rem;">
                        <span class="inv-stamp">PAID &amp; VERIFIED</span>
                    </div>
                </div>
            </div>

            <div class="inv-parties-grid">
                <div>
                    <strong style="font-size:0.78rem; text-transform:uppercase; letter-spacing:1px; color:#555; display:block; margin-bottom:0.3rem;">BILLED TO (CUSTOMER):</strong>
                    <h4 style="font-size:0.95rem; font-weight:800; color:#111;">${customer.name}</h4>
                    <p style="color:#444; font-size:0.8rem; margin-top:0.2rem;">
                        ${customer.address}<br>
                        ${customer.city}, ${customer.state} - ${customer.pincode}<br>
                        Phone: ${customer.phone}<br>
                        Email: ${customer.email}
                    </p>
                </div>
                <div>
                    <strong style="font-size:0.78rem; text-transform:uppercase; letter-spacing:1px; color:#555; display:block; margin-bottom:0.3rem;">DISPATCH &amp; SHIPPING LOGISTICS:</strong>
                    <h4 style="font-size:0.95rem; font-weight:800; color:#111;">${order.carrier || 'Bluedart Express Priority'}</h4>
                    <p style="color:#444; font-size:0.8rem; margin-top:0.2rem;">
                        AWB Airway Bill No: <strong>${order.awb || 'BLU-84920194'}</strong><br>
                        Dispatch Center: Mumbai Air Hub (North FC-01)<br>
                        Estimated Doorstep Delivery: <strong>${order.deliveryDate}</strong><br>
                        Return Guarantee: 7 Days Exchange Accepted
                    </p>
                </div>
            </div>

            <table class="inv-table">
                <thead>
                    <tr>
                        <th style="width:40%;">Garment Description</th>
                        <th style="width:15%;">HSN / Specs</th>
                        <th style="width:10%; text-align:center;">Qty</th>
                        <th style="width:15%; text-align:right;">Unit MRP</th>
                        <th style="width:20%; text-align:right;">Net Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>
                                <strong>${item.name}</strong><br>
                                <span style="font-size:0.72rem; color:#666;">Color: ${item.color} | Size: ${item.size}</span>
                            </td>
                            <td style="font-size:0.75rem; color:#666;">
                                HSN: 6109<br>
                                ${item.name.includes('Tee') ? '240 GSM Cotton' : item.name.includes('Hoodie') ? '360 GSM Terry' : 'Heavy Cotton'}
                            </td>
                            <td style="text-align:center; font-weight:700;">${item.qty || 1}</td>
                            <td style="text-align:right; color:#666;">₹${((item.originalPrice || item.price || 1499)).toLocaleString('en-IN')}</td>
                            <td style="text-align:right; font-weight:800;">₹${((item.price || 1499) * (item.qty || 1)).toLocaleString('en-IN')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.5rem;">
                <div style="flex:1; min-width:260px; font-size:0.75rem; color:#666;">
                    <strong style="color:#111; display:block; margin-bottom:0.3rem;">TERMS &amp; AUTHENTICITY GUARANTEE:</strong>
                    <p>1. 100% Genuine North Apparel manufactured under registered trademark.</p>
                    <p>2. Pre-shrunk &amp; bio-washed heavy gauge cotton. Machine wash cold with like colors.</p>
                    <p>3. This is a computer-generated tax invoice and requires no physical signature under Indian IT Act 2000.</p>
                </div>

                <div class="inv-totals-box">
                    <div class="inv-total-row">
                        <span>Items MRP Total:</span>
                        <span>₹${subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="inv-total-row" style="color:#22c55e;">
                        <span>Exclusive Streetwear Discount:</span>
                        <span>-₹${discount > 0 ? discount.toLocaleString('en-IN') : '0'}</span>
                    </div>
                    <div class="inv-total-row">
                        <span>Net Taxable Value:</span>
                        <span>₹${netBeforeTax.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="inv-total-row">
                        <span>Integrated GST (12% Included):</span>
                        <span>₹${gstAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="inv-total-row">
                        <span>Express Doorstep Delivery:</span>
                        <span style="color:#22c55e; font-weight:700;">FREE</span>
                    </div>
                    <div class="inv-total-row grand-total">
                        <span>Total Paid:</span>
                        <span>${order.grandTotal}</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('invoicePrintBtn')?.addEventListener('click', () => {
            window.print();
        });

        document.getElementById('closeInvoiceModalBtn')?.addEventListener('click', () => {
            closeModal('invoiceModal');
        });

        openModal('invoiceModal');
    }

    // ─── 21. FEATURE D: "MIX & MATCH" STREETWEAR OUTFIT CANVAS ENGINE ───
    const STYLER_DATA = {
        tops: [
            { id: 'p1', name: 'North 240 GSM Oversized Tee', gsm: 240, price: 1499, mrp: 2799, colors: PRODUCTS[0].colors, sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
            { id: 'p2', name: 'Heavyweight Boxy Hoodie', gsm: 360, price: 2999, mrp: 4999, colors: PRODUCTS[1].colors, sizes: ['S', 'M', 'L', 'XL'] },
            { id: 'p4', name: 'Tokyo Drift Bomber Jacket', gsm: 320, price: 4999, mrp: 7999, colors: PRODUCTS[3].colors, sizes: ['M', 'L', 'XL'] }
        ],
        bottoms: [
            { id: 'p3', name: 'Tactical 6-Pocket Cargo Joggers', gsm: 280, price: 2499, mrp: 3999, colors: PRODUCTS[2].colors, sizes: ['30(S)', '32(M)', '34(L)', '36(XL)'] },
            { id: 'p8', name: 'Tactical Relaxed Track Pant', gsm: 320, price: 2699, mrp: 4299, colors: PRODUCTS[7].colors, sizes: ['30(S)', '32(M)', '34(L)', '36(XL)'] }
        ],
        caps: [
            { id: 'p6', name: 'Embroidered Heavyweight Dad Cap', gsm: 280, price: 899, mrp: 1499, colors: PRODUCTS[5].colors, sizes: ['Free Size'] }
        ]
    };

    function initOutfitBuilder() {
        // Render Top Options
        const topOptContainer = document.getElementById('stylerTopOptions');
        if (topOptContainer) {
            topOptContainer.innerHTML = STYLER_DATA.tops.map((t, idx) => `
                <button type="button" class="styler-item-opt-btn ${idx === 0 ? 'active' : ''}" data-id="${t.id}">
                    <span class="opt-title">${t.name}</span>
                    <span class="opt-meta">₹${t.price} • ${t.gsm} GSM</span>
                </button>
            `).join('');

            topOptContainer.querySelectorAll('.styler-item-opt-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    topOptContainer.querySelectorAll('.styler-item-opt-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    STATE.stylerOutfit.topId = btn.dataset.id;
                    STATE.stylerOutfit.topColorIdx = 0;
                    renderStylerTopControls();
                    updateOutfitCanvas();
                });
            });
        }

        // Render Bottom Options
        const bottomOptContainer = document.getElementById('stylerBottomOptions');
        if (bottomOptContainer) {
            bottomOptContainer.innerHTML = STYLER_DATA.bottoms.map((b, idx) => `
                <button type="button" class="styler-item-opt-btn ${idx === 0 ? 'active' : ''}" data-id="${b.id}">
                    <span class="opt-title">${b.name}</span>
                    <span class="opt-meta">₹${b.price} • ${b.gsm} GSM</span>
                </button>
            `).join('');

            bottomOptContainer.querySelectorAll('.styler-item-opt-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    bottomOptContainer.querySelectorAll('.styler-item-opt-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    STATE.stylerOutfit.bottomId = btn.dataset.id;
                    STATE.stylerOutfit.bottomColorIdx = 0;
                    renderStylerBottomControls();
                    updateOutfitCanvas();
                });
            });
        }

        // Render Cap Options
        const capOptContainer = document.getElementById('stylerCapOptions');
        if (capOptContainer) {
            capOptContainer.innerHTML = STYLER_DATA.caps.map((c, idx) => `
                <button type="button" class="styler-item-opt-btn active" data-id="${c.id}">
                    <span class="opt-title">${c.name}</span>
                    <span class="opt-meta">₹${c.price} • 3D Embroidery</span>
                </button>
            `).join('');
        }

        // Tab Navigation
        document.querySelectorAll('.styler-slot-tabs .styler-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.styler-slot-tabs .styler-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const target = tab.dataset.target;
                document.querySelectorAll('.styler-pane').forEach(p => p.classList.remove('active'));
                if (target === 'top') document.getElementById('stylerPaneTop')?.classList.add('active');
                if (target === 'bottom') document.getElementById('stylerPaneBottom')?.classList.add('active');
                if (target === 'cap') document.getElementById('stylerPaneCap')?.classList.add('active');
            });
        });

        // Layer stack click triggers corresponding tab
        document.querySelectorAll('.styler-layer-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                const s = slot.dataset.slot;
                const tab = document.querySelector(`.styler-slot-tabs .styler-tab[data-target="${s}"]`);
                if (tab) tab.click();
            });
        });

        // Shuffle / Randomize Drip Button
        document.getElementById('stylerRandomBtn')?.addEventListener('click', () => {
            // Random Top
            const rTop = STYLER_DATA.tops[Math.floor(Math.random() * STYLER_DATA.tops.length)];
            STATE.stylerOutfit.topId = rTop.id;
            STATE.stylerOutfit.topColorIdx = Math.floor(Math.random() * rTop.colors.length);

            // Random Bottom
            const rBottom = STYLER_DATA.bottoms[Math.floor(Math.random() * STYLER_DATA.bottoms.length)];
            STATE.stylerOutfit.bottomId = rBottom.id;
            STATE.stylerOutfit.bottomColorIdx = Math.floor(Math.random() * rBottom.colors.length);

            // Random Cap
            const rCap = STYLER_DATA.caps[0];
            STATE.stylerOutfit.capColorIdx = Math.floor(Math.random() * rCap.colors.length);

            // Update active buttons in options
            const topBtns = document.querySelectorAll('#stylerTopOptions .styler-item-opt-btn');
            topBtns.forEach(b => b.classList.toggle('active', b.dataset.id === rTop.id));

            const bottomBtns = document.querySelectorAll('#stylerBottomOptions .styler-item-opt-btn');
            bottomBtns.forEach(b => b.classList.toggle('active', b.dataset.id === rBottom.id));

            renderStylerTopControls();
            renderStylerBottomControls();
            renderStylerCapControls();
            updateOutfitCanvas();

            // Subtle animation feedback
            const stack = document.getElementById('stylerMannequinStack');
            if (stack) {
                stack.style.transform = 'scale(0.96)';
                setTimeout(() => { stack.style.transform = 'scale(1)'; }, 200);
            }

            showToast('Drip Shuffled! Fresh Streetwear Outfit Generated 🔥', 'fa-random');
        });

        // Add 3-Piece Fit to Bag
        document.getElementById('addOutfitToBagBtn')?.addEventListener('click', () => {
            const top = STYLER_DATA.tops.find(t => t.id === STATE.stylerOutfit.topId) || STYLER_DATA.tops[0];
            const topColor = top.colors[STATE.stylerOutfit.topColorIdx] || top.colors[0];

            const bottom = STYLER_DATA.bottoms.find(b => b.id === STATE.stylerOutfit.bottomId) || STYLER_DATA.bottoms[0];
            const bottomColor = bottom.colors[STATE.stylerOutfit.bottomColorIdx] || bottom.colors[0];

            const cap = STYLER_DATA.caps[0];
            const capColor = cap.colors[STATE.stylerOutfit.capColorIdx] || cap.colors[0];

            // Add all 3 items to cart
            addToCart({
                id: top.id,
                name: top.name,
                color: topColor.name,
                img: topColor.img,
                size: STATE.stylerOutfit.topSize || 'L',
                price: top.price,
                originalPrice: top.mrp,
                qty: 1
            });

            addToCart({
                id: bottom.id,
                name: bottom.name,
                color: bottomColor.name,
                img: bottomColor.img,
                size: STATE.stylerOutfit.bottomSize || '32(M)',
                price: bottom.price,
                originalPrice: bottom.mrp,
                qty: 1
            });

            addToCart({
                id: cap.id,
                name: cap.name,
                color: capColor.name,
                img: capColor.img,
                size: 'Free Size',
                price: cap.price,
                originalPrice: cap.mrp,
                qty: 1
            });

            showToast('Complete 3-Piece Fit Added To Bag! Flat ₹800 Bundle Saved.', 'fa-layer-group');
            openDrawer('cart');
        });

        renderStylerTopControls();
        renderStylerBottomControls();
        renderStylerCapControls();
        updateOutfitCanvas();
    }

    function renderStylerTopControls() {
        const top = STYLER_DATA.tops.find(t => t.id === STATE.stylerOutfit.topId) || STYLER_DATA.tops[0];
        const swatchesContainer = document.getElementById('stylerTopSwatches');
        const sizesContainer = document.getElementById('stylerTopSizes');
        const colorLabel = document.getElementById('stylerTopColorLabel');
        const sizeLabel = document.getElementById('stylerTopSizeLabel');

        if (swatchesContainer) {
            swatchesContainer.innerHTML = top.colors.map((c, idx) => `
                <div class="styler-swatch ${idx === STATE.stylerOutfit.topColorIdx ? 'active' : ''}" 
                     style="background:${c.hex};" 
                     data-idx="${idx}" 
                     title="${c.name}"></div>
            `).join('');

            swatchesContainer.querySelectorAll('.styler-swatch').forEach(s => {
                s.addEventListener('click', () => {
                    swatchesContainer.querySelectorAll('.styler-swatch').forEach(sw => sw.classList.remove('active'));
                    s.classList.add('active');
                    STATE.stylerOutfit.topColorIdx = parseInt(s.dataset.idx, 10);
                    if (colorLabel) colorLabel.textContent = top.colors[STATE.stylerOutfit.topColorIdx].name;
                    updateOutfitCanvas();
                });
            });
        }

        if (sizesContainer) {
            sizesContainer.innerHTML = top.sizes.map(sz => `
                <button type="button" class="styler-size-btn ${sz === STATE.stylerOutfit.topSize ? 'active' : ''}" data-size="${sz}">${sz}</button>
            `).join('');

            sizesContainer.querySelectorAll('.styler-size-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    sizesContainer.querySelectorAll('.styler-size-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    STATE.stylerOutfit.topSize = btn.dataset.size;
                    if (sizeLabel) sizeLabel.textContent = STATE.stylerOutfit.topSize;
                    updateOutfitCanvas();
                });
            });
        }

        if (colorLabel && top.colors[STATE.stylerOutfit.topColorIdx]) {
            colorLabel.textContent = top.colors[STATE.stylerOutfit.topColorIdx].name;
        }
        if (sizeLabel) sizeLabel.textContent = STATE.stylerOutfit.topSize || 'L';
    }

    function renderStylerBottomControls() {
        const bottom = STYLER_DATA.bottoms.find(b => b.id === STATE.stylerOutfit.bottomId) || STYLER_DATA.bottoms[0];
        const swatchesContainer = document.getElementById('stylerBottomSwatches');
        const sizesContainer = document.getElementById('stylerBottomSizes');
        const colorLabel = document.getElementById('stylerBottomColorLabel');
        const sizeLabel = document.getElementById('stylerBottomSizeLabel');

        if (swatchesContainer) {
            swatchesContainer.innerHTML = bottom.colors.map((c, idx) => `
                <div class="styler-swatch ${idx === STATE.stylerOutfit.bottomColorIdx ? 'active' : ''}" 
                     style="background:${c.hex};" 
                     data-idx="${idx}" 
                     title="${c.name}"></div>
            `).join('');

            swatchesContainer.querySelectorAll('.styler-swatch').forEach(s => {
                s.addEventListener('click', () => {
                    swatchesContainer.querySelectorAll('.styler-swatch').forEach(sw => sw.classList.remove('active'));
                    s.classList.add('active');
                    STATE.stylerOutfit.bottomColorIdx = parseInt(s.dataset.idx, 10);
                    if (colorLabel) colorLabel.textContent = bottom.colors[STATE.stylerOutfit.bottomColorIdx].name;
                    updateOutfitCanvas();
                });
            });
        }

        if (sizesContainer) {
            sizesContainer.innerHTML = bottom.sizes.map(sz => `
                <button type="button" class="styler-size-btn ${sz === STATE.stylerOutfit.bottomSize ? 'active' : ''}" data-size="${sz}">${sz}</button>
            `).join('');

            sizesContainer.querySelectorAll('.styler-size-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    sizesContainer.querySelectorAll('.styler-size-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    STATE.stylerOutfit.bottomSize = btn.dataset.size;
                    if (sizeLabel) sizeLabel.textContent = STATE.stylerOutfit.bottomSize;
                    updateOutfitCanvas();
                });
            });
        }

        if (colorLabel && bottom.colors[STATE.stylerOutfit.bottomColorIdx]) {
            colorLabel.textContent = bottom.colors[STATE.stylerOutfit.bottomColorIdx].name;
        }
        if (sizeLabel) sizeLabel.textContent = STATE.stylerOutfit.bottomSize || '32(M)';
    }

    function renderStylerCapControls() {
        const cap = STYLER_DATA.caps[0];
        const swatchesContainer = document.getElementById('stylerCapSwatches');
        const colorLabel = document.getElementById('stylerCapColorLabel');

        if (swatchesContainer) {
            swatchesContainer.innerHTML = cap.colors.map((c, idx) => `
                <div class="styler-swatch ${idx === STATE.stylerOutfit.capColorIdx ? 'active' : ''}" 
                     style="background:${c.hex};" 
                     data-idx="${idx}" 
                     title="${c.name}"></div>
            `).join('');

            swatchesContainer.querySelectorAll('.styler-swatch').forEach(s => {
                s.addEventListener('click', () => {
                    swatchesContainer.querySelectorAll('.styler-swatch').forEach(sw => sw.classList.remove('active'));
                    s.classList.add('active');
                    STATE.stylerOutfit.capColorIdx = parseInt(s.dataset.idx, 10);
                    if (colorLabel) colorLabel.textContent = cap.colors[STATE.stylerOutfit.capColorIdx].name;
                    updateOutfitCanvas();
                });
            });
        }

        if (colorLabel && cap.colors[STATE.stylerOutfit.capColorIdx]) {
            colorLabel.textContent = cap.colors[STATE.stylerOutfit.capColorIdx].name;
        }
    }

    function updateOutfitCanvas() {
        const top = STYLER_DATA.tops.find(t => t.id === STATE.stylerOutfit.topId) || STYLER_DATA.tops[0];
        const topColor = top.colors[STATE.stylerOutfit.topColorIdx] || top.colors[0];

        const bottom = STYLER_DATA.bottoms.find(b => b.id === STATE.stylerOutfit.bottomId) || STYLER_DATA.bottoms[0];
        const bottomColor = bottom.colors[STATE.stylerOutfit.bottomColorIdx] || bottom.colors[0];

        const cap = STYLER_DATA.caps[0];
        const capColor = cap.colors[STATE.stylerOutfit.capColorIdx] || cap.colors[0];

        // Update Images
        const imgCap = document.getElementById('stylerImgCap');
        const imgTop = document.getElementById('stylerImgTop');
        const imgBottom = document.getElementById('stylerImgBottom');

        if (imgCap) imgCap.src = capColor.img;
        if (imgTop) imgTop.src = topColor.img;
        if (imgBottom) imgBottom.src = bottomColor.img;

        // Update Labels
        const lblCap = document.getElementById('stylerLabelCap');
        const metaCap = document.getElementById('stylerMetaCap');
        if (lblCap) lblCap.textContent = cap.name;
        if (metaCap) metaCap.textContent = `${capColor.name} • Free Size`;

        const lblTop = document.getElementById('stylerLabelTop');
        const metaTop = document.getElementById('stylerMetaTop');
        if (lblTop) lblTop.textContent = top.name;
        if (metaTop) metaTop.textContent = `${topColor.name} • Size ${STATE.stylerOutfit.topSize || 'L'} (${top.gsm} GSM)`;

        const lblBottom = document.getElementById('stylerLabelBottom');
        const metaBottom = document.getElementById('stylerMetaBottom');
        if (lblBottom) lblBottom.textContent = bottom.name;
        if (metaBottom) metaBottom.textContent = `${bottomColor.name} • Size ${STATE.stylerOutfit.bottomSize || '32(M)'} (${bottom.gsm} GSM)`;

        // Total GSM
        const totalGsm = top.gsm + bottom.gsm + cap.gsm;
        const totalGsmEl = document.getElementById('stylerTotalGsm');
        if (totalGsmEl) totalGsmEl.textContent = `${totalGsm} GSM Stack`;

        // Pricing calculations
        const individualMrp = top.mrp + bottom.mrp + cap.mrp;
        const bundleDiscount = 800;
        const netOutfitPrice = Math.max(999, (top.price + bottom.price + cap.price) - bundleDiscount);

        const mrpEl = document.getElementById('stylerMrpVal');
        const netPriceEl = document.getElementById('stylerNetPrice');

        if (mrpEl) mrpEl.textContent = `₹${individualMrp.toLocaleString('en-IN')}`;
        if (netPriceEl) netPriceEl.textContent = `₹${netOutfitPrice.toLocaleString('en-IN')}`;
    }

    // ─── 16. EVENT LISTENERS INITIALIZATION ───
    document.addEventListener('DOMContentLoaded', () => {

        // Preloader
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => preloader?.classList.add('hidden'), 1200);
        });
        setTimeout(() => preloader?.classList.add('hidden'), 2500);

        // Navbar Scroll
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 60) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            if (scrollY > 500) {
                backToTop?.classList.add('visible');
            } else {
                backToTop?.classList.remove('visible');
            }
        });

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Mobile Hamburger
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('open');
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('open');
                });
            });
        }

        // Header Triggers
        document.getElementById('cartTriggerBtn')?.addEventListener('click', () => openDrawer('cart'));
        document.getElementById('closeCartDrawerBtn')?.addEventListener('click', closeDrawers);
        document.getElementById('drawerBackdrop')?.addEventListener('click', closeDrawers);

        document.getElementById('wishlistTriggerBtn')?.addEventListener('click', () => openDrawer('wishlist'));
        document.getElementById('closeWishlistDrawerBtn')?.addEventListener('click', closeDrawers);

        // Mobile Bottom Dock Triggers
        document.getElementById('mobileCartDockBtn')?.addEventListener('click', () => openDrawer('cart'));
        document.getElementById('mobileWishlistDockBtn')?.addEventListener('click', () => openDrawer('wishlist'));

        // Search Modal Triggers
        document.getElementById('searchTriggerBtn')?.addEventListener('click', () => {
            openModal('searchModal');
            setTimeout(() => document.getElementById('predictiveSearchInput')?.focus(), 250);
        });
        document.getElementById('closeSearchModalBtn')?.addEventListener('click', () => closeModal('searchModal'));

        // Close Modals
        document.getElementById('modalBackdrop')?.addEventListener('click', closeAllModals);
        document.getElementById('closeQuickViewModalBtn')?.addEventListener('click', () => closeModal('quickViewModal'));
        document.getElementById('closeFitModalBtn')?.addEventListener('click', () => closeModal('fitModal'));
        document.getElementById('closeSizeGuideModalBtn')?.addEventListener('click', () => closeModal('sizeGuideModal'));
        document.getElementById('closeCheckoutModalBtn')?.addEventListener('click', () => closeModal('checkoutModal'));

        // Keyboard ESC closes all
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDrawers();
                closeAllModals();
            }
        });

        // Category Filter Tabs
        document.querySelectorAll('#categoryFilterTabs .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#categoryFilterTabs .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                STATE.activeFilter = btn.dataset.filter;

                // Sync story bubbles
                document.querySelectorAll('#storyBubblesTrack .story-bubble').forEach(sb => {
                    sb.classList.toggle('active', sb.dataset.filter === STATE.activeFilter);
                });

                renderCatalog();
            });
        });

        // Story Bubbles
        document.querySelectorAll('#storyBubblesTrack .story-bubble').forEach(bubble => {
            bubble.addEventListener('click', () => {
                document.querySelectorAll('#storyBubblesTrack .story-bubble').forEach(b => b.classList.remove('active'));
                bubble.classList.add('active');
                STATE.activeFilter = bubble.dataset.filter;

                // Sync tabs
                document.querySelectorAll('#categoryFilterTabs .filter-btn').forEach(tb => {
                    tb.classList.toggle('active', tb.dataset.filter === STATE.activeFilter);
                });

                renderCatalog();

                // Smooth scroll to catalog
                const target = document.getElementById('collection');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Filter Tray Toggle
        const trayToggleBtn = document.getElementById('filterTrayToggleBtn');
        const trayContainer = document.getElementById('filterTrayContainer');
        if (trayToggleBtn && trayContainer) {
            trayToggleBtn.addEventListener('click', () => {
                const isOpen = trayContainer.classList.toggle('open');
                trayToggleBtn.classList.toggle('active', isOpen);
            });
        }

        // Price Range Slider
        const priceSlider = document.getElementById('priceRangeSlider');
        const priceValTag = document.getElementById('priceRangeValue');
        if (priceSlider && priceValTag) {
            priceSlider.addEventListener('input', (e) => {
                STATE.maxPrice = parseInt(e.target.value);
                priceValTag.textContent = `₹${STATE.maxPrice.toLocaleString('en-IN')}`;
                renderCatalog();
            });
        }

        // GSM Filter chips
        document.querySelectorAll('#gsmFilterGroup .filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('#gsmFilterGroup .filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                STATE.activeGsm = chip.dataset.gsm;
                renderCatalog();
            });
        });

        // Color Filter dots
        document.querySelectorAll('#colorFilterGroup .filter-color-dot, #colorFilterGroup .filter-color-pill').forEach(dot => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('#colorFilterGroup .filter-color-dot, #colorFilterGroup .filter-color-pill').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                STATE.activeColor = dot.dataset.color;
                renderCatalog();
            });
        });

        // Size Filter chips
        document.querySelectorAll('#sizeFilterGroup .filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('#sizeFilterGroup .filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                STATE.activeSize = chip.dataset.size;
                renderCatalog();
            });
        });

        // Reset Filters Button
        function resetAllFilters() {
            STATE.maxPrice = 5000;
            STATE.activeGsm = 'all';
            STATE.activeColor = 'all';
            STATE.activeSize = 'all';
            STATE.activeFilter = 'all';

            if (priceSlider) priceSlider.value = 5000;
            if (priceValTag) priceValTag.textContent = '₹5,000';

            document.querySelectorAll('#gsmFilterGroup .filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
            document.querySelectorAll('#colorFilterGroup .filter-color-pill').forEach(p => p.classList.add('active'));
            document.querySelectorAll('#colorFilterGroup .filter-color-dot').forEach(d => d.classList.remove('active'));
            document.querySelectorAll('#sizeFilterGroup .filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
            document.querySelectorAll('#categoryFilterTabs .filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
            document.querySelectorAll('#storyBubblesTrack .story-bubble').forEach((b, i) => b.classList.toggle('active', i === 0));

            renderCatalog();
            showToast('All filters have been reset', 'fa-undo');
        }

        document.getElementById('clearFiltersBtn')?.addEventListener('click', resetAllFilters);
        document.getElementById('emptyResetBtn')?.addEventListener('click', resetAllFilters);

        // Sorting Dropdown
        const sortSelect = document.getElementById('sortDropdown');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                STATE.activeSort = e.target.value;
                renderCatalog();
            });
        }

        // Coupon Engine in Cart
        const couponInput = document.getElementById('couponCodeInput');
        const applyCouponBtn = document.getElementById('applyCouponBtn');
        const couponStatus = document.getElementById('couponStatusMsg');

        function applyCouponCode(code) {
            const cleanCode = code.toUpperCase().trim();
            if (cleanCode === 'NORTH300') {
                const subtotal = STATE.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
                if (subtotal < 1999) {
                    couponStatus.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-times-circle"></i> 'NORTH300' requires minimum bag total of ₹1,999.</span>`;
                    return;
                }
                STATE.appliedCoupon = { code: 'NORTH300', discount: 300 };
                saveCoupon();
                couponStatus.innerHTML = `<span style="color:#22c55e;"><i class="fas fa-check-circle"></i> Coupon NORTH300 applied! Flat ₹300 saved.</span>`;
                showToast('Coupon NORTH300 applied! Flat ₹300 Off', 'fa-tag');
                renderCartDrawer();
            } else if (cleanCode === 'MOVEFORWARD10') {
                STATE.appliedCoupon = { code: 'MOVEFORWARD10', percent: 10 };
                saveCoupon();
                couponStatus.innerHTML = `<span style="color:#22c55e;"><i class="fas fa-check-circle"></i> Coupon MOVEFORWARD10 applied! 10% discount saved.</span>`;
                showToast('Coupon MOVEFORWARD10 applied! 10% Off', 'fa-tag');
                renderCartDrawer();
            } else {
                couponStatus.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-times-circle"></i> Invalid coupon code. Try 'NORTH300' or 'MOVEFORWARD10'.</span>`;
            }
        }

        if (applyCouponBtn && couponInput) {
            applyCouponBtn.addEventListener('click', () => applyCouponCode(couponInput.value));
        }

        document.querySelectorAll('.coupon-quick-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                if (couponInput) couponInput.value = pill.dataset.code;
                applyCouponCode(pill.dataset.code);
            });
        });

        // Checkout Trigger from Cart
        document.getElementById('proceedToCheckoutBtn')?.addEventListener('click', () => {
            if (STATE.cart.length === 0) {
                showToast('Your bag is empty! Add drops first.', 'fa-shopping-bag', true);
                return;
            }
            closeDrawers();
            openModal('checkoutModal');
            setCheckoutStep(1);
        });

        // Wishlist "Move All to Bag"
        document.getElementById('moveAllWishlistToBagBtn')?.addEventListener('click', () => {
            if (STATE.wishlist.length === 0) return;
            STATE.wishlist.forEach(item => {
                addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    originalPrice: item.originalPrice,
                    color: item.color,
                    img: item.img,
                    size: item.size,
                    qty: 1
                });
            });
            STATE.wishlist = [];
            saveWishlist();
            closeDrawers();
            openDrawer('cart');
            showToast('All saved drops moved to bag!', 'fa-shopping-bag');
        });

        document.getElementById('clearWishlistBtn')?.addEventListener('click', () => {
            STATE.wishlist = [];
            saveWishlist();
            showToast('Wishlist cleared', 'fa-trash-alt');
        });

        // Footer links
        document.getElementById('footerOpenSizeGuide')?.addEventListener('click', () => openModal('sizeGuideModal'));
        document.getElementById('footerOpenAiFit')?.addEventListener('click', () => openModal('fitModal'));
        document.getElementById('footerOpenTrack')?.addEventListener('click', () => {
            showToast('Enter your Order ID in contact form or email rohit@northalwaysmoveforward.com', 'fa-truck');
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });

        // Size Guide tabs
        document.querySelectorAll('.size-guide-tabs .sg-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.size-guide-tabs .sg-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const type = tab.dataset.tab;
                const tbody = document.getElementById('sizeGuideTableBody');
                if (!tbody) return;

                if (type === 'oversized') {
                    tbody.innerHTML = `
                        <tr><td><strong>S</strong></td><td>42" (107 cm)</td><td>28" (71 cm)</td><td>20.5"</td></tr>
                        <tr><td><strong>M</strong></td><td>44" (112 cm)</td><td>29" (74 cm)</td><td>21.5"</td></tr>
                        <tr><td><strong>L</strong></td><td>46" (117 cm)</td><td>30" (76 cm)</td><td>22.5"</td></tr>
                        <tr><td><strong>XL</strong></td><td>48" (122 cm)</td><td>31" (79 cm)</td><td>23.5"</td></tr>
                        <tr><td><strong>XXL</strong></td><td>50" (127 cm)</td><td>32" (81 cm)</td><td>24.5"</td></tr>
                    `;
                } else if (type === 'cargo') {
                    tbody.innerHTML = `
                        <tr><td><strong>30 (S)</strong></td><td>Waist: 30" (76 cm)</td><td>Length: 39" (99 cm)</td><td>Thigh: 24"</td></tr>
                        <tr><td><strong>32 (M)</strong></td><td>Waist: 32" (81 cm)</td><td>Length: 40" (102 cm)</td><td>Thigh: 25"</td></tr>
                        <tr><td><strong>34 (L)</strong></td><td>Waist: 34" (86 cm)</td><td>Length: 41" (104 cm)</td><td>Thigh: 26"</td></tr>
                        <tr><td><strong>36 (XL)</strong></td><td>Waist: 36" (91 cm)</td><td>Length: 42" (107 cm)</td><td>Thigh: 27"</td></tr>
                        <tr><td><strong>38 (XXL)</strong></td><td>Waist: 38" (96 cm)</td><td>Length: 42.5" (108 cm)</td><td>Thigh: 28"</td></tr>
                    `;
                } else if (type === 'hoodies') {
                    tbody.innerHTML = `
                        <tr><td><strong>S</strong></td><td>44" (112 cm)</td><td>27" (69 cm)</td><td>Drop Shoulder 22"</td></tr>
                        <tr><td><strong>M</strong></td><td>46" (117 cm)</td><td>28" (71 cm)</td><td>Drop Shoulder 23"</td></tr>
                        <tr><td><strong>L</strong></td><td>48" (122 cm)</td><td>29" (74 cm)</td><td>Drop Shoulder 24"</td></tr>
                        <tr><td><strong>XL</strong></td><td>50" (127 cm)</td><td>30" (76 cm)</td><td>Drop Shoulder 25"</td></tr>
                        <tr><td><strong>XXL</strong></td><td>52" (132 cm)</td><td>31" (79 cm)</td><td>Drop Shoulder 26"</td></tr>
                    `;
                }
            });
        });

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('newsletterEmailInput');
                const btn = newsletterForm.querySelector('button');

                if (btn) {
                    btn.textContent = 'PROMO CODE: NORTH150';
                    btn.style.background = '#22c55e';
                }
                showToast('Welcome to North! Use coupon code NORTH150 on your bag.', 'fa-gift');

                setTimeout(() => {
                    if (btn) {
                        btn.textContent = 'SUBSCRIBE';
                        btn.style.background = '';
                    }
                    if (emailInput) emailInput.value = '';
                }, 4000);
            });
        }

        // Initialize sub-engines
        initHeroSlider();
        initComboBundler();
        initLookbook();
        initPredictiveSearch();
        initFitRecommender();
        initCheckout();
        initOutfitBuilder();
        initReviewsSystem();
        initOrderTracking();

        // Render initial catalog & storage
        renderCatalog();
        renderReviewsGrid('all');
        updateCartBadges();
        updateWishlistBadges();
        updateTrackOrderBadges();
        renderCartDrawer();
        renderWishlistDrawer();
    });

    // ─── 17. EXPOSE GLOBAL APIS FOR INLINE ONCLICK HANDLERS ───
    window.northApp = {
        openTrackOrderModal: openTrackOrderModal,
        openWriteReviewModal: function () { openModal('writeReviewModal'); },
        openInvoice: openInvoice,
        updateCartQty: function (index, delta) {
            if (STATE.cart[index]) {
                STATE.cart[index].qty += delta;
                if (STATE.cart[index].qty <= 0) {
                    STATE.cart.splice(index, 1);
                }
                saveCart();
            }
        },
        removeCartItem: function (index) {
            if (STATE.cart[index]) {
                showToast(`Removed item from bag`, 'fa-trash-alt');
                STATE.cart.splice(index, 1);
                saveCart();
            }
        },
        moveWishlistToCart: function (index) {
            const item = STATE.wishlist[index];
            if (!item) return;

            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                originalPrice: item.originalPrice,
                color: item.color,
                img: item.img,
                size: item.size,
                qty: 1
            });

            STATE.wishlist.splice(index, 1);
            saveWishlist();
            showToast(`Moved ${item.name} to bag!`, 'fa-shopping-bag');
            openDrawer('cart');
        },
        removeWishlistItem: function (index) {
            if (STATE.wishlist[index]) {
                STATE.wishlist.splice(index, 1);
                saveWishlist();
                showToast(`Removed from saved drops`, 'fa-heart-broken');
                renderCatalog();
            }
        },
        selectPaymentMethod: function (method) {
            document.querySelectorAll('.payment-opt-card').forEach(c => c.classList.remove('active'));
            const upiBlock = document.getElementById('upiDetailsBlock');
            const codBlock = document.getElementById('codDetailsBlock');
            const cardBlock = document.getElementById('cardDetailsBlock');

            if (upiBlock) upiBlock.style.display = 'none';
            if (codBlock) codBlock.style.display = 'none';
            if (cardBlock) cardBlock.style.display = 'none';

            if (method === 'upi') {
                document.getElementById('paymentOptUpi')?.classList.add('active');
                if (upiBlock) upiBlock.style.display = 'block';
                const radio = document.getElementById('payMethodUpi');
                if (radio) radio.checked = true;
            } else if (method === 'cod') {
                document.getElementById('paymentOptCod')?.classList.add('active');
                if (codBlock) codBlock.style.display = 'block';
                const radio = document.getElementById('payMethodCod');
                if (radio) radio.checked = true;
            } else if (method === 'card') {
                document.getElementById('paymentOptCard')?.classList.add('active');
                if (cardBlock) cardBlock.style.display = 'block';
                const radio = document.getElementById('payMethodCard');
                if (radio) radio.checked = true;
            }
        },
        closeDrawers: closeDrawers,
        closeModals: closeAllModals
    };

})();
