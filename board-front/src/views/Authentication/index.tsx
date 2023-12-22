import { useState, KeyboardEvent, useRef, ChangeEvent, useEffect } from 'react'
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDTO, SignUpRequestDTO } from 'apis/request/auth';
import { signInRequest, signUpRequest } from 'apis';
import { SignInReqonseDTO, SignUpReqonseDTO } from 'apis/response/auth';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'apis/response';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

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
  const expires = new Date(now + expirationTime * 1000);

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
  onLoginButtonClickHandler();
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
    // State: 닉네임 요소 참조 상태 값 관리
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    // State: 휴대폰 요소 참조 상태 값 관리
    const telNumberRef = useRef<HTMLInputElement | null>(null);
    // State: 주소 요소 참조 상태 값 관리
    const addressRef = useRef<HTMLInputElement | null>(null);
    // State: 상세 주소 요소 참조 상태 값 관리
    const addressDetailRef = useRef<HTMLInputElement | null>(null);


    // State : 페이지 번호 상태값 관리
    const [page, setPage] = useState<1|2>(1);

    // State : 이메일 상태 값 관리
    const [email, setEmail] = useState<string>('');
    // State : 패스워드 상태 값 관리
    const [password, setPassword] = useState<string>('');
    // State : 닉네임 상태 값 관리
    const [nickname, setNickname] = useState<string>('');
    // State : 핸드폰 번호 상태 값 관리
    const [telNumber, setTelNumber] = useState<string>('');
    // State : 주소 상태 값 관리
    const [address, setAddress] = useState<string>('');
    // State : 상세주소 상태 값 관리
    const [addressDetail, setAddressDetail] = useState<string>('');
    // State : 개인 정보 동의 상태 값 관리
    const [agreedPersonal, setAgreedPresonal] = useState<boolean>(false);

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
    // State: 닉네임 에러 상태
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    // State : 휴대전화 번호 에러 상태
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
    // State : 주소 에러 상태
    const [isAddressError, setAddressError] = useState<boolean>(false);
    // State : 개인 정보 동의 에러 상태
    const [isAgreedPersonalError, setAgreedPersonalError] = useState<boolean>(false);


    // State : 이메일 에러 메세지 상태
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    // State : 비밀번호 에러 메세지 상태
    const [passowrdErrorMessage, setPasswordErrorMessage] = useState<string>('');
    // State : 비밀번호 확인 에러 메세지 상태
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
    // State: 닉네임 에러 메세지 상태
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
    // State: 휴대전화 번호 에러 메세지 상태
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');
    // State: 주소 에러 메세지 상태
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');


    // State : 비밀번호 버튼 아이콘 상태 값 관리
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    // State : 비밀번호 확인 버튼 아이콘 상태 값 관리
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

    // Function : 다음 주소 검색 팝업 오픈 함수
    const open = useDaumPostcodePopup();

    // Function : sign Up Response 처리 함수
    const signUpResponse = (responseBody: SignUpReqonseDTO | ResponseDto | null) => {
      if (!responseBody) {
        alert('네트워크 이상입니다.');
        return;
      }
      const { code } = responseBody;
      if (code === 'DE') {
        setEmailError(true);
        setEmailErrorMessage('중복되는 이메일 주소입니다.');
      }

      if (code === 'DN') {
        setNicknameError(true);
        setNicknameErrorMessage('중복되는 닉네임입니다.');
      }

      if (code === 'DT') {
        setTelNumberError(true);
        setTelNumberErrorMessage('중복되는 핸드폰 번호입니다.');
      }
      if (code === 'VF') alert('모두 입력해주세요');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');

      if (code !== 'SU') return;
      setView('sign-in');

    }


    // Event handlers : 이메일 변경 이벤트 처리 핸들러
    const onEmailChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMessage('');
    };
    // Event handlers : 비밀번호 변경 이벤트 처리 핸들러
    const onPasswordChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage('');
    };
    // Event handlers : 비밀번호 확인 변경 이벤트 처리 핸들러
    const onPasswordCheckChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
    };
    // Event handler: 닉네임 변경 이벤트 처리 핸들러
    const onNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage('');
    };

    // Event handler: 휴대전화 번호 변경 이벤트 처리 핸들러
    const onTelNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMessage('');
    };

    // Event handler: 주소 변경 이벤트 처리 핸들러
    const onAddressChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setAddress(value);
      setAddressError(false);
      setAddressErrorMessage('');
    };

    // Event handler: 상세주소 변경 이벤트 처리 핸들러
    const onAddressDetailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setAddressDetail(value);
    };

    // Event handler: 개인정보 동의 체크박스 이벤트 처리 핸들러
    const onAgreedPersonalClickHandler = () => {
      setAgreedPresonal(!agreedPersonal);
      setAgreedPersonalError(false);
    }
    //////////////////Click/////////////////////////////
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
      if (passwordCheckType === 'text') {
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

      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.');
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
      }
      if (!isEmailPattern || !isCheckedPassword || !isEqualPassword ) return;
        
      setPage(2);
    };

    // Event handler : 주소 아이콘 버튼 클릭 이벤트 처리 핸들러
    const onAddressIconButtonClickHandler = () => {
      alert('주소 아이콘 버튼 클릭 이벤트 발생');
      // Daum Address API
      open({ onComplete });

    }

    // Event handler : 회원가입 버튼 클릭 이벤트 처리 핸들러
    const onSignUpButtonClickHandler = () => {
      // API 연동
      alert('회원 가입 버튼 클릭 이벤트 발생');
      // 이메일 정규식
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);

      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.');
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
      }

      if (!isEmailPattern || !isCheckedPassword || !isEqualPassword ) {
        setPage(1);
        return;
      }
  
      const hasNickname = nickname.trim().length > 0;
      if(!hasNickname) {
        setNicknameError(true);
        setNicknameErrorMessage('닉네임을 입력해주세요.');
      }

      const TelNumberPattern = /^[0-9]{11,13}$/;
      const isTelNumberPattern = TelNumberPattern.test(telNumber);
      if(!isTelNumberPattern){
        setTelNumberError(true);
        setTelNumberErrorMessage('숫자만 입력해주세요.');
      }
      const hasAddress = address.trim().length > 0;
      if(!hasAddress){
        setAddressError(true);
        setAddressErrorMessage('주소를 선택해주세요.');
      }
      if (!agreedPersonal) setAgreedPersonalError(true);

      if(!hasNickname || !isTelNumberPattern || !agreedPersonal) return;

      
      const requestBody: SignUpRequestDTO = {
        email,password,nickname,telNumber,address,addressDetail,agreedPersonal
      };

      signUpRequest(requestBody).then(signUpResponse);

        
      

    }

    // Event handler : 회원가입 링크 클릭 이벤트 처리 핸들러
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
    }

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

    // Event handler : 닉네임 인풋 키 다운 이벤트 처리 핸들러
    const onNicknameKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key !== 'Enter') return;
      if(!telNumberRef.current) return;
      telNumberRef.current.focus();
    };
    // Event handler : 핸드폰 번호 인풋 키 다운 이벤트 처리 핸들러
    const onTelNumberKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key !== 'Enter') return;
      onAddressIconButtonClickHandler();
    };
    // Event handler : 주소 키 다운 이벤트 처리 핸들러
    const onAddressKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key !== 'Enter') return;
      if(!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };
    // Event handler : 상세 주소 인풋 키 다운 이벤트 처리 핸들러
    const onAddressDetailKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key !== 'Enter') return;
      onSignUpButtonClickHandler();
    };


    // Event Handler : 다음 주소 검색 완료 이벤트 처리 핸들러
    const onComplete = (data: Address) => {
      const { address } = data;
      setAddress(address);
      setAddressError(false);
      setAddressErrorMessage('');
      if(!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };

// Effect : page가 변경될 때 마다 실행될 함수.
    useEffect(()=> {
      if (page === 2 ) {
        if (! nicknameRef.current) return;
        nicknameRef.current.focus();
      }
    }, [page]); 

    // Render : 회원 가입 카드 (SignUpCard) 렌더링 부분
        return (
          <div className='auth-card'>
            <div className='auth-card-box'>
              <div className='auth-card-top'>
                <div className='auth-card-title-box'>
                  <div className='auth-card-tilte'>{'회원가입'}</div>
                  <div className='auth-card-page'>{`${page}/2`}</div>
                </div>
              { page === 1  &&  
              <>
              <InputBox ref={emailRef} label={'이메일 주소*'} placeholder='이메일 주소를 입력해주세요. ' type='email' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}  />
              <InputBox ref={passwordRef} label={'비밀번호*'} placeholder='비밀번호를 입력해주세요.'  type={passwordType} value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passowrdErrorMessage} icon={passwordButtonIcon} onKeyDown={onPasswordKeyDownHandler} onButtonClick={onPasswordIconButtonClickHandler}/>
              <InputBox ref={passwordCheckRef} label={'비밀번호 확인*'} placeholder={'비밀번호를 한번 더 입력해주세요.'}  type={passwordCheckType} value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordChcekError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckIconButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler} />
              </>
              }

              { page === 2 &&
              <>
              <InputBox ref={nicknameRef} label='닉네임*' type='text' placeholder='닉네임을 입력해주세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler} />
              <InputBox ref={telNumberRef} label='핸드폰 번호*' type='text' placeholder='핸드폰 번호를 입력해주세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler}/>  
              <InputBox ref={addressRef} label='주소*' type='text' placeholder='우편번호 찾기' value={address} onChange={onAddressChangeHandler} error={isAddressError} message={addressErrorMessage} icon={'expend-right-light-icon'} onButtonClick={onAddressIconButtonClickHandler} onKeyDown={onAddressKeyDownHandler}/>  
              <InputBox ref={addressDetailRef} label='상세 주소' type='text' placeholder='상세 주소' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onKeyDown={onAddressDetailKeyDownHandler}/>  
              </>
              }

              </div>
              <div className='auth-card-bottom'>
              { page === 1 &&
                <div className='black-large-full-button' onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
              }

              { page === 2 &&
              <>
                <div className='auth-consent-box'>
                  <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                   <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>
                  
                  </div>
                  <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                  <div className='auth-consent-link'>{'더보기 >'}</div>
                </div>
                <div className='black-large-full-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>

              </>
              }
                <div className='auth-description-box'>
              <div className='auth-description'>
                {'이미 계정이 있으신가요?'}
                <span className='auth-description-link' onClick={onSignInLinkClickHandler}> {'로그인'}</span>
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
