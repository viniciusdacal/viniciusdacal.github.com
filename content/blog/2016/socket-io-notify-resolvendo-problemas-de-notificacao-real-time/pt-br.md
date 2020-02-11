---
title: Socket.IO Notify — Resolvendo problemas de notificação real-time
identifier: "socket-io-notify-resolvendo-problemas-de-notificacao-real-time"
description: >-
  No final do ano passado, em dois de nossos projetos na Coderockr, surgiu a
  necessidade de termos uma comunicação real-time entre o servidor…
date: '2016-02-23T16:04:16.960Z'
categories: []
keywords: []
language: "pt-br"
image: "../../__legacy-img/socket-io-notify.jpg"
---

No final do ano passado, em dois de nossos projetos na [Coderockr](http://www.coderockr.com), surgiu a necessidade de termos uma comunicação real-time entre o servidor e o browser.

A primeira tecnologia que veio em mente foi [websockets](https://developer.mozilla.org/pt-br/docs/WebSockets), que possibilita a comunicação bidirecional entre server e client.

Por questões de suporte à browsers e facilidade na implementação optamos por utilizar [socket.io](http://socket.io/), uma lib client/server que utiliza websockets e fornece uma api bem amigável, além de fallbacks para browsers legados.

Para o servidor, criamos um script em nodeJS que é todo configurado através de variáveis de ambiente, e publicamos ele open source no github com o nome de [Socket.io-notify](https://github.com/viniciusdacal/socket.io-notify).

### Instalação

Para utilizá-lo, basta clonar o repositório, ir até a pasta do projeto e com o **node >= 4.3.1** instalado, rodar:

**npm install**

As seguintes variáveis de ambientes devem ser configuradas:

**PORT:** a porta que será executada o node
**NOTIFICATION\_SECRET:** uma chave única que será utilizada para disparar as notificações.
**NOTIFICATION\_KEY:** uma chave pública que será utilizada para habilitar a conexão entre browser e o websocket.

Em caso de **HTTPS**:

**SSL\_CERT:** Caminho do certificado SSL
**SSL\_KEY:** Chave SSL

Após configuradas as variáveis de ambiente, vá até a pasta do projeto e execute:

**node .**

Com o servidor executando, basta configurar a integração com o seu projeto.

document.addEventListener("DOMContentLoaded", function(event) {
  var socket = io.connect('**127.0.0.1**:**3000**', {
    query: 'notificationKey=**NOTIFICATION\_KEY**'
  });
  socket.on('**NEW\_NOTIFICATION**', function (notification) {
    console.log(notification);
  });

  socket.emit('join', '**SOME\_CHANNEL**');
});

No exemplo acima, estamos considerando que a aplicação está rodando no host **127.0.0.1** e na porta **3000**

Também estamos considerando que a **NOTIFICATION\_KEY** do servidor seja “**NOTIFICATION\_KEY”** que é o valor default.

**NEW\_NOTIFICATION** é o nome do evento disparado pelo server quando envia a notificação e não deve ser alterado.

**SOME\_CHANNEL** é o nome do canal que estamos conectando, que poderia ser o email ou nome de usuário, ou uma HASH feita a partir desses dados. Sua aplicação no client e no server precisarão ter conhecimento desse valor.

### Disparando as notificações

para disparar as notificações, basta fazer uma requisição **POST** para o socket.io-notify, com o channel que pode ser uma string ou um array de strings, e o conteúdo da notificação, que pode ser uma string ou um objeto JSON

$ curl --request POST '**http://127.0.0.1:3000**/send' --header notification\_secret:**NOTIFICATION\_SECRET** --data 'notification=**notificationexample**&channel=**SOME\_CHANNEL**'

No caso de enviar para múltiplos canais, basta enviar channel como array

$ curl --request POST '**http://127.0.0.1:3000**/send' --header notification\_secret:**NOTIFICATION\_SECRET** --data 'notification=**notificationexample**&channel\[\]=**SOME\_CHANNEL**&channel\[\]=**ANOTHER\_CHANNEL**'

### Angular

Se você utiliza angular, é possível utilizar o [angular-socket.io](https://github.com/btford/angular-socket-io) para facilitar a integração no Frontend.

Sugestões são bem vindas, basta abrir uma issue no [repositório do projeto](https://github.com/viniciusdacal/socket.io-notify)
