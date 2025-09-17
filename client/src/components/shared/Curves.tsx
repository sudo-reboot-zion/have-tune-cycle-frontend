import Image from 'next/image';



function Curves() {
  return (
    <div className="hidden  md:flex items-center justify-center h-[10vh] z-10 relative"> 
      <div className="relative w-full h-full">
      <Image
        src='/images/curve1.svg'
         alt="client-1"
        className=" md:w-28 lg:w-56 absolute top-0 -left-[1rem] scale-x-[-1]"  
        width={200}
        height={200}
        style={{ objectFit: 'contain' }} 
    />

        <Image
          src='/images/curve2.svg'
          alt="client-2"
          className="absolute top-0 lg:top-0 lg:-left-24 md:-left-12 scale-x-[-1] md:w-60 lg:w-[30%]"
          width={400}
          height={350}
          style={{ objectFit: 'contain' }} 
        />

         <Image
          src='/images/curve3.svg'
          alt="client-2"
          className="absolute lg:-top-2 md:top-0 lg:-left-12  scale-x-[-1] md:-left-[5rem] md:w-96 lg:w-[40%]  "
          width={600}
          height={600}
          style={{ objectFit: 'contain' }} 
        />

      </div>
    </div>
  );
}

export default Curves;
