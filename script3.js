const board = document.querySelector('.board')
const base= "https://murmuring-meadow-93133.herokuapp.com"


fetch(`${base}/all`,{mode:'cors'})
.then(function(response){
    return response.json()
})
.then(function(posts){
    console.log(posts)
    for (let i= 0; i<posts.length;i++){
           
        const card = document.createElement('div')
        card.classList.add('card')
        const username = window.localStorage.getItem('username')
        if (username==posts[i].user.user_name){
            card.innerHTML=`
            <h2>${posts[i].title}</h2>
            <a href="./detail.html?id=${posts[i].id}" class='post-page'>Read this Post</a><br>
            <a href="./update.html?id=${posts[i].id}" class='post-page'>Update this Post</a>
            <p>Posted by ${posts[i].user.user_name}
            <p>Updated at ${posts[i].updated_formatted}
            <p>Published: ${posts[i].published}</p>
            <button class='delete' id=${posts[i].id}>Delete</button>
            `
        }
        else{
        card.innerHTML=`
        <h2>${posts[i].title}</h2>
        <a href="./detail.html?id=${posts[i].id}" class='post-page'>Read this post</a>
        <p>Posted by ${posts[i].user.user_name}
        <p>Updated at ${posts[i].updated_formatted}
        <p>Published: ${posts[i].published}</p>
        `
        }
        board.append(card)
    }
})

//add trigger 

document.addEventListener('click',(e)=>{
    if(e.target.classList[0]=='delete'){
        console.log(e.target.id)
        const token = window.localStorage.getItem('token')
        console.log(token)
        // make delete api call 
        fetch(`${base}/api/${e.target.id}/delete`, {
            method: "POST",
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}, 
            body: JSON.stringify({token})
          }).then(res => res.json()) 
          .then(data=>{
            console.log(data)
            window.location.href= '/posts.html'
          }
            )
          .catch(err=>{ throw err});
    }
})