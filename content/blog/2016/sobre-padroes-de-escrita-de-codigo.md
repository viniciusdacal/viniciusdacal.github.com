---
title: Sobre padrões de escrita de código
description: >-
  Logo quando comecei a trabalhar no projeto Compufácil, há mais ou menos dois
  anos atrás, uma das coisas que me incomodava no Frontend era a…
date: '2016-10-10T13:49:35.026Z'
categories: []
keywords: []
image: "../__legacy-img/1__fDCDg________xV7Zx6zeLgXMQ.jpeg"
language: "pt-BR"
---

Logo quando comecei a trabalhar no projeto [Compufácil](http://compufacil.com.br/), há mais ou menos dois anos atrás, uma das coisas que me incomodava no Frontend era a inconsistência na escrita de código. O Backend já estava bem resolvido quanto a isso. Feito em PHP, todo o Backend já estava com as regras do [PSR-2](http://www.php-fig.org/psr/psr-2/) e algumas docs sobre padrões de criação de arquivos e novos módulos. No post [_Code Style At Compufácil_](https://techblog.compufacil.com.br/code-style-on-compuf%C3%A1cil-a0958ecbe112#.b4qu6329o) o [Jean Carlo Machado](https://medium.com/u/5fef03f5a76c) fala sobre esse processo.

No Frontend, não tínhamos padrão nenhum, nós usávamos espaços, ponto e vírgula e declarávamos variáveis onde bem entendêssemos. Quando a equipe é pequena, isso não afeta tanto, mas quando a mesma começa a crescer, a necessidade de criar e utilizar um padrão se mostra necessária.

Leve em consideração o código abaixo:

function **create**(entity, otherParam){
 ...
}

function **update** (entity,otherParam)
{
 ...
}

function **delete**(id,otherParam) {
...
}

Como podemos observar, não há padrão nenhum. É estranho você encontrar num mesmo arquivo, funções que são definidas com chave de abertura na mesma linha e outra função que tem a chave de abertura na outra linha. Em um lugar é utilizado espaço depois do nome da função, em outros não. Espaços para separar os parâmetros em um lugar e em outro não.

Pode ser que você olhe para aquela chave de abertura na outra linha e diga: — Que coisa bizarra, ninguém vai fazer aquilo em javascript.

Imagine que alguém do backend, que esteja acostumado à um determinado padrão, venha editar um arquivo Javascript para incluir apenas uma função. **Sim, isso acontece, não pense que não**.

Acredite, quando você não tem um linter no projeto com um padrão combinado pela equipe, você facilmente chega no cenário acima, porque inúmeras pessoas vão editar o arquivo ao longo do projeto e cada uma vai escrever o código da maneira que bem entender.

### Mas quais as reais vantagens de se ter um padrão?

O maior motivo de todos é que a nossa mente se dá bem com padrões. Uma vez que ela se adapta a um padrão, seu esforço cognitivo no momento de leitura diminuí. Considerando que grande parte do tempo que estamos programando, nós passamos **lendo o código**, isso impacta diretamente em nossa produtividade.

Um código bem organizado e bem escrito é muito mais fácil de entender, dar manutenção e até de refatorar. Você economiza tempo e esforço e todo mundo sai ganhando.

### Quais os primeiros passos para implantar um padrão?

Você e sua equipe devem começar pela escolha de um padrão, existem vários, mas alguns são mais conhecidos:

[Airbnb](https://github.com/airbnb/javascript)

[IdiomaticJS](https://github.com/rwaldron/idiomatic.js/)

[StandardJS](https://github.com/feross/standard)

Nessa hora não comece um [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding), mais importante do que determinar se o padrão será X ou Y, é ter um padrão estabelecido. Dê preferência para os mais utilizados em projetos open source, eles já foram validados por inúmeras pessoas.

Após a escolha do padrão, você pode utilizar o [ESLint](http://eslint.org/) para verificar se o seu código está de acordo com o padrão. O ESLint pode ser colocado junto ao seu processo de build, que pode estar no npm script, gulp, grunt ou em um bash script.

É possível também incluir o ESLint no hook de pre-commit do **git**, não deixando nem ser feito commit das alterações caso o arquivo não esteja dentro do padrão. Essa abordagem funcionou bem para nós, uma vez que no pre-commit nós rodávamos o linter apenas nos arquivos alterados, o que permitiu que fizéssemos as correções gradualmente, mas que mesmo gradualmente, todo programador era educado a escrever o novo código dentro do padrão.

### Instalação

Utilizando o npm, o ESLint pode ser instalado tanto globalmente quanto localmente. Dê preferência por instalá-lo localmente e incluí-lo como uma dependência do projeto. Dessa forma, assim que o dev instala o projeto, o linter já está incluso, não sendo necessário nenhuma instalação adicional para o uso do mesmo.

npm i --save-dev eslint

Após instalarmos o ESLint, precisamos instalar o módulo contendo as regras do padrão que foi escolhido:

**Para fins de exemplo**, vamos levar em consideração que escolhemos o [padrão do airbnb](https://github.com/airbnb/javascript). Nesse caso, o processo de instalação seria o seguinte:

npm i --save-dev eslint-config-airbnb

Após a instalação é só criar um novo arquivo com o nome **.eslintrc,** na raiz do projeto, com o seguinte conteúdo:

{
  "extends": "airbnb"
}

Você também pode colocar sua regras customizadas nesse arquivo, como no exemplo abaixo:

{
  "extends": "airbnb",
  "rules": {
    "no-use-before-define": 0
  }
}

Acesse o [eslint.org](http://eslint.org/docs/rules/) para ver as regras disponíveis.

Após a criação do arquivo, vamos incluir o comando no npm scripts:

"scripts": {
  "lint": "eslint path/to/js",
  "lint:fix": "npm run lint -- --fix"
},

Para a utilização do mesmo, basta executar:

npm run lint

O comando acima executa apenas o lint e imprime os erros. O ESLint ainda conta com um autofix, para corrigir os erros mais simples. Como já incluímos ele no npm script, basta executar:

npm run lint:fix

**O autofix deve ser executado com muita atenção! Caso utilizá-lo, verifique os diffs nos seus arquivos.**

### Incluindo o lint no pre-commit

Como mencionado acima, é possível incluir um script no hook do pre-commit do git. Dessa forma, toda vez que alguém for fazer commit, o lint será executado nos arquivos alterados, fazendo com que os desenvolvedores coloquem dentro do padrão os arquivos que editarem.

Para isso, a partir da pasta raiz do seu repositório git, edite o arquivo: **.git/hooks/pre-commit**

Inserindo o conteúdo abaixo:

#!/usr/bin/env bash

SFILES='' JS\_STAGED\_FILES\_CMD=\`git diff --cached --name-only --diff-filter=ACMR HEAD | egrep '\\.(**js**)$'\`
SFILES=${SFILES:-$JS\_STAGED\_FILES\_CMD}

for FILE in $SFILES; do
    node path/to/node\_modules/eslint/bin/eslint.js > /dev/null 2>&1

    if \[ $? != 0 \]; then
        echo "Fix file: $FILE"
        exit 1
    fi
done

exit $?

Basicamente, o que o script acima irá fazer, é pegar todos os arquivos com a extensão .**js** que estão no estado [**staged**](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics#The-Three-States)  do git e executar o lint em todos. Se houver algum erro, o script corta a execução retornando **1,** o que não permitirá que seja feito commit dos arquivos alterados.

### Code Style Guides

Padrões de escrita de código não se limitam apenas a espaçamentos ou onde colocar ponto e vírgula  ou não. Também existem style guides que definem a organização e arquitetura do projeto, além de possuir orientação sobre como escrever um novo service, factory, classe e etc...

Essas práticas ajudam a manter um padrão dentro do projeto, o tornando mais intuitivo. Isso auxilia desde a curva de aprendizado de novos desenvolvedores no time, até a produtividade de desenvolvedores experientes.

Gostou do post e achou útil? Dê um **like** ❤️ abaixo para ajudar na divulgação e para que mais pessoas tenham acesso :)
