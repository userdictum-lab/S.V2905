const correctPassword="2905";
const bgMusic=document.getElementById("bgMusic");

function switchScreen(from,to){
    document.getElementById(from).classList.remove("active");
    setTimeout(()=>document.getElementById(to).classList.add("active"),300);
}

function checkPassword(){
    const input=document.getElementById("passwordInput").value;
    if(input===correctPassword){switchScreen("passwordScreen","questionScreen"); bgMusic.play();}
    else{document.getElementById("errorMessage").innerText="Not quite… ";}
}

// No/Yes Buttons
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
    const messages=["Are you sure?","Think again…","You can’t escape destiny ","Just press yes.","It’s getting obvious…","Last chance…","Okay fine "];
    firstHint.style.display="none";
    noText.innerText=noCount<=messages.length?messages[noCount-1]:"You're luck has done ";
    if(noCount>7) noBtn.style.display="none";
});

yesBtn.addEventListener("click",showMessage);

// Message
function showMessage(){switchScreen("questionScreen","messageScreen"); showLoveText();}

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
            container.scrollTop=container.scrollHeight;
        },index*700);
    });
}

// Gifts
function showGifts(){switchScreen("messageScreen","giftsScreen");}

function openGift(num){
    const giftContent=document.getElementById("giftContent");
    const canvas=document.getElementById("giftCanvas");
    const ctx=canvas.getContext("2d");
    canvas.width=giftContent.clientWidth;
    canvas.height=giftContent.clientHeight;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    giftContent.innerHTML=""; giftContent.appendChild(canvas);

    if(num===1){ // Red Roses
        giftContent.innerHTML+="<h3>Red Roses Bouquet </h3><p>If I could give you the world in flowers, I still wouldn’t match your beauty.</p>";
        rosesAnimation(ctx,canvas);
    }
    else if(num===2){ // Night Sky
        giftContent.innerHTML+="<h3>Night Sky </h3><p>Every star tonight carries a wish for you.</p>";
        starsAnimation(ctx,canvas);
    }
    else if(num===3){ // Lotus
        giftContent.innerHTML+="<h3>Blooming Lotus </h3><p>With you, even silence feels warm.</p>";
        lotusAnimation(ctx,canvas);
    }
    else if(num===4){ // Fun Gift
        giftContent.innerHTML+="<h3>It's Me </h3><p>Plot twist… It’s me. I’m your gift. </p>";
        pulseTextAnimation(ctx,canvas,"It’s Me ");
    }
}

// Example simple animations
function rosesAnimation(ctx,canvas){
    const petals=[];
    for(let i=0;i<50;i++){
        petals.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vy:1+Math.random()*2,r:5+Math.random()*5});
    }
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        petals.forEach(p=>{
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
            ctx.fillStyle="red";
            ctx.fill();
            p.y+=p.vy;
            if(p.y>canvas.height)p.y=-p.r;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

function starsAnimation(ctx,canvas){
    const stars=[];
    for(let i=0;i<100;i++){
        stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:1+Math.random()*2,vy:0.1+Math.random()*0.3});
    }
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        stars.forEach(s=>{
            ctx.beginPath();
            ctx.arc(s.x,s.y,s.r,0,2*Math.PI);
            ctx.fillStyle="white";
            ctx.fill();
            s.y+=s.vy;
            if(s.y>canvas.height)s.y=0;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

function lotusAnimation(ctx,canvas){
    let scale=0;
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(scale,scale);
        ctx.beginPath();
        ctx.moveTo(0,-30);
        for(let i=0;i<6;i++){
            ctx.rotate(Math.PI/3);
            ctx.lineTo(0,-30);
        }
        ctx.fillStyle="pink";
        ctx.fill();
        ctx.restore();
        scale+=0.01;
        if(scale>1)scale=1;
        requestAnimationFrame(draw);
    }
    draw();
}

function pulseTextAnimation(ctx,canvas,text){
    let scale=0.5,direction=0.01;
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(scale,scale);
        ctx.fillStyle="yellow";
        ctx.font="30px Arial";
        ctx.textAlign="center";
        ctx.fillText(text,0,0);
        ctx.restore();
        scale+=direction;
        if(scale>1.2 || scale<0.5) direction*=-1;
        requestAnimationFrame(draw);
    }
    draw();
}