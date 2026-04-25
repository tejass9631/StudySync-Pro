// 🔥 Firebase core import (project connect karne ke liye)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";

// 🔐 AUTH
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

// 🔥 FIRESTORE
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc   // 🔥 ye hona hi chahiye
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";









// 🔐 Firebase config (API connection)
const firebaseConfig = {
  apiKey: "AIzaSyCndFVMS1yN3JMWdhT0t4RvI9JdLJCxm-I",
  authDomain: "studysync-pro-3472f.firebaseapp.com",
  projectId: "studysync-pro-3472f",
  storageBucket: "studysync-pro-3472f.firebasestorage.app",
  messagingSenderId: "413526499384",
  appId: "1:413526499384:web:287e5cd353be8e3efbc6cd"
};


// 🔥 Firebase initialize
const app = initializeApp(firebaseConfig);

// 🔐 Auth system activate
const auth = getAuth(app);
const db = getFirestore(app);



const notesData = [
  { name: "Linear Algebra-1", file: "m1.pdf" },
  { name: "Linear Algebra-2", file: "m2.pdf" },
  { name: "Calcculus for Single Variable", file: "m3.pdf" },
  { name: "Multivariable Calculus (Differentiation)", file: "m4.pdf" },
  { name: "Multivariable Calculus (Integration)", file: "m5.pdf" },
  { name: "Vector Calculus", file: "m6.pdf" },

  { name: "Wave Optics", file: "phy1.pdf" },
  { name: "Laser and fiber Optics", file: "phy2.pdf" },
  { name: "Quantum Mechanics", file: "phy3.pdf" },
  { name: "Semiconductors", file: "phy4.pdf" },
  { name: "Magnetism and Electromagnetic Induction", file: "phy5.pdf" },
  
  { name: "Introduction to Programming", file: "c1.pdf" },
  { name: "operators, Conditional Branching & Loops", file: "c2.pdf" },
  { name: "User Defined Functions", file: "c3.pdf" },
  { name: "Array & String", file: "c4.pdf" },
  { name: "Bascic Algorithm", file: "c5.pdf" },
  { name: "Function and Recurision", file: "c6.pdf" },
  { name: "Strucutre, Functions and Pointers", file: "c7.pdf" },
  
  { name: "Computer Hardware and Peripherals", file: "it1.pdf" },
  { name: "Internet and Web Technologies", file: "it2.pdf" },
  { name: "Microsoft Word", file: "it3.pdf" },
  { name: "LaTex", file: "it4.pdf" },
  { name: "Microsoft Excel", file: "it5.pdf" },
  { name: "Microsoft PowerPoint", file: "it6.pdf" },

  { name: "Semiconductor Devices", file: "be1.pdf" },
  { name: "Bipolar Junction Transistor (BJT)", file: "be2.pdf" },
  { name: "Field Effect Transistor (FET)", file: "be3.pdf" },
  { name: "Operational Amplifiers (Op-Amps)", file: "be4.pdf" },
  { name: "Fundamentals of Digital Electronics", file: "be5.pdf" },
  
  { name: "Complex Analysis 1", file: "ma1.pdf" },
  { name: "Complex Analysis 2", file: "ma2.pdf" },
  { name: "Ordinary Differential Equations", file: "ma3.pdf" },
  { name: "Laplace Transform", file: "ma4.pdf" },
  { name: "Fourier Series", file: "ma5.pdf" },

  { name: "Atomic & Molecular Structure", file: "ch1.pdf" },
  { name: "Spectoscopy", file: "ch2.pdf" },
  { name: "Electrochemistry & Fuels Cells", file: "ch3.pdf" },
  { name: "Chemical Equilibrium", file: "ch4.pdf" },
  { name: "Water Chemistry", file: "ch5.pdf" },
  { name: "Polymer & Plastic", file: "ch6.pdf" },
  { name: "Organic Reaction & Drug Synthesis A Drug Molecule", file: "ch7.pdf" },
  
  { name: "Vocabulary Building", file: "en1.pdf" },
  { name: "Basic Strategy Skils ", file: "en2.pdf" },
  { name: "Common Errors", file: "en3.pdf" },
  { name: "Appropriate Writing", file: "en4.pdf" },
  { name: "Formal Writing Practice", file: "en5.pdf" },
  { name: "Comprehension", file: "en6.pdf" },

  { name: "Input & Output", file: "phy1.pdf" },
  { name: "Control Flow", file: "phy2.pdf" },
  { name: "Function & Shapes", file: "phy3.pdf" },
  { name: "Strings", file: "phy4.pdf" },
  { name: "Lists", file: "phy5.pdf" },
  { name: "Dictinories, Tuples and Sets", file: "phy6.pdf" },

  { name: "Fundamentals of Web Design", file: "wd1.pdf" },
  { name: "HTML5", file: "wd2.pdf" },
  { name: "CSS", file: "wd3.pdf" },
  { name: "JavaScript", file: "wd4.pdf" },
  { name: "Advanced JavaScript", file: "wd4.pdf" },
  
  
 
];











