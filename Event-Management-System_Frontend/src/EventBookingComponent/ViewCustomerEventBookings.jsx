import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ViewCustomerEventBookings = () => {
  const [allEventBookings, setAllEventBookings] = useState([]);
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));

  const customer_jwtToken = sessionStorage.getItem("customers-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllEventBookings = async () => {
      const allEventsBookings = await retrieveAllEventBookings();
      if (allEventsBookings) {
        setAllEventBookings(allEventsBookings.bookings);
      }
    };

    getAllEventBookings();
  }, []);

  const retrieveAllEventBookings = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/booking/fetch/customer-wise?customerId=" +
        customer.id
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>My Bookings</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Booking Id </th>
                  <th scope="col">Event</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Venue Name</th>
                  <th scope="col">Total Tickets</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Booking Time</th>
                  <th scope="col">Event Time</th>
                </tr>
              </thead>
              <tbody>
                {allEventBookings.map((booking) => {
                  return (
                    <tr>
                      <td>
                        <b>{booking.bookingId}</b>
                      </td>
                     

                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/event/" +
                            booking.event.image
                          }
                          class="img-fluid"
                          alt="event_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{booking.event.name}</b>
                      </td>

                      <td>
                        <b>{booking.event.venueName}</b>
                      </td>
                      <td>
                        <b>{booking.noOfTickets}</b>
                      </td>
                      <td>
                        <b>{booking.amount}</b>
                      </td>

                      <td>
                        <b>{formatDateFromEpoch(booking.bookingTime)}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(booking.event.startDate)}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerEventBookings;
