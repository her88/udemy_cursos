const empleados = [
    {
        id: 1,
        nombre: 'Juan'
    },
    {
        id: 2,
        nombre: 'Hernan'
    },
    {
        id: 3,
        nombre: 'Lorena'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    },
    {
        id: 3,
        salario: 2000
    }
];

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id);
    if (empleado) {
        callback(null, empleado.nombre);
    } else {
        callback(`Empleado con id ${id} no existe`);
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find(s => s.id === id);
    if (salario) {
        callback(null, salario.salario);
    } else {
        callback(`No existe el salario para el empleado con id ${id}`);
    }
}

const id = 6;

getEmpleado(id, (err, empleado) => {
    if (err) {
        console.log('ERROR!');
        return console.log(err);
    }
    // console.log('Empleado existe!'),
    // console.log(empleado);

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(err);
        }
        console.log(`El salario para el empleado ${empleado} con id ${id} es de: ${salario}`);
    });
});



