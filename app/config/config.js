const modes = ['draw', 'select', 'delete', 'drag'];
export var gridSize = 20;
export var defaultPointSize = 0.5;

(function () {
    // Guardar las referencias originales
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

    // Mapa para almacenar los event listeners
    const listenersMap = new Map();

    // Sobrescribir addEventListener
    EventTarget.prototype.addEventListener = function (type, listener, options) {
        if (!listenersMap.has(this)) {
            listenersMap.set(this, []);
        }
        listenersMap.get(this).push({ type, listener, options });
        originalAddEventListener.call(this, type, listener, options);
    };

    // Sobrescribir removeEventListener
    EventTarget.prototype.removeEventListener = function (type, listener, options) {
        if (listenersMap.has(this)) {
            const listeners = listenersMap.get(this);
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i].type === type && listeners[i].listener === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
        originalRemoveEventListener.call(this, type, listener, options);
    };

    // Función para obtener los event listeners de un elemento
    window.getEventListeners = function (element) {
        return listenersMap.get(element) || [];
    };

    // Función para obtener todos los event listeners activos en la página
    window.getAllEventListeners = function () {
        const allListeners = [];
        listenersMap.forEach((listeners, element) => {
            allListeners.push({ element, listeners });
        });
        return allListeners;
    };
    // Función para remover todos los event listeners de un elemento específico dado su índice
     // Función para remover todos los event listeners de un elemento específico
     window.removeAllEventListenersFromElement = function(element) {
        const listeners = listenersMap.get(element);
        if (listeners) {
            while (listeners.length > 0) {
                const { type, listener, options } = listeners.pop();
                originalRemoveEventListener.call(element, type, listener, options);
               
            }
            listenersMap.delete(element); // Eliminar el elemento del mapa
        } else {
           return 1
        }
    };
})();