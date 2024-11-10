
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

//detectar el tipus de calculadora activa i retorna la pantalla de la
//calculadora activa, tant de pantalla operacions com de pantalla missatges
function getPantallaOperacio() {
    if (document.getElementById("calculadoraDecimals").style.display === "block") {
        return document.getElementById("pantallaOperacioDecimals");
    } else if (document.getElementById("calculadoraCientifica").style.display === "block") {
        return document.getElementById("pantallaOperacioCientifica");
    } else {
        return document.getElementById("pantallaOperacio");
    }
}

function getPantallaMissatges() {
    if (document.getElementById("calculadoraDecimals").style.display === "block") {
        return document.getElementById("pantallaMissatgesDecimals");
    } else if (document.getElementById("calculadoraCientifica").style.display === "block"){
        return document.getElementById("pantallaMissatgesCientifica");
    } else {
        return document.getElementById("pantallaMissatges");
    }
}




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
        } else if (tipusCalculadora === 'cientifica') {
            mostrarCalculadoraCientifica();
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
    document.getElementById('calculadoraDecimals').style.display = 'none';
}

// Mostrar la calculadora decimal
function mostrarCalculadoraDecimal() {
    document.getElementById('calculadoraNormal').style.display = 'none';
    document.getElementById('calculadoraDecimals').style.display = 'block';
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
let operand1 = "";
let operand2 = "";
let operador = "";

const MAXDIGITS = 5;

//Agafem el valor de la pantalla. Cada cop que l'usuari introdueixi un número
//aquesta pantalla s'haurà d'actualitzar.
function actualitzarPantalla() {
    const pantallaOperacio = getPantallaOperacio();
    const pantallaMissatges = getPantallaMissatges();
    pantallaOperacio.value = operand1 + operador + operand2;
    pantallaMissatges.value = "";
}

//Es crea una funció afegir número per a que es vagin concatennant
//fins a un màxim de 5 dígits abans de fer l'operació
//Aquesta funció necessita un paràmetre perquè és el valor que es passarà
//segons la tecla que cliqui l'usuari
function afegirNumero(num) {
    // Comprovem si estem amb operand1 o operand2
    if (operador === "") {
        // Si no hi ha operador, estem treballant amb operand1
        if (operand1.length < MAXDIGITS) {
            operand1 = operand1 + num; // concatenem
            actualitzarPantalla(); // Actualitzem la pantalla
        } else {
            document.getElementById("pantallaMissatges").value = "Màxim 5 dígits";
        }
    } else {
        // Si hi ha un operador, estem treballant amb operand2
        if (operand2.length < MAXDIGITS) {
            operand2 = operand2 + num; // concatenem
            actualitzarPantalla(); // Actualitzem la pantalla amb operand2
        } else {
            document.getElementById("pantallaMissatges").value = "Màxim 5 dígits";
        }
    }
}

//funcio per esborrar l'últim número afegit
function esborrarUltimNumero() {
    if (operador === "") {
        //Elimina l'últim caràcter de operand1
        //slice s'utilitza per aconseguir una part d'una cadena
        //(Inici, fi), on fi és l'element que volem treure
        //per aquest motiu és -1
        operand1 = operand1.slice(0, -1);
    } else {
        //Elimina l'últim caràcter de operand2
        operand2 = operand2.slice(0, -1);
    }
    //Actualitzem la pantalla per reflectir els canvis
    actualitzarPantalla();
}


//Funció per definir l'operador escollit per l'usuari
//com que l'operador és el que tria l'usuari, s'haurà de passar per paràmetre
function definirOperador(simbol){
    //només ens guardarem l'perador si tenim introduit el primer operand
    if(operand1 !==""){
        operador=simbol;
        //ara actualitzem pantalla i guarda l'operador
        actualitzarPantalla();
    }
} 

//funció per calcular el resultat de les operacions
//Aquesta funció ens servirà igual èr la calculadora en decimal
//perquè convertim a float i d'aquesta manera ens accepta els decimals
function calcularResultat(){
    let resultat;
    const NUM1 = parseFloat(operand1);
    const NUM2 = parseFloat(operand2);

    //segons el símbol que ens arribi farem o una opració o una altra
    //com tant operador1 com operador2 i operador són variables globals,
    //les detecta dins de la funció.

    switch (operador) {
        case "+":
            resultat = NUM1 + NUM2;
            break;
        case "-":
            resultat = NUM1 - NUM2;
            break;
        case "*":
            resultat = NUM1 * NUM2;
            break;
        case "/":
            resultat = NUM1 / NUM2;
            break;
    
        default:
            resultat = "Hi ha un error";
            break;
    }

    //un cop fet el calcul mostrem el resultat a pantalla amb:
    //si guardem el resultat a operand1, amb la funció actualitzar pantalla,
    //es mostrarà a la pantalla
    operand1 = resultat.toString();
    //un cop feta l'opreació, s'ha d'actualitzar els valors de operand2 i
    //operador a que no tinguin valor
    operand2 = "";
    operador = "";
    actualitzarPantalla();

}

//fem la funció per esborrar el contingut de la pantalla
//quan l'usuari activa el botó C
function esborrarPantalla(){
    operand1="";
    operand2="";
    operador="";
    actualitzarPantalla();
}






