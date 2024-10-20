package stp.teamSeason.models;


import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TeamSeason")
public class TeamSeason {
    @Id
    private Long id;

    @Column(name = "Draw")
    private Short draw;

    @ManyToOne
    @JoinColumn(name = "Team_id")
    private Team team;

//    @ManyToOne
//    @JoinColumn(name = "Season_id")
//    private Season season;

    @Column(name = "Points")
    private Short points;

    @Column(name = "Win")
    private Short win;

    @Column(name = "Losses")
    private Short losses;
}
