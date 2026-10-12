import json
from datetime import datetime

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

import sqlite3
import os
import uuid

app = Flask(__name__)

CORS(app)

# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE = os.path.join(BASE_DIR, "database.db")

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# --------------------------------------------------
# DATABASE
# --------------------------------------------------

def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_db()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS speakers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT,
            company TEXT,
            image TEXT
        )
        """
    )

    connection.commit()
    connection.close()


# --------------------------------------------------
# GET ALL SPEAKERS
# --------------------------------------------------

@app.route("/api/speakers", methods=["GET"])
def get_speakers():

    connection = get_db()

    speakers = connection.execute(
        """
        SELECT *
        FROM speakers
        ORDER BY id ASC
        """
    ).fetchall()

    connection.close()

    result = []

    for speaker in speakers:

        image_url = None

        if speaker["image"]:
            image_url = (
                f"http://127.0.0.1:5000/uploads/"
                f"{speaker['image']}"
            )

        result.append(
            {
                "id": speaker["id"],
                "name": speaker["name"],
                "role": speaker["role"],
                "company": speaker["company"],
                "image": image_url,
            }
        )

    return jsonify(result)


# --------------------------------------------------
# ADD SPEAKER
# --------------------------------------------------

@app.route("/api/speakers", methods=["POST"])
def add_speaker():

    name = request.form.get("name", "").strip()
    role = request.form.get("role", "").strip()
    company = request.form.get("company", "").strip()

    image_file = request.files.get("image")

    if not name:
        return jsonify(
            {
                "success": False,
                "message": "Speaker name is required"
            }
        ), 400

    image_name = None

    # ----------------------------------------------
    # SAVE IMAGE
    # ----------------------------------------------

    if image_file and image_file.filename:

        original_name = secure_filename(image_file.filename)

        extension = os.path.splitext(original_name)[1]

        image_name = f"{uuid.uuid4().hex}{extension}"

        image_path = os.path.join(
            app.config["UPLOAD_FOLDER"],
            image_name
        )

        image_file.save(image_path)

    # ----------------------------------------------
    # SAVE DATA
    # ----------------------------------------------

    connection = get_db()

    cursor = connection.execute(
        """
        INSERT INTO speakers
        (name, role, company, image)
        VALUES (?, ?, ?, ?)
        """,
        (
            name,
            role,
            company,
            image_name,
        ),
    )

    connection.commit()

    speaker_id = cursor.lastrowid

    connection.close()

    return jsonify(
        {
            "success": True,
            "message": "Speaker added successfully",
            "id": speaker_id,
        }
    ), 201


# --------------------------------------------------
# SERVE UPLOADED IMAGES
# --------------------------------------------------

@app.route("/uploads/<filename>")
def uploaded_file(filename):

    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename
    )


# --------------------------------------------------
# TEST ROUTE
# --------------------------------------------------

@app.route("/")
def home():

    return jsonify(
        {
            "message": "G200 Python Backend is running"
        }
    )


# --------------------------------------------------
# START SERVER
# --------------------------------------------------


# --------------------------------------------------
# COMPANIES DATABASE TABLE
# --------------------------------------------------

def init_companies_table():
    connection = get_db()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            sector TEXT NOT NULL,
            sub_sector TEXT NOT NULL,
            tentative INTEGER NOT NULL DEFAULT 0,
            full INTEGER NOT NULL DEFAULT 0
        )
        """
    )

    connection.commit()
    connection.close()


# --------------------------------------------------
# GET ALL COMPANIES
# --------------------------------------------------

@app.route("/api/companies", methods=["GET"])
def get_companies():
    connection = get_db()

    rows = connection.execute(
        """
        SELECT id, name, sector, sub_sector, tentative, full
        FROM companies
        ORDER BY id ASC
        """
    ).fetchall()

    connection.close()

    return jsonify([
        {
            "id": row["id"],
            "name": row["name"],
            "sector": row["sector"],
            "subSector": row["sub_sector"],
            "tentative": bool(row["tentative"]),
            "full": bool(row["full"]),
        }
        for row in rows
    ]), 200


# --------------------------------------------------
# ADD COMPANY
# --------------------------------------------------

