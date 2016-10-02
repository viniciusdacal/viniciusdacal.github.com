---
layout: post
title:  "Instalando plugins no Sublime Text!"
date:   2015-01-21 20:00:00
categories: frontend html css
bg: "instalando-plugins-no-sublime-text.jpg"

---

[Sublime Text](http://www.sublimetext.com/) é um editor de textos gratuito que lhe permite escrever código em várias linguagens. Além de ser um programa extremamente leve, ele também lhe da a opção de instalar plugins, o que é <del>a cereja</del>  o morango do bolo.

### Package Control

Como o próprio nome já diz, o Package Control será o seu controlador de pacotes. Com ele você poderá pesquisar, instalar e remover snippets, plug-ins e etc. Porém, o Package Control não vem junto com o sublime, mas instalá-lo é muito simples:

Vá no menu do programa e selecione `View > Show Console`. No console que será aberto cole o seguinte texto:

Se você estiver usando Sublime Text 2:
{% highlight bash %}
{ "import urllib2,os,hashlib; h = '2deb499853c4371624f5a07e27c334aa' + 'bf8c4e67d14fb0525ba4f89698a6d7e1'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')" | escape}
{% endhighlight %}

Caso esteja usando o Sublime Text 3:
{% highlight bash %}
{ "import urllib.request,os,hashlib; h = '2deb499853c4371624f5a07e27c334aa' + 'bf8c4e67d14fb0525ba4f89698a6d7e1'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)" | escape}
{% endhighlight %}
Feito isso, pressione `Enter` e aguarde até o fim da instalação.

Terminado a instalação, reinicie o Sublime e pressione `Cmd+Shift+P` . No campo que será aberto, digite “Install Package” e pressione  `Enter`.
Feito isso, pesquise o nome do Plugin que você deseja instalar, selecione-o e pressione  `Enter` novamente e aguarde até o fim da instalação.

### Conclusão

Plugins foram feitos para facilitar sua vida, eles são muito eficazes nisso se você souber usá-los. Procure achar os plugins que melhor se encaixam no seu workflow.

Várias listas com excelentes plugins podem ser facilmente encontradas fazendo uma simples pesquisa no Google.

Confira o post que eu fiz falando sobre o Emmet. Se você escreve HTML e CSS, esse deve ser seu primeiro plugin.

E vocês que já conheciam o Sublime e seus plugins, quais plugins vocês usam?

Dúvidas, comentários ou sugestões, deixe logo abaixo :)


