
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from './Header';
import Footer from './Footer';
import FileInput from './FileInput';
import TabNavigation from './TabNavigation';
import { Scan } from 'lucide-react';

interface DataFile {
  string_list_data: Array<{
    value: string;
    [key: string]: any;
  }>;
}

interface FollowingData {
  relationships_following: Array<{
    string_list_data: Array<{
      value: string;
      [key: string]: any;
    }>;
  }>;
}

const InstagramTracker = () => {
  // State for raw files
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [historyFollowersFile, setHistoryFollowersFile] = useState<File | null>(null);
  const [historyFollowingFile, setHistoryFollowingFile] = useState<File | null>(null);

  // State for processed data
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [historyFollowers, setHistoryFollowers] = useState<string[] | null>(null);
  const [historyFollowing, setHistoryFollowing] = useState<string[] | null>(null);
  const [notFollowingBack, setNotFollowingBack] = useState<string[]>([]);
  const [newFollowers, setNewFollowers] = useState<string[]>([]);
  const [unfollowers, setUnfollowers] = useState<string[]>([]);
  const [unfollowed, setUnfollowed] = useState<string[]>([]);
  const [hasData, setHasData] = useState(false);

  const readFile = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  };

  const analyzeData = async () => {
    if (!followersFile || !followingFile) {
      toast.error("Por favor, envie os arquivos obrigatórios de seguidores e seguindo.");
      return;
    }

    try {
      toast.info("Analisando seus dados...");

      // Read the main files
      const followersData: DataFile[] = await readFile(followersFile);
      const followingData: FollowingData = await readFile(followingFile);

      // Process followers and following
      const followersArray = followersData.map(f => f.string_list_data[0].value);
      const followingArray = followingData.relationships_following.map(f => f.string_list_data[0].value);
      
      // People who don't follow back
      const notFollowingBackArray = followingArray.filter(user => !followersArray.includes(user));
      
      setFollowers(followersArray);
      setFollowing(followingArray);
      setNotFollowingBack(notFollowingBackArray);
      setHasData(true);

      // Process history files if available
      if (historyFollowersFile && historyFollowingFile) {
        const historyFollowersArray: string[] = await readFile(historyFollowersFile);
        const historyFollowingArray: string[] = await readFile(historyFollowingFile);
        
        setHistoryFollowers(historyFollowersArray);
        setHistoryFollowing(historyFollowingArray);
        
        // Calculate changes
        const newFollowersArray = followersArray.filter(user => !historyFollowersArray.includes(user));
        const unfollowersArray = historyFollowersArray.filter(user => !followersArray.includes(user));
        const unfollowedArray = historyFollowingArray.filter(user => !followingArray.includes(user));
        
        setNewFollowers(newFollowersArray);
        setUnfollowers(unfollowersArray);
        setUnfollowed(unfollowedArray);
      }

      toast.success("Dados analisados com sucesso!");
    } catch (error) {
      console.error("Error analyzing Instagram data:", error);
      toast.error("Erro ao processar os arquivos. Verifique se os arquivos estão corretos.");
    }
  };

  const downloadFile = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Arquivo ${filename} salvo com sucesso`);
  };

  const handleSaveFollowers = () => {
    downloadFile(followers, "seguidores_atual.json");
  };

  const handleSaveFollowing = () => {
    downloadFile(following, "seguindo_atual.json");
  };

  const handleSaveReport = () => {
    // Create markdown report
    let markdownReport = `# 📊 Relatório de Seguidores – ${new Date().toLocaleDateString('pt-BR')}

**Total de seguidores:** ${followers.length}
**Total seguindo:** ${following.length}
**Não te seguem de volta:** ${notFollowingBack.length}

---

## ❌ Não te seguem de volta:
${notFollowingBack.map(u => `- [${u}](https://instagram.com/${u})`).join('\n')}`;

    if (historyFollowers && historyFollowing) {
      markdownReport += `\n\n## 🔁 Mudanças`;

      if (newFollowers.length) {
        markdownReport += `\n\n### 📈 Novos seguidores:\n${newFollowers.map(u => `- [${u}](https://instagram.com/${u})`).join('\n')}`;
      }

      if (unfollowers.length) {
        markdownReport += `\n\n### ⚠️ Pararam de te seguir:\n${unfollowers.map(u => `- [${u}](https://instagram.com/${u})`).join('\n')}`;
      }

      if (unfollowed.length) {
        markdownReport += `\n\n### 📉 Você deixou de seguir:\n${unfollowed.map(u => `- [${u}](https://instagram.com/${u})`).join('\n')}`;
      }
    }

    markdownReport += `\n\n---\n_Gerado automaticamente pelo Instagram Tracker_`;

    // Download as markdown
    const blob = new Blob([markdownReport], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "relatorio_instagram.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Relatório salvo com sucesso");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Header />
      
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput
            id="followersFile"
            label="👥 Arquivo de seguidores"
            fileName="followers_1.json"
            required={true}
            onChange={(e) => setFollowersFile(e.target.files?.[0] || null)}
          />
          
          <FileInput
            id="followingFile"
            label="➡️ Arquivo de seguindo"
            fileName="following.json"
            required={true}
            onChange={(e) => setFollowingFile(e.target.files?.[0] || null)}
          />
          
          <FileInput
            id="historyFollowers"
            label="📂 Histórico anterior"
            fileName="seguidores_atual.json"
            onChange={(e) => setHistoryFollowersFile(e.target.files?.[0] || null)}
          />
          
          <FileInput
            id="historyFollowing"
            label="📂 Histórico anterior de seguindo"
            fileName="seguindo_anterior.json"
            onChange={(e) => setHistoryFollowingFile(e.target.files?.[0] || null)}
          />
        </div>
        
        <Button 
          onClick={analyzeData} 
          className="w-full instagram-gradient text-white mt-4 h-12"
        >
          <Scan className="mr-2 h-5 w-5" />
          Analisar Dados
        </Button>
      </div>
      
      <TabNavigation
        followers={followers}
        following={following}
        notFollowingBack={notFollowingBack}
        historyFollowers={historyFollowers}
        historyFollowing={historyFollowing}
        newFollowers={newFollowers}
        unfollowers={unfollowers}
        unfollowed={unfollowed}
        hasData={hasData}
        handleSaveFollowers={handleSaveFollowers}
        handleSaveFollowing={handleSaveFollowing}
        handleSaveReport={handleSaveReport}
      />
      
      <Footer />
    </div>
  );
};

export default InstagramTracker;
