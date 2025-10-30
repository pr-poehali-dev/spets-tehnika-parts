import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer = ({ setActiveSection }: FooterProps) => {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Icon name="Cog" size={24} className="text-primary" />
              СпецЗапчасть
            </h4>
            <p className="text-slate-400 text-sm">
              Надежный поставщик запчастей для спецтехники с 2010 года
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Гидравлика</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Фильтры</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Подшипники</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Электрика</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors" onClick={() => setActiveSection('about')}>О компании</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" onClick={() => setActiveSection('delivery')}>Доставка и оплата</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Гарантия</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" onClick={() => setActiveSection('contacts')}>Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>+7 (495) 123-45-67</li>
              <li>info@speczapchast.ru</li>
              <li>Москва, ул. Промышленная, 15</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-slate-700" />
        <div className="text-center text-slate-400 text-sm">
          <p>© 2024 СпецЗапчасть. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
