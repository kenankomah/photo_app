/*
const post = {
src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/GOODS_South_field.jpg',
  dates:"31/07/2018"
}



const newPost = post => {
	const options = {
		method:'DELETE',
		body: JSON.stringify(post),
		headers: new Headers({
			'Content-Type':'application/json'
		})
  }

	//return fetch('http://localhost:8000/book/5b60c3991b0e644458328a29', options)
  return fetch('http://localhost:8000/book/', options)
	.then(res => res.json())
	.then(res => console.log(res))
	.catch(error => console.log(error))

}

newPost(post);
*/

export default function(){
	// const request = fetch('/books',{ credentials: 'include' })
	 const request = fetch('http://localhost:5000/books',{ credentials: 'include' })
			.then(res => res.json()).catch(error => {console.log(error);})
		//	console.log({payload:request});
     return {payload:request}
}
