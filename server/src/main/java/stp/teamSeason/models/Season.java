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
    private Long id;

    @Column(name = "CompetitionName")
    private String competitionName;

    @Column(name = "YearEvent")
    private Short year;
}
