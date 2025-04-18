
import { Instagram } from 'lucide-react';

const Header = () => {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
        <Instagram className="mr-2 text-instagram-pink" size={32} />
        <span className="instagram-gradient-text">Instagram Tracker</span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Envie os arquivos exportados do Instagram para visualizar os dados. 
        Após a análise, você poderá baixar os históricos atualizados e um relatório completo.
      </p>
    </div>
  );
};

export default Header;
