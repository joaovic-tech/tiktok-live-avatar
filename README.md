# tiktok-live-avatar

[![Em Desenvolvimento](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)](https://github.com/joaovic-tech/tiktok-live-npm)
[![Licença](https://img.shields.io/badge/Licença-GNU%20GENERAL%20PUBLIC%20LICENSE%20Version%203-blue)](./LICENSE)

Irei criar um avatar interativo com o chat ao vivo no tiktok, onde qualquer pessoa que mandar algum comando seja ele `chat/gift` irar fazer alguma determinada coisa.

---

### Como vai funcionar o avatar?
* Irei criar vários vídeos onde cada um dele terá uma função
* Vamos dar um exemplos com as lives que está em alta chamadas de `live npc`
* Para cada **chats/gifts** que mandarem na live o servidor irar enviar os dados para um arquivo [JSON](./apps/server/live-messages.json).
* Com esses dados do arquivo json o avatar irar verificar o que ele irar fazer a parte de uma estrutura de decisão.
* Caso por exemplo seja um gift de banana, o avatar, irar falar "Banana". :/

---

### Requisitos do sistema
* [ ] Se conectar com a api do `tiktok-live-connector`
* [ ] Pegar o nome do usuário da live.
  * Caso a live for encerrada ou não foi encontrado o nome do usuário o programa para de ser executado e o avatar encerra a live.
* [ ] Enviar para o arquivo `JSON` todos os **chats/gifts** com o nome do usuário que o enviou-o

---

### Requisitos do avatar
* [ ] Ter todos os possíveis comandos necessários para gerar um entretecimento agradável
* [ ] Ler o chat e os gift que chagam até ele
* [ ] Interagir com o publico
* [ ] Fazer algo com os comandos que são solicitados.

---

### Funcionalidades do avatar

* Em relação com os **gift's**
  * Irar falar `nome do presente` e aparecerá o `presente` em sua mão
* Verificar se o usuário está de malicia, se estiver o avatar irar ter uma personalidade peculiar.
* Se alguém xingar o avatar ele irar ficar triste e terá um contador, esse contador se chegar no número entre 15 há 20 xingamentos o avatar ficará bravo, e o contador restaura para zero.
* Esses xingamentos serão mais ou menos assim:
  * Mensagem do usuário: que avatar ruim ou robô lixo e etc...
* Caso ninguém interaja com o avatar durante 25 segundos, ele irar falar `Ninguém vai responder não é, então vou ativar o modo aleatório` e ficar falando palavras aleatórias
