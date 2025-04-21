function saveChanges() {
    const orDay = document.getElementById('or-day').value;
    const bonesDay = document.getElementById('bones-day').value;
    const orAnesthesia = document.getElementById('or-anesthesia').value;
    const bonesAnesthesia = document.getElementById('bones-anesthesia').value;

    localStorage.setItem('or_day', orDay);
    localStorage.setItem('bones_day', bonesDay);
    localStorage.setItem('or_anesthesia', orAnesthesia);
    localStorage.setItem('bones_anesthesia', bonesAnesthesia);

    alert("تم حفظ التغييرات بنجاح!");
  }

  function loadData() {
    const orDay = localStorage.getItem('or_day');
    const bonesDay = localStorage.getItem('bones_day');
    const orAnesthesia = localStorage.getItem('or_anesthesia');
    const bonesAnesthesia = localStorage.getItem('bones_anesthesia');

    if (orDay) document.getElementById('or-day').value = orDay;
    if (bonesDay) document.getElementById('bones-day').value = bonesDay;
    if (orAnesthesia) document.getElementById('or-anesthesia').value = orAnesthesia;
    if (bonesAnesthesia) document.getElementById('bones-anesthesia').value = bonesAnesthesia;
  }

  window.onload = loadData;











   // Firebase Configuration
   const firebaseConfig = {
    apiKey: "AIzaSyA9TSettE09gSjj-tQ9ODEn5hDoQhLTldo",
    authDomain: "hospital-operations.firebaseapp.com",
    databaseURL: "https://hospital-operations-default-rtdp.firebaseio.com/",
    projectId: "hospital-operations",
    storageBucket: "hospital-operations.firebasestorage.app",
    messagingSenderId: "1003511769993",
    appId: "1:1003511769993:web:c039f96b8f4a5586830f58",
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // Save Data Function
  function saveData() {
    const data = {
      oram: {
        doctor: document.getElementById('doctor-oram').value,
        day: document.getElementById('day-oram').value,
        anesthesia: document.getElementById('anesthesia-oram').value,
      },
      azam: {
        doctor: document.getElementById('doctor-3zam').value,
        day: document.getElementById('day-3zam').value,
        anesthesia: document.getElementById('anesthesia-3zam').value,
      }
    };

    firebase.database().ref('dynamicSchedule').set(data)
      .then(() => alert('تم الحفظ بنجاح'))
      .catch(err => alert('خطأ: ' + err));
  }

  // Load Data Live
  firebase.database().ref('dynamicSchedule').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      document.getElementById('doctor-oram').value = data.oram?.doctor || '';
      document.getElementById('day-oram').value = data.oram?.day || '';
      document.getElementById('anesthesia-oram').value = data.oram?.anesthesia || '';

      document.getElementById('doctor-3zam').value = data.azam?.doctor || '';
      document.getElementById('day-3zam').value = data.azam?.day || '';
      document.getElementById('anesthesia-3zam').value = data.azam?.anesthesia || '';
    }
  });