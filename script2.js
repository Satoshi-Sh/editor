const base= "https://murmuring-meadow-93133.herokuapp.com"

function getData(form) {
    var formData = new FormData(form);
  
    // iterate through entries...
    var dic ={}
    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
      dic[pair[0]] = pair[1]
    }
    return dic
}


document.getElementById("create").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = getData(e.target);
    if (data.published=='on'){
        data.published=true
    }
    else {
        data.published=false
    }
    console.log(data)
    const token = window.localStorage.getItem('token')
    console.log(token)
   

    fetch(`${base}/api/post`,
    {method:'POST',
    headers: {'Content-Type': 'application/json',}, 
    body: JSON.stringify({
        token,
        title: data.title,
        text:data.text,
        published:data.published})
     }).then(res => res.json())
     .then(message=>{
        console.log(message)
        window.location.href='/posts.html'
     })
     .catch(err=>{throw err})

     })