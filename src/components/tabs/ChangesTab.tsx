
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import UserCard from "../UserCard";

interface ChangesTabProps {
  newFollowers: string[];
  unfollowers: string[];
  unfollowed: string[];
  hasHistory: boolean;
  hasData: boolean;
}

const ChangesTab = ({
  newFollowers,
  unfollowers,
  unfollowed,
  hasHistory,
  hasData
}: ChangesTabProps) => {
  if (!hasData) {
    return (
      <Alert variant="default" className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="my-auto">
          Envie os arquivos para visualizar as mudanças.
        </AlertDescription>
      </Alert>
    );
  }

  if (!hasHistory) {
    return (
      <Alert variant="default" className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="my-auto">
          Envie os arquivos de histórico para ver as mudanças.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {newFollowers.length > 0 && (
        <div>
          <h5 className="text-lg font-medium mb-3">📈 Novos seguidores:</h5>
          <div className="space-y-2">
            {newFollowers.map((user, index) => (
              <UserCard key={user} username={user} color="green" />
            ))}
          </div>
        </div>
      )}

      {unfollowers.length > 0 && (
        <div>
          <h5 className="text-lg font-medium mb-3">⚠️ Pararam de te seguir:</h5>
          <div className="space-y-2">
            {unfollowers.map((user, index) => (
              <UserCard key={user} username={user} color="yellow" />
            ))}
          </div>
        </div>
      )}

      {unfollowed.length > 0 && (
        <div>
          <h5 className="text-lg font-medium mb-3">📉 Você deixou de seguir:</h5>
          <div className="space-y-2">
            {unfollowed.map((user, index) => (
              <UserCard key={user} username={user} color="red" />
            ))}
          </div>
        </div>
      )}

      {newFollowers.length === 0 && unfollowers.length === 0 && unfollowed.length === 0 && (
        <Alert>
          <AlertDescription>
            Não foram detectadas mudanças desde o último histórico.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ChangesTab;
