import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  article: string;
  category: string;
  model: string;
  price: number;
  image: string;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Гидроцилиндр стрелы', article: 'HC-2345', category: 'Гидравлика', model: 'Caterpillar 320D', price: 45000, image: 'https://cdn.poehali.dev/projects/4f5319ef-6c5b-4c31-9476-e6c6a3589ab3/files/5ea2d1a7-c9c7-4dee-8bce-3fb12e679494.jpg', inStock: true },
  { id: 2, name: 'Фильтр масляный', article: 'OF-8921', category: 'Фильтры', model: 'Komatsu PC200', price: 1200, image: 'https://cdn.poehali.dev/projects/4f5319ef-6c5b-4c31-9476-e6c6a3589ab3/files/493fa047-c9f8-4bd9-a471-5c282fe3d526.jpg', inStock: true },
  { id: 3, name: 'Подшипник опорно-поворотный', article: 'BR-5567', category: 'Подшипники', model: 'Hitachi ZX330', price: 78000, image: 'https://cdn.poehali.dev/projects/4f5319ef-6c5b-4c31-9476-e6c6a3589ab3/files/5ea2d1a7-c9c7-4dee-8bce-3fb12e679494.jpg', inStock: true },
  { id: 4, name: 'Стартер двигателя', article: 'ST-4412', category: 'Электрика', model: 'JCB 3CX', price: 18000, image: 'https://cdn.poehali.dev/projects/4f5319ef-6c5b-4c31-9476-e6c6a3589ab3/files/493fa047-c9f8-4bd9-a471-5c282fe3d526.jpg', inStock: false },
  { id: 5, name: 'Радиатор охлаждения', article: 'RD-7823', category: 'Охлаждение', model: 'Volvo EC210B', price: 32000, image: 'https://cdn.poehali.dev/projects/4f5319ef-6c5b-4c31-9476-e6c6a3589ab3/files/bd92acdc-4aa0-458e-a3fc-70b76911b2c2.jpg', inStock: true },
  { id: 6, name: 'Насос топливный', article: 'FP-3321', category: 'Топливная система', model: 'Doosan DX225LC', price: 24000, image: 'https://cdn.poehali.dev/projects/4f5319ef-6c5b-4c31-9476-e6c6a3589ab3/files/5ea2d1a7-c9c7-4dee-8bce-3fb12e679494.jpg', inStock: true },
];

const categories = ['Все категории', 'Гидравлика', 'Фильтры', 'Подшипники', 'Электрика', 'Охлаждение', 'Топливная система'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Все категории' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Cog" size={36} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">СпецЗапчасть</h1>
                <p className="text-sm text-muted-foreground">Запчасти для спецтехники</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button variant={activeSection === 'home' ? 'default' : 'ghost'} onClick={() => setActiveSection('home')}>
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button variant={activeSection === 'catalog' ? 'default' : 'ghost'} onClick={() => setActiveSection('catalog')}>
                <Icon name="Package" size={18} className="mr-2" />
                Каталог
              </Button>
              <Button variant={activeSection === 'about' ? 'default' : 'ghost'} onClick={() => setActiveSection('about')}>
                <Icon name="Info" size={18} className="mr-2" />
                О компании
              </Button>
              <Button variant={activeSection === 'delivery' ? 'default' : 'ghost'} onClick={() => setActiveSection('delivery')}>
                <Icon name="Truck" size={18} className="mr-2" />
                Доставка
              </Button>
              <Button variant={activeSection === 'contacts' ? 'default' : 'ghost'} onClick={() => setActiveSection('contacts')}>
                <Icon name="Phone" size={18} className="mr-2" />
                Контакты
              </Button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {totalItems > 0 ? `Товаров в корзине: ${totalItems}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Добавьте товары в корзину</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.product.id} className="flex gap-4 p-3 border rounded-lg">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">{item.product.article}</p>
                            <p className="text-primary font-bold mt-1">{item.product.price.toLocaleString()} ₽</p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.product.id)}>
                              <Icon name="X" size={14} />
                            </Button>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                <Icon name="Plus" size={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                          <Icon name="ArrowRight" size={18} className="ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
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
      )}

      {activeSection === 'catalog' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Каталог запчастей</h2>
            
            <div className="mb-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по артикулу, названию или модели техники..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-all overflow-hidden group">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <Badge className="absolute top-3 right-3 bg-destructive">Под заказ</Badge>
                    )}
                    {product.inStock && (
                      <Badge className="absolute top-3 right-3 bg-green-500">В наличии</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{product.category}</Badge>
                      <span className="text-sm text-muted-foreground">{product.article}</span>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.model}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                    </div>
                    <Button onClick={() => addToCart(product)} disabled={!product.inStock}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-xl text-muted-foreground">Ничего не найдено</p>
                <p className="text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </section>
      )}

      {activeSection === 'about' && (
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
      )}

      {activeSection === 'delivery' && (
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
      )}

      {activeSection === 'contacts' && (
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
      )}

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
    </div>
  );
};

export default Index;
