package stp.teamSeason;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import stp.teamSeason.controllers.SeasonController;
import stp.teamSeason.models.Season;
import stp.teamSeason.services.SeasonService;
import stp.teamSeason.services.TeamSeasonService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;



@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SeasonServiceTest extends Assertions {
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private static final List<Season> seasons = new ArrayList<>();
    @Mock
    SeasonService seasonService;
    @Mock
    TeamSeasonService teamSeasonService;

    @InjectMocks
    private SeasonController seasonController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(seasonController).build();
        seasons.add(new Season("test", (short) 2024, ""));
        seasons.add(new Season("test1", (short) 2024, ""));
        seasons.add(new Season("test2", (short) 2024, ""));
    }

//    @BeforeAll
//    public static void setDataSeasons() {
//        seasons.add(new Season("test", (short) 2024, ""));
//        seasons.add(new Season("test1", (short) 2024, ""));
//        seasons.add(new Season("test2", (short) 2024, ""));
//    }

    @AfterAll
    public static void clearDataSeasons() {
        seasons.clear();
    }

    @Test
    public void setSeasonTest() throws Exception {
        for (Season season : seasons) {
            mockMvc.perform(post("/seasons/add")
                            .contentType("application/json")
                            .content(objectMapper.writeValueAsString(season)))
                            .andExpect(status().isCreated());
        }
    }

    @Test
    public void getSeasonsTest() throws Exception {
        for (Season season : seasons) {
            seasonService.setSeason(season);
        }
        assertEquals(seasons, seasonService.getSeasons());
    }
}
