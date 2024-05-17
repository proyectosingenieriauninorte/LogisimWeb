import {handMode,wireMode} from "../handlers/buttonsHandlers.js"

/*Calculo de posición del mouse en el canvas*/

// Función para obtener la posición del mouse en el canvas
// Esta función te va a devolver un indice X y Y del punto mas cercano al mouse en el canvas cuando haces click, para convertirlo en
// cordenadas de el punto en el grid solo multiplica por 20 la cordenada que te devuelva la función y en ese pixel se encontrara el punto
export function getMousePos(event) {
    var rect = canvasFront.getBoundingClientRect()
    return {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
    }
}

export function changeMode(mode) {
    document.getElementById('btn_wire').classList.remove('select')
    document.getElementById('btn_hand').classList.remove('select')

    switch (mode) {
        case 'wire':
            document.getElementById('btn_wire').classList.add('select')
            console.log('Modo wire')
            canvasContainer.style.cursor = 'crosshair'
            wireMode()
            break
            
        case 'hand':
            document.getElementById('btn_hand').classList.add('select')
            console.log('Modo hand')
            canvasContainer.style.cursor = 'grab'
            handMode()
            break
    }
}