// ================= DOM ELEMENTS =================
// 🔹 HTML ke elements ko safely select kar rahe hain
const email = document.getElementById("email");
const password = document.getElementById("password");

const sEmail = document.getElementById("sEmail");
const sPassword = document.getElementById("sPassword");

const msg = document.getElementById("msg");


// ================= TAB SWITCH =================
// 🔹 Login ↔ Signup switch UI

window.showSignup = function () {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("signupBox").classList.remove("hidden");

  document.getElementById("signupTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
};

window.showLogin = function () {
  document.getElementById("signupBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("signupTab").classList.remove("active");
};


// ================= SIGNUP =================
// 🔹 naya account banane ke liye
window.signup = function () {

  if (!sEmail.value || !sPassword.value) {
    msg.innerText = "Fill all fields ❌";
    return;
  }

  createUserWithEmailAndPassword(auth, sEmail.value, sPassword.value)
    .then((user) => {

      // 📩 email verification bhejna
      sendEmailVerification(user.user);

      msg.innerText = "📩 Verify email then login";
    })
    .catch(e => msg.innerText = e.message);
};


// ================= LOGIN =================
// 🔹 user login karega
window.login = function () {

  if (!email.value || !password.value) {
    msg.innerText = "Enter email & password ❌";
    return;
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {

      // ⚠️ verify nahi hai to block
      if (!user.user.emailVerified) {
        msg.innerText = "⚠️ Verify email first";
        return;
      }

      // ✅ login success → dashboard
     
      window.location.href = "index.html";
    })
    .catch(e => msg.innerText = e.message);
};


// ================= FORGOT =================
// 🔹 password reset mail bhejna
window.forgot = function () {

  if (!email.value) {
    msg.innerText = "Enter email first";
    return;
  }

  sendPasswordResetEmail(auth, email.value)
    .then(() => msg.innerText = "📧 Reset email sent")
    .catch(e => msg.innerText = e.message);
};


// ================= LOGOUT =================
// 🔹 user logout kare
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};


// ================= SESSION CONTROL =================
// 🔹 user already login hai ya nahi check
onAuthStateChanged(auth, (user) => {

  // 🔹 login page → already login hai to redirect
  if (window.location.pathname.includes("login")) {
    if (user && user.emailVerified) {
      window.location.href = "index.html";
    }
  }

  // 🔹 dashboard page → login nahi hai to wapas bhej
  if (window.location.pathname.includes("index")) {
    if (!user) {
      window.location.href = "login.html";
    }
  }

});

// ================= WELCOME USER =================

async function loadUserName() {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "profile", "info");
  const snap = await getDoc(ref);

  const welcomeUser = document.getElementById("welcomeUser");

  if (snap.exists()) {
    const data = snap.data();
    welcomeUser.innerText = "Welcome, " + (data.name || "User");
  } else {
    welcomeUser.innerText = "Welcome, User";
  }
}



// ================= DASHBOARD =================


