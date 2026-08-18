"""
Nameet Kumar Behera — Portfolio Backend Server
Flask + SQLite REST API
"""

import os
import sqlite3
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder=".")

DB_PATH = "messages.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

# Initialize SQLite database
init_db()

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/style.css")
def css():
    return send_from_directory(".", "style.css")

@app.route("/script.js")
def js():
    return send_from_directory(".", "script.js")

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(".", "favicon.ico")

@app.route("/assets/<path:path>")
def assets(path):
    return send_from_directory("assets", path)

@app.route("/api/contact", methods=["POST"])
def contact_api():
    try:
        data = request.get_json(force=True)
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        if not name or not email or not message:
            return jsonify({"status": "error", "message": "Missing required fields"}), 400

        # Store inquiry in SQLite database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)",
            (name, email, subject, message)
        )
        conn.commit()
        inquiry_id = cursor.lastrowid
        conn.close()

        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] New Inquiry #{inquiry_id} from {name} <{email}>: {subject}")

        return jsonify({
            "status": "success",
            "message": "Inquiry recorded successfully!",
            "id": inquiry_id
        }), 200

    except Exception as e:
        print(f"Error handling contact submission: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

@app.route("/api/messages", methods=["GET"])
def get_messages():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, subject, message, created_at FROM inquiries ORDER BY id DESC")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({"total": len(rows), "messages": rows})

@app.route("/api/status", methods=["GET"])
def status_api():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM inquiries")
    count = cursor.fetchone()[0]
    conn.close()
    
    return jsonify({
        "status": "online",
        "developer": "Nameet Kumar Behera",
        "role": "Frontend Developer",
        "location": "Bangalore, Karnataka (orig. Odisha, India)",
        "flagship_project": "Rakshak AI",
        "total_inquiries": count,
        "server_time": datetime.now().isoformat()
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    print(f"Starting Nameet Behera Portfolio Server on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
