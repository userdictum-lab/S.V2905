const correctPassword = "2905"; // حط الباسورد القديم هنا

function switchScreen(from, to) {
    document.getElementById(from).classList.remove("active");
    document.getElementById(to).classList.add("active");
}

function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    if (input === correctPassword) {
        switchScreen("passwordScreen", "questionScreen");
    } else {
        document.getElementById("errorMessage").innerText =
            "Not quite… but I know you remember it better than anyone 😉";
    }
}

const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");
let noCount = 0;

noBtn.addEventListener("click", () => {
    noCount++;
    noBtn.style.position = "absolute";
    noBtn.style.top = Math.random() * 80 + "%";
    noBtn.style.left = Math.random() * 80 + "%";

    const messages = [
        "Are you sure?",
        "Think again…",
        "You can’t escape destiny 😌",
        "Just press yes.",
        "It’s getting obvious…",
        "Last chance…",
        "Okay fine 😭"
    ];

    if (noCount <= messages.length) {
        noText.innerText = messages[noCount - 1];
    } else {
        noBtn.style.display = "none";
        noText.innerText = "You were always meant to press this.";
    }
});

function showMessage() {
    switchScreen("questionScreen", "messageScreen");

    document.getElementById("loveMessage").innerHTML = `
    <p>Saro… 🤍</p>
    <p>Valentine’s Day isn’t just a celebration...</p>
    <p>More beautiful words coming soon…</p>
    `;
}

function showGifts() {
    switchScreen("messageScreen", "giftsScreen");
}

function openGift(num) {
    const giftContent = document.getElementById("giftContent");

    if (num === 4) {
        giftContent.innerHTML = `
        <h3>Plot twist…</h3>
        <p>It’s me. I’m your gift. 😌❤️</p>
        <small>Limited edition. No refunds.</small>
        `;
    } else {
        giftContent.innerHTML = "<p>Gift animation coming next step…</p>";
    }
}