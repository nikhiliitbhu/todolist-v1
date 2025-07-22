let clickedButton = null;

document.getElementById(window.location.pathname).setAttribute("class", "clickedBtn");

  // Detect which button was clicked
  document.querySelectorAll('#listId button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(event) {
      clickedButton = this;
    });
  });


  function makeRequest(url) {
    
    window.open(window.location.origin + url, "_target");
           
    }

    