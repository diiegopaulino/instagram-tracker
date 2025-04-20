
import { toast } from "sonner";

export const downloadFile = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  toast.success(`Arquivo ${filename} salvo com sucesso`);
};

export const generateMarkdownReport = (
  followers: string[],
  following: string[],
  notFollowingBack: string[],
  newFollowers: string[],
  unfollowers: string[],
  unfollowed: string[],
  historyFollowers: string[] | null,
  historyFollowing: string[] | null
) => {
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
  return markdownReport;
};
