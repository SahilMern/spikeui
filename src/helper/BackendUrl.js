const backendUrl = `http://54.160.223.57:3000`; // Base backend URL

// API Endpoints
const startBot = `${backendUrl}/api/bot/startbot`;
const stopBot = `${backendUrl}/api/bot/stopbot`;
const botStatus = `${backendUrl}/api/bot/statusBot`;
const setprice = `${backendUrl}/api/bot/setPrice`;
const getPrice = `${backendUrl}/api/bot/getPrices`;

export { backendUrl, startBot, stopBot, botStatus, setprice, getPrice };
