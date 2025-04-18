
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Download, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatisticsTabProps {
  followers: string[];
  following: string[];
  notFollowingBack: string[];
  hasData: boolean;
  handleSaveFollowers: () => void;
  handleSaveFollowing: () => void;
  handleSaveReport: () => void;
}

const StatisticsTab = ({
  followers,
  following,
  notFollowingBack,
  hasData,
  handleSaveFollowers,
  handleSaveFollowing,
  handleSaveReport
}: StatisticsTabProps) => {
  if (!hasData) {
    return (
      <Alert variant="default" className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription>
          Envie os arquivos para visualizar as estatísticas.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="stats-card text-center">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Seguidores</h4>
          <p className="text-2xl font-bold">{followers.length}</p>
        </Card>
        
        <Card className="stats-card text-center">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Seguindo</h4>
          <p className="text-2xl font-bold">{following.length}</p>
        </Card>
        
        <Card className="stats-card text-center">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Não te seguem</h4>
          <p className="text-2xl font-bold">{notFollowingBack.length}</p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={handleSaveFollowers}>
          <Download size={16} />
          <span>Baixar histórico de seguidores</span>
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2" onClick={handleSaveFollowing}>
          <Download size={16} />
          <span>Baixar histórico de seguindo</span>
        </Button>
        
        <Button className="flex items-center gap-2 instagram-gradient text-white" onClick={handleSaveReport}>
          <Download size={16} />
          <span>Baixar relatório completo</span>
        </Button>
      </div>
    </div>
  );
};

export default StatisticsTab;
