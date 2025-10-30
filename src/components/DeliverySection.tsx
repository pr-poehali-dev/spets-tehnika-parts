import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const DeliverySection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-8">Доставка и оплата</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Truck" className="text-primary" />
                Способы доставки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Самовывоз со склада</strong>
                <p className="text-muted-foreground">Бесплатно, товар готов в день заказа</p>
              </div>
              <Separator />
              <div>
                <strong>Курьерская доставка по Москве</strong>
                <p className="text-muted-foreground">500 ₽, доставка на следующий день</p>
              </div>
              <Separator />
              <div>
                <strong>Транспортными компаниями по России</strong>
                <p className="text-muted-foreground">Стоимость рассчитывается индивидуально, 2-7 дней</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CreditCard" className="text-secondary" />
                Способы оплаты
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-primary" />
                <span>Наличными при получении</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-primary" />
                <span>Банковской картой на сайте</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-primary" />
                <span>Безналичный расчет для юридических лиц</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
