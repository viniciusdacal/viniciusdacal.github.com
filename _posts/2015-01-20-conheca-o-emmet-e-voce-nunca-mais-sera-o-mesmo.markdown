---
layout: post
title:  "Conheça o Emmet e você nunca mais será o mesmo!"
date:   2015-01-20 22:50:00
categories: frontend html css
bg: "conheca-o-emmet.jpg"

---

Emmet, anteriormente conhecido como Zen Coding, é um plugin para editores de texto que adianta sua vida na hora de escrever HTML e CSS.


###Pode explicar melhor?
[Emmet](http://emmet.io/) é um plugin que você pode instalar no seu editor de texto favorito e lhe dá o superpoder de escrever HTML através de seletores CSS. Isso mesmo, seletores CSS! 

Você vai escrever div>img, vai apertar a tecla "TAB" e vai ver o seguinte código:

{% highlight html %}
<div><img src="" alt=""></div>
{% endhighlight %}
Maravilha, não é? Ele também funciona com classes e ids conforme o exemplo abaixo:

{% highlight html %}
div.wrapper>div#picture
{% endhighlight %}

{% highlight html %}
<div class="wrapper">
    <div id="picture"></div>
</div>
{% endhighlight %}

Além de funcionar com seletores CSS, ele também possui algumas outras opções, como o operador "*". Com ele você pode informar quantas vezes um determinado elemento deve se repetir, conforme o exemplo abaixo:

{% highlight html %}
ul>li*3
{% endhighlight %}

{% highlight html %}
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
{% endhighlight %}

Há também o operador "$", que funciona como um enumerador:

{% highlight html %}
ul>li.item$*3
{% endhighlight %}

{% highlight html %}
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
</ul>
{% endhighlight %}

Você também consegue inserir texto dentro das tags utilizando chaves "{}", conforme este exemplo:

{% highlight html %}
ul>li.item${Este é o item $}*3
{% endhighlight %}

{% highlight html %}
<ul>
    <li class="item1">Este é o item 1</li>
    <li class="item2">Este é o item 2</li>
    <li class="item3">Este é o item 3</li>
</ul>
{% endhighlight %}

##Instalação
Confira a [lista](http://emmet.io/download/) de editores suportados. É só clicar em cima do editor que você usa e você será levado a uma página no github ensinando a instalar.

###Conclusão
Emmet lhe poupa um tempo considerável, que você passaria escrevendo linhas e linhas de HTML.
Mas ele não para por ai, essas são apenas as principais features, além delas há muitas mais que você pode conferir aqui: [docs.emmet.io/abbreviations/syntax/](http://docs.emmet.io/abbreviations/syntax/).

Para usar as abreviações dele para css, confira a documentação: [docs.emmet.io/css-abbreviations/](http://docs.emmet.io/css-abbreviations/).
Funciona de uma forma muito parecida com a que eu mostrei nos códigos acima, vai ser fácil de você assimilar.

Dúvidas, comentários ou sugestões, deixe logo abaixo :)


