// Script to handle FAQ
function handleFAQ() {
    document.querySelectorAll('.faq_pregunta').forEach(pregunta => {
      pregunta.addEventListener('click', function() {
        this.classList.toggle('active');
        var respuesta = this.nextElementSibling;
        if (respuesta.style.display === 'block') {
          respuesta.style.display = 'none';
        } else {
          respuesta.style.display = 'block';
        }
      });
    });
  }
  
  // Function to set a cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }
  
  // Function to get the value of a cookie
  function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return '';
  }
  
  // Script to save the email in a cookie
  function saveEmailInCookie() {
    const inputEmailBoletin = document.querySelector('#emailBoletin');
    const cookieEmail = getCookie('email');
    
    if (cookieEmail) {
      inputEmailBoletin.value = cookieEmail;
    }
    
    inputEmailBoletin.addEventListener('change', function() {
      const email = inputEmailBoletin.value;
      setCookie('email', email, 30);
    });
  }
  
  // Function to show a thank you message
  // Function to show a thank you message
function showThankYouMessage() {
    const graciasDiv = document.createElement('div');
    graciasDiv.id = 'graciasMensaje';
    graciasDiv.innerHTML = `<h2>¡Gracias por suscribirse a nuestro boletín de novedades y ofertas!</h2>`;
    document.body.appendChild(graciasDiv);
    
    confetti({
      particleCount: 1500,
      spread: 180,
      zIndex: 1000,
      startVelocity: 40,
      origin: { y: 0.5 }
    });
    
    setTimeout(() => {
      graciasDiv.remove();
    }, 4000);
  }
  
  // Call the function showThankYouMessage when subscribing to the newsletter
  function handleNewsletterSubscription() {
    const emailBoletin = document.querySelector('#emailBoletin');
    const btnBoletin = document.querySelector('.btn-boletin');
    
    btnBoletin.addEventListener('click', function() {
      const email = emailBoletin.value;
      if (isValidEmail(email)) {
        setCookie('email', email, 30);
        showThankYouMessage();
        emailBoletin.value = '';
      } else {
        alert('Por favor, ingrese un correo electrónico válido.');
      }
    });
  }
  
  
  // Call all functions on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    handleFAQ();
    saveEmailInCookie();
    handleNewsletterSubscription();
  });