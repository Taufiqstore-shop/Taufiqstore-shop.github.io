// ================= FIREBASE IMPORT =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// ================= CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyCmnfh6p5yG5TU98Wmv3ktrnL0NxCaSZZQ",
  authDomain: "databse-c8850.firebaseapp.com",
  projectId: "databse-c8850",
  storageBucket: "databse-c8850.firebasestorage.app",
  messagingSenderId: "768418021481",
  appId: "1:768418021481:web:2d9c93d26cbc518cc962f8"
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= JAM REALTIME =================
setInterval(() => {
  const t = new Date().toLocaleTimeString("id-ID");
  document.getElementById("time").innerText = t;
}, 1000);

// ================= INFO SERVER (FAKE TAPI JALAN) =================
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
  document.getElementById("cpu").innerText = rand(5, 45) + "%";
  document.getElementById("ram").innerText = rand(4, 17) + " GB";
  document.getElementById("server").innerText = "Cloudflare";
  document.getElementById("region").innerText = "Asia";
  document.getElementById("model").innerText = "AMD Ryzen VPS";
}, 2000);

// ================= ORDER REALTIME =================
const orderList = document.getElementById("orderList");

const q = query(collection(db, "orders"), orderBy("waktu", "desc"));

onSnapshot(q, (snap) => {
  orderList.innerHTML = "";

  if (snap.empty) {
    orderList.innerHTML = "<p>Belum ada order.</p>";
    return;
  }

  snap.forEach((docSnap) => {
    const o = docSnap.data();

    orderList.innerHTML += `
      <div class="order-box">
        <p><b>Game:</b> ${o.game}</p>
        <p><b>ID:</b> ${o.userId}</p>
        <p><b>Diamonds:</b> ${o.diamonds}</p>
        <p><b>Harga:</b> Rp ${o.harga}</p>
        <p><b>Email:</b> ${o.email}</p>
        <p><b>Status:</b> ${o.status}</p>

        <button onclick="setStatus('${docSnap.id}','proses')">PROSES</button>
        <button onclick="setStatus('${docSnap.id}','sukses')">SUKSES</button>
        <button onclick="setStatus('${docSnap.id}','gagal')">GAGAL</button>
      </div>
    `;
  });
});

// ================= UPDATE STATUS =================
window.setStatus = async (id, status) => {
  await updateDoc(doc(db, "orders", id), {
    status: status
  });
};
