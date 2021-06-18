import {useEffect} from 'react'

const useCheckUser = (user, push) => {
  useEffect(() => {
    if(!user.id){
      push('/register')
    }
  }, [])
}

export default useCheckUser