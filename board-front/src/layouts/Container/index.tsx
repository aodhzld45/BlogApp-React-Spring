import React from 'react'
import Header from 'layouts/Header'
import Footer from 'layouts/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from 'constant';

// Component : Container 화면 (Container) 컴포넌트
export default function Container() {

// State : 현재 페이지 path state 상태
const  {pathname } = useLocation();

// Render : Container 화면 (Container) 렌더링 부분
  return (
    <>
    <Header />
    <Outlet />
    {/* 만약 pathname '/auth'가 아니면 <Footer /> 출력 */}
    {pathname !== AUTH_PATH() &&  <Footer />}
    </>
  )
}
