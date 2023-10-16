from flask import Flask, render_template, url_for, request, abort
import stripe
import os

app = Flask(__name__)

# Use environment variables for sensitive information
app.config['STRIPE_PUBLIC_KEY'] = os.getenv('STRIPE_PUBLIC_KEY')
app.config['STRIPE_SECRET_KEY'] = os.getenv('STRIPE_SECRET_KEY')
stripe.api_key = app.config['STRIPE_SECRET_KEY']

@app.route('/')
def index():
    # If you decide to use the session creation code, make sure to structure it correctly.
    # For now, I've left it commented out.
    return render_template('index.html')

@api.route('/stripe_pay')
def stripe_pay():
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[
            {'price': 'price_1NvRPvEkSwAVwyol4daWiYZ4', 'quantity': 1},
            # Add other line items here as needed
        ],
        mode='payment',
        success_url=url_for('thanks', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=url_for('index', _external=True),
    )
    return {
        'checkout_session_id': session['id'], 
        'checkout_public_key': app.config['STRIPE_PUBLIC_KEY']
    }

@app.route('/thank_you')
def thanks():
    return render_template('thank_you.html')

@app.route('/stripe_webhook', methods=['POST'])
def stripe_webhook():
    if request.content_length > 1024 * 1024:
        abort(400)
    payload = request.get_data()
    sig_header = request.environ.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = os.getenv('STRIPE_ENDPOINT_SECRET')  # Fetch from environment variable
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return {}, 400
    except stripe.error.SignatureVerificationError as e:
        return {}, 400

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        line_items = stripe.checkout.Session.list_line_items(session['id'], limit=1)

    return {}

# Add any other necessary code or routes here

if __name__ == '__main__':
    app.run()
    