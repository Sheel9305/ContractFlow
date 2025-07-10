from flask import jsonify
from db.connection import get_connection

def delete_contract(id):
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("DELETE FROM contracts WHERE id=%s",(id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"id": id})
    