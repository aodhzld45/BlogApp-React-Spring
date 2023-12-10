import React from 'react'

import './style.css'
// Component : Board List Item Component



export default function Top3Item() {

// render : Top3 List Item Component Rendering
  return (
    <div className='top-3-list-item'>
        <div className='top-3-list-item-main-box'>
            <div className='top-3-list-item-top'>
                <div className='top-3-list-item-profile-box'>
                    <div className='top-3-list-item-profile-image' style={{backgroundImage: `url()`}}></div>
                </div>
                <div className='top-3-list-item-write-box'>
                    <div className='top-3-list-item-nickname'>{'안녕하세요 테스트닉네임'}</div>
                    <div className='top-3-list-item-write-date'>{'2023-12-10'}</div>
                </div>
            </div>
            <div className='top-3-list-item-middle'></div>
                <div className='top-3-list-item-title'>{'제목입니다'}</div>
                <div className='top-3-list-item-content'>{'내용입니다.'}</div>
            <div className='top-3-list-item-bottom'></div>
                <div className='top-3-list-item-counts'>
                    {`댓글 0 · 좋아요 · 조회수 0`}
                </div>
        </div>
    </div>
  )
}
