export default function(){
	 const request = fetch('http://localhost:5000/images',{ credentials: 'include' })
			.then(res => res.json()).catch(error => {console.log(error);})
	     return {payload:request}
}
