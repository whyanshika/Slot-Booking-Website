import React, { useState } from 'react'
import {assets} from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: 'Anshika Gupta',
    iamge: assets.profile_pic,
    email: 'abcd@gmail.com',
    phone: '+91 1234 5679',
    address:{
      line1:'12th floor 0000',
      line2:'0000, Muzaffarnagar U.P,'
    },
    gender: 'Female',
    dob:'2003-07-19',
  })

  const [isEdit, setIsEdit] = useState(true)

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      
      <img className='w-28 rounded' src={userData.iamge} alt="" />
      {
        isEdit
        ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-2' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>
        : <p className='font-medium text-3xl text-neutral-800 mt-2'>{userData.name}</p>
      }
      <hr className='border-zinc-400 h-[1px]' />
      <div>
        <p className='text-neutral-500 underline mt-2'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
        isEdit
        ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))}/>
        : <p className='text-blue-400'>{userData.phone}</p>
      }
      <p className='font-medium'>Address:</p>
      <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2} </p>
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-2'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
        isEdit
        ? <select className='max-w-20 bg-gray-100' onChange={(e)=> setUserData(prev=>({...prev, gender:e.target.value}))} value={userData.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p className='text-gray-400'>{userData.gender}</p>
      }
      <p className='font-medium'>Birthday:</p>
      {
        isEdit
        ? <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={e => setUserData(prev => ({...prev,dob:e.target.value}))}/>
        : <p className='text-gray-400'>{userData.dob}</p>
      }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(false)}>Save Information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
