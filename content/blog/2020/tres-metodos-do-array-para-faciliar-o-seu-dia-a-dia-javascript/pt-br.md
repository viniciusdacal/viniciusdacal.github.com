---
title: Três métodos do Array em Javascript para faciliar o seu dia a dia
identifier: tres-metodos-do-array-para-faciliar-o-seu-dia-a-dia-javascript
description: >-
  Conheça os métodos map, filter e reduce do Array e veja como eles podem simplificar seu código.
date: '2020-03-04T20:00:00.284Z'
categories: []
keywords: []
language: "pt-br"
image: "./array-map-filter-reduce.jpg"

imageBy: {
  url: "https://unsplash.com/@lazycreekimages",
  name: "Michael Dziedzic"
}
---


Manipulação de arrays é uma tarefa do cotidiano de todo programador.
Quem é que nunca precisou pegar uma listagem de items e extrair só os ids, ou precisou filtrar somente os itens que respeitassem determinado parâmetro ou então precisou somar
o valor total de todos os items?

Para quem vem de outras linguagens, é comum utilizar estruturas como `while`, `for` e `for each` para tais manipulações. No Javascript, também é possível manipular arrays dessa forma, porém, há outras maneiras que na minha opinião, tornam o código mais simples e agradável.
Nesse artigo veremos três funções do Array.prototype que podem nos ajudar a explorar essas outras maneiras: map, filter e reduce.




## Map
O método Array.map permite que você aplique uma transformação para cada elemento do seu array, gerando um novo array como resultado.
Imagine que você possui um array com números:

```js
const numeros = [1, 2, 3, 4, 5, 6];
```

O seu objetivo, é pegar cada número desse array e multiplicá-lo por 2. O código ficaria da seguinte maneira:

> os códigos abaixo podem ser copiados e colados na aba `console`, no inspector do seu navegador


```js
const numeros = [1, 2, 3, 4, 5, 6];
const duplicar = x => x * 2;
const duplicados = numeros.map(duplicar);
console.log(duplicados)
// [2, 4, 6, 8, 10, 12]
```

No código acima, nós:
 - definimos uma função `duplicar` que aceita um número `x` e retorna o valor dele multiplicado por 2.
 - Passamos essa função `duplicar` para o `.map` e atribuímos o resultado map a `const` duplicados.

O map por sua vez, vai percorrer o array de números e para cada item ele
vai executar a função `duplicar`, passando o item como argumento, e irá utilizar os resultados para construir um novo array

> Não existe a necessidade de definir a função primeiro, você pode definir ela inline:

```js
const numeros = [1, 2, 3, 4, 5, 6];
const duplicados = numeros.map(x => x * 2);
console.log(duplicados)
// [2, 4, 6, 8, 10, 12]
```


Você deve estar pensando: "Ok, mas quando é que eu vou precisar duplicar números na vida real?"

Realmente, mas a ideia do exemplo era ser o mais simples possível, só para você pegar a ideia.
Mas agora imagine a situação onde você tem uma lista de produtos e precisa extrair id de cada um?

```js
const produtos = [
  { id: 1, categoria: 'limpeza', name: 'Amaciante' },
  { id: 2, categoria: 'limpeza', name: 'Detergente' },
  { id: 3, categoria: 'alimento', name: 'ovo' },
  { id: 4, categoria: 'alimento', name: 'alface' },
]

const ids = produtos.map(p => p.id);

console.log(ids); // [1, 2, 3, 4]
```

Outro exemplo bem comum, é a criação de listas no React:

```jsx
const produtos = [
  { id: 1, categoria: 'limpeza', name: 'Amaciante' },
  { id: 2, categoria: 'limpeza', name: 'Detergente' },
  { id: 3, categoria: 'alimento', name: 'ovo' },
  { id: 4, categoria: 'alimento', name: 'alface' },
];

function List() {
  return (
    <ul>
      {produtos.map(p => (
        <li key={p.id}>
          {p.name}
        </li>
      ))}
    </ul>
  );
}
```

Acima, o map executa a função passando cada produto e obtem um elemento React em troca.


# Filter

O Array.filter, como o próprio nome já sugere, serve para filtrar itens de um array.
Digamos que você tenha a mesmo array de produtos, mas dessa vez, você só quer que fique no array, os produtos com a categoria "alimento":

```js
const produtos = [
  { id: 1, categoria: 'limpeza', name: 'Amaciante' },
  { id: 2, categoria: 'limpeza', name: 'Detergente' },
  { id: 3, categoria: 'alimento', name: 'ovo' },
  { id: 4, categoria: 'alimento', name: 'alface' },
];

const isAlimento = produto => produto.categoria === 'alimento';

const alimentos = produtos.filter(isAlimento);

console.log(alimentos);

/*
  [
    { id: 3, categoria: 'alimento', name: 'ovo' },
    { id: 4, categoria: 'alimento', name: 'alface' },
  ]
*/

```

