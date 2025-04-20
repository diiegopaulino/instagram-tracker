
import { Card, CardContent } from "@/components/ui/card";

const HelpTab = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-3">## Instruções</h2>
        
        <h5 className="text-lg font-semibold mb-2">##### Como obter seus dados do Instagram</h5>
        
        <p className="mb-4 text-muted-foreground">
          Todo o processamento acontece localmente no seu navegador. Nenhum dado é enviado ou armazenado.
        </p>
        
        <ol className="list-decimal pl-5 space-y-2">
          <li>Acesse o Instagram pelo app do seu celular.</li>
          <li>Vá em <strong>Perfil &gt; Configurações e atividade &gt; Sua atividade &gt; Baixar suas informações</strong></li>
          <li>Selecione <strong>Baixar ou transferir informações</strong>.</li>
          <li>Na tela seguinte, selecione apenas a conta correspondente ao <strong>Instagram</strong>.</li>
          <li>Em seguida, selecione apenas <strong>Algumas das suas informações</strong>.</li>
          <li>A seguir, marque apenas <strong>Seguidores e Seguindo</strong> em <strong>Conexões</strong>, e baixe para o seu dispositivo.</li>
          <li>Em intervalo de datas, escolha <strong>Desde o início</strong>, e o formato precisa ser em <strong>JSON</strong>.</li>
          <li>Confirme seu e-mail e aguarde o link de download.</li>
          <li>Extraia o arquivo <code className="bg-muted px-1 py-0.5 rounded text-sm">.zip</code> recebido.</li>
          <li>Navegue até a pasta <code className="bg-muted px-1 py-0.5 rounded text-sm">followers_and_following/</code></li>
          <li>
            Adicione os arquivos:
            <ul className="list-disc pl-5 mt-1">
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">following.json</code></li>
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">followers_1.json</code></li>
            </ul>
          </li>
          <li>
            (Opcional) Salve os arquivos gerados pela aplicação para comparar em outro momento:
            <ul className="list-disc pl-5 mt-1">
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">historico_seguidores.json</code></li>
              <li><code className="bg-muted px-1 py-0.5 rounded text-sm">historico_seguindo.json</code></li>
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
