---
title:  "Como deixar o terminal do Mac Colorido."
date:   2015-02-09 20:00:00
categories: iniciante
language: "pt-BR"
image: "../__legacy-img/como-deixar-o-terminal-do-mac-colorido.jpg"
---

Quando você começa a usar o terminal (linha de comando), sente aquela dificuldade de apenas bater o olho e saber o que está acontecendo ali. Bem, que tal se você pudesse adicionar um pouco de cor para diferenciar mais facilmente uma coisa da outra?

Se você precisa usar muito o terminal, nada melhor do que tonar ele o mais amigável possível, abaixo vou explicar algumas coisas que podem tonar sua experiência muito mais agradável.

### Habilitando as cores
Por padrão, o terminal não vem com as cores abilitadas, para abilitá-las, faça o seguinte:
Abra o terminal e digite `vim .bash_profile`
Cole as seguintes linhas:

{% highlight bash %}
export PS1="\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\h:\[\033[33;1m\]\w\[\033[m\]\$ "
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
alias ls='ls -GFh'{% endhighlight %}

Pressione `ESC`, depois `:wq` e `ENTER` para salvar a alteração.
Feito isso, basta reiniciar seu terminal para ver o resultado.


### Temas
Se as cores padrão não lhe agradarem muito, pesquise outros temas.
Eu gosto de usar o Dracula [https://github.com/zenorocha/dracula-theme](https://github.com/zenorocha/dracula-theme#terminalapp)

A instalação é bem simples:

**Terminal**

1. Baixe o arquivo .ZIP
2. No Terminal, selecione a aba `Terminal > preferências`
3. Seleciona acaba `Perfis`
4. Clique no ícone <span class="fa fa-cog"></span>
5. Clique em `Importar`
6. Selecione o arquivo terminal/Dracula.terminal
7. Selecione ele na lista e clique no botão `Padrão`


**iTerm2**

1. Baixe o arquivo .ZIP
2. No iTerm2 vá em  `Preferences > Profiles`
3. Selecione a aba `Colors`
4. Clique no botão `Load Presets`.
5. Clique em `Import`.
6. Selecione o arquivo `iterm/Dracula.itermcolors`
7. Selecione o  Dracula em  `Load Presets`.


Se você quiser mais temas para o iTerm2, acesse o link
[http://iterm2colorschemes.com/](http://iterm2colorschemes.com/)

Dúvidas, comentários ou sugestões, deixe logo abaixo. :)
