import {useEffect, useState} from 'react'
 
const useViewportCheck = () => {
  const [viewport, setViewport] = useState(null)
 
  useEffect(() => {
    const handleWindowResize = () => setViewport(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
 
  useEffect(() => {
      setViewport(window.innerWidth)
  }, [])
 
  return {viewport}
}
 
export default useViewportCheck
