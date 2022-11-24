const base= "https://murmuring-meadow-93133.herokuapp.com"

// get postid 

const url = new URL(window.location.href)
const id = url.searchParams.get('id')

// get info

const formDiv = document.querySelector('.form-div')

fetch(`${base}/api/${id}`,{mode:'cors'})
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
    const p = data.post
    if (p.published){
    formDiv.innerHTML=`
    <form action="" id="update">
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title" value="${p.title}"></br>
        <label for="text">Text:</label><br>
        <textarea name="text" id='text' rows='10' cols='50'>${p.text}</textarea><br>
        <input type="checkbox" name="published" id="published" checked>
        <label for="published"> Publish?</label><br>
        <input type="submit" id=${id} class='update' value="Submit" onsubmit="return false">
        
    </form>
    `}
    else {
        formDiv.innerHTML=`
    <form action="" id="update">
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title" value="${p.title}"></br>
        <label for="text">Text:</label><br>
        <textarea name="text" id='text' rows='10' cols='50'>${p.text}</textarea><br>
        <input type="checkbox" name="published" id="published">
        <label for="published"> Publish?</label><br>
        <input type="submit" id=${id} class='update value="Submit" onsubmit="return false">
        
    </form>
    `

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
        e.preventDefault();
        const form = document.querySelector('#update')
        const dict = getData(form)
        if (e.target.classList[0]=='update'){
            const token = window.localStorage.getItem('token')
            // make update api call 
            fetch(`${base}/api/${e.target.id}/update`, {
            method: "POST",
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}, 
            

            body: JSON.stringify({token,
                                  title:dict.title,
                                  text:dict.text,
                                  published:true})
          }).then(res => res.json()) 
          .then(data=>{
            console.log(data)
            window.location.href= 'editor/posts.html'
          }
            )
          .catch(err=>{ throw err});
        }
    })