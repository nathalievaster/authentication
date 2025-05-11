# API för att säkert skapa och logga in användare med autentisering
Ett enkelt REST-API byggt med Express, vilken hanterar registrering och inloggning av användare på ett säkert sätt med autentisering och hashade lösenord. Funktionalitet för GET och POST är implementerad.

## Installation
```bash
git clone https://github.com/nathalievaster/authentication.git
cd authentication
npm install -y
npm install express dotenv body-parser jsonwebtoken bcrypt sqlite3
npm install nodemon --save-dev
```

## Funktionaliteter

- Hashade lösenord med bcrypt
- JWT's (JSON Web Token)
- SQlite3 som databas

