import React from 'react'
import './style.css'
import { FavoriteListItem } from 'types/interface'
import defaultProfileImage from 'assets/image/default-profile-image.png'

// Interface : FavoriteListItem 인터페이스
interface Props {
    favoriteListItem : FavoriteListItem
}

//  Component : FavarioteListItem 컴포넌트

export default function FavarioteItem({favoriteListItem}: Props) {



// properties
const {nickName, profileImage} = favoriteListItem

//  Rendering : 렌더링 부분
  return (
    <div className='favriote-list-item'>
        <div className='favriote-list-item-profile-box'>
            <div className='favriote-list-item-profile-image' style={{backgroundImage : `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
        </div>
        <div className='favriote-list-item-nickname'>{nickName}</div>
    </div>
  )
}
