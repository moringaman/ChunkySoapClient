import {useEffect, useState} from 'react'
 
const useViewportCheck = () => {
  const [viewport, setViewport] = useState(window.innerWidth)
 
  useEffect(() => {
    const handleWindowResize = () => setViewport(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
 
  useEffect(() => {
    console.log('VIEWPORT ', viewport)
  }, [viewport])
 
  return {viewport}
}
 
export default useViewportCheck