window.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("profileBtn");
  const menu = document.getElementById("profileMenu");

  const nameInput = document.getElementById("nameInput");
  const saveBtn = document.getElementById("saveName");

 
  // 🔹 profile menu toggle
  if (btn && menu) {

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("show");
    });

    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
      if (
        !btn.contains(e.target) &&
        !menu.contains(e.target)
      ) {
        menu.classList.remove("show");
      }
    });
  }

  // 🔹 save name
  if (saveBtn && nameInput) {
    saveBtn.addEventListener("click", async () => {

      const name = nameInput.value.trim();

      if (name !== "") {
      const user = auth.currentUser;
if (!user) return;

await setDoc(doc(db, "users", user.uid, "profile", "info"), {
  name: name
});

        if (welcomeUser) {
          welcomeUser.innerText = "Welcome, " + name;
        }

        nameInput.value = "";

        if (menu) {
          menu.classList.remove("show");
        }
      }
    });
  }

});
 
// ================= THEME TOGGLE FINAL =================

window.addEventListener("DOMContentLoaded", () => {

  const themeBtn = document.getElementById("themeBtn");

  if (!themeBtn) {
    console.log("❌ themeBtn not found");
    return;
  }

  // load saved theme
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  // click
  themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

    console.log("✅ theme toggled");
  });

});



 // ================= TASKS (FINAL FIREBASE CLEAN) =================

// 🔹 elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ================= ADD TASK =================
addTaskBtn.addEventListener("click", async () => {

  const user = auth.currentUser;
  if (!user) return; // ❌ user login nahi hai

  const text = taskInput.value.trim();
  const priority = document.getElementById("taskPriority").value;

  if (!text) return;

  // ✅ USER BASED PATH (FIXED)
 await addDoc(collection(db, "users", user.uid, "tasks"), {
  text: text,
  priority: priority,
  done: false,
  time: "Just now"
});

taskInput.value = "";

await increaseTaskCount();        // normal
await increaseTodayTotal(); // firestore
await loadTasks();

});


// ================= LOAD TASKS =================
async function loadTasks() {

  const user = auth.currentUser;
  if (!user) return; // ❌ user nahi hai to load mat kar

  taskList.innerHTML = "Loading...";

  // ✅ SAME PATH (IMPORTANT FIX)
  const querySnapshot = await getDocs(
    collection(db, "users", user.uid, "tasks")
  );

  taskList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {

    const task = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.className = "task-row";

    div.innerHTML = `
      <div class="left">
        <input type="checkbox" class="task-check" data-id="${id}" ${task.done ? "checked" : ""}>

        <div class="task-content">
          <p>${task.text}</p>
          <span>${task.time}</span>
        </div>
      </div>

      <div class="task-right">
        <span class="badge ${task.priority}">${task.priority}</span>
        <button class="delete" data-id="${id}">✖</button>
      </div>
    `;

    taskList.appendChild(div);
  });
}


// ================= DELETE TASK =================
document.addEventListener("click", async (e) => {

  const deleteBtn = e.target.closest(".delete");
  if (!deleteBtn) return;

  const user = auth.currentUser;
  if (!user) return;

  const id = deleteBtn.dataset.id;

  // ✅ USER PATH FIX
  await deleteDoc(doc(db, "users", user.uid, "tasks", id));

  loadTasks();
});


// ================= CHECKBOX UPDATE =================
document.addEventListener("change", async (e) => {

  if (!e.target.classList.contains("task-check")) return;

  const user = auth.currentUser;
  if (!user) return;

  const id = e.target.dataset.id;
  const checked = e.target.checked;

  // ✅ USER PATH FIX
  await updateDoc(doc(db, "users", user.uid, "tasks", id), {
  done: checked
});

if (checked) {
  await increaseTodayCompleted();
  await updateWeeklyProgress();
  await refreshChart();
}
});



// ================= CALENDAR =================



const monthText = document.getElementById("currentMonth");
const datesContainer = document.getElementById("calendarDates");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthText.innerText = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  datesContainer.innerHTML = "";

  // 🔹 empty slots
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("span");
    empty.classList.add("muted");
    datesContainer.appendChild(empty);
  }

  // 🔹 days
  const today = new Date();
for (let i = 1; i <= lastDate; i++) {
  const day = document.createElement("span");
  day.innerText = i;

  if (
    i === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  ) {
    day.classList.add("active");
  }

  day.addEventListener("click", () => {
    document.querySelectorAll(".cal-dates span")
      .forEach(d => d.classList.remove("active"));

    day.classList.add("active");
  });

  datesContainer.appendChild(day);
}

} // 🔥🔥🔥 YE MISSING THA (function close)

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// init
renderCalendar();


