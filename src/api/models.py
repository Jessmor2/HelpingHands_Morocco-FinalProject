from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)
    address = db.Column(db.String(500), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    donationinfo = db.relationship(
        "DonationInfo", backref="user_tbl", lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,

            # do not serialize the password, its a security breach
        }


class DonationInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(500), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    time_created = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    user = db.relationship(
        "User", backref="donation_info", foreign_keys=[user_id])

    # establish the relationship between user and donations
    # establish the relation between donator and payment proccessing

    # credit card
    def __repr__(self):
        return f'<DonationInfo {self.email}>'

    def serialize(self):
        return {
            "transaction_id": self.id,
            "user_id": self.user_id if self.user_id is True else "anonymous",
            "full_name": self.full_name,
            "email": self.email,
            "address": self.address,
            "phone_number": self.phone_number,
            "time_created": self.time_created

            # do not serialize the card credit, its a security breach
        }
