// Check if the browser supports the Notifications API
if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    });
}

function showNotification() {
    if ('Notification' in window) {
        // Check if the user has granted permission to show notifications
        if (Notification.permission === 'granted') {
            // Create a notification
            var notification = new Notification('PWA Notification', {
                body: 'Please install IPSOS Application!',
                icon: '/images/ipsos-pwa.png'
            });

            // Close the notification after 5 seconds
            setTimeout(function () {
                notification.close();
            }, 5000);
        } else if (Notification.permission === 'denied') {
            console.warn('Notification permission is denied. You may need to update your browser settings.');
        } else {
            // If the user hasn't decided yet, ask for permission
            Notification.requestPermission().then(function (permission) {
                if (permission === 'granted') {
                    showNotification();
                }
            });
        }
    }
}
