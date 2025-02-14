import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
    const { bookings, editAppointment, deleteAppointment } = useContext(AppContext);
    const navigate = useNavigate(); 

    const editSlot = (appointment) => {
    
    navigate(`/appointment/${appointment.doctorId}`);
  };

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
            <div>
                {bookings.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
                        <div>
                            <img className='w-36 bg-green-100 rounded-lg' src={item.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{item.name}</p>
                            <p>{item.speciality}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Date & Time:</p>
                            <p className='text-xs'>{item.time}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <button onClick={() => editAppointment(index, navigate)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300'>
                                Edit Slot
                            </button>
                            <button onClick={() => deleteAppointment(index)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>
                                Delete Slot
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
