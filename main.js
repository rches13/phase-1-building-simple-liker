// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// Initialize hearts and error modal
document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".like-glyph");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  // Add event listeners to each heart icon
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      handleHeartClick(heart);
    });
  });

  // Function to handle heart click
  function handleHeartClick(heart) {
    if (heart.innerText === "♡") {
      // Empty heart clicked, send a server request to like
      mimicServerCall()
        .then(() => {
          heart.innerText = "♥";
          heart.classList.add("activated-heart");
        })
        .catch(error => {
          showError(error);
        });
    } else {
      // Full heart clicked, unlike
      heart.innerText = "♡";
      heart.classList.remove("activated-heart");
    }
  }

  // Function to display error modal
  function showError(error) {
    modal.classList.remove("hidden");
    modalMessage.innerText = error;
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 3000);
  }
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
