const API = {
  base: '',
  async get(path){ const res = await fetch('/api' + path); if(!res.ok) throw new Error('API error'); return res.json(); },
  async post(path, body, isJson=true, token=null){
    const headers = {};
    let bodyData = body;
    if(isJson){ headers['Content-Type']='application/json'; bodyData = JSON.stringify(body); }
    if(token) headers['Authorization'] = 'Bearer ' + token;
    const res = await fetch('/api' + path, { method:'POST', headers, body: bodyData });
    if(!res.ok) throw new Error('API error'); return res.json();
  }
};