// ================= TIMER LOGIC =================

const startBtn = document.getElementById("startFocus");
const pauseBtn = document.getElementById("pauseFocus");
const resetBtn = document.getElementById("resetFocus");

const timeText = document.getElementById("focusTime");
const inputMinutes = document.getElementById("customMinutes");
const progressCircle = document.getElementById("progressCircle");

let totalSeconds = 0;
let remainingSeconds = 0;
let timer = null;

// circle math
const radius = 90;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;

// ================= FORMAT TIME =================
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ================= UPDATE UI =================
function updateUI() {
  timeText.innerText = formatTime(remainingSeconds);

 const progress = totalSeconds ? remainingSeconds / totalSeconds : 0;
  progressCircle.style.strokeDashoffset =
    circumference - progress * circumference;
}

// ================= START =================
startBtn.addEventListener("click", () => {

  // first time start
  if (!timer) {

    // agar new input diya hai
    if (remainingSeconds === 0) {
      const minutes = parseInt(inputMinutes.value);

      if (!minutes || minutes <= 0) {
        alert("Enter valid minutes");
        return;
      }

      totalSeconds = minutes * 60;
      remainingSeconds = totalSeconds;
      updateUI(); // 🔥 ye add kar
    }

    timer = setInterval(() => {

      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateUI();
      } else {
        clearInterval(timer);
        timer = null;
        alert("⏰ Time's up!");
      }

    }, 1000);
  }
});

// ================= PAUSE =================
pauseBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

// ================= RESET =================
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;

 remainingSeconds = 0;
totalSeconds = 0;
updateUI();


 progressCircle.style.strokeDashoffset = circumference;
  inputMinutes.value = "";
});




// ================= NOTE COUNT (USER-WISE FIREBASE) =================

// 🔹 LOAD
async function loadNoteCount() {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "stats", "noteCount");
  const snap = await getDoc(ref);

  let count = 0;

  if (snap.exists()) {
    count = snap.data().count || 0;
  }

  const el = document.getElementById("noteCount");
  if (el) el.innerText = count;
}


// 🔹 INCREASE
async function increaseNoteCount() {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "stats", "noteCount");
  const snap = await getDoc(ref);

  let count = 0;

  if (snap.exists()) {
    count = snap.data().count || 0;
  }

  count++;

  await setDoc(ref, { count });

  const el = document.getElementById("noteCount");
  if (el) el.innerText = count;
}












// 🔹 INIT

onAuthStateChanged(auth, async (user) => {
  if (user) {

    // ✅ sab yaha load hoga (user ready hone ke baad)

    await loadTasks();
    await loadTaskCount();
    await updateLoginStreak();
    await refreshChart();
    await loadNoteCount();
    await loadNotes();
    await loadUserName();
    

    // today stats bhi yahi update kar de
    let data = await loadStats();

    if (data.today) {
      document.getElementById("todayStat").innerText =
        `${data.today.completed}/${data.today.total}`;
    } else {
      document.getElementById("todayStat").innerText = "0/0";
    }
  }
});




// ================= TASK COUNT (FIREBASE FINAL) =================

// 🔹 LOAD TASK COUNT
async function loadTaskCount() {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "stats", "taskCount");
  const snap = await getDoc(ref);

  const today = new Date().toDateString();

  let data = {
    date: today,
    count: 0
  };

  if (snap.exists()) {
    data = snap.data();
  }

  // 🔥 reset if new day
  if (data.date !== today) {
    data = {
      date: today,
      count: 0
    };
    await setDoc(ref, data);
  }

  // 🔹 UI update
  const el = document.getElementById("taskCount");
  if (el) el.innerText = data.count;
}


// 🔹 INCREASE TASK COUNT
async function increaseTaskCount() {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "stats", "taskCount");
  const snap = await getDoc(ref);

  const today = new Date().toDateString();

  let data = {
    date: today,
    count: 0
  };

  if (snap.exists()) {
    data = snap.data();
  }

  // 🔥 reset if new day
  if (data.date !== today) {
    data = {
      date: today,
      count: 0
    };
  }

  // 🔥 increment
  data.count++;

  await setDoc(ref, data);

  // 🔹 UI update instantly
  const el = document.getElementById("taskCount");
  if (el) el.innerText = data.count;
}









