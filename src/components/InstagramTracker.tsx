import { Button } from "@/components/ui/button";
import Header from './Header';
import Footer from './Footer';
import FileInput from './FileInput';
import TabNavigation from './TabNavigation';
import { Scan } from 'lucide-react';
import { useInstagramFiles } from '@/hooks/useInstagramFiles';

const InstagramTracker = () => {
  const {
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
  } = useInstagramFiles();

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
            fileName="historico_seguidores.json"
            onChange={(e) => setHistoryFollowersFile(e.target.files?.[0] || null)}
          />
          
          <FileInput
            id="historyFollowing"
            label="📂 Histórico anterior de seguindo"
            fileName="historico_seguindo.json"
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
      />
      
      <Footer />
    </div>
  );
};

export default InstagramTracker;
