"use client";

interface LeaseYearsSliderProps {
  years: number;
  setYears: (value: number) => void; 
}

function LeaseYearsSlider({ years, setYears }: LeaseYearsSliderProps) {
  return (
    <div className="relative w-full flex flex-col items-center p-4">
      <div className="place-self-start mb-5">
        <h1 className="text-[20px] font-bold">Lease Duration (Years)</h1>
      </div>

      <div
        className="absolute -top-3 bg-white text-black font-bold px-3 py-1 text-sm shadow-md transition-all duration-200"
        style={{
          left: `calc(${(years - 1) * 5}% - 15px)`,
        }}
      >
        {years} Year{years > 1 ? "s" : ""}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 
          border-l-8 border-l-transparent 
          border-r-8 border-r-transparent 
          border-t-8 border-t-white"
        ></div>
      </div>

      <input
        type="range"
        min="1"
        max="20"
        step="1"
        value={years}
        onChange={(e) => setYears(parseInt(e.target.value))} 
        className="w-full appearance-none h-3 rounded-[2px] cursor-pointer lease-slider"
        style={{
          background: `linear-gradient(to right,  #FFA500 ${(years - 1) * 5}%, #232638 ${(years - 1) * 5}%)`,
        }}
      />

      <div className="flex justify-between w-full text-[14px] font-bold mt-3">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="text-gray-300 text-xs">
            {i + 1}
          </span>
        ))}
      </div>

      <style>
        {`
          .lease-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 22px;
            height: 22px;
            background: #FFA500; 
            border: 4px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 132, 255, 0.5);
            transition: transform 0.2s ease;
          }

          .lease-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }

          .lease-slider::-moz-range-thumb {
            width: 22px;
            height: 22px;
            background: #0084ff; 
            border: 4px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 132, 255, 0.5);
          }
        `}
      </style>
    </div>
  );
}

export default LeaseYearsSlider;