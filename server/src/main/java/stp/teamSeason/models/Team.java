package stp.teamSeason.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Team")
public class Team {
    @Id
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Country")
    private String country;

    @Column(name = "Image")
    private String image;

    @Column(name = "FormationName")
    private Short formationName;


}
