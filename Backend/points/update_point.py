from flask import jsonify,request
from db.connection import get_connection

def update_point(id):
    data=request.json
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("UPDATE points SET contract_id=%s, name=%s, value=%s WHERE id=%s",(int(data["contractId"]),data["name"],int(data["value"]),id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({
        "id": id,
        "contractId":int(data["contractId"]),
        "name": data["name"],
        "value": int(data["value"])
    })
    