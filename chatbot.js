const sendBtn = document.querySelector(".send-btn");
const input = document.querySelector(".chat-footer input");
const chatBody = document.querySelector(".chat-body");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // USER MESSAGE
  chatBody.innerHTML += `
    <div class="message-row user">
      <div class="user-bubble">${text}</div>
    </div>
  `;
  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // BOT LOADING
  const loading = document.createElement("div");
  loading.className = "message-row";
  loading.innerHTML = `<div class="bot-bubble">Typing...</div>`;
  chatBody.appendChild(loading);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    loading.innerHTML = `<div class="bot-bubble">${data.reply}</div>`;
  } catch (err) {
    console.error(err);
    loading.innerHTML = `<div class="bot-bubble">Error connecting. Please try again later.</div>`;
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}
