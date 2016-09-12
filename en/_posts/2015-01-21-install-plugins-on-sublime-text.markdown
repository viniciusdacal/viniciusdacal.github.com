---
layout: post_en
title:  "Install plugins on Sublime Text!"
date:   2015-03-26 20:00:00
categories: frontend html css
bg: "instalando-plugins-no-sublime-text.jpg"

---

[Sublime Text](http://www.sublimetext.com/) is a free text editor that gives you freedom to code in many programming languages. Above that, It is a very lightweight program and it is also possible install some plugins, that is particularly the best part.

###Package Control

As the name says, Package Control is your Package Controller, with it, you can search, install and remove snippets, plugins, etc…

Package Control doesn't come with sublime installer, but it’s very simple to install it:

Go to menu program and select `View > Show Console`, in the console that will appears, paste the text below:

If you are in Sublime Text 2:
{% highlight bash %}
{ "import urllib2,os,hashlib; h = '2deb499853c4371624f5a07e27c334aa' + 'bf8c4e67d14fb0525ba4f89698a6d7e1'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')" | escape}
{% endhighlight %}

If you are in Sublime Text 3:
{% highlight bash %}
{ "import urllib.request,os,hashlib; h = '2deb499853c4371624f5a07e27c334aa' + 'bf8c4e67d14fb0525ba4f89698a6d7e1'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)" | escape}
{% endhighlight %}
When It done, press `Enter` and wait the installation finish.

Restart Sublime Text and press `Cmd+Shift+P`. In the input that appears, type “Install Package” and press `Enter`.

Search for the plugin name that you want to install, select it, press `Enter` again and wait for the installation.

###Conclusion

Plugins were made to make your life easier, they are very effective if you would know to use them. Try to find the plugins that best fit in your workflow.

You can easily find many lists with excellent sublime plugins just googling.

Take a look at the [post that I wrote about Emmet]({{site.baseurl}}/en/frontend/html/css/2015/01/20/know-emmet-and-you-will-never-be-the-same.html). If you write HTML and CSS, this should be your first plugin.

And you that already knew Sublime, which plugins do you use?

Questions, comments or suggestions, leave below. :)


