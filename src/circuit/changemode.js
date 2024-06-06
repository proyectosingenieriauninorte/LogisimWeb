import { setMode } from '../../handlers/eventHandlers.js';

export function changeMode(mode) {
	document.getElementById('btn_mouse').classList.remove('select');
	document.getElementById('btn_wire').classList.remove('select');
	document.getElementById('btn_hand').classList.remove('select');
	document.getElementById('btn_delete').classList.remove('select');
	document.getElementById('btn_const0').classList.remove('select');
	document.getElementById('btn_const1').classList.remove('select');
	document.getElementById('btn_probe').classList.remove('select');
	document.getElementById('btn_and').classList.remove('select');
	document.getElementById('btn_or').classList.remove('select');
	document.getElementById('btn_not').classList.remove('select');

    switch (mode) {
        case 'mouse':
            console.log('Modo mouse')
            document.getElementById('btn_mouse').classList.add('select')    
            canvasContainer.style.cursor = 'default'
            setMode('mouseMode')
            break
        case 'wire':
            console.log('Modo wire')
            document.getElementById('btn_wire').classList.add('select')
            canvasContainer.style.cursor = 'crosshair'
            setMode('wireMode')
            break
            
        case 'hand':
            console.log('Modo hand')
            document.getElementById('btn_hand').classList.add('select')
            canvasContainer.style.cursor = 'grab'
            setMode("handMode")
            break
        case "delete":
            console.log('Modo delete')

            btn_delete.classList.add("select");
            canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
            
            //setea el modo con sus eventos
            setMode("deleteMode")
            break;
        // ¡¡TAMPOCO BORRAR!! esto tambien hace parte de lo mismo que se habla arriba
        // case "const":
        // 	btn_const.classList.add("select");
        // 	canvasContainer.style.cursor = "crosshair"; // Cambia el cursor

        // 	// Eventos del click para el modo constante
        // 	canvas.addEventListener("click", handleClickPin);
        // 	break;
        case 'const0':
            console.log('Constante 0');
            btn_const0.classList.add('select');
            canvasContainer.style.cursor = 'crosshair'; // Cambia el cursor

            //setea el modo con sus eventos
            setMode('constan00Mode');

            break;
        case 'const1':
            console.log('Constante 1');
            btn_const1.classList.add('select');
            canvasContainer.style.cursor = 'crosshair'; // Cambia el cursor

            //setea el modo con sus eventos
            setMode('constan01Mode');

            break;
        case 'probe':
            btn_probe.classList.add('select');
            canvasContainer.style.cursor = 'crosshair'; // Cambia el cursor

            // Eventos del click para el modo probe
            setMode('probeMode');
            break;
        case 'and':
            btn_and.classList.add('select');
            canvasContainer.style.cursor = 'crosshair'; // Cambia el cursor
            //gate_type = "and";

            setMode('andMode');
            break;
        case 'or':
            btn_or.classList.add('select');
            canvasContainer.style.cursor = 'crosshair';

            setMode('orMode');
            break;
        case 'not':
            btn_not.classList.add('select');
            canvasContainer.style.cursor = 'crosshair';

            setMode('notMode');
            break;
    }
}
