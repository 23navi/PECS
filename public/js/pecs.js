var today = new Date()
var curHr = today.getHours()
let state=0
if (curHr < 12) {
    state=1
}else if (curHr < 18) {
    state=2
} else {
    state=3
}           

$(document).ready(()=>{
    //when things are ready.. we will load the relevent post for that particular user.
    $.get(`/state/${state}`,res=>{
        console.log(state);
        outputPost(res,$(".row"))
    })
})


function outputPost(result,container){
    container.html("") //removing everything from container
    console.log(result)
    result.forEach(action => {
        const html= createPostHTML(action);
        container.append(html);
    }); 

}


function createPostHTML(action){

    const html= `<div class="col-lg-4 col-sm-4 col-4 thumbnail" data-id=${action.actionId}>
                     <img src="${action.image}" alt="pic" data-id=${action.actionId}>
                </div>
                `

    return html
}




$(document).on("click",".thumbnail",(event)=>{
    const img= $(event.target)
    const actionId=img.data("id");

    $.get(`/action/${actionId}`,res=>{
        let snd = new Audio(`/sounds/${res.soundId}`); 
            snd.play()
    })
    
})

//https://voicemaker.in/





