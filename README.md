# Test Frontend

![Logo ProntoPro.it](https://www.prontopro.it/bundles/prontoprofrontend/img/logo.png)

## Istruzioni

Il test consiste nella ralizzazione di due pagine:
- Una dinamica con forms, chiamate ajax e manipolazione del DOM.
- Una statica per la realizzazione di un mockup dettagliato.

Le pagine devono essere realizzate secondo standards e best practices, con decente compatibilità cross-browser e in modo adatto alla fruizione su dispositivi mobili.

Entrambe le pagine condividono header e footer.
![header](http://prontoproit.github.io/FrontendTest/img/header.png) ![footer](http://prontoproit.github.io/FrontendTest/img/footer.png)

### Pagina Dinamica

![mockup](http://prontoproit.github.io/FrontendTest/img/mockup1.png)

Nella sezione centrale c'è un campo con autocomplete le cui voci sono caricate attraverso una chiamata ajax secondo lo standard jsonp all'indirizzo:  
`http://prontoproit.github.io/FrontendTest/autocomplete?callback=<nome_della_callback>`

L'oggetto ritornato è nella forma:

```
[
  {
    "label": <label>,
    "url": <url>
  }, ...
]
```

In cui `<label>` è l'etichetta della suggestion da mostrare nell'autocomplete e `<url>` è l'indirizzo da cui ottenere le specifiche del form da renderizzare.

Al momento della selezione di una tipologia di form dall'autocomplete bisogna renderizzarlo ottenendo le specifiche con una chiamata ajax secondo lo standard jsonp all'url ottenuto allo step precedente.

L'oggetto ritornato è nella forma:

```
[
  {
    "name": <name>,
    "label": <label>,
    "type": <type>,
    "rules": [
      {
        "type": <rule_type>,
        "msg": <error_message>,
        "options": <optional_parameters>
      }, ...
    ]
  }, ...
]
```

(vedere [form1](http://prontoproit.github.io/FrontendTest/form1), [form2](http://prontoproit.github.io/FrontendTest/form2), [form3](http://prontoproit.github.io/FrontendTest/form3) per riferimento ai possibili valori)

![mockup](http://prontoproit.github.io/FrontendTest/img/mockup2.png)

Quando viene cliccato il bottone di submit deve essere effettuata la validazione secondo le regole espresse in `rules`, mostrando eventuali messaggi di errore.

Se il form passa la validazione i valori devono essere visualizzati nella colonna di destra. 

Bonus:
- Possibilità di eliminare una delle precedenti submission.
- Possibilità di ricaricare i dati di una submission passata cliccandoci sopra.

### Pagina statica

Realizzare la pagina del seguente mockup:

![mockup](http://prontoproit.github.io/FrontendTest/img/static.png)

## Valutazione

I primari oggetti di valutazione sono:
- Completezza rispetto alle specifiche.
- Organizzazione, pulizia e stile.

Inoltre verranno considerate le scelte fatte:
- Uso di un preprocessore (JS e/o CSS).
- Uso di librerie e frameworks (JS e/o CSS).
- Automatizzazione del processo di build.
- Eventuale integrazione di meccanismi di testing e/o linting.

(Dove ritenuto opportuno motivare le scelte effettuate)

## Modalità di consegna

Effettuare una fork di questa repository, realizzare le pagine richieste e, a compito eseguito, iniziare una pull request.

