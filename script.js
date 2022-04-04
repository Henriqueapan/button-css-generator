const controls = document.querySelector('#controls'),
cssText = document.querySelector('.css'),
btn = document.querySelector('.btn'),
dinamic = document.querySelectorAll('#controls input[type="range"], #controls input[type="color"]');


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

function updateCssText(){
    btn.style.cssText ? cssText.innerHTML = '<span>' + btn.style.cssText.split('; ').join(';</span><span>') : cssText.innerHTML = ''
}

function handleChange(event) {
    const name = event.target.name,
    value = event.target.value
    styleUpdater[name](value)
    updateCssText()
}