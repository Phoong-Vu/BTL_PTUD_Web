
let chatVisible = false;

function toggleChat() {
  chatVisible = !chatVisible;
  document.getElementById('chatbox').style.display = chatVisible ? 'flex' : 'none';
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  input.value = "";

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const lowerMessage = message.toLowerCase();
      let found = data.find(item => lowerMessage.includes(item.question.toLowerCase()));
      let reply = found ? found.answer : "Xin lỗi, tôi chưa hiểu câu hỏi. Bạn vui lòng hỏi lại?";
      appendMessage("bot", reply);
    });
}

function appendMessage(sender, text) {
  const msgBox = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender === "user" ? "Bạn" : "Bot"}:</strong> ${text}`;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}
