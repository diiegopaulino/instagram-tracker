
import { Card, CardContent } from "@/components/ui/card";

const HelpTab = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h5 className="text-xl font-semibold mb-3">📥 Como obter seus dados do Instagram</h5>
        <p className="mb-4 text-muted-foreground">
          Todo o processamento acontece localmente no seu navegador. Nenhum dado é enviado ou armazenado.
        </p>
        
        <ol className="list-decimal pl-5 space-y-2">
          <li>Acesse o Instagram pelo navegador em <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-instagram-pink hover:underline">instagram.com</a></li>
          <li>Vá em <strong>Configurações &gt; Sua atividade &gt; Baixar suas informações</strong></li>
          <li>Escolha o formato <strong>JSON</strong></li>
          <li>Confirme seu e-mail e aguarde o link de download</li>
          <li>Extraia o arquivo <code className="bg-muted px-1 py-0.5 rounded text-sm">.zip</code> recebido</li>
          <li>Navegue até a pasta <code className="bg-muted px-1 py-0.5 rounded text-sm">followers_and_following/</code></li>
          <li>
            Copie os arquivos:
            <ul className="list-disc pl-5 mt-1">
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">following.json</code></li>
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">followers_1.json</code></li>
            </ul>
          </li>
          <li>
            (Opcional) Salve os arquivos gerados pela aplicação para comparar em outro momento:
            <ul className="list-disc pl-5 mt-1">
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">seguidores_atual.json</code></li>
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">seguindo_anterior.json</code></li>
            </ul>
          </li>
        </ol>
        
        <p className="mt-4 text-sm text-muted-foreground">
          Após isso, envie os arquivos acima nos campos indicados da aplicação para analisar seus dados.
        </p>
      </CardContent>
    </Card>
  );
};

export default HelpTab;
