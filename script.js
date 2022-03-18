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












const formClear = document.getElementById('form-clear-url');
const inputClear = document.getElementById('input-clear');
const pre = document.getElementById('pre');
let expresion = /\b\d\d\d\w\d\d\d\b|\b\d\d\d\w\d\d\b/g;
const overlay = document.querySelector('.overlay');
let counter = document.querySelector('.counter');
const msjError = document.querySelector('.error');
const btnOrderList = document.getElementById('ordenar-lista');
//let arrForm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let arrForm = [];
//Prevent 
function preventForm(e) {
    e.preventDefault();
    //Validacion de url
    if (inputClear.value != '' & expresion.test(inputClear.value) == true) {
        overlay.style.display = 'none';
        msjError.style.opacity = 0;
        msjError.style.visibility = 'hidden'
    } else if (inputClear.value === '' || expresion.test(inputClear.value) == false) {
        msjError.style.opacity = 1;
        msjError.style.visibility = 'visible'
        overlay.style.display = 'block';
    }
}

//Limpiar url
function limpiarUrl(formato, numIndex) {
    let urlClearValue = inputClear.value;
    let urlReplace = urlClearValue.replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    let nuevaUrl = urlReplace.replace(expresion, formato);
    // textAreaUrl.value += `${nuevaUrl}\n`
    let span = document.createElement('span');
    let aLink = document.createElement('a');
    span.id = formato;
    span.appendChild(aLink);
    aLink.setAttribute('href', nuevaUrl)
    aLink.setAttribute('target', '_blank')
    aLink.setAttribute('class', 'url-preview')
    aLink.textContent = nuevaUrl;
    pre.appendChild(span);
    // arrForm.push(formato);
    // arrForm.sort()
    // arrForm.splice(numIndex, 1, span);
    // console.log(arrForm)
}


//Btn Ordenar Lista
function btnOrder() {
    btnOrderList.addEventListener('click', () => {
        pre.innerHTML = '';
        for (let i = 0; i < arrForm.length; i++) {
            limpiarUrl(arrForm[i])
        }

    })
}
btnOrder()

//Selecionar List Check
const listCheck = document.querySelectorAll('.content-check input');
listCheck.forEach((check, indice) => {

    check.addEventListener('change', (e) => {
        //console.log(indice)

        if (e.target.checked) {
            let formatoCheck = e.target.value
            counter.innerHTML++
            //Check
            arrForm.push(formatoCheck);
            arrForm.sort()
            limpiarUrl(formatoCheck, indice)

        } else if (e.target.checked === false) {
            counter.innerHTML--
            let removeUrl = document.getElementById(e.target.value).remove();
        }

    })
})

//Seleccionar todas las url-preview
function urlPreview() {
    const urlsPreview = document.querySelectorAll('.pre span');
    let arrLink = Array.from(urlsPreview).sort()
    console.log(arrLink)
}
//urlPreview()

formClear.addEventListener('submit', preventForm);