package stp.teamSeason.models;

import jakarta.persistence.*;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Season")
public class Season {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "CompetitionName")
    private String competitionName;

    @Column(name = "YearEvent")
    private Short yearEvent;

    @Column(name = "Image")
    private String image;

    public Season(String competitionName, Short yearEvent, String image) {
        this.competitionName = competitionName;
        this.yearEvent = yearEvent;
        this.image = image;
    }
}
