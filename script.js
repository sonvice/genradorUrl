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

//Validar y limpiar URL
const formClear = document.getElementById('form-clear-url');
const inputClear = document.getElementById('input-clear');
const textAreaUrl = document.getElementById('textarea-url');
function limpiarUrl(e) {
    e.preventDefault();
    let urlClearValue = inputClear.value;
    let urlReplace = urlClearValue.replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    textAreaUrl.value = urlReplace
    console.log(urlReplace)
    let expresion = /\b\d\d\d\w\d\d\d\b/g;
    let encontrado = urlReplace.replace(expresion, '970x250');
    console.log(encontrado)


}

formClear.addEventListener('submit', limpiarUrl);

//Selecionar List Check
const listCheck = document.querySelectorAll('.content-check input');

listCheck.forEach((check) => {
    check.addEventListener('change', (e) => {
        console.log(e)
    })
})