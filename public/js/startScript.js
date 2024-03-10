
// let animeDev=document.querySelectorAll("#inside-content3-ques");

// animeDev.forEach(animeDev=>{
//     animeDev.addEventListener('animationend',()=>{
//         const newContent= document.createElement('p');
//         newContent.textContent = "click on Question for more Questions";
//         newContent.style.margin="0.5rem";
//         animeDev.appendChild(newContent);
//     })
// });

function showContent(element){
    element.addEventListener('mouseover',()=>{
        document.querySelector('.contentP').style.display="block";
    })
}

document.addEventListener('DOMContentLoaded',()=>{
    let se=document.querySelectorAll('.inside-content3');
    se.forEach(function(element){
        element.addEventListener('mouseover', function() {
            let content = element.querySelector('.contentP');
            if (content) {
                setTimeout(() => {
                    content.style.display = 'block';
                }, 1000);
                // content.style.display = 'block';
            }
        });
        element.addEventListener('mouseout', function() {
            let content = element.querySelector('.contentP');
            if (content) {
                // setTimeout(() => {
                //     content.style.display = 'none';
                // }, 1000);
                content.style.display = 'none';
            }
        });
    });

});

function changeColor(div){
    // console.log(currElementDiv);
//    console.log(div);
    if(currElementDiv ){
        currElementDiv.style.backgroundColor="white";
    }
    currElementDiv=div;
    div.style.backgroundColor="#746D69";
}

function display1(){
    document.querySelector('.display1').style.display="block";
    document.querySelector('.display2').style.display="none";
    document.querySelector('.display3').style.display="none";
    // document.getElementById('cccc').style.display="none";
    document.getElementById('aaaa').style.display="none";
    document.getElementById('bbbb').style.display="none";
}

function display2(){
    document.querySelector('.display2').style.display="block";
    document.querySelector('.display1').style.display="none";
    document.querySelector('.display3').style.display="none";
    // document.getElementById('cccc').style.display="none";
    document.getElementById('aaaa').style.display="none";
    document.getElementById('bbbb').style.display="none";

}

function display3(){
    document.querySelector('.display2').style.display="none";
    document.querySelector('.display1').style.display="none";
    document.querySelector('.display3').style.display="block";
    // document.getElementById('cccc').style.display="block";
    document.getElementById('aaaa').style.display="block";
    document.getElementById('bbbb').style.display="block";
}

function showAnsForQues(){
    document.getElementById('seeAns').style.display="block";
    document.getElementById('seeAns').style.color="green";
    document.getElementById('ansbtn').style.display="none";
}

function visiteThis(sectionId){
    let section=document.getElementById(sectionId);
    if(section){
        section.scrollIntoView({behavior:'smooth'});
    }
}