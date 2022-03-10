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
//Limpiar url
function limpiarUrl(formato) {
    let urlClearValue = inputClear.value;
    let urlReplace = urlClearValue.replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    // textAreaUrl.value = urlReplace
    // console.log(urlReplace)
    let expresion = /\b\d\d\d\w\d\d\d\b/g;
    let nuevaUrl = urlReplace.replace(expresion, formato);
    textAreaUrl.value += `${nuevaUrl}`
    console.log(nuevaUrl)
}


function preventForm(e) {
    e.preventDefault();

}

formClear.addEventListener('submit', preventForm);

//For de list Format
let arrFormat = ['300x250', '300x250'];




//Selecionar List Check
const listCheck = document.querySelectorAll('.content-check input');

listCheck.forEach((check) => {
    check.addEventListener('change', (e) => {

        for (let i = 0; i < arrFormat.length; i++) {

            // console.log(arrFormat)
        }

        if (e.target.checked === true) {
            let formatoCheck = e.target.value
            limpiarUrl(formatoCheck)
            arrFormat.push(e.target.value)
            // console.log(arrFormat)
        } else {

        }


    })
})

