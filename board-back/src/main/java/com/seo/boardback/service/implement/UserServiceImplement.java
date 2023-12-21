package com.seo.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.seo.boardback.dto.response.ResponseDTO;
import com.seo.boardback.dto.response.user.GetSignInUserResponseDTO;
import com.seo.boardback.entity.UserEntity;
import com.seo.boardback.repository.UserRepository;
import com.seo.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDTO> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {
            userEntity =  userRepository.findByEmail(email);
            System.out.println("Service Imple email:" + email);
            if(userEntity == null) return GetSignInUserResponseDTO.NOtExistedUser();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDTO.databaseError();

        }

        return GetSignInUserResponseDTO.success(userEntity);

    }
    
}
