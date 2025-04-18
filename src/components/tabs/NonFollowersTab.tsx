
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Search } from "lucide-react";
import UserCard from "../UserCard";

interface NonFollowersTabProps {
  notFollowingBack: string[];
  hasData: boolean;
}

const NonFollowersTab = ({ notFollowingBack, hasData }: NonFollowersTabProps) => {
  if (!hasData) {
    return (
      <Alert variant="default" className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription>
          Envie os arquivos para visualizar os usuários que não te seguem de volta.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full border rounded-lg overflow-hidden">
      <AccordionItem value="non-followers">
        <AccordionTrigger className="px-4 py-3 bg-white">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Clique para ver a lista completa de não-seguidores</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-3 bg-white">
          {notFollowingBack.length > 0 ? (
            <div className="space-y-2">
              {notFollowingBack.map((user, index) => (
                <UserCard key={user} username={user} index={index + 1} color="pink" />
              ))}
            </div>
          ) : (
            <Alert>
              <AlertDescription>
                🎉 Todos te seguem de volta!
              </AlertDescription>
            </Alert>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NonFollowersTab;
