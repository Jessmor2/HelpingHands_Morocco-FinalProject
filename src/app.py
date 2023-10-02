"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
import stripe
# import firebase_admin
# from firebase_admin import credentials, auth

#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
app.config['STRIPE_PUBLIC_KEY'] = 'pk_test_51NuMomEkSwAVwyolMfA93BOxdE4QefJlnUCz8nJZg00FQ7hFJ9VcZJAYXP3qxvJ94hMGlpnWBHkh6WcalEZLqP9R00QI2rQGQh'
stripe.api_key = app.config['STRIPE_SECRET_KEY'] = 'sk_test_51NuMomEkSwAVwyolKawuX9hQ9U0Uzp2dMImjTiMZzs5Z6V2F2zersSp7B8EMATJIYfFicqn25M5n2qTeGSoUCWKZ00ywOxjq0F'
db_url = os.getenv("https://miniature-robot-4x4r4xw9vj4fqvqj-3001.app.github.dev/")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# cred = credentials.Certificate('src/serviceAccountKey/fund-raising-app-a1439-firebase-adminsdk-75uc6-baf59170a2.json')
# firebase_admin.initialize_app(cred)

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
