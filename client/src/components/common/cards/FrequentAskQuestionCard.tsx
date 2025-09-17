export default function FrequentAskQuestionCard({question,answer}:{question:string;answer:string}) {
    return (
      <div className='bg-[#1F2231] py-3 space-y-10 text-white lg:space-y-20 p-3 text-[16px] font-bold lg:text-[20px]'>
          <div className='space-y-3'>
              <h1 className="font-poppins">Question:</h1>
              <p className="font-poppins">{question}</p>
          </div>
          
          <div className='space-y-3'>
              <h1 className="font-poppins">Answer</h1>
              <p className="font-outfit font-extralight">{answer}</p>
          </div>
  
      </div>
    )
  }
  
