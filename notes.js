//To post a new image

const post = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg',
  dates:"31/07/2018"
}



const newPost = post => {
	const options = {
		method:'POST',
		body: JSON.stringify(post),
		headers: new Headers({
			'Content-Type':'application/json'
		})
  }

	//return fetch('http://localhost:8000/book/5b31746867b135c5ccc834e6', options)
  return fetch('http://localhost:8000/book/', options)
	.then(res => res.json())
	.then(res => console.log(res))
	.catch(error => console.log(error))

}

newPost(post);






//To post a delete an image

const post = {}
 



const newPost = post => {
	const options = {
		method:'DELETE',
		body: JSON.stringify(post),
		headers: new Headers({
			'Content-Type':'application/json'
		})
  }

	return fetch('http://localhost:8000/book/5b31746867b135c5ccc834e6', options)
	.then(res => res.json())
	.then(res => console.log(res))
	.catch(error => console.log(error))

}

newPost(post);

//To post a update an image

//do the same as delete except the method should say "PUT"