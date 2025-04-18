
import { ExternalLink } from 'lucide-react';

type ColorType = 'pink' | 'green' | 'yellow' | 'red';

interface UserCardProps {
  username: string;
  index?: number;
  color?: ColorType;
}

const UserCard = ({ username, index, color = 'pink' }: UserCardProps) => {
  const colorMap: Record<ColorType, string> = {
    pink: '#FF0069',
    green: '#00c851',
    yellow: '#ffbb33',
    red: '#ff4444'
  };

  return (
    <div className="avatar-card">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: colorMap[color] }}
      >
        {username.substring(0, 2).toUpperCase()}
      </div>
      <a 
        href={`https://instagram.com/${username}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 text-sm font-medium hover:underline"
      >
        {index ? `${index}. ${username}` : username}
      </a>
      <a 
        href={`https://instagram.com/${username}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-instagram-pink transition-colors"
      >
        <ExternalLink size={16} />
      </a>
    </div>
  );
};

export default UserCard;
