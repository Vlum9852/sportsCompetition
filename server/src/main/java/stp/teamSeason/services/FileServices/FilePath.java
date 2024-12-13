package stp.teamSeason.services.FileServices;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import lombok.*;

@Component
@Setter
@Getter
@NoArgsConstructor
public class FilePath {
    @Value("${upload.path}")
    private String saveDirPath;
    @Value("${upload.path.os}")
    private String sepOS;
}