// 🔹 jab task add ho

async function increaseTodayTotal(){
  let data = await loadStats();

  let today = data.today || { total:0, completed:0 };

  today.total++;

  await saveStats({ today });

  document.getElementById("todayStat").innerText =
    `${today.completed}/${today.total}`;
}

async function increaseTodayCompleted(){
  let data = await loadStats();

  let today = data.today || { total:0, completed:0 };

  today.completed++;

  await saveStats({ today });

  document.getElementById("todayStat").innerText =
    `${today.completed}/${today.total}`;
}




// ================= STREAK COUNT (FINAL + ANIMATION) =================


async function updateLoginStreak(){
  const user = auth.currentUser;
  if(!user) return;

  let data = await loadStats();

  let streakData = data.streak || {
    streak: 0,
    lastLogin: null
  };

  const today = new Date();
  today.setHours(0,0,0,0);

  let last = streakData.lastLogin
    ? new Date(streakData.lastLogin)
    : null;

  if(last){
    last.setHours(0,0,0,0);
    const diff = Math.floor((today - last)/(1000*60*60*24));

    if(diff === 1){
      streakData.streak++;
    }
    else if(diff > 1){
      streakData.streak = 1;
    }
  } else {
    streakData.streak = 1;
  }

  streakData.lastLogin = today.toISOString();

  await saveStats({ streak: streakData });

  const el = document.getElementById("streakCount");
  if(el){
    el.innerText = streakData.streak;

    el.classList.add("streak-pop");
    setTimeout(()=> el.classList.remove("streak-pop"), 400);
  }
}




// ================= WEEKLY TRACKER (FIREBASE FINAL + RESET) =================

// 🔹 FIXED LABELS (no shifting issue ever)
function getWeekLabels() {
  return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
}

// 🔹 GET DATA (USER BASED + WEEK RESET)
async function getWeeklyData() {

  const user = auth.currentUser;
  if (!user) return [0,0,0,0,0,0,0];

  const ref = doc(db, "users", user.uid, "stats", "weekly");
  const snap = await getDoc(ref);

  const today = new Date();
  const todayStr = today.toDateString();

  let stored = {
    startDate: todayStr,
    data: {}
  };

  if (snap.exists()) {
    stored = snap.data();
  }

  const start = new Date(stored.startDate);
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));

  // 🔥 AUTO RESET AFTER 7 DAYS
  if (diff >= 7) {
    stored = {
      startDate: todayStr,
      data: {}
    };

    await setDoc(ref, stored);
  }

  const order = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return order.map(day => stored.data[day] || 0);
}


// 🔹 UPDATE WHEN TASK COMPLETED (FINAL SAFE)
async function updateWeeklyProgress() {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "stats", "weekly");
  const snap = await getDoc(ref);

  const today = new Date();
  const todayStr = today.toDateString();

  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const todayDay = dayNames[today.getDay()];

  let stored;

  // ✅ agar data exist karta hai → use karo
  if (snap.exists()) {
    stored = snap.data();
  } else {
    stored = {
      startDate: todayStr,
      data: {}
    };
  }

  const start = new Date(stored.startDate);
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));

  // 🔥 RESET AFTER 7 DAYS
  if (diff >= 7) {
    stored = {
      startDate: todayStr,
      data: {}
    };
  }

  // 🔥 IMPORTANT: ensure data object exists
  if (!stored.data) {
    stored.data = {};
  }

  // 🔥 increment today's count
  stored.data[todayDay] = (stored.data[todayDay] || 0) + 1;

  await setDoc(ref, stored);
}


// 🔹 REFRESH CHART (FINAL SAFE)
async function refreshChart() {
  if (!window.chart) return;

  const labels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const data = await getWeeklyData();

  chart.data.labels = labels;
  chart.data.datasets[0].data = data;

  chart.update();
}







// ================= ATTENDANCE =================

document.querySelectorAll(".menu-item")[2].addEventListener("click", () => {
  window.location.href = "attendance.html";
});



