---
title: Como migrar uma aplicação de AngularJS para React
description: >-
  Recentemente assisti uma palestra da Kete Martins Rufino e do Christiano
  Milfont na @ReactConfBR, sobre como migrar aplicações legadas para…
date: '2017-10-10T17:39:43.851Z'
categories: []
keywords: []
image: "../../__legacy-img/1____lLRGp1g5biW5__yCcpTYZA.png"
language: "pt-br"
---


Recentemente assisti uma palestra da [Kete Martins Rufino](https://medium.com/u/22305afc282d) e do [Christiano Milfont](https://github.com/cmilfont) na [@ReactConfBR](https://twitter.com/ReactConfBR), sobre como migrar aplicações legadas para _React e_ fiquei inspirado em tirar esse post da gaveta.

No começo desse ano, fui contratado pela [BEN Group](https://ben.productplacement.com/), tendo como principal objetivo, migrar uma aplicação legada de _Angular_ para _React_ e _Redux_. Desde então, criamos algumas soluções dentro do projeto, que acabaram funcionando muito bem para nós.

Nesse post pretendo mostrar as principais abordagens que seguimos e compartilhar algumas soluções que criamos, para poder migrar o projeto gradualmente e sem perder a sanidade.

> Disclaimer: O nosso foco aqui, não é refatorar código legado, e sim removê-lo o quanto antes. Então nós evitamos soluções que tomem muito tempo e que foquem em deixar o código atual mais “bonito”. Ao mesmo tempo, nós prezamos por escrever código **novo** com qualidade.

### Mover o build da aplicação para webpack.

Esse passo eu considero o mais importante de todo o processo, uma vez que com o Webpack você pode utilizar o **import** para importar suas dependencias e módulos e pode começar a se livrar das Dependency Injection(DI) do Angular. Ele também será necessário para que nós possamos começar a escrever código _React_ na aplicação.

> Se você utiliza template cache, _Pug_(_Jade_) ou qualquer outra coisa que influencie no build, não se preocupe, o webpack terá um loader para cada um deles. Lembre-se de deixar o Webpack configurado para interpretar es6 e jsx.

O foco desse passo, não é mover todas as DI para imports, e sim fazer o seu build funcionar com o Webpack. É importante ter isso em mente, para evitar ficar nessa tarefa por semanas e gerar conflitos em dezenas de arquivos.

Em _Angular_, normalmente o processo de build pega todas as dependências que você precisa da pasta `node_modules` e insere dentro do bundle. Nós precisamos manter esse comportamento no novo build.

> Você precisa considerar o código legado como um inimigo a ser vencido. Por esse motivo, precisamos agir com cautela e ser estratégicos. Isso também significa, que em certos momentos, você vai precisar fazer coisas que não são agradáveis.

O que nós fizemos, foi criar um arquivo `vendor.js`, importando todas as dependências, como no exemplo abaixo:

A grande maioria delas, aos ser importada se registra globalmente no objeto _window_. Então a única coisa que precisamos fazer, é importa-las como no exemplo acima. Porém, algumas dependências não o fazem e precisamos fazê-lo de forma manual. Segue abaixo um exemplo do que precisamos fazer com o **_moment_** e o **_jQuery_**:

Essa prática pode soar bem estranha, porém, você precisa levar em conta que muitas de suas dependências estão considerando que o _jQuery_ estará no objeto _window_. Algumas delas utilizam `window.$`, outras `window.jQuery` e outras `window.jquery`

Após criar o arquivo vendor, importe-o no arquivo entry point da sua aplicação e assim todas as suas dependências estarão no bundle.:

require('./vendors');

Outra etapa, é garantir que os arquivos da aplicação estão no bundle. O ideal, é que cada módulo da sua aplicação, tenha um arquivo `index`, que importa seus _controllers_, _factories_, _views_ e etc… Tendo isso, basta importá-los no entry point, da mesma forma que o arquivo vendors, como no exemplo abaixo:

Se você não tem o index, você pode recorrer a uma solução um pouco mais ousada, porém não muito indicada, que seria encontrar um padrão para os arquivos da sua aplicação e importá-los utilizando regex:

O código acima, fará com que o webpack inclua no bundle todos os arquivos `.js` e `.jsx` que estão dentro da pasta app e dentro de suas subpastas. Se você optar por seguir esse caminho, lembre-se que você pode ter arquivos `.tes.js` ,`.spec.js` e `.stories.js`, e terá que exclui-los na regex.

Lembre-se também, que em alguns casos, o _Angular_ está contando com a ordem do carregamento dos seus arquivo, então pode ser que a solução com regex, simplesmente não funcione.

Feito isso, crie um pull request para sua branch principal, teste devidamente e faça um merge o quanto antes. Independente de React, mover o build para webpack já é um grande ganho para sua aplicação. A DI do _Angular_ gera um acoplamento gigantesco e o webpack é o nosso principal aliado contra isso.

### Renderizar Componentes React dentro do Angular.

A Segunda parte mais importante do processo, pois sem isso, não tem como migrar gradualmente. A ideia desse passo, é que você consiga utilizar os componentes _React_, dentro do _Angular_, como se fossem diretivas. Para isso, nós estamos utilizando [_ngReact_](https://github.com/ngReact/ngReact) no nosso projeto.

> O próprio repositório do _ngReact_ está indicando o uso de outra lib, [_react2Angular_](https://github.com/coatue-oss/react2angular). Porém, nós estamos utilizando o _Angular_ na versão 1.5.8, e acabamos enfrentando alguns problemas ao tentar utilizar a outra lib. Eu já utilizei _react2Angular_ em outro projeto, que utilizava uma versão mais recente do _Angular_ e não tive problema algum. Enfim, o _ngReact_, mesmo não sendo mais atualizado, tem todas as features que precisamos para transformar nossos componentes em diretivas. A minha dica é, escolha a lib que funcione para você e siga em frente, as duas são bem similares.

Para integrar o _ngReact_ no projeto, basta instala-lo via npm.

$ npm i --save ngreact

E importá-lo no seu arquivo de vendors:

require('ngreact');

Você também precisará instalar o _react_ e o _react-dom_ no seu projeto:

npm i --save react react-dom

E depois, registrar o módulo _react_ ao _Angular_

angular.module('app', \['react'\]);

Feito isso, podemos criar um component Button, como criaríamos em uma aplicação React:

E então, definimos uma diretiva que utilizará ele:

No arquivo da diretiva, nós devemos definir o nome de todas as props que o component utiliza, para que o _ngReact_ entenda o que ele deve passar para o componente.

Definida a diretiva, nós precisamos registrá-la no angular:

> O módulo do Angular que você utilizará para registrá-la, não é crucial, apenas se certifique-se de que ela foi registrada na aplicação.

Uma vez registrada, nós podemos utilizar a diretiva em qualquer view, como no exemplo abaixo:

<div>
  <react-button class-name="btn"></react-button>
</div>

Observe que aqui, ao invés do CamelCase nós utilizamos dash (-) para separar as palavras. Nesse caso, reactButton vira react-button e className se torna class-name. É importante manter isso em mente, pois esse é um erro bem comum e que pode te levar a horas de debug.

É comum utilizarmos o _ngReact_ para renderizar pequenos componentes dentro de uma aplicação _Angular_. Porém, migrar componente por componente, é pouco produtivo.

O _Angular_ _UI Router_, permite que nós passemos um parâmetro template nas configurações de rotas. Explorando isso, podemos construir um componente wrapper para cada tela da aplicação, e utilizar conforme o exemplo abaixo:

No exemplo acima, definimos uma rota de login e passamos para ela, o componente que representa toda a tela de login. Dessa forma, podemos migrar uma telas inteiras da aplicação, ao invés de pequenos componentes. Minha dica aqui, é ter o [_Storybook_](https://storybook.js.org/) instalado no projeto, para construir e testar os pequenos componentes, assim fica mais fácil de construir uma base solida de componentes e depois integrá-los nas screens.

> Screens: Também conhecidas como pages, elas são root components de cada rota. Digamos que você possui uma tela de Login, uma screen seria um wrapper dela toda.

### Compartilhar dependências

Definir uma screen inteira é sensacional. Porém, quando chegamos a esse ponto, normalmente nós precisamos compartilhar algumas dependências do _Angular_ com o _React_.

No nosso caso, as dependências que precisávamos, só estavam prontas após a inicialização do _Angular_, depois de ele ter executado os seus providers e etc…Nesse caso, não era possível exportá-las utilizando o **export**. Para resolver esse problema, nós criamos um objeto, com uma função auxiliar para injetar as dependências.

Para implementar essa solução, basta criamos um arquivo chamado ngDeps.js, com o seguinte código:

Nós utilizamos o **injectNgDeps** dentro de um processo de [**run**](https://docs.angularjs.org/api/ng/type/angular.Module#run) do Angular, como no exemplo abaixo:

Nós fazemos isso dentro do **run**, porque o run é um dos primeiros processos a ser executados na inicialização do _Angular_. Desse modo, conseguimos acesso as dependências o mais breve possível. O **injectNgDeps** aceita um objeto como parâmetro e faz um merge dele no objeto ngDeps.

Quando você precisar de alguma dependência dentro de um componente _React_, basta seguir o exemplo abaixo:

Obverse que primeiro nós importamos ngDeps. Se você tentar acessar `ngDeps.$state` logo após o **import**, o resultado será `undefined` pois o processo de **run** do Angular ainda não ocorreu. Por essa razão, nós acessamos o valor dentro do método **contructor** do componente, porque nesse momento o _Angular_ já terminou sua inicialização.

Nós pegamos as dependências e atribuímos ao objeto **this**, porque dessa maneira, nós podemos acessar `this.$state` dentro de qualquer método da classe.

Assim, é possível compartilhar praticamente qualquer dependência do _Angular_ com componentes _React_. Porém, use ngDeps com parcimônia. Mantenha a seguinte pergunta em mente: Consigo exportar essa dependência utilizando **export**? Se a reposta for sim, sempre opte por utilizar export, caso contrário, recorra ao ngDeps.

Outra coisa a ressaltar, é que é interessante manter o acesso ao ngDeps, restrito aos componentes mais acima da árvore, ou seja, nas screens e possivelmente em alguns containers, e então utilizar props para passar para os componentes filhos. Dessa maneira, ficará mais fácil se livrar da ngDeps quando você não precisar mais dela.

### Integrar o Redux na aplicação

Após resolver o problema de compartilhar dependências entre os dois lados, nós podemos seguir para fazer a integração do _Redux_ à aplicação. A integração é bem simples, porém, tem suas peculiaridades.

Configure a **store** seguindo os passos da [documentação](http://redux.js.org/), como você faria em qualquer aplicação. Porém, uma vez que você criou o objeto **store**, exporte ele da seguinte maneira:

```
export const store = createStore(rootReducer);
```

Isso vai permitir que tenhamos acesso ao objeto **store** em outros pontos da aplicação.

Em uma aplicação normal, nós integramos nossos containers à **store**, utilizando o método connect, da lib [react-redux](https://github.com/reactjs/react-redux). Porém, o método connect só funciona porque nós inserimos um Provider com a store, como um dos componentes raiz da nossa aplicação, como podemos ver na própria documentação da lib:

ReactDOM.render(
  <**Provider** store={**store**}>
    <MyAppRootComponent />
  </**Provider**\>,
  rootEl
)

O problema é que nós não teremos um componente raiz da nossa aplicação, nós teremos vários. É inviável nós ficarmos controlando de forma manual , quais componentes deve conter o Provider e quais não. Para isso, nós criamos um High Order Componet, que abstrai essa verificação e insere o Provider como wrapper quando necessário. Para facilitar o acesso, eu publiquei esse HOC no [Github](https://github.com/viniciusdacal/redux-connect-standalone) e no [NPM](https://www.npmjs.com/package/redux-connect-standalone) como [redux-connect-standalone](https://github.com/viniciusdacal/redux-connect-standalone).

Para instalá-lo utilizando o npm:

npm i --save redux-connect-standalone

E então, nós podemos criar o nosso arquivo connect e utilizar o seguinte código:

E então, dentro do seus componentes, ao invés de importar o método connect da lib _react-redux_, você importa do arquivo que você acabou de criar. E o utiliza exatamente da mesma maneira que utilizaria a função connect da lib original:

Como nós estamos respeitando a mesma assinatura do método original, no dia que você possuir um Provider no componente raiz da sua aplicação, você só precisará executar um search replace no import do método e substituí-lo por:

```
import { connect } from 'react-redux';
```

> Se você utiliza ou pretende utilizar redux-form na sua aplicação, eu também criei e publiquei um HOC para o método reduxForm, o [redux-form-connect-standalone](https://goo.gl/4XgxwZ). A utilização dele é bem similar a do HOC que vimos acima.

### Conclusão

Tendo essas receitas de bolo em mão, é possível migrar a sua aplicação gradualmente. Claro que ao longo do processo, outras dificuldades irão surgir.

É importante manter em mente, que essas são soluções intermediárias, entre ter uma aplicação totalmente em _Angular_ e totalmente em _React_. O objetivo final, é se livrar de todas essas soluções acima e manter a aplicação utilizando as convenções e boas práticas de _React_ e _Redux_. **Então, sempre que for criar uma solução, pense qual será a dificuldade de se livrar dela depois.**

Se você achar alguma dificuldade ou solução interessante, compartilhe com a gente.

Gostou do post e achou útil? Ajude a divulgar para que mais pessoas tenham acesso
