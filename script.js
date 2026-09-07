const products=[
{name:'Golden Hour',cat:'women',price:145,no:'01',cls:'p1'},
{name:'Noir Élan',cat:'men',price:155,no:'02',cls:'p2'},
{name:'Velvet Oud',cat:'unisex',price:165,no:'03',cls:'p3'},
{name:'Rose Lumière',cat:'women',price:135,no:'04',cls:'p4'},
{name:'Santal 09',cat:'men',price:150,no:'05',cls:'p5'},
{name:'Neroli Mist',cat:'unisex',price:125,no:'06',cls:'p6'}
];
const grid=document.getElementById('productGrid');
function bottle(cls,no){return `<div class="product-bottle ${cls}"><div class="cap"></div><div class="neck"></div><div class="glass"><div class="label">AURELIA<small>NO. ${no}</small></div></div></div>`}
function render(filter='all'){grid.innerHTML=products.filter(p=>filter==='all'||p.cat===filter).map((p,i)=>`<article class="product" data-name="${p.name.toLowerCase()}"><div class="product-image">${bottle(p.cls,p.no)}</div><div class="product-info"><p>${p.cat} · Eau de parfum</p><h3>${p.name}</h3><span class="price">$${p.price}</span></div></article>`).join('')}
render();
let cart=[];
const panel=document.getElementById('cartPanel'),overlay=document.getElementById('overlay');
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function openCart(){panel.classList.add('open');overlay.classList.add('show');updateCart()}
function closeCart(){panel.classList.remove('open');overlay.classList.remove('show')}
document.getElementById('cartBtn').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;overlay.onclick=closeCart;
document.querySelectorAll('.filter').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)});
function add(name,price){const item=cart.find(x=>x.name===name);item?item.qty++:cart.push({name,price,qty:1});toast(`${name} added to your bag`);updateCart()}
function updateCart(){document.getElementById('cartCount').textContent=cart.reduce((a,b)=>a+b.qty,0);const box=document.getElementById('cartItems');if(!cart.length){box.innerHTML='<p class="empty">Your bag is waiting.</p>'}else{box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div>${x.name}<small>$${x.price} × ${x.qty}</small></div><button class="remove" onclick="removeItem(${i})">Remove</button></div>`).join('')}document.getElementById('cartTotal').textContent='$'+cart.reduce((a,b)=>a+b.price*b.qty,0)}
window.removeItem=i=>{cart.splice(i,1);updateCart()};
grid.addEventListener('click',e=>{const card=e.target.closest('.product');if(card){const p=products.find(x=>x.name.toLowerCase()===card.dataset.name);add(p.name,p.price)}});
document.querySelector('.add-feature').onclick=()=>add('Golden Hour',145);
document.getElementById('searchBtn').onclick=()=>{document.getElementById('searchPanel').classList.add('open');document.getElementById('searchInput').focus()};document.getElementById('closeSearch').onclick=()=>document.getElementById('searchPanel').classList.remove('open');
document.getElementById('searchInput').oninput=e=>{const q=e.target.value.toLowerCase();document.getElementById('searchResults').innerHTML=q?products.filter(p=>p.name.toLowerCase().includes(q)).map(p=>`<div style="padding:18px 0;border-bottom:1px solid #292722;font:28px 'Cormorant Garamond',serif">${p.name} <span style="font:10px Inter;color:#c9a86a">$${p.price}</span></div>`).join(''):'<p style="color:#777;padding-top:25px">Type a fragrance name…</p>'};
document.getElementById('wishBtn').onclick=()=>toast('Wishlist is ready for your favourites');
document.getElementById('newsletter').onsubmit=e=>{e.preventDefault();toast('Welcome to the AURELIA world');e.target.reset()};
document.querySelector('.checkout').onclick=()=>toast(cart.length?'Checkout connected — demo mode':'Your bag is empty');
window.addEventListener('load',()=>setTimeout(()=>document.querySelector('.loader').classList.add('hide'),1500));
const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>{x.style.opacity='0';x.style.transform='translateY(30px)';x.style.transition='opacity .9s ease,transform .9s ease';observer.observe(x)});const style=document.createElement('style');style.textContent='.reveal.visible{opacity:1!important;transform:none!important}';document.head.appendChild(style);
