let clickedButton = null;

  // Detect which button was clicked
  document.querySelectorAll('#listId button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(event) {
      clickedButton = this;
    });
  });


  document.getElementById('listId').addEventListener('submit', function(event) {
    if (clickedButton && clickedButton.id === 'clear') {
      const confirmed = confirm("Are you sure you want to delete?");
      if (!confirmed) {
        event.preventDefault(); 
      }
    }
  });
  