require('dotenv').config();
const express = require('express');
const OAuthClient = require('intuit-oauth');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173' // Replace with the origin of React app
  }));

const oauthClient = new OAuthClient({
    clientId: process.env.CLIENT_ID, 
    clientSecret: process.env.CLIENT_SECRET, 
    environment: process.env.ENVIRONMENT,
    redirectUri: process.env.REDIRECT_URL
});

app.get('/auth', (req, res) => {
   
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: 'Init' ,
    });
    
    res.send(authUri);
});


app.get('/callback', async (req, res) => {
    const parseRedirect = req.url;

    try {
       
        const authResponse = await oauthClient.createToken(parseRedirect);
        
        res.redirect('/payments');
        // console.log(authResponse)
        // res.send(JSON.stringify(authResponse))
        
    } catch (e) {
        console.error('Error', e);
    }
});


app.get('/payments', async (req, res) => {
    try {
       
        const response = await oauthClient.makeApiCall({
            url: `https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365204835180/query?query=select * from Payment&minorversion=40`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        res.json(JSON.parse(response.body));
    } catch (e) {
        console.error(e);
    }
});


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});