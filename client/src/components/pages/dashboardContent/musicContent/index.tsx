import React from 'react'
import UploadMusicHolder from './uploadMusicHolder'
import DashboardHeaderSearchInfo from '../entryPointContent/DashboardHeaderSearchInfo'



function MusicUploadPage() {
  return (
    <div className=' p-10  h-auto'>
      <DashboardHeaderSearchInfo dashboard_location="Music conent"/>
         <UploadMusicHolder/>
    </div>
  )
}

export default MusicUploadPage