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
          <td><input name="day" value="${item.day}" data-index="${index}"></td>
          <td>${item.department}</td>
          <td>${item.doctor}</td>
          <td><input name="anesthesia" value="${item.anesthesia}" data-index="${index}"></td>
          <td><input name="nursing" value="${item.nursing}" data-index="${index}"></td>
          <td>${item.time}</td>
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
        originalData[i].anesthesia = row.anesthesia;
        originalData[i].nursing = row.nursing;
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
