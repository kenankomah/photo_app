export default function(){
//  window.location.assign('http://localhost:8000/auth/login');
//debugger;
  const request = fetch('http://localhost:8000/mongoid',{ credentials: 'include' })
  .then(res => res.json()).catch(error => window.location.assign('http://localhost:8000/auth/login'))
   return {payload:request}
}
