function isValidEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isTimeValid(time) {
  var [hours, minutes] = time.split(":").map(Number);
  return hours >= 12 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

function saveReservationData(formId, modalId) {
  var name = document.querySelector(`#${formId} [name="name"]`).value;
  var email = document.querySelector(`#${formId} [name="email"]`).value;
  var date = document.querySelector(`#${formId} [name="date"]`).value;
  var time = document.querySelector(`#${formId} [name="time"]`).value;
  var people = document.querySelector(`#${formId} [name="people"]`).value;
  var comments = document.querySelector(`#${formId} [name="comments"]`).value;


  if (!name) {
    alert("Por favor, ingrese su nombre.");
    return false;
  }
  if (!isValidEmail(email)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return false;
  }
  if (!date) {
    alert("Por favor, seleccione una fecha.");
    return false;
  }
  if (!isTimeValid(time)) {
    alert("Por favor, ingrese una hora válida entre 12:00 PM y 11:59 PM.");
    return false;
  }
  if (!people) {
    alert("Por favor, indique el número de personas.");
    return false;
  }

  localStorage.setItem("reservaNombre", name);
  localStorage.setItem("reservaEmail", email);
  localStorage.setItem("reservaFecha", date);
  localStorage.setItem("reservaHora", time);
  localStorage.setItem("reservaPersonas", people);
  localStorage.setItem("reservaComentarios", comments);
  return true;
}

document.getElementById("btnReservar1").onclick = function() {
  if (saveReservationData('pagina_inicio', 'reservationModal1')) {
    document.getElementById("reservationModal1").style.display = "block";
  }
};

document.getElementById("btnReservar2").onclick = function() {
  if (saveReservationData('reservas', 'reservationModal2')) {
    document.getElementById("reservationModal2").style.display = "block";
  }
};

// Eventos de cierre de modal
document.querySelectorAll(".close").forEach(function(elem) {
  elem.onclick = function() {
    this.parentElement.parentElement.parentElement.style.display = "none";
  }
});

document.getElementsByClassName("close")[1].onclick = function() {
  document.getElementById("reservationModal2").style.display = "none";
};

window.onclick = function(event) {
  if (event.target == document.getElementById("reservationModal1")) {
    document.getElementById("reservationModal1").style.display = "none";
  }
  if (event.target == document.getElementById("reservationModal2")) {
    document.getElementById("reservationModal2").style.display = "none";
  }
};

function showThankYouMessage(local, modalId) {
  localStorage.setItem("localElegido", local);

  const graciasDiv = document.createElement('div');
  graciasDiv.id = 'graciasMensaje';
  graciasDiv.innerHTML = `<h2>¡Gracias por su reserva en ${local}!</h2>`;
  
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

  document.getElementById(modalId).style.display = "none";
}

document.querySelector("#reservationModal1 #localRozas").onclick = function() {
  showThankYouMessage("Las Rozas", "reservationModal1");
};

document.querySelector("#reservationModal1 #localMatas").onclick = function() {
  showThankYouMessage("Las Matas", "reservationModal1");
};

document.querySelector("#reservationModal2 #localRozas1").onclick = function() {
  showThankYouMessage("Las Rozas", "reservationModal2");
};

document.querySelector("#reservationModal2 #localMatas1").onclick = function() {
  showThankYouMessage("Las Matas", "reservationModal2");
};