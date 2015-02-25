---
layout: post_en
title:  "Know Emmet and you will never be the same!"
date:   2015-01-20 22:50:00
categories: frontend html css
bg: "conheca-o-emmet.jpg"

---

Previously known as Zen Coding,[Emmet](http://emmet.io/) is a plugin for text editors that makes your life easier when you have to write HTML and CSS.


###Could you explain?
It is a plugin that you can install in your favorite text editor and gives you a superpower to write HTML by CSS selectors. That's it, CSS selectors!

You'll write `div>img`, hit `TAB` and the follow HTML appears:

{% highlight html %}
<div><img src="" alt=""></div>
{% endhighlight %}
That's wonderful, don't you think? It works with `class` and `IDs` too, as the below example:

{% highlight html %}
div.wrapper>div#picture
{% endhighlight %}

{% highlight html %}
<div class="wrapper">
    <div id="picture"></div>
</div>
{% endhighlight %}

In addition to work with CSS selectors, It also works with another options, like the `*` operator. With it, you can say how many times some tag will be repeated, as the follow example:

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


