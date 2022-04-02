
//const btnCopy = document.getElementById('btn-copy');
const formClear = document.getElementById('form-clear-url');
const inputClear = document.getElementById('input-clear');
const pre = document.getElementById('pre');
const code = document.querySelector('code')
const containerFormatos = document.getElementById('container');
let expresion = /\b\d\d\d\w\d\d\d\b|\b\d\d\d\w\d\d\b/g;
const overlay = document.querySelector('.overlay');
let counter = document.querySelector('.counter');
const msjError = document.querySelector('.error');
const btnOrderList = document.getElementById('ordenar-lista');
const btnCopy = document.getElementById('icon-copy');
const btnClear = document.getElementById('btn-clear');
const btnReset = document.getElementById('reset');
let arrForm = ['300x250'];
const btnboxCopy = document.querySelector('.boxbtn-copy');
//Create Iframe
const containerIframe = document.getElementById('container');
//Input Clear
const clearInput = document.querySelector('.clear');

//Select 300x250 and active check
let ch = document.querySelector('[value="300x250"]');


//Función para comprobar si la url es valida y añadir estilos según sea el caso
let contador = 0;
function preventForm(e) {
    e.preventDefault();
    //Validacion de url
    if (inputClear.value !== '' & expresion.test(inputClear.value) == true) {


        setTimeout(() => { btnClear.textContent = 'Enviar Url' }, 1000)
        btnClear.textContent = 'Url Enviada';

        contador += 1;
        urlClearValue.splice(0, 1)
        urlClearValue.push(inputClear.value)
        overlay.style.display = 'none';
        msjError.style.opacity = 0;
        msjError.style.visibility = 'hidden'
        inputClear.style.border = '2px solid green';
        //Llamad a la función checked
        console.log(contador)
        if (contador === 1) {
            counter.innerHTML = 1;
            limpiarUrl('300x250');
        }
        activeCheckedBasicFormat(urlClearValue)
    } else if (inputClear.value === '' || expresion.test(inputClear.value) === false) {
        msjError.style.opacity = 1;
        msjError.style.visibility = 'visible'
        overlay.style.display = 'block';
        inputClear.style.border = '2px solid red';
    }
}

//Recoge el valor del input que contiene la url
let urlClearValue = [];



//Funcion para activar el formato 300x250
function activeCheckedBasicFormat(urlClearValue) {
    let urlReplace = urlClearValue[0].replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    let nuevaUrl = urlReplace.replace(expresion, '300x250');
    const canvas = document.getElementById('canvas').src = nuevaUrl
    ch.checked = true;
    ch.parentElement.classList.add('active-list');
}

//Set Atributos
function setArrt(target, atributos) {
    for (const key in atributos) {
        target.setAttribute(key, atributos[key])
    }
}




let text;
//Limpiar url
function limpiarUrl(formato) {
    let urlReplace = urlClearValue[0].replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    let nuevaUrl = urlReplace.replace(expresion, formato);
    let span = document.createElement('span');
    let aLink = document.createElement('a');
    //span.id = formato;
    setArrt(span, { 'data-id': formato })
    setArrt(aLink, { href: nuevaUrl, target: '_blank', class: 'url-preview' })
    span.appendChild(aLink);
    aLink.textContent = nuevaUrl;
    code.appendChild(span);
    text = document.querySelectorAll('pre span')

    //urlOk(nuevaUrl)
}

//Función para copiar las url
let tooltip = document.getElementById('tooltip')
function copiarContenido() {
    let links = Array.from(text);
    let texto = '';
    for (let i = 0; i < links.length; i++) {
        let element = links[i].textContent;
        texto += `${element}\n`
    }

    navigator.clipboard.writeText(texto).then(function () {
    }, function () {
        console.log('Falla copia')
    });

    tooltip.textContent = 'Copiado!!'
}

//Función que al salir el cursor del elemento inserta un texto
function textTooltip() {
    tooltip.textContent = 'Copiar';
}



//Verifica en el server si el formato y su url existen
async function urlOk(url) {
    const respuesta = await fetch(url);
    console.log(respuesta.status)
    try {
        if (respuesta.status == 200) {
            console.log('url Ok.')
        } else {
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }

    }
    catch (err) {
        console.log(err)
    }
}



//Funcion para ordenar la lista de links de menor a mayor
function btnOrder() {
    ch.checked = true;
    btnOrderList.addEventListener('click', () => {
        code.innerHTML = '';
        for (let i = 0; i < arrForm.length; i++) {
            limpiarUrl(arrForm[i])
            counter.innerHTML = arrForm.length
        }

    })
}
btnOrder()



//Selecionar lista de ckeckbox
const listCheck = document.querySelectorAll('.content-check input');
const contentCheck = document.querySelector('.content-check')
ch.disabled = true;
listCheck.forEach((check, indice) => {

    check.addEventListener('change', (e) => {
        //console.log(indice)
        if (e.target.checked) {

            let formatoCheck = e.target.value
            e.target.parentNode.classList.add('active-list');
            counter.innerHTML++
            //Check
            arrForm.push(formatoCheck);
            arrForm.sort()

            //Width and Height canvas

            limpiarUrl(formatoCheck)

        } else if (e.target.checked === false) {

            counter.innerHTML--
            //Remueve el link preview
            let remove = document.querySelectorAll('code span')
            remove.forEach((el) => {
                if (e.target.value === el.dataset.id) {
                    el.remove()
                }
            })

            e.target.parentNode.classList.remove('active-list');
            //Posición del nuevo array
            let indexNewArr = arrForm.indexOf(e.target.value);
            arrForm.splice(indexNewArr, 1)

        }

    })
})

//Btn Refresh
function btnRefresh() {
    location.reload()
}


function limpiarInput() {
    inputClear.value = '';
}





//Event Listener
btnReset.addEventListener('click', btnRefresh)



clearInput.addEventListener('click', limpiarInput)

btnCopy.addEventListener('click', copiarContenido);

formClear.addEventListener('submit', preventForm);

btnboxCopy.addEventListener('mouseout', textTooltip)