import { useEffect, useState } from "react"


const useFetch = (url) => {

    const [data, setData] = useState()
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        // We associate it with a specific fetch request. Once associated with a request we can use the abort controller to stop the fetch. We do that because running fetch within useeffect in very quick successions while mounting and unmounting each component which calls the request does not allow us to reflect the change of fetch request to update the component timely. And gives error. So we clean each request in cleanup function by using AbortController.

        const abortCont = new AbortController();
        
        setTimeout(()=> {
          fetch(url, {signal: abortCont.signal})
            .then(res => {
              if(!res.ok)
              {
                throw Error('Could not fetch the data for that resource')
              }
              return  res.json()
            })
            .then(data => { 
              console.log(data)
              setData(data)
              setPending(false)
              setError(null)
            })
            .catch(err => {
              if(err.name === 'AbortError')
              {
                console.log('Fetch Aborted');
              }
              else{
                setError(err.message)
                setPending(false)

              }
            })
  
        },1000)

        return () => abortCont.abort();
        
      },[url])
      return {data, pending, error}
}

export default useFetch