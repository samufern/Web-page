document.getElementById("sendContact").onclick = function() {
    var contactName = document.getElementById("contactName").value;
    var contactEmail = document.getElementById("contactEmail").value;
    var contactSubject = document.getElementById("contactSubject").value;
    var contactMessage = document.getElementById("contactMessage").value;
    var errorMessages = [];
  
    if (!contactName) {
      errorMessages.push("Por favor, ingrese su nombre.");
    }
  
    if (!isValidEmail(contactEmail)) {
      errorMessages.push("Por favor, ingrese una dirección de correo electrónico válida.");
    }
  
    if (!contactSubject) {
      errorMessages.push("Por favor, ingrese el asunto del mensaje.");
    }
  
    if (!contactMessage) {
      errorMessages.push("Por favor, ingrese su mensaje.");
    }
  
    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
      return;
    }
  
    // Guardar en localStorage
    localStorage.setItem("contactoNombre", contactName);
    localStorage.setItem("contactoEmail", contactEmail);
    localStorage.setItem("contactoAsunto", contactSubject);
    localStorage.setItem("contactoMensaje", contactMessage);
  
    // Mostrar mensaje de agradecimiento
    showThankYouMessageContacto();
  };
  
  function showThankYouMessageContacto() {
    const graciasDiv = document.createElement('div');
    graciasDiv.id = 'graciasMensajeContacto';
    graciasDiv.innerHTML = `<h2>¡Gracias por contactarnos!</h2>`;
  
    document.body.appendChild(graciasDiv);
  
    confetti({
      particleCount: 150,
      spread: 180,
      zIndex: 1000,
      startVelocity: 30,
      origin: { y: 0.5 }
    });
  
    setTimeout(() => {
      graciasDiv.remove();
    }, 5000);
  }
  
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  