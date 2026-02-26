let tg = window.Telegram.WebApp;

// Expand WebApp to full height
tg.expand();
tg.ready();

// Initial theme setup (optional tweaking based on TG theme)
const themeParams = tg.themeParams;
if (themeParams.bg_color) {
    document.documentElement.style.setProperty('--bg-color', themeParams.bg_color);
}

function updateValue(id, change, decimals) {
    let input = document.getElementById(id);
    let currentValue = parseFloat(input.value) || 0;

    let newValue = currentValue + change;

    if (newValue < 0) newValue = 0;

    // Formatting to specified decimal places
    if (decimals === 0) {
        input.value = Math.round(newValue);
    } else {
        input.value = parseFloat(newValue.toFixed(decimals));
    }
}

// Haptic feedback
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('light');
    });
});

document.getElementById('submit-btn').addEventListener('click', () => {
    // Collect data
    const grain = parseFloat(document.getElementById('grain').value) || 0;
    const milk = parseFloat(document.getElementById('milk').value) || 0;
    const cups250 = parseInt(document.getElementById('cups250').value) || 0;
    const cups400 = parseInt(document.getElementById('cups400').value) || 0;

    const data = {
        grain: grain,
        milk: milk,
        cups250: cups250,
        cups400: cups400
    };

    // Provide heavy haptic feedback on submission
    tg.HapticFeedback.notificationOccurred('success');

    // Send data back to the bot
    tg.sendData(JSON.stringify(data));

    // Optional: Try to close immediately, tg.sendData usually closes it anyway
    tg.close();
});
