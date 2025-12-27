const numeros = [1, 2, 3, 4, 5, 6];

const numerosatualizados1 = {
    impar: [],
    par: []
}

const numerosatualizados = numeros.reduce(function(mochila, numero){
    if(numero % 2 === 0){
        mochila.par.push(numero)
    }
    else
        mochila.impar.push(numero)
    return mochila
}, numerosatualizados1) 