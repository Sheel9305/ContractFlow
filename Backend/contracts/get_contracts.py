from flask import jsonify
from db.connection import get_connection

def get_contracts():
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("SELECT * FROM contracts")
    rows=cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([{"id":r[0], "name":r[1], "startDate":r[2].isoformat(), "endDate":r[3].isoformat()}for r in rows])
    