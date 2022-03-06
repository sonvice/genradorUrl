const inputAnio = document.getElementById('anio');
const inputMes = document.getElementById('mes');
const inputCampania = document.getElementById('campania');
const inputNombrePieza = document.getElementById('nombre-pieza');
const form = document.getElementById('form');
const btnGenerarUrl = document.getElementById('get-url');
const inputCopy = document.getElementById('input-copy');
const btnCopy = document.getElementById('btn-copy');
const btnGenrarPila = document.getElementById('urls');
//Formatos
let arrFormatos = []

//Generar URL
function generarUrl(e) {
    e.preventDefault();
    let valueAnio = inputAnio.value
    let valueMes = inputMes.value
    let valueCampania = inputCampania.value
    let valueNombrePieza = inputNombrePieza.value
    let select = document.getElementById('select');
    // function selecFormat() {
    let indexOption = select.options[select.selectedIndex].value
    console.log(indexOption)
    let urlGenerada = `https://media-planning.pre.peugeot.es/${valueAnio}/${valueMes}/${valueCampania}/${indexOption}${valueNombrePieza}/${indexOption}${valueNombrePieza}.html`;

    inputCopy.value = urlGenerada

    async function urlOk(inputCopy) {
        const respuesta = await fetch(inputCopy);
        try {
            if (respuesta.ok) {
                console.log('url Ok.')
            } else {
                console.log('Respuesta de red OK pero respuesta HTTP no OK');
            }

        }
        catch (err) {

        }
    }
    urlOk();
}
form.addEventListener('submit', generarUrl);

//Función copiar
function copiarUrl() {
    inputCopy.select();
    document.execCommand("copy");
    btnCopy.textContent = "Copiado!!";
    setTimeout(() => {
        btnCopy.textContent = "Copiar";
    }, 1000)
}
btnCopy.addEventListener('click', copiarUrl);

//Generar Pila
function generarPila(url) {
    console.log(url)
    let indexFormato = url.split('x');
    console.log(indexFormato)
}