@app.route("/api/companies", methods=["POST"])
def add_company():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    sector = str(data.get("sector", "")).strip()
    sub_sector = str(data.get("subSector", "")).strip()
    tentative = bool(data.get("tentative", False))
    full = bool(data.get("full", False))

    if not name or not sector or not sub_sector:
        return jsonify({
            "success": False,
            "message": "Company name, sector and sub-sector are required."
        }), 400

    connection = get_db()

    try:
        cursor = connection.execute(
            """
            INSERT INTO companies
                (name, sector, sub_sector, tentative, full)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                name,
                sector,
                sub_sector,
                int(tentative),
                int(full),
            )
        )

        connection.commit()
        company_id = cursor.lastrowid

    finally:
        connection.close()

    return jsonify({
        "success": True,
        "message": "Company added successfully.",
        "id": company_id,
    }), 201



# --------------------------------------------------
# SUBMISSIONS DATABASE TABLE
# --------------------------------------------------

def init_submissions_table():
    connection = get_db()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            mobile TEXT NOT NULL,
            company TEXT,
            designation TEXT,
            one_on_one INTEGER NOT NULL DEFAULT 0,
            group_meeting INTEGER NOT NULL DEFAULT 0,
            one_on_one_companies TEXT DEFAULT '[]',
            group_companies TEXT DEFAULT '[]',
            submitted_at TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()


# --------------------------------------------------
# CREATE A SUBMISSION
# --------------------------------------------------

@app.route("/api/submissions", methods=["POST"])
def add_submission():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    mobile = str(data.get("mobile", "")).strip()

    company = str(
        data.get("workingAt", data.get("company", ""))
    ).strip()

    designation = str(data.get("designation", "")).strip()

    one_on_one = bool(
        data.get("oneOnOne", data.get("one_on_one", False))
    )

    group_meeting = bool(
        data.get("groupMeeting", data.get("group_meeting", False))
    )

    one_on_one_companies = data.get("oneOnOneCompanies", [])
    group_companies = data.get("groupCompanies", [])

    if not name or not email or not mobile:
        return jsonify({
            "success": False,
            "message": "Name, email and mobile are required."
        }), 400

    if not one_on_one and not group_meeting:
        return jsonify({
            "success": False,
            "message": "Select at least one meeting type."
        }), 400

    if not isinstance(one_on_one_companies, list):
        return jsonify({
            "success": False,
            "message": "One-on-one companies must be a list."
        }), 400

    if not isinstance(group_companies, list):
        return jsonify({
            "success": False,
            "message": "Group companies must be a list."
        }), 400

    submitted_at = datetime.now().astimezone().isoformat(
        timespec="seconds"
    )

    connection = get_db()

    try:
        cursor = connection.execute(
            """
            INSERT INTO submissions (
                name,
                email,
                mobile,
                company,
                designation,
                one_on_one,
                group_meeting,
                one_on_one_companies,
                group_companies,
                submitted_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                name,
                email,
                mobile,
                company,
                designation,
                int(one_on_one),
                int(group_meeting),
                json.dumps(one_on_one_companies),
                json.dumps(group_companies),
                submitted_at,
            )
        )

        connection.commit()
        submission_id = cursor.lastrowid

    finally:
        connection.close()

    return jsonify({
        "success": True,
        "message": "Registration submitted successfully.",
        "id": submission_id,
    }), 201


# --------------------------------------------------
# GET ALL SUBMISSIONS FOR THE ADMIN PANEL
# --------------------------------------------------

@app.route("/api/submissions", methods=["GET"])
def get_submissions():
    connection = get_db()

    try:
        rows = connection.execute(
            """
            SELECT *
            FROM submissions
            ORDER BY id DESC
            """
        ).fetchall()
    finally:
        connection.close()

    result = []

    for row in rows:
        result.append({
            "id": row["id"],
            "name": row["name"],
            "email": row["email"],
            "mobile": row["mobile"],
            "company": row["company"] or "",
            "designation": row["designation"] or "",
            "oneOnOne": bool(row["one_on_one"]),
            "groupMeeting": bool(row["group_meeting"]),
            "oneOnOneCompanies": json.loads(
                row["one_on_one_companies"] or "[]"
            ),
            "groupCompanies": json.loads(
                row["group_companies"] or "[]"
            ),
            "submittedAt": row["submitted_at"],
        })

    return jsonify(result), 200

if __name__ == "__main__":
    
    init_db()
    init_companies_table()
    init_submissions_table()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
