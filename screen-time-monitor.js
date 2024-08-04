document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const menuOptions = document.getElementById('menu-options');
    const customAlertsBtn = document.getElementById('custom-alerts-btn');
    const trackActivityBtn = document.getElementById('track-activity-btn');
    const sendFeedbackBtn = document.getElementById('send-feedback-btn');
    const howToGuideBtn = document.getElementById('how-to-guide-btn');
    const alertSettings = document.getElementById('alert-settings');
    const activityTracker = document.getElementById('activity-tracker');
    const setAlertBtn = document.getElementById('set-alert-btn');
    const countdownDisplay = document.getElementById('countdown');
    const alertSound = document.getElementById('alert-sound');

    let alertTimeout;
    let countdownInterval;

    menuBtn.addEventListener('click', () => {
        menuOptions.style.display = menuOptions.style.display === 'none' ? 'block' : 'none';
    });

    customAlertsBtn.addEventListener('click', () => {
        alertSettings.style.display = 'block';
        activityTracker.style.display = 'none';
    });

    trackActivityBtn.addEventListener('click', () => {
        alertSettings.style.display = 'none';
        activityTracker.style.display = 'block';
    });

    sendFeedbackBtn.addEventListener('click', () => {
        alert('Feedback feature is under development.');
    });

    howToGuideBtn.addEventListener('click', () => {
        alert('How to guide is under development.');
    });

    setAlertBtn.addEventListener('click', () => {
        const interval = document.getElementById('alert-interval').value;
        if (interval && interval > 0) {
            const alertInterval = interval * 60 * 1000; // Convert minutes to milliseconds
            const alertTime = Date.now() + alertInterval;

            if (alertTimeout) {
                clearTimeout(alertTimeout);
                clearInterval(countdownInterval);
            }

            alertSettings.querySelector('#countdown').style.display = 'block';
            updateCountdown(alertTime);

            alertTimeout = setTimeout(() => {
                if (Notification.permission === 'granted') {
                    new Notification('Break Reminder', { body: 'Time to take a break!' });
                } else {
                    alert('Time to take a break!');
                }

                // Play the alert sound
                if (alertSound) {
                    alertSound.play().catch(error => console.error('Error playing sound:', error));
                }

                alertSettings.querySelector('#countdown').style.display = 'none';
            }, alertInterval);

            countdownInterval = setInterval(() => {
                updateCountdown(alertTime);
            }, 1000);

            alert('Alert set successfully!');
        } else {
            alert('Please enter a valid interval.');
        }
    });

    function updateCountdown(targetTime) {
        const now = Date.now();
        const distance = targetTime - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerText = '00:00:00';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownDisplay.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Request notification permission if not granted
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                alert('Notifications are required for this app to function properly.');
            }
        });
    }
});
