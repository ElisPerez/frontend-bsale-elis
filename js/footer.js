const footerID = document.querySelector('#footer-id');

/* Creating the footer with current Year and a Link to instagram. */
footerID.innerHTML = `
      <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.2);">
        © ${new Date().getFullYear()} Copyright:
        <a class="text-dark" href="https://instagram.com/elisperezmusic" target=”_blank” style="text-decoration-line: none;">Elis Antonio Perez</a>
      </div>
      `;
