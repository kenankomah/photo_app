var arr = [];

export default function(){
 return fetch('http://localhost:8000/books')
	.then(res => res.json())
	 .then(posts => {
     posts.map( el => {
    //  var arr = [];
       arr.push({src:el.src, dates:el.dates});
       //console.log(arr);
     })
  })
}

//getPost();
