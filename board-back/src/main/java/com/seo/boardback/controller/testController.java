package com.seo.boardback.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * testController
 */
@Controller
public class testController {

    @RequestMapping("/test")
    public String test() {
        String test = "test";

        System.out.println("aodhzld45");


        return test;
    }
    

    
}