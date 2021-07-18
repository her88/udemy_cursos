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
        salario: 2000
    }
];

const id = 1;

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id);
        (empleado)
            ? resolve(empleado.nombre)
            : reject(`Empleado con id ${id} no existe`)
    });
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find(s => s.id === id);
        (salario)
            ? resolve(salario.salario)
            : reject(`No existe el salario para el empleado con id ${id}`);
    });
}

/*getEmpleado(id)
    .then(empleado => console.log(empleado))
    .catch(err => console.log(err));

getSalario(id)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));    */

let nombre;

getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then(salario => console.log('El salario del empleado:',nombre, 'es de:',salario))
    .catch(err => console.log(err));   