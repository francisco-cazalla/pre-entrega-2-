function calcularIVA(precio){
    let IVA = 1.21;
    let montoIva= precio * IVA;
    return montoIva;
}

function numeroIngresado(){
    let precio = prompt("ingresar un valor numerico")
    if(precio <0 ||  isNaN(precio)){
        alert("ingrese un numero valido")
    }else{
        let montoIva = calcularIVA(precio);

        alert(`el monto ingresado mas el impuesto IVA es de  ${montoIva.toFixed(2)} pesos`)
    }
}


function calculadoraDePresupuesto() {
    console.log("Función calculadoraDePresupuesto activada"); 
    let presupuestoMensual = parseFloat(prompt("Ingresa tu presupuesto mensual:"));

    
    if (isNaN(presupuestoMensual) || presupuestoMensual <= 0) {
        alert("Por favor, ingresa un presupuesto válido.");
        return;
    }

    let numeroDeGastos = parseInt(prompt("¿Cuántas categorías de gastos tienes?"));

    
    if (isNaN(numeroDeGastos) || numeroDeGastos <= 0) {
        alert("Por favor, ingresa un número válido de categorías de gastos.");
        return;
    }

    
    let totalGastos = 0;

    for (let i = 0; i < numeroDeGastos; i++) {
        let nombreGasto = prompt(`Ingresa el nombre del gasto ${i + 1}:`);
        let montoGasto = parseFloat(prompt(`Ingresa el monto para ${nombreGasto}:`));

        
        if (isNaN(montoGasto) || montoGasto < 0) {
            alert("Por favor, ingresa un monto válido.");
            i--; 
            continue;
        }

        
        totalGastos += montoGasto;
    }

    
    alert(`Tu presupuesto mensual es: ${presupuestoMensual.toFixed(0)} pesos`);
    alert(`El total de tus gastos es: ${totalGastos.toFixed(0)} pesos`);

    if (totalGastos > presupuestoMensual) {
        alert("Has excedido tu presupuesto.");
    } else if (totalGastos === presupuestoMensual) {
        alert("Has utilizado exactamente tu presupuesto.");
    } else {
        let sobrante = presupuestoMensual - totalGastos;
        alert(`Estás dentro de tu presupuesto. Te sobra: ${sobrante.toFixed(0)} pesos`); 
    } 
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario-prestamo').addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const monto = parseFloat(document.getElementById('monto').value);
        const interes = parseFloat(document.getElementById('interes').value);
        const años = parseFloat(document.getElementById('años').value);
        
        
        if (isNaN(monto) || isNaN(interes) || isNaN(años) || monto <= 0 || interes <= 0 || años <= 0) {
            alert('Por favor, ingresa valores válidos y mayores a cero');
            return;
        }
        
        
        const pagoMensual = calcularPagoMensual(monto, interes, años);
        
        
        alert(`
            Resultados:
            Monto del préstamo: $${monto.toFixed()} pesos
            Tasa de interés: ${interes.toFixed(2)}%
            Plazo: ${años} años
            Pago mensual: $${pagoMensual.toFixed(0)} pesos
        `);
    });
});

function calcularPagoMensual(monto, interes, años) {
    const interesMensual = interes / 100 / 12;
    const pagosTotales = años * 12;
    const x = Math.pow(1 + interesMensual, pagosTotales);
    const mensual = (monto * x * interesMensual) / (x - 1);
    return mensual;
}

class Tarea {
    constructor(descripcion) {
    this.descripcion = descripcion;
    this.completada = false;
    }

    mostrarInformacion() {
    console.log(`Descripción: ${this.descripcion}, Completada: ${this.completada ? "Sí" : "No"}`);
    }

    marcarComoCompletada() {
    this.completada = true;
    }
}

let listaDeTareas = [];

function agregarTarea() {
    const descripcionInput = document.getElementById('taskDescription');
    const descripcion = descripcionInput.value.trim();
    if (descripcion !== "") {
    let nuevaTarea = new Tarea(descripcion);
    listaDeTareas.push(nuevaTarea);
    descripcionInput.value = "";
    mostrarTareas();
    } else {
    alert("Por favor, ingrese una descripción para la tarea.");
    }
}

function mostrarTareas() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    listaDeTareas.forEach((tarea, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = tarea.completada ? 'completed' : '';
    const taskDescription = document.createElement('span');
    taskDescription.textContent = tarea.descripcion;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completar';
    completeButton.className = 'complete-btn';
    completeButton.onclick = () => marcarTareaComoCompletada(index);

    taskItem.appendChild(taskDescription);
    taskItem.appendChild(completeButton);
    taskList.appendChild(taskItem);
    });
}

function marcarTareaComoCompletada(indice) {
    if (indice >= 0 && indice < listaDeTareas.length) {
    listaDeTareas[indice].marcarComoCompletada();
    mostrarTareas();
    } else {
    console.log("Índice de tarea no válido.");
    }
}



function guardarEstudiante(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const profesion = document.getElementById('profesion').value;
    const ubicacion = document.getElementById('ubicacion').value;
    
    const estudiante = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        profesion: profesion,
        ubicacion: ubicacion
    };
    
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    
    estudiantes.push(estudiante);
    
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    
    document.getElementById('formulario-estudiantes').reset();
    
    mostrarEstudiantes();
}


function mostrarEstudiantes() {
    const listaEstudiantes = document.getElementById('lista-estudiantes');
    listaEstudiantes.innerHTML = '';
    
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    
    estudiantes.forEach((estudiante, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = estudiante.nombre + ' ' + estudiante.apellido;
        
        listItem.addEventListener('click', () => {
            alert(JSON.stringify(estudiante, null, 2)); 
        });
        listaEstudiantes.appendChild(listItem);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarEstudiantes(); 
    
    document.getElementById('formulario-estudiantes').addEventListener('submit', guardarEstudiante);
});


function mostrarEstudiantes() {
    const listaEstudiantes = document.getElementById('lista-estudiantes');
    listaEstudiantes.innerHTML = '';
    
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    
    estudiantes.forEach((estudiante, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = estudiante.nombre + ' ' + estudiante.apellido;
        listItem.className = 'estudiante-item'; 
        
        
        const infoContainer = document.createElement('div');
        infoContainer.className = 'info-container';
        infoContainer.innerHTML = `
            <p><strong>Nombre:</strong> ${estudiante.nombre} ${estudiante.apellido}</p>
            <p><strong>Edad:</strong> ${estudiante.edad}</p>
            <p><strong>Profesión:</strong> ${estudiante.profesion}</p>
            <p><strong>Ubicación:</strong> ${estudiante.ubicacion}</p>
        `;
        infoContainer.style.display = 'none'; 
        
        listItem.addEventListener('click', () => {
            
            infoContainer.style.display = infoContainer.style.display === 'none' ? 'block' : 'none';
        });
        
        listItem.appendChild(infoContainer);
        listaEstudiantes.appendChild(listItem);
    });
}