// ================= Today=============


async function loadStats(){
  const user = auth.currentUser;
  if(!user) return {};

  const snap = await getDocs(
    collection(db, "users", user.uid, "stats")
  );

  let data = {};

  snap.forEach(doc=>{
    data[doc.id] = doc.data();
  });

  return data;
}

async function saveStats(obj){
  const user = auth.currentUser;
  if(!user) return;

  for(const key in obj){
    await setDoc(
      doc(db, "users", user.uid, "stats", key),
      obj[key]
    );
  }
}







// ================= NOTES SYSTEM =================

// ================= NOTES SYSTEM (FIREBASE FINAL) =================

// 🔹 LOAD NOTES (USER-WISE)
async function loadNotes() {

  const user = auth.currentUser;
  if (!user) return;

  const container = document.getElementById("notesList");
  if (!container) return;

  container.innerHTML = "Loading...";

  const snap = await getDocs(
    collection(db, "users", user.uid, "notes")
  );

  container.innerHTML = "";

  if (snap.empty) {
    container.innerHTML = "<p style='color:#888'>No notes yet</p>";
    return;
  }

  snap.forEach(docSnap => {
    const note = docSnap.data();

    container.innerHTML += `
      <div class="note-item">
        <div class="note-left">
          ⭐
          <div>
            <p>${note.name}</p>
          </div>
        </div>

        <div class="note-actions">
          <button class="download" data-file="${note.file}">⬇</button>
          <button class="delete-note" data-id="${docSnap.id}">✖</button>
        </div>
      </div>
    `;
  });
}

// 🔹 ADD NOTE (manual use / future UI)
async function addNote(name, file) {

  const user = auth.currentUser;
  if (!user) return;

  await addDoc(
    collection(db, "users", user.uid, "notes"),
    {
      name: name,
      file: file
    }
  );

  await loadNotes();
}

// 🔹 DELETE NOTE
document.addEventListener("click", async (e) => {

  const delBtn = e.target.closest(".delete-note");
  if (delBtn) {

    const user = auth.currentUser;
    if (!user) return;

    const id = delBtn.dataset.id;

    await deleteDoc(
      doc(db, "users", user.uid, "notes", id)
    );

    loadNotes();
    return;
  }

});





// 🔹 SEARCH (LOCAL NOTES DATA)
const input = document.getElementById("noteInput");

if (input) {
  input.addEventListener("input", () => {

    const val = input.value.toLowerCase();
    const container = document.getElementById("notesList");

    container.innerHTML = "";

    notesData.forEach(note => {

      if (note.name.toLowerCase().includes(val)) {
        container.innerHTML += `
          <div class="note-item">
            <div class="note-left">
              ⭐
              <div>
                <p>${note.name}</p>
              </div>
            </div>

            <div class="note-actions">
              <button class="download" data-file="${note.file}">⬇</button>
            </div>
          </div>
        `;
      }

    });

  });
}







function renderAllNotes() {
  const container = document.getElementById("notesList");
  if (!container) return;

  container.innerHTML = "";

  notesData.forEach(note => {
    container.innerHTML += `
      <div class="note-item">
        <div class="note-left">
          ⭐
          <div>
            <p>${note.name}</p>
          </div>
        </div>

        <div class="note-actions">
          <button class="download" data-file="${note.file}">⬇</button>
        </div>
      </div>
    `;
  });
}






async function increaseNoteDownload(noteName) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "downloads", noteName);
  const snap = await getDoc(ref);

  let count = 0;

  if (snap.exists()) {
    count = snap.data().count || 0;
  }

  count++;

  await setDoc(ref, { count });
}








document.addEventListener("click", async (e) => {

  const downBtn = e.target.closest(".download");
  if (!downBtn) return;

  const user = auth.currentUser;
  if (!user) return;

  const file = downBtn.dataset.file;

  // ✅ open PDF
  window.open("./" + file);

  // ✅ total note count
  await increaseNoteCount();

  // ✅ per-note tracking
  await increaseNoteDownload(file);

});




//Solar Explore

document.querySelectorAll(".menu-item")[3].addEventListener("click", () => {
  window.location.href = "index45.html";
});
