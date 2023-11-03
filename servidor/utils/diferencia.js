const diferencia = (A, B) => {
  const arrA = Array.isArray(A) ? A.map((el) => el) : [A];
  const arrB = Array.isArray(B) ? B.map((el) => el) : [B];

  const resultado = [];
  for (const elemento of arrA) {
    if (arrB.indexOf(elemento) === -1) {
      resultado.push(elemento);
    }
  }

  return resultado;
};

module.exports = {
  diferencia,
};
