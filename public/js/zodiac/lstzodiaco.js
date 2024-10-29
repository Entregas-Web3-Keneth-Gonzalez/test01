var db = firebase.apps[0].firestore();

			const tabla = document.querySelector('#tabla');

			db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query){
				tabla.innerHTML="";
				var salida = "";
				
				query.forEach(function(doc){
					const id = doc.id;
					salida += '<div class="divAnuncio m-3" style="cursor: pointer;" data-id="' + id + '">'
						salida += '<div class="imgBlock"><img src="' + doc.data().url +'" width="100%" /></div>'
						salida += '<div>'+ doc.data().signo + '<br/>'+ doc.data().rango +
						'<br/>'+ doc.data().elemento + '<br/>'+ doc.data().piedra + '<br/>'+ doc.data().astro +
						
						'</div><br/>'
					salida += '</div>'
				})
				tabla.innerHTML = salida;
				const divs = document.querySelectorAll('.divAnuncio');

				// Agregamos el evento click a cada tarjeta
				divs.forEach((div) => {
					div.addEventListener('click', function() {
						const docId = this.getAttribute('data-id'); 
						editarSigno(docId);
						
					});
				});
			
			})

function editarSigno(docId) {
	// vamos a updhtml y en la uri el id 
	window.location.href = `Updzodiac.html?docId=${docId}`;
}