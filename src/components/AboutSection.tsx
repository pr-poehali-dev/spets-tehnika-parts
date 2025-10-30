import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-8">О компании</h2>
        <div className="space-y-6 text-lg">
          <p>
            <strong className="text-primary">СпецЗапчасть</strong> — ведущий поставщик запчастей для спецтехники на российском рынке. 
            Мы работаем с 2010 года и за это время заслужили доверие тысяч клиентов по всей стране.
          </p>
          <p>
            Наша компания специализируется на поставке оригинальных и качественных аналоговых запчастей для экскаваторов, 
            бульдозеров, погрузчиков и другой спецтехники ведущих мировых производителей: Caterpillar, Komatsu, Hitachi, 
            Volvo, JCB, Doosan и многих других.
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Наши ценности</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Качество</strong> — работаем только с проверенными поставщиками и сертифицированной продукцией
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Надежность</strong> — соблюдаем все договоренности и гарантируем качество товара
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Профессионализм</strong> — наши специалисты всегда помогут подобрать нужные запчасти
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
