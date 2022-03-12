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
// form.addEventListener('submit', generarUrl);

//Función copiar
function copiarUrl() {
    textAreaUrl.select();
    document.execCommand("copy");
    // btnCopy.textContent = "Copiado!!";
    // setTimeout(() => {
    //     btnCopy.textContent = "Copiar";
    // }, 1000)
}
// btnCopy.addEventListener('click', copiarUrl);

//Generar Pila
function generarPila(url) {
    console.log(url)
    let indexFormato = url.split('x');
    console.log(indexFormato)
}










//Validar y limpiar URL
function preventForm(e) {
    e.preventDefault();
}

const formClear = document.getElementById('form-clear-url');
const inputClear = document.getElementById('input-clear');
const textAreaUrl = document.getElementById('textarea-url');
let expresion = /\b\d\d\d\w\d\d\d\b|\b\d\d\d\w\d\d\b/g;
//Limpiar url
function limpiarUrl(formato) {
    let urlClearValue = inputClear.value;
    let urlReplace = urlClearValue.replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    let nuevaUrl = urlReplace.replace(expresion, formato);
    textAreaUrl.value += `${nuevaUrl}\n`
    if (textAreaUrl.value !== '') {
        //Me sirve el metodo test()
        //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        console.log(textAreaUrl.value.match(expresion))

    }
}

//Selecionar List Check
const listCheck = document.querySelectorAll('.content-check input');

listCheck.forEach((check) => {
    check.addEventListener('change', (e) => {
        // console.log(e.target.id)

        if (e.target.checked) {
            let formatoCheck = e.target.value
            limpiarUrl(formatoCheck)

        } else if (e.target.checked == false) {
            let valueTextarea = textAreaUrl.value
            let expresionInicioFinal = /[httpshtml]/.test(valueTextarea)

            console.log(expresionInicioFinal)
            textAreaUrl.focus();
            let range = textAreaUrl.setSelectionRange(0, 10)
            console.log(range)
            // copiarUrl()
        } else {

        }


    })
})

formClear.addEventListener('submit', preventForm);