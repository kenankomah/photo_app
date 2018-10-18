


// const request1 = fetch('http://localhost:5000/mongoid',{ credentials: 'include' })
//   .then(res => res.json()).catch(error => { window.location.reload(); console.log(error)})

export default function(){
   const request = fetch('http://localhost:5000/mongoid',{ credentials: 'include' })
 // const request = fetch('/mongoid',{ credentials: 'include' })
  .then(res => res.json()).catch(error => { console.log(error)
    if(error.message !== "Unexpected end of JSON input"){
      window.location.reload();      
    } 
  })
   
  
   return {payload:request}
   
}