O Array.filter executa a função `isAlimento` para cada item do array. Se a função retornar um valor [truthy](https://developer.mozilla.org/pt-BR/docs/Glossario/Truthy), o item permanece na lista, caso retorne [falsy](https://developer.mozilla.org/pt-BR/docs/Glossario/Falsy), o item é removido da lista.

> É importante ressaltar que tanto o map quanto o filter e o reduce criam novas instancias do array. Os arrays originais continuam inalterados.

Agora imagina combinar o map e o filter juntos?

Imagine que você quer os ids dos produtos, mas somente dos alimentos:

```js
const produtos = [
  { id: 1, categoria: 'limpeza', name: 'Amaciante' },
  { id: 2, categoria: 'limpeza', name: 'Detergente' },
  { id: 3, categoria: 'alimento', name: 'ovo' },
  { id: 4, categoria: 'alimento', name: 'alface' },
];

const idsAlimentos = produtos
  .filter(p => p.categoria === 'alimento') // inline
  .map(p => p.id);

console.log(idsAlimentos); // [3, 4]

```

Bem simples não?


# Reduce

Entre os três, o reduce pode parecer o mais complexo. Mas conforme os exemplos, você verá que ele é simples de ser utilizado.

A ideia do reduce, é produzir um único valor a partir de um array. Imagine que você tem uma lista de números e que você quer saber a soma total de todos eles.

```js
const numeros = [1, 2, 3, 4];
const somar = (acumulado, x) => acumulado + x;
const total = numeros.reduce(somar);

console.log(total); // 10
```

O reduce executa a função de somar passando o valor acumulado e o próximo item do array.

Vamos ver passo a passo, olhando dentro da função callback (somar):

```js
const numeros = [1, 2, 3, 4];

const total = numeros.reduce((acumulado, x) => {
  console.log(`${acumulado}+${x} = ${acumulado+x}`);
  return acumulado + x;
});

// 1+2 = 3
// 3+3 = 6
// 6+4 = 10

```

  - Como é a primeira iteração, o reduce chamará a função callback, passando o primeiro e o segundo elemento do array. A função callback retornará 3 e esse se tornará o resultado acumulado.

  - Na segunda interação, o reduce chama a função callback passando o valor acumulado e o terceiro item do array. Somar retorna 6, que por sua vez, se torna o valor acumulado.

  - Na terceira iteração, será executada a função callback com o valor acumulado e o quarto item. A função somar retorna 10. Como não há mais itens no array, esse se torna o resultado final, que é atribuído a `const` total;


Trazendo o uso dele para o mundo real, imagine que gostariamos de somar os valores de todos os produtos de uma lista:

```js
const produtos = [
  { valor: 6.50, id: 1, categoria: 'limpeza', name: 'Amaciante' },
  { valor: 1.20, id: 2, categoria: 'limpeza', name: 'Detergente' },
  { valor: 6.90, id: 3, categoria: 'alimento', name: 'ovo' },
  { valor: 2.00, id: 4, categoria: 'alimento', name: 'alface' },
];

const total = produtos.reduce((acumulado, produto) => {
  if (acumulado.valor) {
    return acumulado.valor + produto.valor;
  }

  return acumulado + produto.valor;
};

console.log(total); // 16.6
```

Observe que tivemos que colocar uma condicional, identificando se `acumulado` tinha ou não a propriedade `valor`. Isso porque
na primeira iteração, são passados o primeiro e o segundo elemento do array, os dois sendo objetos. Já na segunda iteração,
`acumulado` é um número e não mais um objeto. Há uma maneira de deixar isso mais simples.
O Array.reduce aceita além da função callback, um segundo parâmetro, para se tornar o valor inicial de `acumulado`, que no nosso caso, será `0`:

```js
const produtos = [
  { valor: 6.50, id: 1, categoria: 'limpeza', name: 'Amaciante' },
  { valor: 1.20, id: 2, categoria: 'limpeza', name: 'Detergente' },
  { valor: 6.90, id: 3, categoria: 'alimento', name: 'ovo' },
  { valor: 2.00, id: 4, categoria: 'alimento', name: 'alface' },
];

const total = produtos.reduce((acumulado, produto) => acumulado + produto.valor, 0);

console.log(total); // 16.6
```

Quando passamos um *valor inicial*, a sequencia das iterações sofre uma pequena mudança, ao invés de ser passado o primeiro e o segundo item do array, é passado o *valor inicial* e o primeiro item.
E depois o fluxo segue, passando o valor acumulado e o próximo item do array.

Para conseguir fixar bem a ideia, eu criei um sandbox com esse código, já com alguns console.log dentro do reduce: [sandbox](https://codesandbox.io/s/infallible-clarke-ipy60)
Abra o console, edite o código e veja os resultados. A melhor maneira de aprender, é colocando a mão na massa.




Gostou do post e das dicas? Ajude-nos a divulgar compartilhando nas redes sociais para que mais pessoas tenham acesso! ❤️️

Não esqueça de se inscrever na nossa newsletter
