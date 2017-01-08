---
layout: post
title:  "Integrando Mixpanel com React"
date:   2016-07-02 20:00:00
categories: redux react
bg: "react-mixpanel.jpg"
---
Recentemente lançamos a nova interface do [Planrockr](http://planrockr.com/),
feita em ReactJS. Nesse produto nós estamos utilizando o
[MixPanel](https://mixpanel.com/) para fazer tracking de ações do usuário.
Anteriormente nós fazíamos o tracking apenas pelo backend, já que a interface
era experimental e sabíamos que as chances eram grandes de o código dela ser
descartado.

![](https://d262ilb51hltx0.cloudfront.net/max/800/1*aw4IJt8TzFe9PimVPZxoYw.jpeg)

Para essa nova versão do Planrockr, nós decidimos levar o tracking de alguns
eventos para o frontend, já que no backend nós não tínhamos acesso a algumas
informações, como: Browser, localização, resolução de tela e etc…

Procurei algumas abordagens em react e acabei encontrando o
[react-mixpanel](https://www.npmjs.com/package/react-mixpanel)

> É possível fazer a integração em vanillaJS, sem utilizar uma lib própria para o
> React. Por conveniência e pela abordagem da lib, eu optei por utilizar o
react-mixpanel

A abordagem dele é bem interessante, por fornecer acesso à **API** do mixpanel
através do **context** dos components.

A instalação é bem simples. Antes de tudo, é preciso instalar as dependências:
{% highlight bash %}
npm i mixpanel-browser --save
npm i react-mixpanel --save
{% endhighlight %}

Após instalar as dependências, precisamos importar os módulos e colocar o código
de inicialização na nossa aplicação:

{% highlight js %}
import mixpanel from 'mixpanel-browser';
import MixpanelProvider from 'react-mixpanel';

mixpanel.init('YOUR_TOKEN');
{% endhighlight %}

Caso você já tenha um id para o seu usuário, utilize o método **identify** para
fazer o vínculo entre a sessão e o usuário cadastrado:

{% highlight js %}
if (!mixpanel.people._identify_called()) {
  mixpanel.identify(userId);
}
{% endhighlight %}

Em seguida, nós precisamos colocar o **MixpanelProvider** como um wrapper da
aplicação, passando para ele o nosso objeto **mixpanel**:

{% highlight jsx %}
ReactDOM.render(
  <MixpanelProvider mixpanel={mixpanel}>
    <App/>
  </MixpanelProvider>,
  document.getElementById('app')
);
{% endhighlight %}

Em cada componente que você for utilizar, é necessário declarar o mixpanel no
contextTypes:

{% highlight jsx %}
class App extends React.Component {
  componentDidMount() {
    this.context.mixpanel.track('App did mount.');
  }

  render() {
    return <span>This is the app!</span>;
  }
}

App.contextTypes = {
  mixpanel: PropTypes.object.isRequired
};
{% endhighlight %}

O disparo de eventos não se limita ao método **componentDidMount**. É possível
dispará-los dentro de outro método, ou na resposta de uma **promise** por
exemplo.

O objeto **mixpanel** que recebemos pelo **context** é o mesmo da docs do
próprio mixpanel, assim como o método **track** que estamos chamando para
disparar o evento. Para mais detalhes sobre o método **track**, acesse a
[docs](https://mixpanel.com/help/reference/javascript) do mixpanel.

*****

Gostou do post e achou útil? Ajude na divulgação para que mais pessoas tenham acesso :)

Tem alguma dica ou dúvida sobre o tema? deixe nos comentários abaixo :)

