const TelegramBot = require('node-telegram-bot-api');

const token = '7919726037:AAFwbEUnvRhHoABTvE4R1iXNRDp7aGJgJ1c';
const channelId = '-1002660153315';
const myId = 1847053473;

const bot = new TelegramBot(token, { polling: true });

// Отправим тестовое сообщение в канал при запуске
bot.sendMessage(channelId, 'Бот успешно подключен к каналу!');

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://black0101.github.io/-mafia-game/web-app/';

    bot.sendMessage(chatId, 'Добро пожаловать в игру Мафия!', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Играть', web_app: { url: webAppUrl } }]
            ]
        }
    });
});

// Обработка данных от Web App
bot.on('message', (msg) => {
    if (msg.web_app_data) {
        const data = JSON.parse(msg.web_app_data.data);
        console.log('Получены данные от Web App:', data);
        
        // Здесь будет логика обработки данных от веб-приложения
        if (data.action === 'start_game') {
            bot.sendMessage(msg.chat.id, 'Игра начинается!');
        }
    }
    
    // Ответ на личные сообщения
    if (msg.chat.id == myId) {
        bot.sendMessage(msg.chat.id, 'Привет! Бот работает и может писать в канал.');
    }
}); 