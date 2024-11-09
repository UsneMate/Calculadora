
//funcions per recordar la pàgina anterior i la pàgina següent
function goBack() {
    window.history.back();
}

function goForward() {
    window.history.forward();
}

// Obtenir i mostrar la informació del navegador
function mostraInformacioNavegador() {
    // cridem a la funció detectar navegador i la guardem en una variable
    const navegador = detectaNavegador();

    // Assignació d'informació a cada element
    document.getElementById("navegador").textContent = `Navegador Utilitzat: ${navegador.nom}`;
    document.getElementById("versioNavegador").textContent = `Versió del Navegador: ${navegador.versio}`;
    document.getElementById("sistemaOperatiu").textContent = `Sistema Operatiu: ${detectaSistemaOperatiu()}`;
    document.getElementById("dataModificacio").textContent = `Data de darrera modificació: ${document.lastModified}`;
    document.getElementById("idioma").textContent = `Idioma: ${navigator.language}`;
    document.getElementById("hostname").textContent = `URL: ${window.location.hostname}`;
}

// Funció per detectar el navegador i la seva versió
function detectaNavegador() {
    const agent = navigator.userAgent;
    let nom = "Desconegut";
    let versio = "Desconeguda";

    if (agent.indexOf("Edg") > -1) {
        nom = "Microsoft Edge";
        versio = agent.match(/Edg\/([0-9.]+)/)[1];
    } else if (agent.indexOf("Chrome") > -1 && agent.indexOf("Safari") > -1) {
        nom = "Google Chrome";
        versio = agent.match(/Chrome\/([0-9.]+)/)[1];
    } else if (agent.indexOf("Safari") > -1 && agent.indexOf("Chrome") === -1) {
        nom = "Apple Safari";
        versio = agent.match(/Version\/([0-9.]+)/)[1];
    } else if (agent.indexOf("Opera") > -1 || agent.indexOf("OPR") > -1) {
        nom = "Opera";
        versio = agent.match(/OPR\/([0-9.]+)/)[1];
    } else if (agent.indexOf("Firefox") > -1) {
        nom = "Mozilla Firefox";
        versio = agent.match(/Firefox\/([0-9.]+)/)[1];
    } else if (agent.indexOf("MSIE") > -1 || agent.indexOf("Trident") > -1) {
        nom = "Microsoft Internet Explorer";
        versio = agent.match(/(?:MSIE |rv:)([0-9.]+)/)[1];
    }

    return { nom, versio };
}

// Funció per detectar el sistema operatiu
function detectaSistemaOperatiu() {
    const agent = navigator.userAgent;

    if (agent.indexOf("Win") > -1) return "Windows";
    if (agent.indexOf("Mac") > -1) return "MacOS";
    if (agent.indexOf("X11") > -1 || agent.indexOf("Linux") > -1) return "Linux";
    if (agent.indexOf("Android") > -1) return "Android";
    if (agent.indexOf("like Mac") > -1 && agent.indexOf("Mobile") > -1) return "iOS";

    return "Desconegut";
}

// Executa la funció mostraInformacioNavegador quan la pàgina està carregada
window.onload = mostraInformacioNavegador;




//variables i codi per gestionar configuració calculadora i usuari
// Guardar configuració a localStorage
function guardarConfiguracio() {
    const nomUsuari = document.getElementById('nomUsuari').value;
    const tipusCalculadora = document.getElementById('tipusCalculadora').value;

    if (nomUsuari && tipusCalculadora) {
        // Guardar la configuració a localStorage
        localStorage.setItem('nomUsuari', nomUsuari);
        localStorage.setItem('tipusCalculadora', tipusCalculadora);

        // Mostrar el nom d'usuari a la barra de botons
        document.getElementById('MostrarNomUsuari').textContent = `Nom d'Usuari: ${nomUsuari}`;

        // Actualitzar el tipus de calculadora
        if (tipusCalculadora === 'decimal') {
            mostrarCalculadoraDecimal();
        } else {
            mostrarCalculadoraNormal();
        }
    } else {
        alert('Si us plau, omple tots els camps.');
    }
}

// Carregar la configuració des de localStorage quan es carrega la pàgina
window.onload = function() {
    const nomUsuari = localStorage.getItem('nomUsuari');
    const tipusCalculadora = localStorage.getItem('tipusCalculadora');

    if (nomUsuari) {
        document.getElementById('MostrarNomUsuari').textContent = `Nom d'Usuari: ${nomUsuari}`;
        document.getElementById('nomUsuari').value = nomUsuari;
    }

    if (tipusCalculadora) {
        document.getElementById('tipusCalculadora').value = tipusCalculadora;

        if (tipusCalculadora === 'decimal') {
            mostrarCalculadoraDecimal();
        } else {
            mostrarCalculadoraNormal();
        }
    }
};

// Mostrar la calculadora normal
function mostrarCalculadoraNormal() {
    document.getElementById('calculadoraNormal').style.display = 'block';
    document.getElementById('calculadoraDecimal').style.display = 'none';
}

// Mostrar la calculadora decimal
function mostrarCalculadoraDecimal() {
    document.getElementById('calculadoraNormal').style.display = 'none';
    document.getElementById('calculadoraDecimal').style.display = 'block';
}

// Funció per esborrar la configuració
function esborrarConfiguracio() {
    // Esborrar les dades de localStorage
    localStorage.removeItem('nomUsuari');
    localStorage.removeItem('tipusCalculadora');

    // Restablir la interfície
    document.getElementById('MostrarNomUsuari').textContent = 'Nom d\'Usuari: ';
    document.getElementById('nomUsuari').value = '';
    document.getElementById('tipusCalculadora').value = 'normal';

    // Mostrar la calculadora normal per defecte
    mostrarCalculadoraNormal();
}

//Funcions i codi per fer la lógica de la calculadora
let operandActual="";
let operacio="";

const MAXDIGITS = 5;

//Agafem el valor de la pantalla




