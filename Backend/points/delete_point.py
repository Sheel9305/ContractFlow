from flask import jsonify
from db.connection import get_connection

def delete_point(id):
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("DELETE FROM points WHERE id=%s",(id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"id": id})
    