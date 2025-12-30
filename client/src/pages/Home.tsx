import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  ArrowDownRight, ArrowUpRight, Users, CheckCircle2, Target, 
  TrendingDown, TrendingUp, MessageSquare, MousePointerClick, 
  LayoutDashboard, Facebook, Globe, Smartphone, Lightbulb, BookOpen
} from "lucide-react";

// Data for charts
const funnelData = [
  { name: 'Привлечено лидов', value: 2575, fill: 'var(--chart-1)' },
  { name: 'Авто-одобрение', value: 153, fill: 'var(--chart-2)' },
  { name: 'Ручной скоринг (M3)', value: 16, fill: 'var(--chart-3)' },
];

const metaAdsComparison = [
  { name: 'До оптимизации', cpl: 7.92 },
  { name: 'Декабрь 2025', cpl: 0.87 },
];

const googleAdsTest = [
  { name: 'Квиз-форма', conversion: 7.03, cpl: 3.37 },
  { name: 'Обычная форма', conversion: 1.71, cpl: 6.82 },
];

const channelData = [
  { name: 'Organic', leads: 853, approved: 109, rate: 12.8, comment: 'Самое высокое качество лидов' },
  { name: 'Push (OnlineBank)', leads: 132, approved: 1, rate: 0.8, comment: 'Новый канал, ожидаем статистику от банка' },
  { name: 'WABA', leads: 73, approved: 8, rate: 11.0, comment: 'Реактивация базы работает отлично' },
  { name: 'Kolesa.kz', leads: 817, approved: 16, rate: 2.0, comment: 'Стабильный источник объема' },
  { name: 'Google Ads', leads: 716, approved: 17, rate: 2.4, comment: 'Квиз повышает качество' },
  { name: 'Meta Ads', leads: 38, approved: 0, rate: 0, comment: 'Заявки еще на скоринге (запуск в конце месяца)' },
];

