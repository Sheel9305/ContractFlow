from flask import jsonify,request
from db.connection import get_connection

def add_point():
    data=request.json
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("INSERT INTO points (contract_id,name,value) VALUES(%s,%s,%s) RETURNING id",(int(data["contractId"]),data["name"],int(data["value"])))
    inserted_id= cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({
        "id": inserted_id,
        "contractId": int(data["contractId"]),
        "name": data["name"],
        "value": int(data["value"])
    })
    