from flask import Flask, render_template
from flask import jsonify
from flask_cors import CORS
from flask import jsonify

from app.services.api import ApiService

app = Flask(__name__)
CORS(app)
API_SERVICE = ApiService()


@app.route('/api/status')
def status_api():
    statuses = API_SERVICE.get_line_statuses()
    return jsonify(statuses)