const wabaFunnel = [
  { name: 'Отправлено', value: 1100 },
  { name: 'Прочитано', value: 906 },
  { name: 'Клики', value: 179 },
  { name: 'Лиды', value: 73 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">Halyk Leasing</h1>
              <p className="text-xs text-muted-foreground">Monthly Report</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#summary" className="hover:text-foreground transition-colors">Итоги</a>
            <a href="#meta" className="hover:text-foreground transition-colors">Meta Ads</a>
            <a href="#google" className="hover:text-foreground transition-colors">Google Ads</a>
            <a href="#waba" className="hover:text-foreground transition-colors">WABA</a>
            <a href="#push" className="hover:text-foreground transition-colors">Push</a>
            <a href="#creatives" className="hover:text-foreground transition-colors">Креативы</a>
            <a href="#roadmap" className="hover:text-foreground transition-colors">Планы</a>
          </nav>
          <div className="text-sm text-muted-foreground">
            Декабрь 2025
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 space-y-12">
        
        {/* Executive Summary */}
        <section id="summary" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Ключевые результаты</h2>
              <p className="text-muted-foreground mt-1">Период: 1-26 декабря 2025</p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 px-3 py-1">
              <TrendingUp className="h-3 w-3 mr-1" /> Эффективность выросла
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего лидов</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,575</div>
                <p className="text-xs text-primary-foreground/70 mt-1">Потенциальных клиентов</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Одобрено заявок</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">169</div>
                <p className="text-xs text-muted-foreground mt-1">153 Авто + 16 Ручной скоринг (M3)</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Стоимость лида (Meta)</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">$0.87</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 flex items-center inline-flex">
                    <ArrowDownRight className="h-3 w-3 mr-1" /> -89%
                  </span> от среднего ($7.92)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Конверсия (Quiz)</CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">7.03%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 flex items-center inline-flex">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +312%
                  </span> vs обычная форма
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Общая воронка продаж</CardTitle>
                <CardDescription>Конверсия из лида в одобренную заявку</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'transparent' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Эффективность каналов</CardTitle>
                <CardDescription>Сравнение качества лидов (Approval Rate)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelData.slice(0, 4).map((channel, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-[120px] text-sm font-medium">{channel.name}</div>
                      <div className="flex-1 mx-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(channel.rate / 15) * 100}%` }}
                        />
                      </div>
                      <div className="w-[50px] text-sm text-right font-bold">{channel.rate}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                  <strong>Инсайт:</strong> Органический трафик и WABA (WhatsApp) показывают наивысшую конверсию в одобрение (&gt;11%), в то время как платные каналы требуют дальнейшей оптимизации скоринга.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Meta Ads Section */}
        <section id="meta" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <Facebook className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Meta Ads: Стратегия снижения CPL</h2>
              <p className="text-muted-foreground">Facebook & Instagram</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Динамика стоимости лида (CPL)</CardTitle>
                <CardDescription>Сравнение с историческими данными</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metaAdsComparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip />
                      <Bar dataKey="cpl" fill="var(--chart-4)" radius={[4, 4, 0, 0]} name="Стоимость лида ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Реализованная стратегия</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded text-primary h-fit">1</div>
                  <p className="text-sm text-muted-foreground"><strong>Охватная кампания:</strong> Сначала запустили широкую рекламу для знакомства аудитории с брендом и продуктом.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded text-primary h-fit">2</div>
                  <p className="text-sm text-muted-foreground"><strong>Скоринг ИП:</strong> Собрали базу заинтересованных предпринимателей и провели предварительную оценку.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded text-primary h-fit">3</div>
                  <p className="text-sm text-muted-foreground"><strong>Лидогенерация + Квиз:</strong> Запустили конверсионную кампанию на "теплую" аудиторию с использованием квиза для упрощения подачи заявки.</p>
                </li>
              </ul>
              <div className="p-4 border rounded-lg bg-green-50 border-green-100 text-green-800 text-sm">
                <strong>Результат:</strong> Удалось снизить стоимость привлечения клиента с ~$7.92 до <strong>$0.87</strong> (в 9 раз эффективнее).
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Google Ads Section */}
        <section id="google" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg text-red-700">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Google Ads: A/B Тестирование</h2>
              <p className="text-muted-foreground">Поиск и контекстно-медийная сеть</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Сравнение форматов: Квиз vs Сайт</CardTitle>
                <CardDescription>Результаты эксперимента</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={googleAdsTest} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="conversion" name="Конверсия (%)" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="cpl" name="Стоимость лида ($)" fill="var(--chart-5)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center space-y-6">
              <div className="text-center p-6 border rounded-xl bg-card shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">706</div>
                <div className="text-sm font-medium text-muted-foreground">Конверсий через Квиз</div>
              </div>
              <div className="text-center p-6 border rounded-xl bg-card shadow-sm opacity-60">
                <div className="text-4xl font-bold text-muted-foreground mb-2">29</div>
                <div className="text-sm font-medium text-muted-foreground">Конверсий через Форму</div>
              </div>
              <p className="text-sm text-muted-foreground text-center italic">
                "Квиз сокращает путь пользователя и снимает психологический барьер перед сложной формой заявки."
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Push Notification Section */}
        <section id="push" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Push-уведомления (OnlineBank)</h2>
              <p className="text-muted-foreground">Эксперимент с мобильным приложением для бизнеса</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 bg-muted/30 flex items-center justify-center p-6">
                  <img 
                    src="/images/push_notification.png" 
                    alt="Push Notification Preview" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Кампания "Авто для бизнеса"</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Запуск: 1 декабря 2025<br/>
                      Таргетинг: Пользователи приложения OnlineBank
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm border-b pb-2">
                      <span>Привлечено лидов</span>
                      <span className="font-bold">132</span>
                    </div>
                    <div className="flex justify-between text-sm border-b pb-2">
                      <span>Одобрено (Авто)</span>
                      <span className="font-bold">1</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2">
                      <span>Статус</span>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">Ожидаем данные от банка</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Инсайт</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Мы запустили таргетированную рассылку через приложение OnlineBank с предложением лизинга авто под 16.5%. 
                    На данный момент мы видим <strong>132 перехода</strong>, которые конвертировались в заявки. 
                    Однако, полная статистика по охватам и кликам находится на стороне банка. Мы направили официальный запрос и ожидаем детальную выгрузку для расчета CTR и стоимости контакта.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base text-primary">Ручной скоринг (Методика M3)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Помимо автоматического скоринга, мы применяем методику M3 для ручного рассмотрения сложных заявок. 
                    В декабре это принесло дополнительно <strong>16 одобренных клиентов</strong> (уникальных компаний), которые могли быть отсеяны автоматикой. 
                    Это доказывает важность гибридного подхода к оценке рисков.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        {/* WABA Section */}
        <section id="waba" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-700">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">WABA: Реактивация базы</h2>
              <p className="text-muted-foreground">WhatsApp Business API рассылка</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Мы использовали базу "спящих" ИП (ранее отказано или не завершили заявку) для повторной активации. 
                Это позволило получить лиды практически бесплатно, так как контакт уже был в базе.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card border rounded-lg">
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-xs text-muted-foreground">Доставляемость</div>
                </div>
                <div className="p-4 bg-card border rounded-lg">
                  <div className="text-2xl font-bold">83%</div>
                  <div className="text-xs text-muted-foreground">Прочитано (Open Rate)</div>
                </div>
                <div className="p-4 bg-card border rounded-lg">
                  <div className="text-2xl font-bold">16%</div>
                  <div className="text-xs text-muted-foreground">CTR (Клики)</div>
                </div>
                <div className="p-4 bg-card border rounded-lg">
                  <div className="text-2xl font-bold">$0.37</div>
                  <div className="text-xs text-muted-foreground">Стоимость клика</div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Воронка рассылки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wabaFunnel} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="var(--chart-3)" radius={[0, 4, 4, 0]} barSize={30}>
                        {wabaFunnel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fillOpacity={1 - (index * 0.15)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Creatives Gallery */}
        <section id="creatives" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg text-pink-700">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Используемые креативы</h2>
              <p className="text-muted-foreground">Визуальная коммуникация в Meta Ads</p>
            </div>
          </div>

          <Tabs defaultValue="static" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="static">Баннеры</TabsTrigger>
              <TabsTrigger value="preview">Предпросмотр в ленте</TabsTrigger>
            </TabsList>
            
            <TabsContent value="static" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src="/images/IP_var1.jpg" 
                      alt="Creative 1" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Вариант 1: Цифровой лизинг</h3>
                    <p className="text-sm text-muted-foreground mt-1">Акцент на скорости — "за 10 минут"</p>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src="/images/IP_var1-2.jpg" 
                      alt="Creative 2" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Вариант 2: Не выходя из дома</h3>
                    <p className="text-sm text-muted-foreground mt-1">Акцент на удобстве и гибких условиях</p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src="/images/IP_var1-1.jpg" 
                      alt="Creative 3" 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Вариант 3: Без бумаг</h3>
                    <p className="text-sm text-muted-foreground mt-1">Акцент на простоте оформления</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
                  <img src="/images/ad_preview_1.png" alt="Ad Preview 1" className="w-full h-auto" />
                  <div className="p-3 bg-muted/20 text-xs text-muted-foreground text-center">
                    Отображение в ленте Facebook и Instagram Stories
                  </div>
                </div>
                <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
                  <img src="/images/ad_preview_2.png" alt="Ad Preview 2" className="w-full h-auto" />
                  <div className="p-3 bg-muted/20 text-xs text-muted-foreground text-center">
                    Адаптация под Reels и мобильную ленту
                  </div>
                </div>
                <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
                  <img src="/images/ad_preview_3.png" alt="Ad Preview 3" className="w-full h-auto" />
                  <div className="p-3 bg-muted/20 text-xs text-muted-foreground text-center">
                    Варианты заголовков и призывов к действию
                  </div>
                </div>
                <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
                  <img src="/images/ad_preview_4.png" alt="Ad Preview 4" className="w-full h-auto" />
                  <div className="p-3 bg-muted/20 text-xs text-muted-foreground text-center">
                    Тестирование различных форматов (карусель, одно изображение)
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Detailed Stats Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Детальная статистика по каналам</h2>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Источник</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Лиды</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Одобрено</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Approval Rate</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Комментарий</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {channelData.map((channel, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">{channel.name}</td>
                      <td className="p-4 align-middle">{channel.leads}</td>
                      <td className="p-4 align-middle">{channel.approved}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={channel.rate > 5 ? "default" : "secondary"}>
                          {channel.rate}%
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-muted-foreground">
                        {channel.comment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Separator />

        {/* Roadmap */}
        <section id="roadmap" className="space-y-8 pb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Планы на Q1 2026</h2>
              <p className="text-muted-foreground">Стратегия масштабирования</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Масштабирование</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                  <li>Увеличение бюджета на Meta Ads (так как CPL низкий)</li>
                  <li>Расширение семантики в Google Ads</li>
                  <li>Запуск TikTok Ads для охвата молодой аудитории ИП</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Оптимизация</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                  <li>Доработка скоринговой модели для повышения Approval Rate</li>
                  <li>A/B тесты новых квизов для разных сегментов (Такси, Грузоперевозки)</li>
                  <li>Автоматизация WABA рассылок по триггерам</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Аналитика</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                  <li>Внедрение сквозной аналитики до сделки (ROI)</li>
                  <li>Дашборд в реальном времени для руководства</li>
                  <li>Анализ LTV (пожизненной ценности) клиента</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Glossary */}
        <section className="bg-muted/30 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Словарь терминов</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
            <div>
              <strong className="text-foreground">CPL (Cost Per Lead):</strong> Стоимость привлечения одной заявки. Чем ниже, тем лучше.
            </div>
            <div>
              <strong className="text-foreground">CTR (Click-Through Rate):</strong> Кликабельность объявления. Показывает интерес аудитории к креативу.
            </div>
            <div>
              <strong className="text-foreground">Conversion Rate:</strong> Процент пользователей, совершивших целевое действие (оставивших заявку).
            </div>
            <div>
              <strong className="text-foreground">Approval Rate:</strong> Процент одобренных заявок от общего числа лидов. Показатель качества трафика.
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
