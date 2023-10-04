import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Morocco1ImageUrl from "../../img/morocco1.jpg";

const DonatePage = () => {
  const { store, actions } = useContext(Context);
 const [
  currency, setCurrency
 ] = useState (["USD","Bitcoin", "EUR" ,"AUD"])
 const [
  selection, setSelection
 ] = useState (currency[0])
  return (
    <>
      <div className="container width:100px">
        <div class="row">
          <div className=" col-6 p-5">
            <h3>
              Empowering Morocco's Resilience Through Compassion and Action
            </h3>

            <div class="row-md-3 p-3">
              <text>
                At HelpingHands Morocco, we are dedicated to providing immediate
                relief and long-term support to the earthquake-affected regions
                of Morocco. Our mission is clear: to rebuild lives and
                communities, one step at a time. We believe in the power of
                collective action and compassion to bring hope to those in need.
                Join us on this journey to make a difference and support the
                resilient people of Morocco as they rebuild their lives after
                the earthquake
              </text>
            </div>
          </div>

          <div className="col-6 p-5 d-flex flex-column ">
            <div className="row">
              <div class="col-3">
                <p>Donate Now </p>
              </div>
              <div class="col-9 text-end dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   <text> {selection} </text>
  </button>
  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
    { currency.map(item =>  <li onClick={() => setSelection (item)}><a class="dropdown-item" href="#"> {item} </a></li> )}
  </ul>
              </div>
            </div>

            <div className="row">
              <div class="col-3">
                <form action="">
                  <input type="checkbox" /> One Time
                </form>
              </div>

              <div class="col-3">
                <form action="">
                  <input type="checkbox" /> Monthly
                </form>
              </div>
            </div>

            <div className="row p-4">
              <div class="col-4">
              <label> </label>
                <button type="button" className="btn btn-info col-9" onClick={()=>actions.checkout() }>
                $10
                </button >
              </div>
              <div class="col-4">
              <label> </label>
                <button type="button" className="btn btn-info col-9">
                $20
                </button>
              </div>
              <div class="col-4">
              <label> </label>
                <button type="button" className="btn btn-info col-9">
                $30
                </button>
              </div>
              </div>
              <div className="row p-4">
                <div class="col-4 pe-2">
                <button type="button" className="btn btn-info col-9">
                $60
                </button>
                </div>
                <div class="col-8 pe-2">
                  <label> </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="$ other amount"
                  />
                </div>
              </div>
            
            

            <div className="row pt-3">
              <div className="d-flex align-items-center">
                <strong>Choose Payment</strong>

                <div className="d-flex align-items-center">
                  <i class="fa-solid fa-lock mx-3"></i>
                    <strong>Secure</strong>
                </div>
              </div>
            </div>

            <div className="row p-3 mt-5">
              <div class="col text-center">
                <button type="button" className="btn btn-info col-9">
                  Visa
                </button>
              </div>
              <div class="col text-center">
                <button type="button" className="btn btn-info col-9">
                  Visa
                </button>
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

export default DonatePage;
