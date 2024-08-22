document.addEventListener('DOMContentLoaded', (event) => {
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveBtn = document.getElementById('saveBtn');
    const constantValueInput = document.getElementById('constantValue');

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    saveBtn.addEventListener('click', () => {
        const constantValue = constantValueInput.value;
        // Aquí puedes añadir la lógica para actualizar el valor de la constante
        console.log('Valor de la constante:', constantValue);
        modal.style.display = 'none';
    });
});

const modal = document.getElementById('modal');
const saveBtn = document.getElementById('saveBtn');
const constantValueInput = document.getElementById('constantValue');

var selectedComponents;
var Circuit;

export function openModal(object, circuit) {
    if (object.parent == null) {
        modal.style.display = 'block';
        selectedComponents = object;
        Circuit = circuit;
        constantValueInput.value = object.value;
    }
    if (object.parent == 'Wire'){
        modal.style.display = 'block';
        selectedComponents = object;
        Circuit = circuit;
        constantValueInput.value = object.value;
    }

}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
// Funcionalidad

saveBtn.addEventListener('click', () => {
    selectedComponents.setValue(constantValueInput.value);
    Circuit.repaintCircuit();
    // Aquí puedes añadir la lógica para actualizar el valor de la constante
    console.log('Valor de la constante:', constantValue);
    modal.style.display = 'none';
});
