
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
//Create Iframe
const containerIframe = document.getElementById('container');
//Input Clear
const clearInput = document.querySelector('.clear');

//Select 300x250 and active check
let ch = document.querySelector('[value="300x250"]');


//Prevent 
function preventForm(e) {
    e.preventDefault();
    //Validacion de url
    if (inputClear.value != '' & expresion.test(inputClear.value) == true) {

        urlClearValue.splice(0, 1)
        urlClearValue.push(inputClear.value)
        overlay.style.display = 'none';
        msjError.style.opacity = 0;
        msjError.style.visibility = 'hidden'
        inputClear.style.border = '2px solid green';
        //Llamad a la función checked

        activeCheckedBasicFormat(urlClearValue)
    } else if (inputClear.value === '' || expresion.test(inputClear.value) == false) {
        msjError.style.opacity = 1;
        msjError.style.visibility = 'visible'
        overlay.style.display = 'block';
        inputClear.style.border = '2px solid red';
    }
}

//Value Input
let urlClearValue = [];
if (urlClearValue != '') {
    console.log(urlClearValue, 'valor')
}



//Funcion active 300x250
function activeCheckedBasicFormat(urlClearValue) {
    let urlReplace = urlClearValue[0].replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    let nuevaUrl = urlReplace.replace(expresion, '300x250');
    const canvas = document.getElementById('canvas').src = nuevaUrl
    ch.checked = true;
    ch.parentElement.setAttribute('class', 'active-list');

}

//Set Atributos
function setArrt(target, atributos) {
    for (const key in atributos) {
        target.setAttribute(key, atributos[key])
    }
}




let text;
//Limpiar url

// console.log(urlClearValue)
function limpiarUrl(formato) {
    let urlReplace = urlClearValue[0].replace('s3.portal-posventa.com/media-planning', 'media-planning.pre.peugeot.es');
    let nuevaUrl = urlReplace.replace(expresion, formato);
    let span = document.createElement('span');
    let aLink = document.createElement('a');
    span.id = formato;
    setArrt(aLink, { href: nuevaUrl, target: '_blank', class: 'url-preview' })
    span.appendChild(aLink);
    aLink.textContent = nuevaUrl;
    code.appendChild(span);
    text = document.querySelectorAll('pre span')

    //urlOk(nuevaUrl)
}

//Copiar Contenido
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

}




//URL ok
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



//Btn Ordenar Lista
function btnOrder() {
    // arrForm.push('300x250');
    ch.checked = true;
    btnOrderList.addEventListener('click', () => {
        code.innerHTML = '';
        for (let i = 0; i < arrForm.length; i++) {
            limpiarUrl(arrForm[i])

            counter.innerHTML = arrForm.length
            console.log(arrForm[i])
        }


    })
}
btnOrder()


// activeBasicFormat()

//Selecionar List Check
const listCheck = document.querySelectorAll('.content-check input');
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
            let remove = document.getElementById(e.target.value).remove();

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

//Seleccionar todas las url-preview
function urlPreview() {
    const urlsPreview = document.querySelectorAll('.pre span');
    let arrLink = Array.from(urlsPreview).sort()
    console.log(arrLink)
}

function limpiarInput() {
    inputClear.value = '';
}

function actionSendBtn() {
    setTimeout(() => { btnClear.textContent = 'Enviar Url' }, 1000)
    btnClear.textContent = 'Url Enviada';
}

btnReset.addEventListener('click', btnRefresh)


//Event Listener
btnClear.addEventListener('click', actionSendBtn)

clearInput.addEventListener('click', limpiarInput)

btnCopy.addEventListener('click', copiarContenido);

formClear.addEventListener('submit', preventForm);

//children[0].children[0].width