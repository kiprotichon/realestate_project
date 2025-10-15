document.getElementById('propForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const token = localStorage.getItem('token');
  if(!token){ alert('Please login as seller to add property'); location.href='/login.html'; return; }
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];
  const fd = new FormData();
  fd.append('title', title);
  fd.append('location', location);
  fd.append('price', price);
  fd.append('description', description);
  if(image) fd.append('image', image);
  try{
    const res = await fetch('/api/properties', { method:'POST', headers:{ 'Authorization': 'Bearer ' + token }, body: fd });
    if(!res.ok) throw new Error('err');
    alert('Property added'); location.href='/';
  }catch(err){ alert('Error adding property'); }
});
