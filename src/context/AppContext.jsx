import { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "$";
    const [bookings, setBookings] = useState([]);

    const bookAppointment = (appointment) => {
        setBookings((prev) => [...prev, appointment]);
    };

    const deleteAppointment = (index) => {
        setBookings((prev) => prev.filter((_, i) => i !== index));
    };

    const editAppointment = (index, navigate) => {
        const appointmentToEdit = bookings[index];
    
        if (!appointmentToEdit) return; 
    
        navigate(`/appointment/${appointmentToEdit.doctorId}`, { state: { appointmentToEdit } });
    };
    
    return (
        <AppContext.Provider value={{ doctors, currencySymbol, bookings, bookAppointment, deleteAppointment, editAppointment }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
