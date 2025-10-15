async function renderList(q=''){
  const cont = document.getElementById('listings');
  cont.innerHTML = 'Loading...';
  try{
    const res = await fetch('/api/properties?q='+encodeURIComponent(q));
    const list = await res.json();
    if(list.length===0) cont.innerHTML = '<p>No properties found.</p>';
    else cont.innerHTML = list.map(p=>`
      <div class="card prop">
        <img src="${p.imageUrl||'https://via.placeholder.com/400x250'}" alt="">
        <h3>${p.title}</h3>
        <p>${p.location} — $${p.price}</p>
        <p><a href="/property.html?id=${p.id}">View</a></p>
      </div>
    `).join('');
  }catch(err){ cont.innerHTML = '<p>Error loading properties</p>'; }
}
document.getElementById('searchBtn').addEventListener('click', ()=>{ const q = document.getElementById('searchInput').value; renderList(q); });
// initial render
renderList();
