import axios from "axios"
import { useEffect, useState } from "react"



export function useFetch<T = unknown>(url: string){
const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        axios.get(url)
            .then(response =>{
              setData(response.data)
            })
      }, [])
      return {data}
}


//'http://192.168.1.118:8000/api/pessoas/d684362d-1a38-4b00-a4ab-11d3c7583af0/'