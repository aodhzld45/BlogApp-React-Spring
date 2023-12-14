package com.seo.boardback.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * testController
 */
@Controller
public class testController {

    @GetMapping("/test")
    public String test(@RequestParam String param) {
        String test = "test";

        System.out.println("aodhzld45");


        return test;
    }
    

    
}