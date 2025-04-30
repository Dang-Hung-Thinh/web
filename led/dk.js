  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCP2nZjHQ3RSnHObUJpZcUhkMAy-YJ62iA",
    authDomain: "iot-js-b5-b6.firebaseapp.com",
    projectId: "iot-js-b5-b6",
    storageBucket: "iot-js-b5-b6.firebasestorage.app",
    messagingSenderId: "857196008112",
    appId: "1:857196008112:web:a2adea493039b216e52175"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const temp = document.getElementById("temp");
database.ref("/TT_IOT/temp").on("value", function(snapshot ){
    let t = snapshot.val();
    temp.innerHTML = t + " °C";
    console.log(t); 
})

function updateLed(ledId, isOn) {
    const led = document.getElementById(ledId);
    

    // Tách số thứ tự từ ledId như led01 → "01"
    const ledNumber = ledId.replace("led", "").padStart(2, "0");
    const bulbKey = "BULB_" + ledNumber;

    if (isOn) {
        led.src = "light-bulb.png";
        
    } else {
        led.src = "lightbulb.png";
    
    }

    // Đảm bảo Firebase update đúng key
    firebase.database().ref("/TT_IOT").update({
        [bulbKey]: isOn ? 1 : 0
    });
}


// Gắn sự kiện cho 4 bóng đèn
for (let i = 1; i <= 4; i++) {
    const onBtn = document.getElementById(`led0${i}on`);
    const offBtn = document.getElementById(`led0${i}off`);
    const bulbKey2 = `BULB_0${i}`;
    const ledId = `led0${i}`;
    database.ref(`/TT_IOT/${bulbKey2}`).on("value", function(snapshot) {
        const value = snapshot.val();
        const led = document.getElementById(ledId);

        if (led) {
            led.src = value === 1 ? "light-bulb.png" : "lightbulb.png";
            console.log(`LED ${i} is now ${value === 1 ? 'ON' : 'OFF'}`);
        }
    });

    onBtn.onclick = () => updateLed(ledId, true);
    offBtn.onclick = () => updateLed(ledId, false);
}

