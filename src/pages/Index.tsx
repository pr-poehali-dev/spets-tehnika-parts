import { useState } from 'react';
import Header, { Product } from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import CatalogSection from '@/components/CatalogSection';
import AboutSection from '@/components/AboutSection';
import DeliverySection from '@/components/DeliverySection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

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
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />

      {activeSection === 'home' && (
        <HomeSection
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          setActiveSection={setActiveSection}
        />
      )}

      {activeSection === 'catalog' && (
        <CatalogSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          filteredProducts={filteredProducts}
          addToCart={addToCart}
        />
      )}

      {activeSection === 'about' && <AboutSection />}

      {activeSection === 'delivery' && <DeliverySection />}

      {activeSection === 'contacts' && <ContactsSection />}

      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default Index;
