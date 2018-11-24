


// const request1 = fetch('http://localhost:5000/mongoid',{ credentials: 'include' })
//   .then(res => res.json()).catch(error => { window.location.reload(); console.log(error)})

export default function(){
   const request = fetch('http://localhost:5000/mongoid',{ credentials: 'include' })
 // const request = fetch('/mongoid',{ credentials: 'include' })
  .then(res => res.json()).catch(error => { console.log(error)
    if(error.message === "Failed to fetch" && (document.querySelector("h1") || document.querySelector(".center-block"))){
      window.location.reload();      
    } 
  })
   
  
   return {payload:request}
   
}


// SyntaxError: Unexpected end of JSON input
//     at VM6399 bundle.js:27140
// VM6399 bundle.js:27120 TypeError: Failed to fetch
// VM6399 bundle.js:27120 TypeError: Failed to fetch



//net::ERR_INSUFFICIENT_RESOURCES