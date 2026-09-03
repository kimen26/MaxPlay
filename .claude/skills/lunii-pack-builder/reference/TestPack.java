import studio.core.v1.reader.archive.ArchiveStoryPackReader;
import studio.core.v1.model.StoryPack;
import studio.core.v1.model.StageNode;
import studio.core.v1.model.metadata.StoryPackMetadata;
import java.io.FileInputStream;
import java.io.InputStream;

// Lit un pack archive avec le MÊME reader que l'éditeur STUdio.
// Si ça lit sans exception, l'éditeur le lit sans planter.
public class TestPack {
    public static void main(String[] args) throws Exception {
        for (String path : args) {
            System.out.println("\n=== " + path + " ===");
            ArchiveStoryPackReader reader = new ArchiveStoryPackReader();
            try (InputStream in = new FileInputStream(path)) {
                StoryPackMetadata meta = reader.readMetadata(in);
                System.out.println("metadata OK : title=" + meta.getTitle() + " | uuid=" + meta.getUuid());
            } catch (Exception e) {
                System.out.println("XX readMetadata a PLANTÉ : " + e);
            }
            // read complet (= ce que l'éditeur fait)
            try (InputStream in = new FileInputStream(path)) {
                StoryPack pack = reader.read(in);
                int stages = pack.getStageNodes() == null ? 0 : pack.getStageNodes().size();
                System.out.println("read() OK : uuid=" + pack.getUuid() + " | version=" + pack.getVersion() + " | stageNodes=" + stages);
                int withImg = 0, withAudio = 0, withAction = 0;
                for (StageNode n : pack.getStageNodes()) {
                    if (n.getImage() != null) withImg++;
                    if (n.getAudio() != null) withAudio++;
                    if (n.getOkTransition() != null) withAction++;
                }
                System.out.println("   stages avec image=" + withImg + " | audio=" + withAudio + " | okTransition=" + withAction);
                System.out.println("   >>> EDITEUR PEUT OUVRIR CE PACK <<<");
            } catch (Exception e) {
                System.out.println("XX read() a PLANTÉ (= ce que voit l'éditeur) : " + e);
                e.printStackTrace();
            }
        }
    }
}
