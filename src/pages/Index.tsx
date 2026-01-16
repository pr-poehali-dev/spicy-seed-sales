import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  heatLevel: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Каролина Рипер',
    description: 'Самый острый перец в мире',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/4c98f49e-39d0-49a2-9418-857025c1e4af.jpg',
    heatLevel: 5,
    category: 'Супер острые'
  },
  {
    id: 2,
    name: 'Хабанеро Оранжевый',
    description: 'Классический жгучий вкус',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/9698a84f-93f9-44a3-b812-55bcece2275d.jpg',
    heatLevel: 4,
    category: 'Острые'
  },
  {
    id: 3,
    name: 'Призрачный перец',
    description: 'Легендарная острота',
    price: 380,
    image: 'https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/43c91280-82ee-41bc-a252-2be6912ed2a1.jpg',
    heatLevel: 5,
    category: 'Супер острые'
  },
  {
    id: 4,
    name: 'Халапеньо',
    description: 'Мягкая острота для начинающих',
    price: 180,
    image: 'https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/4c98f49e-39d0-49a2-9418-857025c1e4af.jpg',
    heatLevel: 2,
    category: 'Средние'
  },
  {
    id: 5,
    name: 'Скотч Боннет',
    description: 'Карибская острота',
    price: 340,
    image: 'https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/9698a84f-93f9-44a3-b812-55bcece2275d.jpg',
    heatLevel: 4,
    category: 'Острые'
  },
  {
    id: 6,
    name: 'Серрано',
    description: 'Яркий вкус и умеренная острота',
    price: 210,
    image: 'https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/43c91280-82ee-41bc-a252-2be6912ed2a1.jpg',
    heatLevel: 3,
    category: 'Средние'
  }
];

const reviews = [
  { id: 1, name: 'Алексей М.', text: 'Отличные семена! Все взошли, перцы выросли острые как обещано.', rating: 5 },
  { id: 2, name: 'Мария К.', text: 'Каролина Рипер - это нечто! Впервые вырастила такой острый перец.', rating: 5 },
  { id: 3, name: 'Дмитрий П.', text: 'Быстрая доставка, хорошая упаковка. Рекомендую!', rating: 5 }
];

