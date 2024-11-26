// JavaScript Document

// Tiempo de inactividad permitido antes de cerrar sesión (en milisegundos)
//const INACTIVITY_TIME_LIMIT = 1 * 60 * 1000; // 1 minuto prueba
const INACTIVITY_TIME_LIMIT = 3 * 60 * 1000; // 3 minutos
//const INACTIVITY_TIME_LIMIT = 5 * 60 * 1000; // 5 minutos

let inactivityTimer;

// Reiniciar el temporizador cuando se detecte actividad
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, INACTIVITY_TIME_LIMIT);
}

// Cerrar sesión si no hay actividad
function logoutUser() {
    alert('Cerrando sesión por inactividad.');
    firebase.auth().signOut().then(() => {
        // Redirigir a la página de login después de cerrar la sesión
        window.location.href = "login.html"; 
    }).catch((error) => {
        console.error('Error cerrando sesión: ', error);
    });
}

// Escuchar eventos de actividad del usuario
function iniciarInactividad() {
    window.onload = resetInactivityTimer;
    document.onmousemove = resetInactivityTimer;
    document.onkeypress = resetInactivityTimer;
    document.ontouchstart = resetInactivityTimer;
}

