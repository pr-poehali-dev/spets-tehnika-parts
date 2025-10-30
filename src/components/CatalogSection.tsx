import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from './Header';

interface CatalogSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  filteredProducts: Product[];
  addToCart: (product: Product) => void;
}

const CatalogSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  filteredProducts,
  addToCart
}: CatalogSectionProps) => {
  return (
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
  );
};

export default CatalogSection;
