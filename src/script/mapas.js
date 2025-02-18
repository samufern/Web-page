document.addEventListener('DOMContentLoaded', function() {
    var mapLasRozas = L.map('mapLasRozas').setView([40.492916, -3.87371], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapLasRozas);
    L.marker([40.492916, -3.87371]).addTo(mapLasRozas)
      .bindPopup('Local Las Rozas<br>Calle Andrés Segovia, 25, Las Rozas de Madrid');
  
    var mapLasMatas = L.map('mapLasMatas').setView([40.579505, -3.929052], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapLasMatas);
    L.marker([40.579505, -3.929052]).addTo(mapLasMatas)
      .bindPopup('Local Las Matas<br>Calle de Goya, 13, Las Matas');
  });
  