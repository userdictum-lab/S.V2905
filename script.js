const correctPassword = "2905";
const bgMusic = document.getElementById("bgMusic");

function switchScreen(from,to){
    const fromEl=document.getElementById(from);
    const toEl=document.getElementById(to);
    fromEl.classList.remove("active");
    setTimeout(()=>{toEl.classList.add("active"); bgMusic.play(); },300);
}

function checkPassword(){
    const input=document.getElementById("passwordInput").value;
    if(input===correctPassword){switchScreen("passwordScreen","questionScreen");}
    else{document.getElementById("errorMessage").innerText="Not quite… but I know you remember it ";}
}

const noBtn=document.getElementById("noBtn");
const noText=document.getElementById("noText");
const firstHint=document.getElementById("firstHint");
const yesBtn=document.getElementById("yesBtn");
let noCount=0;

noBtn.addEventListener("click",()=>{
    noCount++;
    noBtn.style.position="absolute";
    noBtn.style.top=Math.random()*80+"%";
    noBtn.style.left=Math.random()*80+"%";
    yesBtn.style.transform=`scale(${1+noCount*0.1})`;

    const messages=[
        "Are you sure?",
        "Think again…",
        "You can’t escape destiny ",
        "Just press yes.",
        "It’s getting obvious…",
        "Last chance…",
        "Okay fine "
    ];

    firstHint.style.display="none";

    if(noCount<=messages.length){noText.innerText=messages[noCount-1];}
    else{noBtn.style.display="none"; noText.innerText="You're luck has done ";}
});

function showMessage(){
    switchScreen("questionScreen","messageScreen");
    if(navigator.vibrate){navigator.vibrate(200);}
    showLoveText();
}

function showLoveText(){
    const messageLines=[
        "Saro… ",
        "Valentine’s Day isn’t just a celebration. ",
        "It’s a reminder that love can be gentle… steady… real.",
        "And somehow, in the middle of everything, I found that kind of love in you. ",
        "When I think about you, I don’t think about one single moment.",
        "I think about how you make the world quieter for me. Softer. Warmer. Safer. ",
        "You have this calm strength… this beautiful patience… this way of caring that feels effortless. ",
        "I’ve seen you grow. I’ve seen you try. I’ve seen you push yourself even when it wasn’t easy.",
        "And every time… I admired you more. ",
        "If love had a melody, it would sound like this piano playing now. ",
        "If love had a light, it would glow the way your eyes do when you smile. ",
        "If love had a name… it would be yours. ",
        "This page is small compared to what I feel. Because what I feel is not loud. It’s not dramatic. It’s quiet. It’s steady. It stays. ",
        "And on this Valentine’s Day… I don’t just want a moment. I want to keep choosing you. Again and again. ",
        "So… Be my Valentine "
    ];
    const container=document.getElementById("loveMessage");
    container.innerHTML="";
    messageLines.forEach((line,index)=>{
        setTimeout(()=>{
            const p=document.createElement("p");
            p.classList.add("fadeLine");
            if(index===messageLines.length-1){p.style.fontSize="1.3em";p.style.marginTop="15px";}
            p.innerText=line;
            container.appendChild(p);
        },index*1200);
    });
}

function showGifts(){switchScreen("messageScreen","giftsScreen");}

function openGift(num){
    const giftContent=document.getElementById("giftContent");
    giftContent.innerHTML=""; // reset

    if(num===1){
        giftContent.innerHTML=`<h3>Red Roses Bouquet </h3><p>If I could give you the world in flowers,<br> I still wouldn’t match your beauty.</p><canvas id="roseCanvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></canvas>`;
        startRoseAnimation();
    }
    else if(num===2){
        giftContent.innerHTML=`<h3>Night Sky </h3><p>Every star tonight carries a wish for you.</p><canvas id="starsCanvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></canvas>`;
        startStarsAnimation();
    }
    else if(num===3){
        giftContent.innerHTML=`<h3>Blooming Lotus </h3><p style="opacity:0; transform:scale(0.5);" id="lotusText">With you, even silence feels warm.</p><canvas id="lotusCanvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></canvas>`;
        startLotusAnimation();
    }
    else if(num===4){
        giftContent.innerHTML=`<h3>It's Me </h3><p>Plot twist… It’s me. I’m your gift. </p><small>Limited edition. No refunds.</small><canvas id="heartsCanvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></canvas>`;
        startHeartsAnimation();
    }
}

// ----- Gift Animations -----
function startRoseAnimation(){ /* same as before */ 
    const canvas=document.getElementById("roseCanvas");const ctx=canvas.getContext("2d");canvas.width=window.innerWidth;canvas.height=window.innerHeight;const petals=[];for(let i=0;i<50;i++){petals.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:5+Math.random()*5,speedY:1+Math.random()*2,speedX:(Math.random()-0.5)*1.5,color:"rgba(255,0,50,0.7)"});}function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);petals.forEach(p=>{p.y+=p.speedY;p.x+=p.speedX;if(p.y>canvas.height)p.y=-10;if(p.x>canvas.width)p.x=0;ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);ctx.fillStyle=p.color;ctx.fill();});requestAnimationFrame(animate);}animate();
}

function startStarsAnimation(){ /* same as before */ 
    const canvas=document.getElementById("starsCanvas");const ctx=canvas.getContext("2d");canvas.width=window.innerWidth;canvas.height=window.innerHeight;const stars=[];for(let i=0;i<80;i++){stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:Math.random()*2,speed:0.1+Math.random()*0.3,alpha:Math.random()});}function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);stars.forEach(s=>{s.alpha+=0.01;if(s.alpha>1)s.alpha=0;ctx.beginPath();ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;ctx.fill();});requestAnimationFrame(animate);}animate();
}

function startLotusAnimation(){ 
    document.body.style.background="#ffd6e6";const text=document.getElementById("lotusText");let scale=0.5,opacity=0;const interval=setInterval(()=>{scale+=0.01;opacity+=0.02;text.style.transform=`scale(${scale})`;text.style.opacity=opacity;if(scale>=1)clearInterval(interval);},30);
}

function startHeartsAnimation(){ 
    const canvas=document.getElementById("heartsCanvas");const ctx=canvas.getContext("2d");canvas.width=window.innerWidth;canvas.height=window.innerHeight;const hearts=[];setInterval(()=>{hearts.push({x:Math.random()*canvas.width,y:canvas.height+10,radius:5+Math.random()*5,speedY:1+Math.random()*2,alpha:Math.random()});},200);function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);hearts.forEach((h,i)=>{h.y-=h.speedY;ctx.beginPath();ctx.arc(h.x,h.y,h.radius,0,Math.PI*2);ctx.fillStyle=`rgba(255,0,77,${h.alpha})`;ctx.fill();if(h.y<-10)hearts.splice(i,1);});requestAnimationFrame(animate);}animate();
}