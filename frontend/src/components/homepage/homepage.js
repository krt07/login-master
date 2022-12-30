import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './style.css'

const Homepage = () => {
  const [userApi, setUserApi] = useState([])
const navigate = useNavigate();
const [p] = useSearchParams();
const page = p.get('p');
  const [search, setSearch] = useState('')
  const limit = 20
  const pages = userApi?.total / limit
  let NoOfPages = []
  for (let i = 1; i <= pages; i++) {
    NoOfPages.push(i)
  }
  const handleData = async (search1, page1) => {
    const apiUrl = new URL('https://dummyjson.com/users/search');
    apiUrl.searchParams.set('q', search1);
    apiUrl.searchParams.set('limit', limit);
    apiUrl.searchParams.set('skip', `${(page-1) * limit}`)
    apiUrl.searchParams.set('page', page1);
    const res = await axios.get(apiUrl.toString())
    console.log(res.data)
    setUserApi(res.data)
  }

  useEffect(() => {
    handleData(search, page);
  }, [search, page])

  if (!userApi?.users?.length) {
    return 'loading...'
  }

  return (
    <div className='homepage_Wrapper'>
      <form className='form_Search'>
        <input
          type='text'
          placeholder='search Here'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {userApi?.users?.map((i, index) => (
        <ul key={index} className='list_Wrapper'>
          <li>{i?.firstName}</li>
          <li>{i?.lastName}</li>
          <li className='list_Wid'>{i?.email}</li>
          <li>{i?.password}</li>
        </ul>
      ))}
      {!!NoOfPages.length && (
        <div className='pagi_Wid'>
          <ul className='pagination_Wrapper'>
            {NoOfPages.map((i) => (
              <li key={i} onClick={() => navigate(`/card?p=${i}`)}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Homepage
