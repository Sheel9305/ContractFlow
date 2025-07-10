from flask import Flask
from flask_cors import CORS

from contracts.get_contracts import get_contracts
from contracts.add_contract import add_contract
from contracts.update_contract import update_contract
from contracts.delete_contract import delete_contract

from points.get_points import get_points
from points.add_point import add_point
from points.update_point import update_point
from points.delete_point import delete_point

app=Flask(__name__)
CORS(app,origins=["http://localhost:3000"])

app.route("/api/contracts",methods=["GET"])(get_contracts)
app.route("/api/contracts",methods=["POST"])(add_contract)
app.route("/api/contracts/<int:id>",methods=["PUT"])(update_contract)
app.route("/api/contracts/<int:id>",methods=["DELETE"])(delete_contract)

app.route("/api/points",methods=["GET"])(get_points)
app.route("/api/points",methods=["POST"])(add_point)
app.route("/api/points/<int:id>",methods=["PUT"])(update_point)
app.route("/api/points/<int:id>",methods=["DELETE"])(delete_point)

if __name__ == "__main__":
    app.run(debug=True)