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
    // State : 이메일 요소 참조 상태 값 관리
    const emailRef = useRef<HTMLInputElement | null>(null);
    // State : 비밀번호 요소 참조 상태 값 관리
    const passwordRef = useRef<HTMLInputElement | null>(null);
    // State : 비밀번호 확인 요소 참조 상태 값 관리
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);

    // State : 페이지 번호 상태
    const [page, setPage] = useState<1|2>(1);
    // State : 이메일 상태 값 관리
    const [email, setEmail] = useState<string>('');
    // State : 패스워드 상태 값 관리
    const [password, setPassword] = useState<string>('');

    // State : 비밀번호 확인 상태 값 관리
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    // State : 비밀번호 타입 상태 값 관리
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    // State : 비밀번호 확인 타입 상태 값 관리 
    const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');

    // State : 이메일 에러 상태
    const [isEmailError, setEmailError] = useState<boolean>(false);
    // State : 비밀번호 에러 상태
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    // State : 비밀번호 확인 에러 상태
    const [isPasswordChcekError, setPasswordCheckError] = useState<boolean>(false);

    // State : 이메일 에러 메세지 상태
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    // State : 비밀번호 에러 메세지 상태
    const [passowrdErrorMessage, setPasswordErrorMessage] = useState<string>('');
    // State : 비밀번호 확인 에러 메세지 상태
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');

    // State : 비밀번호 버튼 아이콘 상태 값 관리
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    // State : 비밀번호 확인 버튼 아이콘 상태 값 관리
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

    // Event handlers : 이메일 변경 이벤트 처리 핸들러
    const onEmailChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);
    };

    // Event handlers : 비밀번호 변경 이벤트 처리 핸들러
    const onPasswordChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPassword(value);
    };

    
    // Event handlers : 비밀번호 확인 변경 이벤트 처리 핸들러
    const onPasswordCheckChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPasswordCheck(value);
    };

    // Event handlers : 비밀번호 아이콘 버튼 클릭 이벤트 처리 핸들러
    const onPasswordIconButtonClickHandler = () => {
      if (passwordType === 'text') {
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon');
      }
      else {
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon');
      }
    };

    // Event handlers : 비밀번호 확인 아이콘 버튼 클릭 이벤트 처리 핸들러
    const onPasswordCheckIconButtonClickHandler = () => {
      if (passwordType === 'text') {
        setPasswordCheckType('password');
        setPasswordCheckButtonIcon('eye-light-off-icon');
      }
      else {
        setPasswordCheckType('text');
        setPasswordCheckButtonIcon('eye-light-on-icon');
      }
    };

    // Event handlers : 다음 버튼 클릭 이벤트 처리 핸들러
    const onNextButtonClickHandler = () => {
      // 이메일 정규식
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);

      if (!email) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.');
      }
      const isCheckedPassword = password.trim().length > 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번가 일치하지 않습니다.');
      }

      if (!isEmailPattern || !isCheckedPassword || !isEqualPassword ) return;
        
      setPage(2);

    };




    // Event handler : 이메일 인풋 키 다운 이벤트 처리 핸들러
    const onEmailKeyDownHandler = (e :KeyboardEvent<HTMLInputElement>) => {
      if(e.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    };

    // Event handler : 비밀번호 인풋 키 다운 이벤트 처리 핸들러
    const onPasswordKeyDownHandler = (e :KeyboardEvent<HTMLInputElement>) => {
      if(e.key !== 'Enter') return;
      if(!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };

    // Event handler : 비밀번호 확인 인풋 키 다운 이벤트 처리 핸들러
    const onPasswordCheckKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key !== 'Enter') return;
      onNextButtonClickHandler();
    };



    // Render : 회원 가입 카드 (SignUpCard) 렌더링 부분
        return (
          <div className='auth-card'>
            <div className='auth-card-box'>
              <div className='auth-card-top'>
                <div className='auth-card-title-box'>
                  <div className='auth-card-tilte'>{'회원가입'}</div>
                  <div className='auth-card-page'>{`${page}/2`}</div>
                </div>
              <InputBox ref={emailRef} label={'이메일 주소*'} placeholder='이메일 주소를 입력해주세요. ' type='email' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}  />
              <InputBox ref={passwordRef} label={'비밀번호*'} placeholder='비밀번호를 입력해주세요.'  type={passwordType} value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passowrdErrorMessage} icon={passwordButtonIcon} onKeyDown={onPasswordKeyDownHandler}/>
              <InputBox ref={passwordCheckRef} label={'비밀번호 확인*'} placeholder={'비밀번호를 한번 더 입력해주세요.'}  type={passwordCheckType} value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordChcekError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onKeyDown={onPasswordCheckKeyDownHandler} />
                </div>
              <div className='auth-card-bottom'>
                <div className='black-large-full-button' onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
                <div className='auth-description-box'>
              <div className='auth-description'>
                {'이미 계정이 있으신가요?'}
                <span className='auth-description-link'> {'로그인'}</span>
              </div>
            </div>

              </div>
            </div>

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
