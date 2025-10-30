import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomeSectionProps {
  categories: string[];
  setSelectedCategory: (category: string) => void;
  setActiveSection: (section: string) => void;
}

const HomeSection = ({ categories, setSelectedCategory, setActiveSection }: HomeSectionProps) => {
  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in">
              Запчасти для спецтехники
              <span className="block text-primary mt-2">с доставкой по России</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Широкий ассортимент оригинальных и аналоговых запчастей для экскаваторов, бульдозеров и другой спецтехники
            </p>
            <Button size="lg" className="animate-scale-in" onClick={() => setActiveSection('catalog')}>
              Перейти в каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Популярные категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all cursor-pointer hover-scale" onClick={() => { setSelectedCategory(category); setActiveSection('catalog'); }}>
                <CardHeader className="text-center pb-3">
                  <Icon name="Wrench" size={32} className="mx-auto text-primary mb-2" />
                  <CardTitle className="text-sm">{category}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Наши преимущества</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Icon name="Check" size={48} className="mx-auto text-primary mb-4" />
                <CardTitle>Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Все запчасти сертифицированы и имеют гарантию производителя</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="Truck" size={48} className="mx-auto text-secondary mb-4" />
                <CardTitle>Быстрая доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Доставка по России от 1 до 7 дней, самовывоз в день заказа</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="Users" size={48} className="mx-auto text-primary mb-4" />
                <CardTitle>Профессионалы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Опытные консультанты помогут подобрать нужные детали</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
