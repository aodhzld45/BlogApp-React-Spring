import './style.css';

// Component: Footer Layout
export default function Footer() {
// event Handler : 깃허브 아이콘 버튼 클릭 이벤트 처리
const onGitIconButtonClickHandler = () => {
    window.open('https://github.com/aodhzld45');
}

// Render : Footer Layout Rendering
  return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{`Seo's Board`}</div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'>{'prking94@naver.com'}</div>
                    <div className='icon-button'>
                        <div className='icon git-icon' onClick={onGitIconButtonClickHandler}></div>
                    </div>
                    <div className='icon-button'>
                        <div className='icon naver-blog-icon'></div>
                    </div>
                </div>
            </div>

            <div className='footer-bottom'>
                <div className='footer-copy-light'>{'Copyright ©️ HyunSeok. All Rights Reserved.'}</div>
            </div>
        </div>
    </div>
  )
}
