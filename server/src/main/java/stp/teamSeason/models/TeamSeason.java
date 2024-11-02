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
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "Draw")
    private Short draw;

    @ManyToOne
    @JoinColumn(name = "Team_id")
    private Team team;

   @ManyToOne
   @JoinColumn(name = "Season_id")
    private Season season;

    @Column(name = "Points")
    private Short points;

    @Column(name = "Win")
    private Short win;

    @Column(name = "Losses")
    private Short losses;

    public TeamSeason(
        Short draw, Team team, 
        Season season, Short points, 
        Short win, Short losses) 
    {
        this.draw = draw;
        this.team = team;
        this.season = season;
        this.points = points;
        this.win = win;
        this.losses = losses;
    }
}
