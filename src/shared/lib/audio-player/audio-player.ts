
const sounds = {
    metronome_1(){
        const audioCtx = new window.AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Настраиваем узлы
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Частота 440 Гц
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); // Громкость 50%

        // Соединяем узлы
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Запускаем генерацию звука
        oscillator.start();

        // Останавливаем звук через 200 мс
        setTimeout(() => {
            oscillator.stop();
            audioCtx.close(); // Закрываем контекст после остановки осциллятора
        }, 200);
    },
    metronome_2(){
        const audioCtx = new window.AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Настраиваем узлы
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(840, audioCtx.currentTime); // Частота 840 Гц
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); // Громкость 50%

        // Соединяем узлы
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Запускаем генерацию звука
        oscillator.start();

        // Останавливаем звук через 200 мс
        setTimeout(() => {
            oscillator.stop();
            audioCtx.close(); // Закрываем контекст после остановки осциллятора
        }, 200);
    },
}

export const AudioPlayer = {

    playSound(sound: keyof typeof sounds) {


        sounds[sound]();
    }
}