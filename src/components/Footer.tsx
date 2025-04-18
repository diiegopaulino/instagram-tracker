
import { Instagram, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-center mt-12 mb-6 text-muted-foreground">
      <p className="mb-2">feito com ❤️ por Diego Souza</p>
      <div className="flex items-center justify-center gap-4">
        <a 
          href="https://instagram.com/diiegopaulino" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm hover:text-instagram-pink transition-colors"
        >
          <Instagram size={18} />
          <span>Instagram</span>
        </a>
        <a 
          href="https://github.com/diiegopaulino" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm hover:text-black transition-colors"
        >
          <Github size={18} />
          <span>GitHub</span>
        </a>
        <a 
          href="mailto:diiegopaulino@gmail.com"
          className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"
        >
          <Mail size={18} />
          <span>E-mail</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
