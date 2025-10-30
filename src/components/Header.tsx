import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  article: string;
  category: string;
  model: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cart: { product: Product; quantity: number }[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  totalPrice: number;
  totalItems: number;
}

const Header = ({
  activeSection,
  setActiveSection,
  cart,
  removeFromCart,
  updateQuantity,
  totalPrice,
  totalItems
}: HeaderProps) => {
  return (
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
  );
};

export default Header;
