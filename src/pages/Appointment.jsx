import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { DateTime } from "luxon";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { docId } = useParams();
  const { state } = useLocation();
  const { doctors, bookAppointment } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slotTime, setSlotTime] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [unavailableSlots, setUnavailableSlots] = useState(["11:00 AM", "02:30 PM", "05:00 PM"]); 

  useEffect(() => {
    setDocInfo(doctors.find((doc) => doc._id === docId));
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;

    let currentDate = new Date(selectedDate);
    let timeSlots = [];
    currentDate.setHours(10, 0);

    let endTime = new Date(currentDate);
    endTime.setHours(21, 0);

    while (currentDate < endTime) {
      const dateTime = DateTime.fromJSDate(currentDate, { zone: "UTC" }).setZone(selectedTimeZone);
      timeSlots.push({
        dateTime: dateTime,
        time: dateTime.toFormat("hh:mm a"),
      });
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    setDocSlots(timeSlots);
  }, [docInfo, selectedDate, selectedTimeZone]);

  const handleBooking = () => {
    if (!slotTime) return alert("Please select a time slot!");

    bookAppointment({
      doctorId: docInfo._id,
      doctor: docInfo.name,
      speciality: docInfo.speciality,
      image: docInfo.image,
      date: DateTime.fromJSDate(selectedDate).toISODate(),
      time: slotTime,
      timeZone: selectedTimeZone,
    });

    alert("Appointment booked successfully!");
  };

  return (
    docInfo && (
      <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-violet-100 p-6 gap-6">
   
        <div className="w-full md:w-3/5 bg-violet-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text mb-4">Select Appointment Date:</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            className="border p-4 rounded-md w-full shadow"
          />

 
          <div className="mt-4">
            <label className="text-violet-700 font-medium">Select Time Zone:</label>
            <select
              className="border border-gray-300 p-2 rounded-md w-full mt-2"
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.target.value)}
            >
              {Intl.supportedValuesOf("timeZone").map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

   
          <div className="mt-4">
            <p className="text-violet-700 font-medium">Available Slots:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
              {docSlots.length > 0 ? (
                docSlots.map((item, index) => {
                  const isUnavailable = unavailableSlots.includes(item.time);
                  return (
                    <button
                      key={index}
                      onClick={() => !isUnavailable && setSlotTime(item.time)}
                      disabled={isUnavailable}
                      className={`p-2 rounded-md text-sm transition ${
                        isUnavailable
                          ? "bg-red-500 text-white line-through cursor-not-allowed"
                          : item.time === slotTime
                          ? "bg-green-500 text-white"
                          : "bg-white hover:bg-green-400"
                      }`}
                    >
                      {item.time}
                    </button>
                  );
                })
              ) : (
                <p className="text-red-500">No slots available</p>
              )}
            </div>

            <button
              onClick={handleBooking}
              className="bg-violet-500 text-white rounded-md my-6 px-6 py-3 w-full"
            >
              {state?.appointmentToEdit ? "Update Slot" : "Book Slot"}
            </button>
          </div>
        </div>

      
        <div className="w-full md:w-2/5 bg-white p-6 rounded-lg shadow-lg text-center">
          <img src={docInfo.image} alt={docInfo.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto" />
          <h2 className="text-lg sm:text-xl font-semibold mt-4">{docInfo.name}</h2>
          <p className="text-gray-500">{docInfo.speciality}</p>
        </div>
      </div>
      
    )
  );
};

export default Appointment;
