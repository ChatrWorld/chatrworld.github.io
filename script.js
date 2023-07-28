// JavaScript code
document.addEventListener("DOMContentLoaded", () => {
  const usernameForm = document.getElementById("usernameForm");
  const usernameInput = document.getElementById("usernameInput");
  const chatbox = document.getElementById("chatbox");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const welcomeMessage = document.getElementById("welcomeMessage");

  // Function to update the chatbox with new messages
  const updateChatbox = (message) => {
    const newMessage = document.createElement("div");
    newMessage.textContent = message;
    chatbox.appendChild(newMessage);
  };

  // Function to handle form submission when choosing the username
  usernameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    if (username.trim() !== "") {
      // Save the username in session storage
      sessionStorage.setItem("username", username);
      // Redirect to the chat page
      window.location.href = "chat.html";
    }
  });

  // Function to handle form submission when sending a message
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = messageInput.value;
    const username = sessionStorage.getItem("username");
    if (message.trim() !== "" && username) {
      // Send the message to the server using PHP
      fetch("send_message.php", {
        method: "POST",
        body: JSON.stringify({ username, message }),
      })
        .then((response) => response.text())
        .then((data) => {
          // Update the chatbox with the new message
          updateChatbox(data);
        });
      // Clear the message input field
      messageInput.value = "";
    }
  });

  // Check if there's a stored username in session storage
  const storedUsername = sessionStorage.getItem("username");
  if (storedUsername) {
    welcomeMessage.textContent = `Welcome, ${storedUsername}!`;
    // Fetch and display existing chat messages from the server using PHP
    fetch("get_chat.php")
      .then((response) => response.text())
      .then((data) => {
        chatbox.innerHTML = data;
      });
  } else {
    // Redirect to the username selection page if no username is stored
    window.location.href = "index.html";
  }
});
