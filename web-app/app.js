// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Получаем данные пользователя
const user = tg.initDataUnsafe?.user;

// Функция для добавления игрока в список
function addPlayer(player) {
    const playersList = document.getElementById('players-list');
    const playerElement = document.createElement('div');
    playerElement.className = 'player';
    playerElement.textContent = `${player.first_name} ${player.last_name || ''}`;
    playersList.appendChild(playerElement);
}

// Добавляем текущего пользователя в список
if (user) {
    addPlayer(user);
}

// Обработчик кнопки "Начать игру"
document.getElementById('start-game').addEventListener('click', () => {
    tg.sendData(JSON.stringify({
        action: 'start_game',
        user: user
    }));
});

// Обработка входящих данных от бота
tg.onEvent('mainButtonClicked', function() {
    tg.sendData(JSON.stringify({
        action: 'main_button_clicked',
        user: user
    }));
});

// Получение доступа к камере и отображение локального видео
const localVideo = document.getElementById('localVideo');
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
        // Здесь в будущем будем отправлять stream другим игрокам через WebRTC
    })
    .catch(err => {
        alert('Не удалось получить доступ к камере/микрофону: ' + err);
    }); 