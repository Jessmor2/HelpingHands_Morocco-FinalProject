"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask import Flask, render_template, url_for, request, abort

import stripe

app = Flask(__name__)

app.config['STRIPE_PUBLIC_KEY'] = 'pk_test_51NuMomEkSwAVwyolMfA93BOxdE4QefJlnUCz8nJZg00FQ7hFJ9VcZJAYXP3qxvJ94hMGlpnWBHkh6WcalEZLqP9R00QI2rQGQh'
app.config['STRIPE_SECRET_KEY'] = 'sk_test_51NuMomEkSwAVwyolKawuX9hQ9U0Uzp2dMImjTiMZzs5Z6V2F2zersSp7B8EMATJIYfFicqn25M5n2qTeGSoUCWKZ00ywOxjq0F'

stripe.api_key = app.config['sk_test_51NuMomEkSwAVwyolKawuX9hQ9U0Uzp2dMImjTiMZzs5Z6V2F2zersSp7B8EMATJIYfFicqn25M5n2qTeGSoUCWKZ00ywOxjq0F']

@app.route('/')
def index():
    '''
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_id': 'price_1NvRPvEkSwAVwyol4daWiYZ4',
            'quantity': 1,
        }],
        line_items=[{
            'price_id': 'price_1NvROvEkSwAVwyolL8AZYT4V',
            'quantity': 1,
        }],
        line_items=[{
            'price_id': 'price_1NvRNpEkSwAVwyol83js5tiq'
            'quantity': 1,
        }],
        line_items=[{
            'price_id': 'price_1NvRLqEkSwAVwyolh2Jdmnqb'
            'quantity': 1,
        }],
        line_items=[{
            'price_id': 'price_1NvRJCEkSwAVwyol9ThQzuHU'
            'quantity': 1,
        }],
        mode='payment',
        success_url=url_for('thanks', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=url_for('index', _external=True),
    )
    '''
    return render_template(
        'index.html', 
        checkout_session_id=session['price_1NvRPvEkSwAVwyol4daWiYZ4'], 
        checkout_public_key=app.config['pk_test_51NuMomEkSwAVwyolMfA93BOxdE4QefJlnUCz8nJZg00FQ7hFJ9VcZJAYXP3qxvJ94hMGlpnWBHkh6WcalEZLqP9R00QI2rQGQh']
    )

@app.route('/stripe_pay')
def stripe_pay():
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price': 'price_1NvRPvEkSwAVwyol4daWiYZ4',
            'quantity': 1,
        }],
        mode='payment',
        success_url=url_for('thanks', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=url_for('index', _external=True),
    )
    return {
        'checkout_session_id': session['id'], 
        'checkout_public_key': app.config['STRIPE_PUBLIC_KEY']
    }

@app.route('/thank you page')
def thanks():
    return render_template('thank you page')

@app.route('/stripe_webhook', methods=['POST'])
def stripe_webhook():
    print('WEBHOOK CALLED')

    if request.content_length > 1024 * 1024:
        print('REQUEST TOO BIG')
        abort(400)
    payload = request.get_data()
    sig_header = request.environ.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = 'YOUR_ENDPOINT_SECRET'
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        print('INVALID PAYLOAD')
        return {}, 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print('INVALID SIGNATURE')
        return {}, 400

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        print(session)
        line_items = stripe.checkout.Session.list_line_items(session['id'], limit=1)
        print(line_items['data'][0]['description'])

    return {}