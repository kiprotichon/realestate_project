// register and login handlers
document.getElementById('regForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try{
    await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name,email,password, role:'seller' }) });
    alert('Registered. Please login.'); location.href='/login.html';
  }catch(err){ alert('Error registering'); }
});
document.getElementById('loginForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try{
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email,password }) });
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    alert('Logged in'); location.href = '/';
  }catch(err){ alert('Login failed'); }
});
