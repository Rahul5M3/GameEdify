
let animeDev=document.querySelectorAll("#inside-content3-ques");

animeDev.forEach(animeDev=>{
    animeDev.addEventListener('animationend',()=>{
        const newContent= document.createElement('p');
        newContent.textContent = "click on Question for more Questions";
        newContent.style.margin="0.5rem";
        animeDev.appendChild(newContent);
    })
});

let animeDe=document.querySelectorAll("#iii");

animeDe.forEach(animeDe=>{
    animeDe.addEventListener('animationend',()=>{
        const newContent= document.createElement('p');
        newContent.textContent = "solve it and get points";
        newContent.style.margin="0.5rem";   
        animeDe.appendChild(newContent);
    })
});