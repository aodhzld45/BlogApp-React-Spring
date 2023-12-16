package com.seo.boardback.service.implement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seo.boardback.dto.request.auth.SignInRequestDTO;
import com.seo.boardback.dto.request.auth.SignUpRequestDTO;
import com.seo.boardback.dto.response.ResponseDTO;
import com.seo.boardback.dto.response.auth.SignInResponseDTO;
import com.seo.boardback.dto.response.auth.SignUpResponseDTO;
import com.seo.boardback.entity.UserEntity;
import com.seo.boardback.provider.JwtProvider;
import com.seo.boardback.repository.UserRepository;
import com.seo.boardback.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {
    // @RequiredArgsConstructor 어노테이션을 선언하면
    // final로 지정된 필드는 생성자가 자동 생성됨
    private final UserRepository userRepository;

    // jwtProvider
    private final JwtProvider jwtProvider;

    // 비밀번호 암호화 관련
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 회원가입 서비스 비즈니스 로직 구현부
    @Override
    public ResponseEntity<? super SignUpResponseDTO> signUp(SignUpRequestDTO dto) {
        try {

            String email = dto.getEmail();
            boolean existsByEmail = userRepository.existsByEmail(email);
            if (existsByEmail) return SignUpResponseDTO.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existsByNickname = userRepository.existsByNickname(nickname);
            if (existsByNickname) return SignUpResponseDTO.duplicateNickname();

            String telNumber = dto.getTelNumber();
            boolean existsByTelNumber = userRepository.existsByTelNumber(telNumber);
            if (existsByTelNumber) return SignUpResponseDTO.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            // Spring Boot에서의 Entity는 하나의 레코드
            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity); //DB에 저장

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return SignUpResponseDTO.success();
    }

    // 로그인 서비스 비즈니스 로직 구현부
    @Override
    public ResponseEntity<? super SignInResponseDTO> signIn(SignInRequestDTO dto) {

        String token = null; 
        
        try {
            // 이메일 찾기
            String email = dto.getEmail();
            UserEntity userEntity =  userRepository.findByEmail(email);
            if (userEntity == null) return SignInResponseDTO.signInFail();

            // 패스워드 암호화 비교
            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if(!isMatched) return SignInResponseDTO.signInFail();

            token = jwtProvider.create(email);
       
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDTO.databaseError();
        }
        
        return SignInResponseDTO.success(token);

    }
    
}
