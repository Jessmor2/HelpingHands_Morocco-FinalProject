from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, DonationInfo
from api.utils import generate_sitemap, APIException
from datetime import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector, and you will see the GET request"
    }
    return jsonify(response_body), 200

    
@api.route('/donation_info', methods=["POST"])
def handle_adding_donation_info():
    request_body = request.get_json()
    full_name = request_body['full_name']
    email = request_body['email']
    address = request_body['address']
    phone_number = request_body['phone_number']
    user_id = request_body['user_id']
    time_created = datetime.now()

    # Code to process donation info
    donations = DonationInfo.query.filter_by(email=email)
    counter = 0
    for donation in donations:
        counter = counter + 1

    new_donation_info = DonationInfo(
        full_name=full_name, email=email, address=address, phone_number=phone_number, time_created=str(time_created))
    counter = counter + 1
    db.session.add(new_donation_info)
    db.session.commit()
    added_donation_info = DonationInfo.query.filter_by(
        email=email, time_created=str(time_created)).first()

    payload = {
        "donation": added_donation_info.serialize(),
        "message": "Congratulations, your donation was successfully processed. You have donated " + str(counter) + " times" if counter != 1 else "Congratulations, your donation was successfully processed. You have donated " + str(counter) + " time"
    }

    return jsonify(payload), 200


@api.route('/donation_info/user/<int:user_id>', methods=["POST"])
def add_new_user_donation(user_id):
    request_body = request.get_json()
    time_created = datetime.now()
    user = User.query.filter_by(id=user_id).first()

    # Code to process user-specific donation info
    # ...

    return jsonify({"message": "Donation for user processed successfully"}), 200


@api.route('/donation_info', methods=["GET"])
def handle_get_all_donation_info():
    donation_info = DonationInfo.query.all()
    serialized_donation_info = [info.serialize() for info in donation_info]

    return jsonify(serialized_donation_info), 200


@api.route('/donation_info/<int:id>', methods=["GET"])
def handle_get_each_donation_info(id):
    each_donation_info = DonationInfo.query.get(id)

    if each_donation_info is not None:
        return jsonify(each_donation_info.serialize()), 200
    else:
        return jsonify({'message': 'Donation info not found'}), 404
