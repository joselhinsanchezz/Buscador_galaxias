document.getElementById('btnBuscar').addEventListener('click', function () {
  const query = document.getElementById('inputBuscar').value;
  
  if (!query) {
    alert('Por favor, ingresa un término de búsqueda.');
    return;
  }

  const url = `https://images-api.nasa.gov/search?q=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const items = data.collection.items;
      const contenedor = document.getElementById('contenedor');
      contenedor.innerHTML = '';  // Limpia los resultados previos

      if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
      }

      let row = document.createElement('div');
      row.className = 'row row-cols-1 row-cols-md-3 g-4';

      items.forEach(item => {
        const imageUrl = item.links && item.links[0] ? item.links[0].href : '';
        const title = item.data && item.data[0] ? item.data[0].title : 'Sin título';
        const description = item.data && item.data[0] ? item.data[0].description : 'Sin descripción';
        const date = item.data && item.data[0] ? item.data[0].date_created : 'Fecha no disponible';

        // Crear la tarjeta con barra de desplazamiento en la descripción
        const card = `
          <div class="col">
            <div class="card h-100">
              <img src="${imageUrl}" class="card-img-top" alt="${title}" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <div class="card-text" style="max-height: 100px; overflow-y: auto;">
                  ${description}
                </div>
              </div>
              <div class="card-footer">
                <small class="text-muted">${date}</small>
              </div>
            </div>
          </div>
        `;

        row.innerHTML += card;
      });

      contenedor.appendChild(row);
    })
    .catch(error => {
      console.error('Error al obtener los datos de la API:', error);
      alert('Ocurrió un error al obtener las imágenes. Inténtalo de nuevo más tarde.');
    });
});
