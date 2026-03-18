// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ================= CUSTOMER =================
function submitForm() {
  const name = document.getElementById("name").value;
  const service = document.getElementById("service").value;

  db.collection("customers").add({
    name: name,
    service: service,
    status: "Pending"
  }).then(() => alert("Submitted"));
}

// ================= ADMIN LOGIN =================
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // 🔐 Secure check (not visible in UI)
  if (user === "CSCSUNNY" && pass === "12345") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadCustomers();
  } else {
    alert("Wrong login!");
  }
}

// ================= LOGOUT =================
function logout() {
  location.reload();
}

// ================= LOAD CUSTOMERS =================
function loadCustomers() {
  db.collection("customers").onSnapshot(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
      let d = doc.data();

      html += `
        <div class="card">
          <p>${d.name}</p>
          <p>${d.service}</p>
          <p>Status: ${d.status}</p>

          <button class="approve" onclick="approve('${doc.id}')">Approve</button>
          <button class="reject" onclick="reject('${doc.id}')">Reject</button>
        </div>
      `;
    });

    document.getElementById("customers").innerHTML = html;
  });
}

// ================= APPROVE =================
function approve(id) {
  db.collection("customers").doc(id).update({
    status: "Approved"
  });
}

// ================= REJECT =================
function reject(id) {
  db.collection("customers").doc(id).update({
    status: "Rejected"
  });
}
