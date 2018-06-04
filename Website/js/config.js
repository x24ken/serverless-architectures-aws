require('dotenv').config();

const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENTID;


var configConstants = {
	auth0: {
		domain: domain,
		clientId: clientId
	},
  apiBaseUrl: 'https://API-GATEWAY-URL/dev'
};