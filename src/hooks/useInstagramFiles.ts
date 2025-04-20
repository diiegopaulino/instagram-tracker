
import { useState } from 'react';
import { toast } from "sonner";

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

export const useInstagramFiles = () => {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [historyFollowersFile, setHistoryFollowersFile] = useState<File | null>(null);
  const [historyFollowingFile, setHistoryFollowingFile] = useState<File | null>(null);

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

      const followersData: DataFile[] = await readFile(followersFile);
      const followingData: FollowingData = await readFile(followingFile);

      const followersArray = followersData.map(f => f.string_list_data[0].value);
      const followingArray = followingData.relationships_following.map(f => f.string_list_data[0].value);
      
      const notFollowingBackArray = followingArray.filter(user => !followersArray.includes(user));
      
      setFollowers(followersArray);
      setFollowing(followingArray);
      setNotFollowingBack(notFollowingBackArray);
      setHasData(true);

      if (historyFollowersFile && historyFollowingFile) {
        const historyFollowersArray: string[] = await readFile(historyFollowersFile);
        const historyFollowingArray: string[] = await readFile(historyFollowingFile);
        
        setHistoryFollowers(historyFollowersArray);
        setHistoryFollowing(historyFollowingArray);
        
        setNewFollowers(followersArray.filter(user => !historyFollowersArray.includes(user)));
        setUnfollowers(historyFollowersArray.filter(user => !followersArray.includes(user)));
        setUnfollowed(historyFollowingArray.filter(user => !followingArray.includes(user)));
      }

      toast.success("Dados analisados com sucesso!");
    } catch (error) {
      console.error("Error analyzing Instagram data:", error);
      toast.error("Erro ao processar os arquivos. Verifique se os arquivos estão corretos.");
    }
  };

  return {
    followersFile,
    followingFile,
    historyFollowersFile,
    historyFollowingFile,
    setFollowersFile,
    setFollowingFile,
    setHistoryFollowersFile,
    setHistoryFollowingFile,
    followers,
    following,
    historyFollowers,
    historyFollowing,
    notFollowingBack,
    newFollowers,
    unfollowers,
    unfollowed,
    hasData,
    analyzeData
  };
};
