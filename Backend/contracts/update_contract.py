from datetime import datetime
from flask import jsonify, request
from db.connection import get_connection

def update_contract(id):
    data=request.json
    start_date = datetime.strptime(data["startDate"], "%Y-%m-%d").date()
    end_date = datetime.strptime(data["endDate"], "%Y-%m-%d").date()
    conn=get_connection()
    cur=conn.cursor()
    cur.execute("UPDATE contracts SET name=%s, start_date=%s, end_date=%s WHERE id=%s",(data["name"],start_date,end_date,id))
    conn.commit()
    updated_contract={
        "id":id,
        "name": data["name"],
        "startDate": start_date.isoformat(),
        "endDate": end_date.isoformat()
    }
    cur.close()
    conn.close()
    return jsonify(updated_contract)
    