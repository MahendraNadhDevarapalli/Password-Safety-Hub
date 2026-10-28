# Password Safety Hub

A simple, clean, and professional password safety website built with **Python Flask**, **HTML5**, **CSS3**, and **vanilla JavaScript**.

---

## 🌟 Functional Areas

The website contains ONLY these three functional areas:
1. **Home Page:** Displays the hero with the logo on the left, description, feature labels (`Learn`, `Password Tester`, `Password Builder`), quotations, and two main buttons (`Learn` and `Test Your Password`).
2. **Learn Page:** A dedicated guidelines page featuring exactly six core password safety practices and a **Back to Home** button.
3. **Test Your Password Section:** An in-browser, privacy-first password strength analyzer that opens directly on the Home page (hiding the hero) with real-time feedback, strength meter (Weak, Fair, Strong, Very Strong), show/hide control, Clear button, and Back to Home button.

---

## 🔒 Critical Privacy Architecture

- **100% Client-Side:** Password analysis runs strictly within the user's browser using vanilla JavaScript.
- **Zero Network Transmission:** Passwords are never sent to Flask, any API, or external servers.
- **Zero Logging or Storage:** No cookies, localStorage, sessionStorage, databases, URL parameters, or console logs.
- **Immediate Data Wipe:** Input and results are cleared immediately when clicking Clear or returning to Home.
- **Educational Only:** Educational strength estimate only; does not claim to check against leaked password databases.

---

## 🚀 Running Locally on Windows

```powershell
# 1. Install Flask
pip install -r requirements.txt

# 2. Run the application
python app.py
```

Open your browser and visit:
**`http://127.0.0.1:5000`**

---

## 🧪 Testing Checklist

1. **Home Page First Screen:** Open `http://127.0.0.1:5000/`. Verify the hero section shows the logo on the left (if present at `static/images/logo.png`), website description, the 3 feature labels, the 2 quotations, and the 2 main buttons (**Learn** and **Test Your Password**).
2. **Learn Page Navigation:** Click **Learn**. Verify it navigates to `/learn` and displays the heading, introduction, the 6 exact guidelines, and the **Back to Home** button. Click **Back to Home** to return to `/`.
3. **Test Your Password Action:** Click **Test Your Password** on the Home page. Verify that the hero is hidden and the tester appears on the same page.
4. **Tester Evaluation:**
   - Type a sample password (e.g., `12345` &rarr; Weak, `summer2024!` &rarr; Fair, `MySecretP@ss99` &rarr; Strong, `forest-pebble-quantum-violet` &rarr; Very Strong).
   - Test the **Show/Hide** button to toggle visibility.
   - Test the **Clear** button to reset input, meter, and suggestions.
   - Test the **Back to Home** button: verify it hides the tester, restores the hero screen, and completely wipes any entered password data.
