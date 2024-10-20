package stp.teamSeason.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Season")
public class Season {
    @Id
    private Long id;

//    @Column(name = "CompetitionName")
//    private String competitionName;
//
//    @Column(name = "Year")
//    private Short year;




}
