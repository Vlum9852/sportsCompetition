package stp.teamSeason.models;

import jakarta.persistence.*;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Team")
public class Team {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Country")
    private String country;

    @Column(name = "Image")
    private String image;

    @Column(name = "FormationName")
    private Short formationName;

    public Team(String name, String country, String image, Short formationName) {
        this.name = name;
        this.country = country;
        this.image = image;
        this.formationName = formationName;
    }
}
