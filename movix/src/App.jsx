import { useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { homeSliceActions } from './store/homeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import PageNotFound from './pages/404/pageNotFound'
import Explore from './pages/explore/Explore'

function App() {
  const dispatch = useDispatch();
  // const url = useSelector((state) => state.url); 
  //or
  const { url } = useSelector((state) => state.home)
  console.log("object", url)

  useEffect(() => {
    fetchApiConfig();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          profile: res?.images?.secure_base_url + "original",
        }
        dispatch(homeSliceActions.getApiConfiguration(url))
        console.log(url)
      })
  }

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
