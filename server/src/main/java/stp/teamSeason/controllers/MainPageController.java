package stp.teamSeason.controllers;


import lombok.AllArgsConstructor;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import stp.teamSeason.models.Team;

@Controller
public class MainPageController {

    @GetMapping("/api")
    public String mainPage() {

        return "index";
    }
    

      

}
