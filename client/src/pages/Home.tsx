import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  { name: 'Одобрено заявок', value: 153, fill: 'var(--chart-2)' },
];

const metaAdsComparison = [
  { name: 'До оптимизации', cpl: 7.92 },
  { name: 'Декабрь 2025', cpl: 0.87 },
];

const abTestData = [
  { name: 'Квиз-форма', conversion: 7.03, cpl: 3.37 },
  { name: 'Обычная форма', conversion: 1.71, cpl: 6.82 },
];

const channelData = [
  { name: 'Organic', leads: 853, approved: 109, rate: 12.8 },
  { name: 'WABA', leads: 73, approved: 8, rate: 11.0 },
  { name: 'Kolesa.kz', leads: 817, approved: 16, rate: 2.0 },
  { name: 'Google Ads', leads: 716, approved: 17, rate: 2.4 },
  { name: 'Meta Ads', leads: 38, approved: 0, rate: 0 },
];

const wabaFunnel = [
  { name: 'Отправлено', value: 1100 },
  { name: 'Прочитано', value: 906 },
  { name: 'Кликнули', value: 179 },
  { name: 'Заявки', value: 73 },
  { name: 'Одобрено', value: 8 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">H</div>
            <span className="font-bold text-lg tracking-tight">Halyk Leasing</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#summary" className="hover:text-foreground transition-colors">Итоги</a>
            <a href="#meta" className="hover:text-foreground transition-colors">Meta Ads</a>
            <a href="#google" className="hover:text-foreground transition-colors">Google Ads</a>
            <a href="#waba" className="hover:text-foreground transition-colors">WABA</a>
            <a href="#creatives" className="hover:text-foreground transition-colors">Креативы</a>
            <a href="#roadmap" className="hover:text-foreground transition-colors">Планы</a>
          </nav>
          <div className="text-sm text-muted-foreground">
            Декабрь 2025
          </div>
        </div>
      </header>

      <main className="container py-10 space-y-16">
        
        {/* Hero Section */}
        <section id="summary" className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Ежемесячный отчет по лидогенерации</h1>
            <p className="text-xl text-muted-foreground">
              Ключевые показатели эффективности за период 1–26 декабря 2025
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary-foreground/90">Привлечено лидов</CardTitle>
                <Users className="h-4 w-4 text-primary-foreground/70" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2 575</div>
                <p className="text-xs text-primary-foreground/70 mt-1">Потенциальных клиентов</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Одобрено заявок</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">153</div>
                <p className="text-xs text-muted-foreground mt-1">5.9% конверсия в одобрение</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Стоимость лида (Meta)</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">$0.87</div>
                <p className="text-xs text-muted-foreground mt-1">↓ в 9 раз дешевле (было $7.92)</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Эффективность квиза</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">+312%</div>
                <p className="text-xs text-muted-foreground mt-1">vs обычная форма на сайте</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Главный итог месяца</h3>
                <p className="text-muted-foreground leading-relaxed">
                  В декабре мы научились привлекать клиентов в 9 раз дешевле, чем раньше, и нашли самый эффективный способ взаимодействия с ними через интерактивные квизы. Это позволит значительно масштабировать привлечение клиентов при том же бюджете в следующем квартале.
                </p>
              </div>
            </div>
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
              <h2 className="text-2xl font-bold tracking-tight">Meta Ads (Facebook & Instagram)</h2>
              <p className="text-muted-foreground">Стратегия двух этапов: Охват + Лидогенерация</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Снижение стоимости лида (CPL)</CardTitle>
                <CardDescription>Сравнение средней стоимости заявки с историческими данными</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metaAdsComparison} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Стоимость лида']} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="cpl" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={40}>
                      {
                        metaAdsComparison.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 1 ? 'var(--primary)' : '#94a3b8'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="grid gap-4 grid-cols-2">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Охват кампании</div>
                  <div className="text-2xl font-bold">493 270</div>
                  <div className="text-xs text-muted-foreground">Уникальных пользователей</div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Показы</div>
                  <div className="text-2xl font-bold">2.2M</div>
                  <div className="text-xs text-muted-foreground">Всего просмотров</div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Запомнили рекламу</div>
                  <div className="text-2xl font-bold">18 330</div>
                  <div className="text-xs text-muted-foreground">Ad Recall Lift</div>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 border-green-100">
                  <div className="text-sm text-green-700 mb-1">Экономия бюджета</div>
                  <div className="text-2xl font-bold text-green-700">-89%</div>
                  <div className="text-xs text-green-600">Снижение затрат на лид</div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-sm">
                <p><strong>Простыми словами:</strong> Раньше мы тратили почти $8, чтобы получить одного потенциального клиента из Facebook/Instagram. Сейчас мы тратим меньше $1. Это прямое следствие новой стратегии "прогрева" аудитории и использования квиз-формы.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Google Ads Section */}
        <section id="google" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Google Ads (A/B Тестирование)</h2>
              <p className="text-muted-foreground">Сравнение эффективности: Квиз против Обычной формы</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Результаты эксперимента</CardTitle>
                <CardDescription>Квиз показал значительно лучшие результаты по всем метрикам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="h-5 w-5" /> Квиз-форма (Победитель)
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Конверсия в заявку</span>
                        <span className="font-bold">7.03%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 w-[70%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Стоимость заявки</span>
                        <span className="font-bold">$3.37</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 w-[33%]"></div>
                      </div>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      706 конверсий при бюджете $2,377
                    </div>
                  </div>

                  <div className="space-y-4 opacity-70">
                    <h4 className="font-semibold flex items-center gap-2 text-muted-foreground">
                      Обычная форма
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Конверсия в заявку</span>
                        <span className="font-bold">1.71%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 w-[17%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Стоимость заявки</span>
                        <span className="font-bold">$6.82</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 w-[68%]"></div>
                      </div>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      29 конверсий при бюджете $197
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Вывод</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  Квиз не только в <strong>2 раза дешевле</strong> по стоимости привлечения клиента, но и в <strong>4 раза эффективнее</strong> превращает посетителей сайта в реальные заявки.
                </p>
                <p className="text-sm leading-relaxed">
                  Люди охотнее взаимодействуют с интерактивным форматом, отвечая на простые вопросы, чем заполняют скучные формы.
                </p>
                <div className="pt-4">
                  <Badge variant="outline" className="bg-background text-primary border-primary">Рекомендация: Полный переход на Квиз</Badge>
                </div>
              </CardContent>
            </Card>
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
              <h2 className="text-2xl font-bold tracking-tight">WABA (WhatsApp Business API)</h2>
              <p className="text-muted-foreground">Кампания по реактивации "спящих" клиентов</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Воронка рассылки</CardTitle>
                <CardDescription>Конверсия от отправки сообщения до одобренной заявки</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wabaFunnel} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={30} label={{ position: 'right', fill: 'var(--foreground)', fontSize: 12 }}>
                      {
                        wabaFunnel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`oklch(0.48 0.14 145 / ${1 - index * 0.15})`} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="grid gap-4 grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Потрачено</div>
                  <div className="text-2xl font-bold">$66</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Получено заявок</div>
                  <div className="text-2xl font-bold">73</div>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 border-green-100 col-span-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-green-700 mb-1">Одобрено заявок</div>
                      <div className="text-2xl font-bold text-green-700">8</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-700 mb-1">Конверсия в одобрение</div>
                      <div className="text-xl font-bold text-green-700">11%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-sm">
                <p>Мы отправили персонализированные сообщения клиентам, которые ранее оставляли заявку, но не получили одобрения. После внедрения нового скоринга для ИП мы решили дать им второй шанс. <strong>Результат: 8 новых клиентов всего за $66.</strong></p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* All Channels Comparison */}
        <section id="channels" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Сравнение каналов</h2>
              <p className="text-muted-foreground">Эффективность источников трафика</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Канал</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Привлечено лидов</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Одобрено заявок</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">% Одобрения</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Комментарий</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {channelData.map((channel) => (
                      <tr key={channel.name} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">{channel.name}</td>
                        <td className="p-4 align-middle text-right">{channel.leads}</td>
                        <td className="p-4 align-middle text-right">{channel.approved}</td>
                        <td className="p-4 align-middle text-right">
                          <Badge variant={channel.rate > 10 ? "default" : "secondary"} className={channel.rate > 10 ? "bg-green-600 hover:bg-green-700" : ""}>
                            {channel.rate}%
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-muted-foreground">
                          {channel.name === 'Organic' && 'Самое высокое качество лидов'}
                          {channel.name === 'WABA' && 'Реактивация базы работает отлично'}
                          {channel.name === 'Kolesa.kz' && 'Стабильный источник объема'}
                          {channel.name === 'Google Ads' && 'Квиз повышает качество'}
                          {channel.name === 'Meta Ads' && 'Заявки еще на скоринге (запуск в конце месяца)'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
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
        </section>

        <Separator />

        {/* Roadmap */}
        <section id="roadmap" className="space-y-8 pb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Рекомендации и планы</h2>
              <p className="text-muted-foreground">Дорожная карта на Q1 2026</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>
                  Масштабирование квизов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Внедрить квиз-форму на всех каналах. Проанализировать результаты A/B теста креативов в Meta. Ожидаемый результат: снижение CPL в Google и Meta, повышение общей конверсии.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>
                  Развитие WABA-маркетинга
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Запустить ежемесячные автоматизированные рассылки по разным сегментам базы: специальные предложения для отказников, напоминания о документах и т.д.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
                  Оптимизация Meta Ads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Продолжать использовать связку "узнаваемость + лидогенерация", направив трафик с лид-кампаний на новый квиз для еще большего снижения стоимости заявки.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</span>
                  Email-маркетинг
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Подготовить и запустить первую автоматизированную email-рассылку. Проанализировать эффективность всех каналов за квартал и скорректировать стратегию.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Glossary */}
        <section id="glossary" className="bg-muted/30 rounded-xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Словарь терминов</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
            <div>
              <strong className="block text-foreground mb-1">Лид (Lead)</strong>
              <span className="text-muted-foreground">Потенциальный клиент, который оставил свои контактные данные и проявил интерес к услуге.</span>
            </div>
            <div>
              <strong className="block text-foreground mb-1">CPL (Cost Per Lead)</strong>
              <span className="text-muted-foreground">Стоимость привлечения одного лида. Затраты на рекламу / количество лидов.</span>
            </div>
            <div>
              <strong className="block text-foreground mb-1">CR (Conversion Rate)</strong>
              <span className="text-muted-foreground">Коэффициент конверсии — процент посетителей, совершивших целевое действие.</span>
            </div>
            <div>
              <strong className="block text-foreground mb-1">CTR (Click-Through Rate)</strong>
              <span className="text-muted-foreground">Показатель кликабельности — процент людей, кликнувших на рекламу после просмотра.</span>
            </div>
            <div>
              <strong className="block text-foreground mb-1">WABA</strong>
              <span className="text-muted-foreground">WhatsApp Business API — инструмент для массовых рассылок и общения с клиентами.</span>
            </div>
            <div>
              <strong className="block text-foreground mb-1">Скоринг</strong>
              <span className="text-muted-foreground">Автоматическая оценка кредитоспособности клиента для принятия решения.</span>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t py-8 bg-muted/20">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Halyk Leasing | Отчет по лидогенерации | Декабрь 2025</p>
          <p className="mt-1">Подготовлено отделом маркетинга</p>
        </div>
      </footer>
    </div>
  );
}
