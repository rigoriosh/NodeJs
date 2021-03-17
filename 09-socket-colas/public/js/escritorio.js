

console.log('Escritorio HTML');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'; //redirecciona a la pagina index.html
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
console.log({escritorio});

const test = searchParams.get('test');
console.log({test});