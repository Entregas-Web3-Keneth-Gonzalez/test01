// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('id');  // Obtener el document ID desde la URL

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const txtArchi = document.querySelector('#txtArchi');
const btnUpdate = document.querySelector('#btnUpdate');

// Cargar los datos del signo por su document ID
db.collection("datosZodiaco").doc(docId).get().then(function (doc) {
    if (doc.exists) {
        const data = doc.data();
        // Llenar los campos con los valores existentes
        txtPosic.value = data.posic || '';
        txtSigno.value = data.signo || '';
        txtRango.value = data.rango || '';
        txtElemento.value = data.elemento || '';  
        txtAstro.value = data.astro || '';
        txtPiedra.value = data.piedra || '';
    } else {
        alert("No se encontró el signo con ese ID.");
    }
}).catch(function (error) {
    console.error("Error obteniendo el documento: ", error);
    alert("Error al obtener los datos: " + error.message);
});

// Actualizar los datos del signo, incluyendo la imagen si es que fue seleccionada
btnUpdate.addEventListener('click', function() {
    const archivo = txtArchi.files[0];  // Obtener el archivo seleccionado
    if (archivo) {
        const nomarch = archivo.name;
        const metadata = { contentType: archivo.type };
        const subir = container.child('zodiaco/' + nomarch).put(archivo, metadata);

        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                // Una vez subida la imagen, actualizar los datos con la nueva URL
                actualizarDatos(url);
            })
            .catch(error => {
                console.error("Error al subir la imagen: ", error);
                alert("Error al subir la imagen: " + error);
            });
    } else {
        // Si no se seleccionó imagen, se actualizan los datos sin cambiar la URL
        actualizarDatos();
    }
});

// Función para actualizar los datos en Firestore
function actualizarDatos(url = null) {
    // Preparar los datos para actualizar
    let updateData = {
        "posic": parseInt(txtPosic.value),
        "signo": txtSigno.value,
        "rango": txtRango.value,
        "elemento": txtElemento.value,
        "astro": txtAstro.value,
        "piedra": txtPiedra.value
    };

    // Si hay una nueva imagen, también se actualiza el campo URL
    if (url) {
        updateData["url"] = url;
    }

    // Actualizar los datos del documento en Firestore usando el document ID
    db.collection("datosZodiaco").doc(docId).update(updateData)
        .then(() => {
            alert("Signo actualizado correctamente.");
            window.location.href = "lista.html";  // Redirigir a la lista después de la actualización
        })
        .catch((error) => {
            console.error("Error al actualizar el documento: ", error);
            alert("Error al actualizar el signo: " + error.message);
        });
}

// Eliminar el signo y su imagen
btnDelete.addEventListener('click', function() {
    if (confirm("¿Estás seguro de que deseas eliminar este signo?")) {
        // Obtener el documento de Firestore para verificar si hay una URL de imagen
        db.collection("datosZodiaco").doc(docId).get().then(function(doc) {
            if (doc.exists) {
                const imageUrl = doc.data().url;  // Obtén la URL de la imagen desde el documento
                // Eliminar el documento en Firestore
                db.collection("datosZodiaco").doc(docId).delete()
                    .then(() => {
                        // Si hay una imagen asociada, eliminarla del Storage
                        if (imageUrl) {
                            console.log("Intentando eliminar imagen de Storage: " + imageUrl);
                            const imageRef = firebase.storage().refFromURL(imageUrl);
                            imageRef.delete()
                                .then(() => {
                                    alert("Signo y su imagen eliminados correctamente.");
                                    window.location.href = "lista.html";  // Redirigir a la lista
                                })
                                .catch(error => {
                                    console.error("Error al eliminar la imagen: ", error);
                                    alert("Error al eliminar la imagen: " + error.message);
                                });
                        } else {
                            alert("Signo eliminado correctamente. No había imagen asociada.");
                            window.location.href = "lista.html";  // Redirigir a la lista
                        }
                    })
                    .catch((error) => {
                        console.error("Error al eliminar el signo: ", error);
                        alert("Error al eliminar el signo: " + error.message);
                    });
            } else {
                alert("No se encontró el signo para eliminar.");
            }
        }).catch((error) => {
            console.error("Error obteniendo el documento: ", error);
            alert("Error al obtener los datos del signo: " + error.message);
        });
    }
});

