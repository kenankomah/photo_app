export default function(){
  const request = fetch('http://localhost:5000/mongoid',{ credentials: 'include' })
  .then(res => res.json()).catch(error => /*window.location.assign('http://localhost:5000/auth/login')*/ console.log(error))
   return {payload:request}
}
