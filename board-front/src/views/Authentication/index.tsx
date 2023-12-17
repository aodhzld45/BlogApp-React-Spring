import React, { useState } from 'react'
import './style.css';

// Component : 인증 화면 (Authentication) 컴포넌트
export default function Authentication() {

// State : 화면 상태 값 관리 
const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');


  // Component : 로그인 카드 (SignInCard) 컴포넌트
  const SignInCard = () => {


// Render : 로그인 카드 (SignInCard) 렌더링 부분
    return (
      <div className='auth-card'>
      </div>
      )
    
  }

    // Component : 회원 가입 카드 (SignUpCard) 컴포넌트
  const SignUpCard = () => {


    // Render : 회원 가입 카드 (SignUpCard) 렌더링 부분
        return (
          <div className='auth-card'>
          </div>
          )
        
  }


// Render : 인증 화면 (Authentication) 렌더링 부분
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
              <div className='auth-jumbotron-text'>{`Seo's Board 입니다.`}</div>
            </div>
          </div>
        </div>
       {view === 'sign-in' && <SignInCard />}
       {view === 'sign-up' && <SignUpCard />}
      </div>

    </div>
  )
}
