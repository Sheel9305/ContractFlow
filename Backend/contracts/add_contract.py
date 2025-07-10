from datetime import datetime
from flask import jsonify, request
from db.connection import get_connection

def add_contract():
    data=request.json
    start_date = datetime.strptime(data["startDate"], "%Y-%m-%d").date()
    end_date = datetime.strptime(data["endDate"], "%Y-%m-%d").date()
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("INSERT INTO contracts (name, start_date, end_date) VALUES (%s, %s, %s) RETURNING id",(data["name"], start_date, end_date))
    inserted_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify([{
        "id": inserted_id,
        "name": data["name"],
        "startDate": start_date.isoformat(),
        "endDate": end_date.isoformat()
    }])
    