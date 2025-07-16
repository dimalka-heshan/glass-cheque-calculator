function calculateInterest() {
  const c = parseFloat(document.getElementById('amount').value);
  const t = new Date(document.getElementById('transferDate').value);
  const d = new Date(document.getElementById('depositDate').value);
  const p = parseFloat(document.getElementById('interestRate').value);
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');

  if (isNaN(c) || isNaN(p) || !t || !d || d <= t) {
    popupText.innerHTML = "❌ Please enter valid inputs.";
    popup.style.display = "flex";
    return;
  }

  let months = 0;
  let current = new Date(t);

  while (true) {
    let next = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate());
    if (next <= d) {
      months++;
      current = next;
    } else {
      break;
    }
  }

  const remainingDays = Math.floor((d - current) / (1000 * 60 * 60 * 24));
  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  const interest = (months + (remainingDays / daysInMonth)) * c * (p / 100);

  popupText.innerHTML = `
    ✅ Interest: <strong>Rs. ${interest.toFixed(2)}</strong><br>
    📆 Duration: ${months} month(s) and ${remainingDays} day(s)
  `;
  popup.style.display = "flex";
}

function closePopup() {
  document.getElementById('popup').style.display = "none";
}
