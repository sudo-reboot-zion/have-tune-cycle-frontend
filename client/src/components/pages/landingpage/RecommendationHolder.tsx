"use client"

import React, { useEffect } from 'react';
import { recommendationData } from '@/lib/data';
import { useDispatch, useSelector } from 'react-redux'

import RecommendationCard from '@/components/common/cards/RecommendationCard';
import Indicators from '@/components/shared/Indicator';
import { AppDispatch, RootState } from '@/redux/store';
import { goToNextPage, goToPage, goToPrevPage, setItemsPerpage, setTotalItems } from '@/redux/features/paginationSlice';


function RecommendationHolder() {
  const dispatch = useDispatch<AppDispatch>();
  const {currentPage, itemsPerPage, totalItems} = useSelector((state:RootState)=>state.pagination)

  useEffect(()=>{
    dispatch(setTotalItems(recommendationData.length))
    dispatch(setItemsPerpage(3))
  },[dispatch])

  const startIndex = currentPage * itemsPerPage;
  const visibleRecommendations = recommendationData.slice(startIndex, startIndex + itemsPerPage);


  const handlePrev=()=>{
    dispatch(goToPrevPage())
  };

  const handleNext=()=>{
    dispatch(goToNextPage());
  }

  const handleGoToPage=(pageIndex:number)=>{
    dispatch(goToPage(pageIndex))
  }


  return (
    <div className='max-w-[90%] mx-auto text-white font-outfit'>
      <div className='p-5 lg:p-0  flex flex-col lg:flex-row gap-10 mb-10 md:mb-32'>
        {visibleRecommendations.map((item, index) => (
          <RecommendationCard
            key={index}
            image={item.image}
            name={item.name}
            rating={item.rating}
            occupation={item.occupation}
            opinion={item.opinion}
          />
        ))}
      </div>


      <Indicators
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoToPage={handleGoToPage}
      />
    </div>
  );
}

export default RecommendationHolder