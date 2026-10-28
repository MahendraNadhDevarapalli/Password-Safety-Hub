"""
Password Safety Hub - Local Flask Server
Privacy Architecture:
- This server ONLY delivers static assets and renders HTML templates.
- It contains NO routes for receiving, processing, logging, or storing passwords.
- All password evaluation runs 100% locally in the user's browser via JavaScript.
"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    """Renders the Home page featuring the Password Tester and Learn highlights."""
    return render_template("index.html")

@app.route("/learn")
def learn():
    """Renders the dedicated Password Safety Guide page."""
    return render_template("learn.html")

if __name__ == "__main__":
    # Runs the local development server on Windows
    print("-------------------------------------------------------")
    print(" Password Safety Hub is starting locally...")
    print(" Open your browser at: http://127.0.0.1:5000")
    print(" Privacy Notice: All password analysis is 100% browser-side.")
    print("-------------------------------------------------------")
    app.run(debug=True, host="127.0.0.1", port=5000)
