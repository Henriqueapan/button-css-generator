const controls = document.querySelector('#controls'),
cssText = document.querySelector('.css'),
btn = document.querySelector('.btn'),
dinamic = document.querySelectorAll('#controls input[type="range"], #controls input[type="color"]'),
reset_button = document.getElementById('reset-btn'),
copy_button = document.getElementById('copy-btn');

window.onload = () => {
    setValues()
    updateCssText()
}

reset_button.onclick = () => {
    if (window.confirm("Tem certeza de que quer reiniciar as configurações do botão? Clique em OK para confirmar."))
        localStorage.clear()
        location.reload()
}

copy_button.onclick = () => {
    temp_input = document.createElement('textarea')
    temp_input.value = cssText.innerText
    document.body.appendChild(temp_input)
    temp_input.select()
    document.execCommand("Copy");
    document.body.removeChild(temp_input)
    window.alert("CSS copiado para a área de transferência!")
}

controls.addEventListener('change', handleChange)
dinamic.forEach(i => i.addEventListener('input', handleChange))

const styleUpdater = {
    element: btn,
    innerText(value) {
        if (value === '') {
            this.element['innerText'] = 'Clique';
            return
        }
        this.element['innerText'] = value
    },
    color(value) {
        this.element.style['color'] = value

    },
    backgroundColor(value) {
        this.element.style['backgroundColor'] = value

    },
    height(value) {
        this.element.style['height'] = value + 'px'

    },
    width(value) {
        this.element.style['width'] = value + 'px'

    },
    border(value) {
        if (!Array.from(value).some(char => isNaN(char)) && value !== '') {
            this.element.style['border'] = value + 'px';
            return
        }
        this.element.style['border'] = value

    },
    borderRadius(value) {
        this.element.style['borderRadius'] = value + 'px'
    },
    fontFamily(value) {
        this.element.style['fontFamily'] = value

    },
    fontSize(value) {
        if (value === '') this.element.style['fontSize'] = value
        this.element.style['fontSize'] = value + 'rem'

    },
}

function saveValues(name, value) {
    localStorage[name] = value
}

function setValues() {
    const localStorageProperties = Object.keys(localStorage)

    localStorageProperties.forEach(property => {
        styleUpdater[property](localStorage[property])

        input = document.getElementById(property)

        if (input.tagName !== 'SELECT') {
            input.setAttribute('value', localStorage[property])
        }
        else {
            Array.from(input.children).forEach(i => {
                if(typeof i.getAttribute('selected') !== null){
                    i.removeAttribute('selected')
                }
                if(i.getAttribute('value') === localStorage[property]) {
                    i.setAttribute('selected', '')
                }
            })
        }
    })
}

function updateCssText(){
    btn.style.cssText ? cssText.innerHTML = '<span>' + btn.style.cssText.split('; ').join(';</span><span>') : cssText.innerHTML = ''
}

function handleChange(event) {
    const name = event.target.name,
    value = event.target.value
    styleUpdater[name](value)
    updateCssText()
    saveValues(name, value)
}