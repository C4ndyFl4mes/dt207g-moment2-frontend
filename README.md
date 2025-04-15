# Webbapplikation
## Publicerad
Den här [webbsidan](https://dt207g-m0ment2-frontend.netlify.app/) är publicerad på Netlify för att helt och hållet inte finnas med i Render där databasen och API:et ligger. 
## Beskrivning
Webbapplikationen hanterar en databas som i sin tur hanterar CV-information med hjälp av ett API: [Repo](https://github.com/C4ndyFl4mes/dt207g-moment2-backend), [URL](https://dt207g-moment2-backend.onrender.com/cv).
Applikationen ger ett användargränsnitt för fetch-anropen till API:n så som en lista, lägga till- och uppdateringsformulär, samt en raderingsfunktion.

På startsidan listas alla rader från databasen, användaren kan klicka på en rad för att få upp ett "popup-fönster" (inte ett nytt webbläsarfönster) med ett formulär och en knapp för att uppdatera respektive radera.
På lägga till-sidan finns ett formulär för att lägga till ny CV-information, när formuläret (det är inget form element) "skickas" förflyttas användaren till startsidan och där visas den nya raden.
På om-sidan finns det bara en beskrivning och slutsats om sidan och uppgiften.

Webbapplikationen hanterar felmeddelanden som skickas från API:et. Jag tror dock att de flesta felmeddelanden jag skrev i API:et kommer aldrig fram till användaren, men de viktigaste gör det. T.ex. tomma fält och att inledningsdatumet kan inte vara efter avslutningsdatumet.
## Översikt av koden
Applikationen är skriven i TypeScript. Det finns två Interfaces, ICVItem och IError. Det finns en klass, CVList, för att hantera listan. En utility-klass, API, som hanterar fetch-anrop och returnerar eventuella felmeddelanden.
En annan utility-klass som heter Main och den binder samman gränssnittet med applikationen.
