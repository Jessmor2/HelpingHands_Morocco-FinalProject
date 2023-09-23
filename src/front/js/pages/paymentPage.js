import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import morocco1ImageUrl from "../../img/morocco1.jpg";
const PaymentPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container width:100px">
        <div className="text-center mt-5">
          {/* put the welcome username on the left side using padding */}
          <h2> Billing Information </h2>
        </div>
        <div class="row">
          <div className=" col-6 p-5">
            <label> </label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Full Name"
            />

            <div class="row-md-3">
              <label> </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Address Line 1"
              />
            </div>
            <div class="row-md-3">
              <label> </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Address Line 2"
              />
            </div>
            <div className="row">
              <div class="col-6">
                <label> </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="city"
                />
              </div>
              <div class="col-6">
                <label> </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="state"
                />
              </div>
            </div>
            <div class="row-md-3">
              <label> </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Email Address"
              />
            </div>
            <div class="row-md-3">
              <label> </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Phone Number (optional)"
              />
            </div>
          </div>
          <div className="col-6 p-5">
            <div class="col-12">
              <label> </label>
              <input
                type="text"
                class="form-control"
                id="CVV # "
                placeholder="Credit Card number"
              />
            </div>
            <div className="row">
              <div class="col-4">
                <label> Expiration Date</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="month"
                />
              </div>
              <div class="col-4">
                <label> </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Year"
                />
              </div>
              <div class="col-4">
                <label> CVV</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="what is this"
                />
              </div>
              <div className="row p-4">
                <div>
                  <form action="">
                    <input type="checkbox" /> I'd like to cover the fees
                    associated with my donation so more of my donation goes
                    directly to HelpingHandsMorocco
                  </form>
                </div>
                <div className="text-center mt-4">
                  <p>Amount</p>
                  <strong> 210.00 USD </strong> <br></br>
                  <button type="button" class="btn btn-warning">
                    Donate Now
                  </button>
                  <br></br>
                  <p>
                    When user clicks the Donate Button, it will take the user to
                    the thank you page or maybe an alert saying thank you for
                    the donation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <div class="row">
            <div className=" col-4 p-5">
              <p>
                <i class="fa-solid fa-square-check"></i>
              </p>
              <h4> Feature One </h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                quis felis convallis, rhoncus leo id, scelerisque purus. Ut
                auctor gravida nulla.
              </p>
            </div>
            <div className=" col-4 p-5 ">
              <p>
                <i class="fa-brands fa-font-awesome"></i>
              </p>
              <h4> Feature Two </h4>

              <p>
                Aliquam vel nibh iaculis, ornare purus sit amet, euismod dui.
                Cras sed tristique neque. Cras ornare dui lorem, vel rhoncus
                elit venenatis sit amet.
              </p>
            </div>
            <div className=" col-4 p-5">
              <p>
                <i class="fa-regular fa-star"></i>
              </p>
              <h4> Feature Three </h4>
              <p>
                Vestibulum ultricies erat vitae faucibus vulputate. Sed finibus
                ipsum eu nibh volutpat, in congue sapien vehicula condimentum
                ligula vitae.
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div className=" col-6 p-5">
            <h4>
              Effortless Giving, <br></br>
              Immediate Impact
            </h4>{" "}
            <br></br>
            <p>
              Our app streamlines the process of supporting earthquake relief in
              Morocco. Experience the ease of giving with just a few taps and
              witness your contributions create an immediate impact. Join us in
              making a real difference, effortlessly.
            </p>
          </div>
          <div className="col-6 p-5">
            <img
              src="morocco1.jpg"
              alt="morocco1.jpg"
              width="460"
              height="345"
            />
          </div>
        </div>

        <div className="text-center mt-5">
          <div>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulputate commodo lectus, ac blandit elit tincidunt id."
            </p>
          </div>
          <div>
            <i class="fa-regular fa-image"></i>
            <p>John Doe, CTO of Client Company</p>
          </div>
        </div>

        <div className="text-center mt-5">
          <div>
            <h2>Get In Touch </h2>
          </div>
          <div>
            <p>
              Stay connected with us! Subscribe to our newsletter by entering
              your email below. Receive updates on our relief efforts and
              stories of impact. Together, we can make a difference. Join us in
              bringing hope and relief to those in need.
            </p>
          </div>
          <div className="text-center  mt-5">
            <div className="row">
              <div class="col-5">
                <label> </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Email Address"
                />
              </div>
              <div class="col-5 ">
                <label> </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Full Name"
                />
              </div>
              <div class="col-2 p-4">
                <button type="button" class="btn btn-secondary">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
