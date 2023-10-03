import stripe
from flask import Blueprint, render_template, jsonify,url_for

api = Blueprint('api', __name__)
















# @api.route('/stripe_pay')
# def stripe_pay():
#     session = stripe.checkout.Session.create(
#         payment_method_types=['card'],
#         line_items=[{
#             'price': 'price_1NvRPvEkSwAVwyol4daWiYZ4',
#             'quantity': 1,
#         }],
#         mode='payment',
#         success_url=url_for('http://localhost:3000/thank-you-page', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
#         cancel_url=url_for('/cancel', _external=True),
#     ) 
#     print(session)
#     # return {
#     #     'checkout_session_id': session['id'],
#     #     'checkout_public_key': 'pk_test_51NuMomEkSwAVwyolMfA93BOxdE4QefJlnUCz8nJZg00FQ7hFJ9VcZJAYXP3qxvJ94hMGlpnWBHkh6WcalEZLqP9R00QI2rQGQh'
#     # }
#     return jsonify (session)

# @api.route('/thank_you_page')
# def thanks():
#     return {
#          render_template('thank you page.html')
#     } 

# @api.route('/stripe_webhook', methods=['POST'])
# def stripe_webhook():
#     print('WEBHOOK CALLED')

#     if request.content_length > 1024 * 1024:
#         print('REQUEST TOO BIG')
#         abort(400)
#     payload = request.get_data()
#     sig_header = request.environ.get('HTTP_STRIPE_SIGNATURE')
#     endpoint_secret = 'your_webhook_endpoint_secret'  # Replace with your webhook endpoint secret
#     event = None

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, endpoint_secret
#         )
#     except ValueError as e:
#         # Invalid payload
#         print('INVALID PAYLOAD')
#         return '', 400
#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         print('INVALID SIGNATURE')
#         return '', 400

#     # Handle the checkout.session.completed event
#     if event['type'] == 'checkout.session.completed':
#         session = event['data']['object']
#         print(session)
#         line_items = stripe.checkout.Session.list_line_items(session['id'], limit=1)
#         print(line_items['data'][0]['description'])

#     return {}
