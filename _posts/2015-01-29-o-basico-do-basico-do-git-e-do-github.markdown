---
layout: post
title:  "O básico do básico do Git e do Github."
date:   2015-01-29 23:40:00
categories: iniciante 
uglyTitle : "o-basico-do-basico-do-git-e-do-github"
bg: "codecademy-o-que-voce-pode-aprender-com-ele.jpg"

---
{% assign assets = "/assets/" | append: page.uglyTitle  | prepend: site.baseurl%}
 
Acredito que muitas pessoas, como eu, quando começaram a estudar  Git e Github se sentiram confusas com os termos e comandos utilizados pelo sistema. Neste breve post, vou simplificar (ou não) o dialeto deste mundo do versionamento.

###O que é o git?
Git é um sistema de controle de versão, criado por Linus Torvalds, para desenvolver o Kernel do Linux. Com ele você  pode fazer e salvar cada alteração em seu projeto e futuramente essas alterações poderão ser consultadas ou revertidas. É como se você criasse um ponto de restauração no seu sistema, só que no Git realmente funciona!

Com o Git você consegue saber a data, a hora, quem alterou e o que foi alterado. Fantástico não?

Nesta [ótima palestra do BrazilJS2014](https://www.youtube.com/watch?v=R7NYx8wRrWg), o Mauricio Wolff da Booking, demonstra um case fantástico de como ele conseguiu limpar CSS gigantes com a ajuda do Git e do Github, vale a pena assistir (Fica tranquilo, está em português).

###O que é o Github?
Github é um site que funciona em cima do Git. Nele você consegue criar seus projetos e mantê-los online, mas mais do que isso, ele também funciona como uma rede social, onde as pessoas conseguem ver seus projetos e contribuir para eles. Além de tudo isso, ele também é o melhor portfolio que você pode ter. Olhar para o código que você escreve é uma das melhores maneiras de conhecer seu trabalho.

###Termos frequentemente usados
Para você que está começando agora, nada melhor do que ficar por dentro de algumas palavras frequentemente usadas nesse dialeto “versionístico”.

**Commit**

Um Commit é um pacote de alterações do seu projeto. Digamos que você já tenha uma pasta com os arquivos do seu projeto, você acabou de editar um arquivo e precisa salvar essas alterações no Git, nesse caso você precisará fazer um Commit.

Vamos supor que o arquivo alterado tenha sido o “arquivo.txt” que está dentro da pasta textos, nesse caso você executará o seguinte comando:

`git add textos/arquivo.txt`

Feito isso você terá adicionado o arquivo “arquivo.txt” ao Stage, que é onde ele fica antes de ser “comitado”.

Digamos que sua alteração foi somente essa e você quer “comitar” ela  para o Git, é só executar o seguinte comando:

`git commit –m “Mensagem descrevendo o que foi alterado”`

Você acaba de criar um commit, um pacote de alterações que contem apenas um arquivo.
Caso você tenha alterado vários arquivos e deseja incluir todos eles ao mesmo commit,  troque apenas o caminho do arquivo para “.”, fica assim:

`git add .`

O comando do commit vai continuar o mesmo.
 O que você precisa entender é que ao executar o git add você está adicionando arquivos ao Stage, e que ao executar o git commit, tudo que estiver no Stage vai para o HEAD do seu projeto Git local.

**Fork, Forkar, Forkado**

![Print fork]({{assets}}/print-fork.jpg)

Quando você coloca seu projeto publico lá no Github, as pessoas podem “Forkar” ele, o que seria o mesmo que tirar uma cópia, só que essa cópia fará referência ao projeto original, e carregará com ela todo o histórico de alterações anteriores ao “Fork”.
Nessa cópia, é possível você fazer alterações e trabalhar de forma independente do projeto original.

Digamos que você queira fazer um blog, é possível você “Forkar” o projeto do Jekyll e fazer as alterações, customizações e postagens em cima da sua própria “cópia” (Fork).


**Pull request**

É uma proposta de alteração ao projeto.
Digamos que você fez um Fork em um projeto, descobriu um bug nele e acabou corrigindo, ou encontrou uma forma de melhorá-lo. Se a alteração efetuada for interessante para o projeto original, você pode enviar um Pull request, propondo que sua alteração seja anexada à ele.

Tem dúvida de como fazer um Pull request, confira [este vídeo do Suíssa](https://www.youtube.com/watch?v=E8MPe6tCMo8), exemplificando um pull request em 3min.

**Issues**
![print issues]({{assets}}/print-issues.jpg)

Issues podem ser erros, bugs, dúvidas, sugestões de novas  features e etc.

A parte de Issues é o seu canal de comunicação com os colaboradores e desenvolvedores do projeto.

Digamos que algo no projeto esteja com erro, você pode abrir uma issue e descrever o erro.
 
A issue deve ser aberta no projeto original, caso você abrir uma Issue no seu Fork, somente as pessoas que Forkaram essa sua versão irão acompanhar a discussão.




###Conclusão
A intenção do post não é lhe ensinar todos os comandos e todas as possibilidades que o git lhe dá, mas sim lhe introduzir nesse mundo para que você possa ler e estudar outros artigos com mais facilidade.

abaixo segue alguns links para você começar a estudar.

- [http://rogerdudler.github.io/git-guide/index.pt_BR.html](http://rogerdudler.github.io/git-guide/index.pt_BR.html)
- [https://www.codeschool.com/courses/try-git](https://www.codeschool.com/courses/try-git)
- [http://tableless.com.br/alguns-comandos-git/](http://tableless.com.br/alguns-comandos-git/)

Se você tiver sugestão de mais algum termo, deixe nos comentários que eu anexo ao post.




Dúvidas, comentários ou sugestões, deixe logo abaixo. :)
