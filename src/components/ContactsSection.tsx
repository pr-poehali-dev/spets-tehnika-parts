import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ContactsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-8">Контакты</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Свяжитесь с нами</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Phone" className="text-primary mt-1" />
                <div>
                  <p className="font-semibold">Телефон</p>
                  <a href="tel:+74951234567" className="text-primary hover:underline">+7 (495) 123-45-67</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Mail" className="text-primary mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:info@speczapchast.ru" className="text-primary hover:underline">info@speczapchast.ru</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MapPin" className="text-primary mt-1" />
                <div>
                  <p className="font-semibold">Адрес</p>
                  <p className="text-muted-foreground">г. Москва, ул. Промышленная, д. 15, стр. 3</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-primary mt-1" />
                <div>
                  <p className="font-semibold">Режим работы</p>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-muted-foreground">Сб-Вс: выходной</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Напишите нам</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <Input type="tel" placeholder="Телефон" />
                </div>
                <div>
                  <Input type="email" placeholder="Email" />
                </div>
                <div>
                  <textarea 
                    className="w-full min-h-[120px] px-3 py-2 border rounded-md"
                    placeholder="Ваше сообщение"
                  />
                </div>
                <Button className="w-full">
                  Отправить сообщение
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
