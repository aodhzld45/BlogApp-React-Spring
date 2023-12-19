import { KeyboardEvent, forwardRef, ChangeEvent } from 'react'

import './style.css'

// interface : InputBox 컴포넌트 Properties
interface Props {
    label : string;
    type : 'text'| 'password' | 'email';
    placeholder : string;
    value : string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
    error : boolean;
    // ?로 필수값이 아님을 선언 
    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expend-right-light-icon'; 
    onButtonClick? : () => void;
    message?: string; 
    onKeyDown? : (e: KeyboardEvent<HTMLInputElement>) => void;
}

// Component : InputBox 컴포넌트
// ref : useRef
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

// State : Properties(InputBox Props)
const {label, type, error, placeholder, value, icon, message} = props;
const { onChange, onButtonClick, onKeyDown } = props;

// // Event Handler : onChangeHandler - Input 값 변경 이벤트 처리 함수
// const onChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setValue(value);
// };

// Event Handler : onKeyDownHandler - Input key 이벤트 처리 함수
const onKeyDownHandler = (e : KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
}

// Render : InputBox 컴포넌트
    return (
    <div className='inputbox'>
        <div className='inputbox-label'>{label}</div>
        <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
            <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler}/>
            {onButtonClick !== undefined && 
               <div className='icon-button' onClick={onButtonClick}>
               {icon !== undefined && <div className={`icon ${icon}`}></div>} 
           </div>
            }
        </div>

        {message !== undefined && (
            <div className='inputbox-message'>{message}</div>
        )} 
    </div>
    )
});

export default InputBox;
