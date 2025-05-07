const binId = "680697538960c979a58a1c64"; // ضع الـ Bin ID هنا
const apiKey = "$2a$10$XyjpAsGIxR/qkb3dM51Bq.w5Aa1TKl7DfIcXHDUmQsNsO4uCjGJd6";

const formBody = document.getElementById("form-body");
const messageDiv = document.getElementById("message");

// جلب البيانات من JSONBin
fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
  headers: {
    "X-Master-Key": apiKey
  }
})
  .then(res => res.json())
  .then(json => {
    const data = json.record;

    formBody.innerHTML = "";
    data.forEach((item, index) => {
      formBody.innerHTML += `
        <tr>
          <td>${item.department}</td>
          <td><input name="day" value="${item.day}" data-index="${index}"></td>
          <td><input name="doctor" value="${item.doctor}" data-index="${index}"></td>
          <td><input name="anesthesia" value="${item.anesthesia}" data-index="${index}"></td>
          <td><input name="cases" value="${item.cases}" data-index="${index}"></td>
          <td><input name="nursing" value="${item.nursing}" data-index="${index}"></td>
          <td><input name="time" value="${item.time}" data-index="${index}"></td>
          <td><input name="company" value="${item.company}" data-index="${index}"></td>
          <td><input name="date" value="${item.date}" data-index="${index}"></td>
        </tr>
      `;
    });
  });

// حفظ التعديلات
document.getElementById("admin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // إعادة بناء البيانات بعد التعديل
  const inputs = document.querySelectorAll("input");
  const updatedData = [];

  inputs.forEach(input => {
    const index = input.dataset.index;
    if (!updatedData[index]) {
      updatedData[index] = {};
    }

    updatedData[index][input.name] = input.value;
  });

  // نحتاج أولًا نحصل على البيانات القديمة ونعدل فقط المطلوب
  fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
    headers: {
      "X-Master-Key": apiKey
    }
  })
    .then(res => res.json())
    .then(json => {
      const originalData = json.record;

      updatedData.forEach((row, i) => {
        originalData[i].day = row.day;
        originalData[i].doctor = row.doctor;
        originalData[i].anesthesia = row.anesthesia;
        originalData[i].cases = row.cases;
        originalData[i].nursing = row.nursing;
        originalData[i].time = row.time;
        originalData[i].company = row.company;
        originalData[i].date = row.date;
      });

      // حفظ البيانات بعد التعديل
      fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
          "X-Bin-Versioning": false
        },
        body: JSON.stringify(originalData)
      })
        .then(() => {
          messageDiv.innerText = "✅ تم حفظ التعديلات بنجاح!";
        })
        .catch(() => {
          messageDiv.innerText = "❌ حدث خطأ أثناء الحفظ";
        });
    });
});




// ===============================================================================================================







const binId1 = "6807c5b78a456b79668ef602"; 
let notes = []; 
 
async function fetchNotes() { 
  const res = await fetch(`https://api.jsonbin.io/v3/b/${binId1}/latest`, { 
    headers: { "X-Master-Key": apiKey } 
  }); 
  const data = await res.json(); 
  notes = data.record.notes || []; 
  renderNotes(); 
} 
 
function renderNotes() { 
  const ul = document.getElementById("notesList"); 
  ul.innerHTML = ""; 
  notes.forEach((note, index) => { 
    const li = document.createElement("li"); 
    li.className = "note-item";

    const span = document.createElement("span");
    span.textContent = note;
    span.className = "note-text";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️حذف";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteNote(index);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li); 
  }); 
} 

async function deleteNote(index) {
  notes.splice(index, 1);
  await fetch(`https://api.jsonbin.io/v3/b/${binId1}`, { 
    method: "PUT", 
    headers: { 
      "Content-Type": "application/json", 
      "X-Master-Key": apiKey 
    }, 
    body: JSON.stringify({ notes }) 
  }); 
  renderNotes(); 
}
 
async function addNote() { 
  const input = document.getElementById("noteInput"); 
  const note = input.value.trim(); 
  if (note) { 
    notes.push(note); 
    await fetch(`https://api.jsonbin.io/v3/b/${binId1}`, { 
      method: "PUT", 
      headers: { 
        "Content-Type": "application/json", 
        "X-Master-Key": apiKey 
      }, 
      body: JSON.stringify({ notes }) 
    }); 
    input.value = ""; 
    renderNotes(); 
  } 
} 
 
fetchNotes();














































