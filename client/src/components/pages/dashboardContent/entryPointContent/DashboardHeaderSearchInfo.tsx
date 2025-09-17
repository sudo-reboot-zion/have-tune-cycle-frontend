"use client"
import { RiArrowLeftSLine } from "react-icons/ri";
import { useAuth } from "@/hooks/useAuth";



function DashboardHeaderSearchInfo({dashboard_location}:{dashboard_location:string}) {
  const { isAuthenticated, user } = useAuth();

      const getUserDisplayName = () => {
        if (!user) return 'User';
        if (user.first_name && user.last_name) {
            return `${user.first_name} ${user.last_name}`;
        }
        return user.username || 'User';
    }


  return (
    <div className="flex items-center w-full justify-between font-poppins font-extralight gap-5 text-white">

        <div className='flex items-center gap-2 flex-[10%]'>
            <RiArrowLeftSLine className="text-[15px] lg:text-3xl "/>
            <span className="font-poltwaski lg:text-[20px] text-nowrap">{dashboard_location}</span>
        </div>



        <div className=" hidden  lg:flex items-center gap-5">

            <div className="flex items-center gap-3">
                  {isAuthenticated && (
                    <h1 className='font-outfit lg:text-[20px]'>{getUserDisplayName()}</h1>

                  )}
            </div>
        </div>
    </div>
  )
}

export default DashboardHeaderSearchInfo