import { useState, KeyboardEvent, useRef, ChangeEvent } from 'react'
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDTO } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInReqonseDTO } from 'apis/response/auth';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'apis/response';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

// Component : 인증 화면 (Authentication) 컴포넌트
export default function Authentication() {

// State : 화면 상태 값 관리 
const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
// State : 쿠키 상태 값 관리
const [cookies, setCookies] = useCookies();
// function : Navigate 함수 
const navigate = useNavigate();


// Component : 로그인 카드 (SignInCard) 컴포넌트
const SignInCard = () => {

// State : 이메일 요소 참조 상태 값 관리
const emailRef = useRef<HTMLInputElement | null>(null);
// State : 이메일 요소 참조 상태 값 관리
const passwordRef = useRef<HTMLInputElement | null>(null);
// State : 이메일 상태 값 관리
  const [email, setEmail] = useState<string>('');
// State : 비밀번호 상태 값 관리
  const [password, setPassword] = useState<string>('');
// State : 비밀번호 타입 상태 값 관리
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
// State : 비밀번호 버튼 아이콘 상태 값 관리
  const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
// State : 에러 상태 값 관리
  const [error, setError] = useState<boolean>(false);

// function : signInrResponse 처리 함수.
const signInrResponse = (responseBody: SignInReqonseDTO | ResponseDto | null) => {
  if (!responseBody){
    alert('네트워크 상태를 확인해주세요.');
    return;
  }
  const { code } = responseBody;
  if (code === 'DBE') alert('데이터베이스 오류입니다.');
  if (code === 'SF' || code === 'VF') setError(true);
  if (code !== 'SU') return;

  const {token, expirationTime} = responseBody as SignInReqonseDTO;
  const now = new Date().getTime();
  const expires = new Date(now + expirationTime);

  setCookies('accessToken', token, {expires, path: MAIN_PATH() });

  navigate(MAIN_PATH());

};

// Event handler :  이메일 변경 이벤트 처리 핸들러
const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setError(false);
  const { value } = e.target;
  setEmail(value); 
}

// Event handler :  비밀번호 변경 이벤트 처리 핸들러
const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setError(false);
  const { value } = e.target;
  setPassword(value); 
}

// Event handler : 로그인 버튼 클릭 이벤트 처리 핸들러
const onLoginButtonClickHandler = () => {
  const requestBody : SignInRequestDTO = { email, password};
  signInRequest(requestBody).then(signInrResponse);
}

// Event handler : 회원가입 링크 클릭 이벤트 처리 핸들러
const onSignUpLinkClickHandler = () => {
  setView('sign-up');
}


// Event handler : 비밀번호 버튼 클릭 이벤트 처리 핸들러
const onPasswordButtonClickHandler = () => {

  console.log("Button clicked!");
  console.log("Current passwordType:", passwordType); 

  if (passwordType === 'text') {
    setPasswordType('password');
    setPasswordButtonIcon('eye-light-off-icon');
  }
  else {
    setPasswordType('text');
    setPasswordButtonIcon('eye-light-on-icon');
  }
}

// Event handler : 이메일 인풋 키 다운 이벤트 처리 핸들러
const onEmailKeyDownHandler = (e :KeyboardEvent<HTMLInputElement>) => {
  if(e.key !== 'Enter') return;
  if(!passwordRef.current) return;
  passwordRef.current.focus();
}

// Event handler : 비밀번호 인풋 키 다운 이벤트 처리 핸들러
const onPasswordKeyDownHandler = (e :KeyboardEvent<HTMLInputElement>) => {
  if(e.key !== 'Enter') return;
}


// Render : 로그인 카드 (SignInCard) 렌더링 부분
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} label='{이메일 주소}' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} label='비밀번호' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error && 
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
                {'이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.'}
              </div>
            </div>
            }

            <div className='black-large-full-button' onClick={onLoginButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>
                {'신규 사용자이신가요?'}
                <span className='auth-description-link' onClick={onSignUpLinkClickHandler}> {'회원가입'}</span>
              </div>
            </div>
          </div>
        </div>
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
