package com.seo.boardback.provider;

import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    public String create(String email) {
        Date expireDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS)); // 토큰 만료시각 :
        // Keys.secretKeyFor 메서드를 사용하여 안전한 키를 생성
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        String jwt = Jwts.builder()
//                .signWith(SignatureAlgorithm.HS256, secretKey)
//                .setSubject(email).setIssuedAt(new Date()).setExpiration(expireDate)
//                .compact();

        String jwt = Jwts.builder()
                .signWith(key)
                .setSubject(email)
                .setIssuedAt(new Date()).setExpiration(expireDate)
                .compact();

        return jwt;
    }

    public String validate(String jwt) {
//        Claims claims = null;

        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(jwt);
            return claims.getBody().getSubject();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
//        try {
//            claims = Jwts.parser().setSigningKey(secretKey)
//                    .parseClaimsJws(jwt).getBody();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }

//        return claims.getSubject();

    }

}
