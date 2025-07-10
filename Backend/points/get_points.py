from flask import jsonify
from db.connection import get_connection

def get_points():
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("SELECT * FROM points")
    rows=cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([{"id":r[0], "contractId":r[1],"name":r[2], "value":int(r[3])}for r in rows])
    