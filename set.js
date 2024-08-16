const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVqTUdaV2VHOEk2QzR1U0NBUkRUcllVczhlVGZBdWJudjgrbnpWVHNrRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieWdOZUp1TjEvZlJ6SSt3Nkl6UU83aWRtY3c4ZW1HcmNCalBtSG9rQmlFOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRzJPa29ZMUtncGVBcjZJZDJNQ3BYT3lURVFMcHovOE4zektDUW1LQTNjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDVE51MEpqYVFSMU5QaXo0Qm9IMUI0VUlsVjFocXVTS3dnakxoZHlpUTBBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhLbGlOQXVUajllbDk4Z3J5MHYxRzhpVmJwL2RheVZIQkhYd1JwZ044MUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkwrbFZ1L090QUpFWUcwNTNKd3NwK3BjblFUSlVHSkUvM05UM29IV01NQ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0wvVlpjRjcxL1VzOWVTUHhRdlFaK0V1YkwvMWdtaUVhbDJoRXU3RDIwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGZXQmN0STU5azVRemt5VGd5YlhrT0E5YndEY2xMUm5ZMktFQ1JrRm4wYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijd2SnBhNmRtUFE1QkZBaVBhTEVFeHJ6aVhya1VHRHNLMHB2WGk0V1BMd3czNm9wdDRBMlBMZVhieWJpL2hrYjUrejNtY045S2REOUk2R1c2NGxScEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJjaEljUzVjSHZFM0dITkxHMk50K1Z6SHVaVFg3VkJUNFQ2MEIzY1NIbzhJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHcHNWMHNKbVNsV1Eya2tSbkxyWjl3IiwicGhvbmVJZCI6IjMyNzcyMTQwLWZjYjMtNGI4Yy1hNTdkLTQ5ZjdhMGM1MWI5YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTDBEcjFacmFDZGx0eFRHTlRpOGJ1SDJGYms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzFVWnhDdmdDZVRuTUtSSDU2WnVTZ2lDY0VzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVIRjFLTDQ5IiwibWUiOnsiaWQiOiI5MjMzMDgzNjM0MzM6NDNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01LMjZvY0hFS09RKzdVR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjRLZVRYbXdCM0pibTRPTExlb2V0cHRPNDlIWTcvS3R6MmU2dURMYzJnZ1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im0yUU5oTmsvUVkreHZPWjJPR0tRSkVHYW1uZmJ1cGloTGx3UjRWa3NpOGdIUHdiaVdSOWJXRTdEOEQ1eFlvWlFoeEgvQTNWVHc2eFg5MEFXdmVXSkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwNjhTNHg5UmxGTTVmTmlTQ2VjYkRVMHJqdUxiVHpLQWxkRDk0TnJHRkRuaUtHUElvMENZSkJuUlJsZTRqM0xoL1ZYckdiKzlTZVJqN0szN2RyWE5CQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzMwODM2MzQzMzo0M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlQ25rMTVzQWR5VzV1RGl5M3FIcmFiVHVQUjJPL3lyYzludXJneTNOb0lHIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNzc5MTIwfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "U M A R I BOT",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923308363433",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'U M A R I MD BOT',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
