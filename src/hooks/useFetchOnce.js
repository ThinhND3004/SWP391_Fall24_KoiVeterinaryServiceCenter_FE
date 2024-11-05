import { useState, useEffect } from 'react'
import axios from 'axios'
import api from '~/config/axios'

const useFetchOnce = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // flag ngăn call api 2 lần, = true --> mặc định là 1 lần
    const fetchData = async () => {
      try {
        const response = await api.get(url) // response get data khi call xong api với endpoint url
        if (isMounted && response?.data?.status === 200) { // ? = not null => ý nghĩa đoạn if này là nếu isMounted = true (là cho phép chỉ 1 lần) và response có data trả về thì cho vô
          setData(response.data.data)

        }
      } catch (err) {
        if (isMounted) setError('Error fetching data')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (!data) {
      fetchData()
    }

    return () => {
      isMounted = false // chạy xong 1 vòng thì trả lại 1 function trong đó set mounted lại = false để khóa điều kiện if ở line 17
    }
  }, [url])

  return { data, loading, error }
}

export default useFetchOnce