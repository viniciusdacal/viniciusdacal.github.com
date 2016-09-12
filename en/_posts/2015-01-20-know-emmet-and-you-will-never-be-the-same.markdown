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

There is also an operator `$`, that works as an index:

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

You can also insert text inside tags, using closures `{}`, as the follow example:

{% highlight html %}
ul>li.item${This is the item $}*3
{% endhighlight %}

{% highlight html %}
<ul>
    <li class="item1">This is the item 1</li>
    <li class="item2">This is the item 2</li>
    <li class="item3">This is the item 3</li>
</ul>
{% endhighlight %}

##Installation
Check the [list](http://emmet.io/download/) of supported editors. Just select what editor you use, and you'll taken to an installation guide.

###Conclusion
Emmet saves you much time, that you would spend writing a bunch of HTML. But, It doesn’t stop here, these are just the main features, beyond them, there are a lot more you can see here: [docs.emmet.io/abbreviations/syntax/](http://docs.emmet.io/abbreviations/syntax/).

If you want to use Emmet to help you write CSS, check the docs here: [docs.emmet.io/css-abbreviations/](http://docs.emmet.io/css-abbreviations/).
Works in a similar way that I showed above.

Questions, comments or suggestions, leave below. :)


