const base= "https://murmuring-meadow-93133.herokuapp.com"

// get postid 

const url = new URL(window.location.href)
const id = url.searchParams.get('id')

// get info

const board = document.querySelector('.board')
const comment = document.querySelector('.comment')

fetch(`${base}/api/${id}`,{mode:'cors'})
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
    board.innerHTML=`
    <div class='post'>
    <div class='header'>
    <h1>${data.post.title}</h1>
    <p>Posted by ${data.post.user.user_name}</p>
    <p>Updated at ${data.post.created_formatted}</p>
    </div>
    <div class='text'>
    <p>${data.post.text}</p>
    </div>
    </div>
    `
    if (data.comments.length>0){
        for (let i =0; i<data.comments.length;i++){
            const c = data.comments[i]
            const card = document.createElement('div')
            card.classList.add('comment-card')
            card.innerHTML = `
        
            <h4>${c.user.user_name}<span class='date'>  ${c.date_formatted}</span></h4>
            <p>${c.text}</p>
            `
            
            comment.append(card)    
        }

    }

    })

    // make dictionary from the form 
    function getData(form) {
        var formData = new FormData(form);
      
        // iterate through entries...
        var dic ={}
        for (var pair of formData.entries()) {
          dic[pair[0]] = pair[1]
        }
        return dic
    }

    // add trigger 

    document.addEventListener('click',(e)=>{
        if (e.target.classList[0]=='comment'){
            e.preventDefault()
        console.log('leave comment')
        const token = window.localStorage.getItem('token')
        const form = document.querySelector('#comment')
        const dict = getData(form)
            // make update api call 
            fetch(`${base}/api/${id}/comment`, {
            method: "POST",
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}, 
            

            body: JSON.stringify({token,
                                  text:dict.text})
          }).then(res => res.json()) 
          .then(data=>{
            console.log(data)
            window.location.href= `./detail.html?id=${id}`
          }
            )
          .catch(err=>{ throw err});
        }
        }
    )