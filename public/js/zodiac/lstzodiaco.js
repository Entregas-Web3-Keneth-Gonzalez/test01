var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function (query) {
    tabla.innerHTML = "";
    var salida = "";
    query.forEach(function (doc) {
        const data = doc.data();
        const docId = doc.id;  // Obtener el document ID

        salida += '<div class="divAnuncio m-3" onclick="location.href=\'editar.html?id=' + docId + '\'">'
        salida += '<div class="imgBlock"><img src="' + doc.data().url + '" width="100%" /></div>'
        salida += '<div>' + doc.data().signo + '<br/>' + doc.data().rango + '</div>'
        salida += '<div>Elemento: ' + doc.data().elemento + '</div>'
        salida += '<div>Astro: ' + doc.data().astro + '</div>'
        salida += '<div>Piedra: ' + doc.data().piedra + '</div>'
        salida += '</div>'
    })
    tabla.innerHTML = salida;
})