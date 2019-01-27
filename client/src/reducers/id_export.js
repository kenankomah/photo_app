export default function(){
   const request = fetch('http://localhost:5000/mongoid',{ credentials: 'include' })
  .then(res => res.json()).catch(error => { console.log(error)
    if(error.message === "Failed to fetch" && (document.querySelector("h1") || document.querySelector(".center-block"))){
      window.location.reload();      
    } 
  })     
   return {payload:request}   
}

