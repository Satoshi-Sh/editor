
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


document.getElementById("login").addEventListener("submit", function (e) {
    e.preventDefault();
    const credential = getData(e.target);

    fetch(`${base}/api/login`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(credential)
      }).then(res => res.json()) 
      .then(data=>{
        console.log(data)
        window.localStorage.setItem("token",data['token'])
        window.localStorage.setItem("username",data['username'])
        window.location.href= './posts.html'
      }
        )
      .catch(err=>{ throw err});

  });