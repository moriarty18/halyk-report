import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell
} from 'recharts';
import { 
  Users, CheckCircle2, Target, 
  TrendingDown, MessageSquare, 
  LayoutDashboard, Facebook, Globe, Bell, Info, ImageIcon, BookOpen, Lightbulb
} from "lucide-react";

// Data for charts
const metaAdsComparison = [
  { name: 'До оптимизации', cpl: 7.92 },
  { name: 'Декабрь 2025', cpl: 0.87 },
];

const abTestData = [
  { name: 'Квиз-форма', conversion: 7.03, cpl: 3.37 },
  { name: 'Обычная форма', conversion: 1.71, cpl: 6.82 },
];

const channelData = [
  { name: 'Organic + Direct', leads: 853, approved: 125, rate: 14.6, comment: 'Включает 16 заявок, одобренных вручную (M3)' },
  { name: 'Push (OnlineBank)', leads: 132, approved: 1, rate: 0.8, comment: 'Новый канал, ожидаем статистику от банка' },
  { name: 'WABA', leads: 73, approved: 8, rate: 11.0, comment: 'Реактивация базы работает отлично' },
  { name: 'Kolesa.kz', leads: 817, approved: 16, rate: 2.0, comment: 'Стабильный источник объема' },
  { name: 'Google Ads', leads: 716, approved: 17, rate: 2.4, comment: 'Квиз повышает качество' },
  { name: 'Meta Ads', leads: 38, approved: 0, rate: 0.0, comment: 'Кампания только началась' },
  { name: 'OnlineBank', leads: 70, approved: 1, rate: 1.4, comment: 'Требует оптимизации' },
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
            <a href="#push" className="hover:text-foreground transition-colors">Push</a>
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
                <div className="text-3xl font-bold">169</div>
                <p className="text-xs text-muted-foreground mt-1">153 Авто + 16 Ручной скоринг (M3)</p>
                <div className="mt-2 text-[10px] bg-yellow-50 text-yellow-800 px-2 py-1 rounded border border-yellow-100">
                  M3 повысил одобрение на 9.5%
                </div>
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

        {/* Google Ads Section */}
        <section id="google" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Google Ads: A/B Тестирование</h2>
              <p className="text-muted-foreground">Сравнение эффективности Квиза и Обычной формы</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Конверсия в заявку (CR)</CardTitle>
                <CardDescription>Какой процент посетителей оставляет заявку</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={abTestData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Конверсия']} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="conversion" fill="var(--chart-2)" radius={[4, 4, 0, 0]} barSize={60}>
                      {
                        abTestData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--chart-2)' : '#94a3b8'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-900">Победа Квиза</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-700 mb-2">7.03%</div>
                  <p className="text-sm text-blue-600">Конверсия квиза в 4 раза выше, чем у обычной формы (1.71%)</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Стоимость заявки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">$3.37</div>
                    <div className="text-sm text-green-600">(-51%)</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Квиз дешевле формы ($6.82)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Push Notifications Section */}
        <section id="push" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Push-уведомления (OnlineBank)</h2>
              <p className="text-muted-foreground">Новый канал коммуникации через банковское приложение</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Результаты кампании</CardTitle>
                <CardDescription>Период: 1-26 декабря 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-sm text-muted-foreground mb-1">Привлечено лидов</div>
                    <div className="text-2xl font-bold text-slate-900">132</div>
                    <div className="text-xs text-slate-500 mt-1">UTM: onlinebank/bc</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-sm text-muted-foreground mb-1">Авто-одобрено</div>
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-xs text-slate-500 mt-1">Конверсия 0.8%</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-sm text-muted-foreground mb-1">Статус</div>
                    <div className="text-sm font-medium text-amber-600 mt-1">Ожидаем данные</div>
                    <div className="text-xs text-slate-500 mt-1">Запрос отправлен в банк</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                  <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">Важное примечание</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Мы запустили рассылку через приложение OnlineBank с 1 декабря. На данный момент мы видим только конечные лиды в нашей системе. 
                      Полная статистика по просмотрам и кликам запрошена у партнеров (Банк). Ожидаем ответное письмо для детального расчета воронки.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Креатив</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center bg-slate-50 min-h-[200px]">
                <img 
                  src="/images/image016.png" 
                  alt="Push Notification Creative" 
                  className="max-h-[250px] object-contain rounded-lg shadow-sm"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* WABA Section */}
        <section id="waba" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-700">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">WABA (WhatsApp Business API)</h2>
              <p className="text-muted-foreground">Реактивация "спящих" клиентов и отказников</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Воронка рассылки</CardTitle>
                <CardDescription>Конверсия на каждом этапе взаимодействия</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wabaFunnel} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" fill="var(--chart-3)" radius={[0, 4, 4, 0]} barSize={30}>
                      {
                        wabaFunnel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(142, 76%, ${40 + index * 10}%)`} />
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
                  <div className="text-sm text-muted-foreground mb-1">Доставляемость</div>
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-xs text-muted-foreground">1,100 сообщений</div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Открываемость</div>
                  <div className="text-2xl font-bold">83%</div>
                  <div className="text-xs text-muted-foreground">906 прочитано</div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">CTR (Клики)</div>
                  <div className="text-2xl font-bold">16%</div>
                  <div className="text-xs text-muted-foreground">179 переходов</div>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 border-green-100">
                  <div className="text-sm text-green-700 mb-1">Стоимость клика</div>
                  <div className="text-2xl font-bold text-green-700">$0.37</div>
                  <div className="text-xs text-green-600">Очень дешевый трафик</div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-sm">
                <p><strong>Инсайт:</strong> WhatsApp показывает феноменальную открываемость (83%). Это идеальный канал для работы с теми, кто уже знает о нас, но "заснул" или получил отказ ранее.</p>
              </div>
            </div>
          </div>
        </section>

        {/* All Channels Comparison */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Сводная таблица каналов</h2>
              <p className="text-muted-foreground">Сравнение эффективности всех источников трафика</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Канал</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Лиды</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Одобрено</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Конверсия (AR)</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Комментарий</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {channelData.map((channel, i) => (
                      <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle font-medium">{channel.name}</td>
                        <td className="p-4 align-middle text-right">{channel.leads}</td>
                        <td className="p-4 align-middle text-right font-bold text-green-600">{channel.approved}</td>
                        <td className="p-4 align-middle text-right">
                          <Badge variant={channel.rate > 5 ? "default" : "secondary"}>
                            {channel.rate}%
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-muted-foreground">{channel.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Creatives Section */}
        <section id="creatives" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Галерея креативов</h2>
              <p className="text-muted-foreground">Визуальные материалы рекламных кампаний</p>
            </div>
          </div>

          <Tabs defaultValue="main" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="main">Основные баннеры</TabsTrigger>
              <TabsTrigger value="previews">Предпросмотр в ленте (Ad Previews)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="main">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { src: "/images/IP_var1.jpg", title: "Вариант 1: Скорость" },
                  { src: "/images/IP_var1-1.jpg", title: "Вариант 2: Без бумаг" },
                  { src: "/images/IP_var1-2.jpg", title: "Вариант 3: Доставка" },
                  { src: "/images/pasted_file_JLG4L9_image.png", title: "WhatsApp Шаблон" }
                ].map((img, i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/5] relative bg-slate-100">
                      <img 
                        src={img.src} 
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-white border-t">
                      <p className="text-sm font-medium text-center text-slate-700">{img.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="previews">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { src: "/images/pasted_file_FtC3Et_image.png", title: "Лента Facebook & Instagram" },
                  { src: "/images/pasted_file_Z8TjN1_image.png", title: "Stories & Reels" },
                  { src: "/images/pasted_file_YX6L5A_image.png", title: "Audience Network" }
                ].map((img, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="bg-slate-100 p-2">
                      <img 
                        src={img.src} 
                        alt={img.title}
                        className="w-full h-auto rounded shadow-sm"
                      />
                    </div>
                    <div className="p-3 bg-white border-t">
                      <p className="text-sm font-medium text-center text-slate-700">{img.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="space-y-8 pb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Планы на Q1 2026</h2>
              <p className="text-muted-foreground">Стратегия масштабирования успеха</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base text-primary">Методика M3 (Ручной скоринг)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Методика M3 применяется ко всем каналам трафика для "спасения" сложных заявок, отклоненных автоматическим скорингом.
                  <br/><br/>
                  В декабре ручной анализ позволил одобрить дополнительно <strong>16 уникальных компаний</strong> (преимущественно из органического трафика), что увеличило общий объем продаж на 9.5%.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Масштабирование Квиза</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Учитывая успех квиза (+312% конверсии), мы планируем внедрить его во все рекламные каналы, включая Google Ads и таргетинг в TikTok, а также протестировать новые сценарии вопросов для сегментации клиентов.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Автоматизация WABA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Планируем настроить триггерные рассылки в WhatsApp: автоматическое сообщение при незавершенной заявке или отказе, чтобы возвращать клиентов в воронку без участия менеджера.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
    </div>
  );
}
