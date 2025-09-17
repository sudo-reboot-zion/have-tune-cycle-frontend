import { IoMdArrowDropdown } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";

function TableTitle() {
  return (
    <div className="py-5 text-[18px] font-bold text-nowrap text-white">
  
      <div className="flex items-center py-4 border-b border-gray-300 gap-10">
        <div className="flex-1  text-center">#</div>

        <div className="flex-1 ">Songs</div>

        <div className="flex-1  flex items-center gap-2">
          <h1>Genre</h1>
          <IoMdArrowDropdown />
        </div>

    
        <div className="flex-1 ">Uploaded on</div>

        <div className="flex-1">Status</div>

        <div className="flex-1 flex items-center gap-2">
          <h1>Artist</h1>
          <FiArrowUpRight />
        </div>

        <div className="flex-1  flex items-center gap-1">
          <h1>Price</h1> ($)
        </div>

        <div className="flex-1 ">Leased Period</div>
      </div>
    </div>
  );
}

export default TableTitle;