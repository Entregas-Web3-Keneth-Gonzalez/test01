// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad  = document.querySelector('#btnLoad');
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const urlParams = new URLSearchParams(window.location.search);//Accede a la uri
const docId = urlParams.get('docId');//Sacamos el id de la coleccion seleccionada

btnLoad.addEventListener('click', function(){
     alert("ID del registro: ")
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        alert('Debe seleccionar una imagen');
    }else{
        const metadata = {
            contentType : archivo.type
        }
        //mismo codigo de insertar pero usando update y pasando el docid
        const subir = container.child('zodiaco/'+nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then( url =>{
                db.collection("datosZodiaco").doc(docId).update({
                    "posic" : parseInt(txtPosic.value),
                    "signo" : txtSigno.value,
                    "rango" : txtRango.value,
                    "elemento" : txtElemento.value,
                    "astro" : txtAstro.value,
                    "piedra" : txtPiedra.value,
                    "url"   : url
                }).then(function(docRef) {
                    alert("REGISTRO ACTUALIZADO, ID del registro: " + docId);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
            });
    }
});

function limpiar(){
    txtPosic.value = ''
    txtSigno.value = '';
    txtRango.value = '';
    txtArchi.value = '';
    txtElemento.value = '';
    txtPiedra.value = '';
    txtAstro.value = '';
    txtPosic.focus();
}