const blogPosts = [
  { id: 1, title: 'Как вырастить острый перец дома', date: '15 января 2026' },
  { id: 2, title: 'Шкала остроты перцев Сковилла', date: '10 января 2026' },
  { id: 3, title: 'Уход за рассадой острого перца', date: '5 января 2026' }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', comment: '' });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleOrder = () => {
    alert(`Заказ оформлен!\nИмя: ${orderForm.name}\nТелефон: ${orderForm.phone}\nАдрес: ${orderForm.address}\nСумма: ${getTotalPrice()} ₽`);
    setCart([]);
    setOrderForm({ name: '', phone: '', address: '', comment: '' });
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-primary/30 shadow-neon">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="Flame" className="text-primary animate-glow-pulse" size={32} />
              <div className="absolute inset-0 blur-xl bg-primary/30 -z-10"></div>
            </div>
            <h1 className="text-2xl font-bold text-primary tracking-wider">Pepper Garden</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Главная</a>
            <a href="#catalog" className="hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Каталог</a>
            <a href="#about" className="hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">О нас</a>
            <a href="#blog" className="hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Блог</a>
            <a href="#reviews" className="hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Отзывы</a>
            <a href="#contacts" className="hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Контакты</a>
          </nav>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative border-primary/50 hover:border-primary hover:shadow-neon transition-all">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-glow-pulse">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              {cart.length > 0 && (
                <div className="mt-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Icon name="Plus" size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)} className="ml-auto">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Итого:</span>
                      <span>{getTotalPrice()} ₽</span>
                    </div>
                    <div className="space-y-3">
                      <Input 
                        placeholder="Ваше имя" 
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                      />
                      <Input 
                        placeholder="Телефон" 
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      />
                      <Input 
                        placeholder="Адрес доставки" 
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                      />
                      <Textarea 
                        placeholder="Комментарий к заказу" 
                        value={orderForm.comment}
                        onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                      />
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleOrder}
                        disabled={!orderForm.name || !orderForm.phone || !orderForm.address}
                      >
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-30"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(236, 72, 153, 0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                Семена острого перца для настоящих ценителей
              </h2>
              <p className="text-lg text-foreground/80">
                Выращивайте самые острые сорта перца в домашних условиях. Качественные семена с высокой всхожестью.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="gap-2 shadow-neon hover:shadow-neon-purple transition-all hover:scale-105" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="ShoppingBag" size={20} />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" className="border-secondary hover:bg-secondary/20 hover:shadow-neon-cyan transition-all hover:scale-105" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/4c98f49e-39d0-49a2-9418-857025c1e4af.jpg" 
                alt="Острый перец" 
                className="rounded-2xl shadow-2xl relative border-2 border-primary/30 hover:border-primary/60 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Каталог семян</h2>
            <p className="text-foreground/70">Выберите идеальный сорт для вашего сада</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Card key={product.id} className="group hover:shadow-neon-purple transition-all duration-300 hover:-translate-y-2 border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="p-0 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-t-lg border-b border-primary/20"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <CardDescription className="mb-3">{product.description}</CardDescription>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Flame" 
                        size={16} 
                        className={i < product.heatLevel ? 'text-primary' : 'text-muted'} 
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">Острота</span>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <Button onClick={() => addToCart(product)} className="gap-2 shadow-neon hover:shadow-neon-purple transition-all hover:scale-105">
                      <Icon name="Plus" size={16} />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary via-accent to-primary rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="https://cdn.poehali.dev/projects/2dad60ae-a8c2-4d90-a243-3e96f46a0ecc/files/9698a84f-93f9-44a3-b812-55bcece2275d.jpg" 
                alt="О нас" 
                className="rounded-2xl shadow-neon-cyan relative border-2 border-secondary/30"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">О нашей компании</h2>
              <p className="text-foreground/80 text-lg">
                Мы специализируемся на продаже качественных семян острого перца более 10 лет. 
                Наша миссия - помочь каждому вырастить идеальный урожай жгучих перцев.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 p-4 rounded-xl bg-card/30 border border-primary/20 hover:border-primary/50 transition-all hover:shadow-neon">
                  <div className="text-4xl font-bold text-primary">150+</div>
                  <div className="text-sm text-foreground/70">Сортов перца</div>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-card/30 border border-secondary/20 hover:border-secondary/50 transition-all hover:shadow-neon-cyan">
                  <div className="text-4xl font-bold text-secondary">98%</div>
                  <div className="text-sm text-foreground/70">Всхожесть</div>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-card/30 border border-accent/20 hover:border-accent/50 transition-all hover:shadow-neon-purple">
                  <div className="text-4xl font-bold text-accent">5000+</div>
                  <div className="text-sm text-foreground/70">Довольных клиентов</div>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-card/30 border border-primary/20 hover:border-primary/50 transition-all hover:shadow-neon">
                  <div className="text-4xl font-bold text-primary">10</div>
                  <div className="text-sm text-foreground/70">Лет опыта</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Блог</h2>
            <p className="text-foreground/70">Полезные статьи о выращивании острого перца</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <Card key={post.id} className="hover:shadow-neon-purple transition-all cursor-pointer hover:-translate-y-1 border-accent/20 hover:border-accent/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="link" className="gap-2 p-0">
                    Читать далее
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.1) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Отзывы клиентов</h2>
            <p className="text-foreground/70">Что говорят наши покупатели</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <Card key={review.id} className="border-secondary/20 hover:border-secondary/50 bg-card/50 backdrop-blur-sm hover:shadow-neon-cyan transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={16} 
                        className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'} 
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Контакты</h2>
            <div className="grid gap-6">
              <Card className="border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="relative">
                    <Icon name="Phone" className="text-primary" size={24} />
                    <div className="absolute inset-0 blur-lg bg-primary/30 -z-10"></div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Телефон</div>
                    <div className="text-muted-foreground">+7 (999) 123-45-67</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-secondary/20 hover:border-secondary/50 bg-card/50 backdrop-blur-sm hover:shadow-neon-cyan transition-all">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="relative">
                    <Icon name="Mail" className="text-secondary" size={24} />
                    <div className="absolute inset-0 blur-lg bg-secondary/30 -z-10"></div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">info@perecmarket.ru</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-accent/20 hover:border-accent/50 bg-card/50 backdrop-blur-sm hover:shadow-neon-purple transition-all">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="relative">
                    <Icon name="MapPin" className="text-accent" size={24} />
                    <div className="absolute inset-0 blur-lg bg-accent/30 -z-10"></div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Адрес</div>
                    <div className="text-muted-foreground">г. Москва, ул. Садовая, д. 15</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card/50 backdrop-blur-md border-t border-primary/30 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Icon name="Flame" className="text-primary animate-glow-pulse" size={24} />
              <div className="absolute inset-0 blur-xl bg-primary/30 -z-10"></div>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pepper Garden</span>
          </div>
          <p className="text-sm text-foreground/70">© 2026 Pepper Garden. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}