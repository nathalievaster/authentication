# API för att säkert skapa och logga in användare med autentisering
Ett enkelt REST-API byggt med Express, vilken hanterar registrering och inloggning av användare på ett säkert sätt med autentisering och hashade lösenord. Funktionalitet för GET och POST är implementerad.

## Installation
```bash
git clone https://github.com/nathalievaster/authentication.git
cd authentication
npm install -y
npm install express dotenv body-parser jsonwebtoken bcrypt sqlite3 cors
npm install nodemon --save-dev
```
Kör därefter installations-skriptet, och starta upp serven med npm run serve.

### Förklaring:

- `bcrypt` används för att hasha lösenord.
- `sqlite3` används som databas.
- `jsonwebtoken` är för token-hantering.
- `body-parser` används för att tolka JSON.
- `express` är serverramverket.
- `dotenv` för att läsa `.env`-variabler.
- `nodemon` för att automatiskt starta om servern vid kodändringar (endast i utveckling).


## API-endpoints

Nedan beskrivs hur du kan interagera med API:et:

| Metod | Ändpunkt         | Beskrivning                                                   |
|-------|------------------|---------------------------------------------------------------|
| GET   | `/api`           | En enkel test- eller infopunkt. Kan användas för ping/check. |
| POST  | `/api/register`  | Registrerar en ny användare. Kräver `username` och `password` i body. |
| POST  | `/api/login`     | Loggar in användaren och returnerar en JWT-token. Kräver `username` och `password`. |
| GET   | `/api/secret`    | Skyddad route som kräver giltig JWT-token i Authorization-header. |