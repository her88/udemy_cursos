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

const id = 2;

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

const getInfoUser = async () => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `El salario del empleado ${empleado} es de ${salario}`;
    } catch (error) {
        // return error; si hago esto entra por todo bien!!!
        throw error;
    }

}

getInfoUser()
    .then(msj => {
        console.log('Todo bien!!!');
        console.log(msj);
    })
    .catch(err => {
        console.log('Todo mal!!!');
        console.log(err);
    });
