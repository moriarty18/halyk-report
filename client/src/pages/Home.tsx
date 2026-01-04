import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  Users, CheckCircle2, Target, 
  TrendingDown, MessageSquare, 
  LayoutDashboard, Facebook, Globe, Bell, Info, ImageIcon, BookOpen, Lightbulb,
  FileSignature, CalendarClock, Zap
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

// Updated Channel Data with Signed stage
const channelData = [
  { name: 'Organic + Direct', leads: 853, signed: 467, approved: 125, rate: 14.6, comment: 'Включает 16 заявок, одобренных вручную (M3)' },
  { name: 'Push (OnlineBank)', leads: 132, signed: 72, approved: 1, rate: 0.8, comment: 'Новый канал, ожидаем статистику от банка' },
  { name: 'WABA', leads: 73, signed: 40, approved: 8, rate: 11.0, comment: 'Реактивация базы работает отлично' },
  { name: 'Kolesa.kz', leads: 817, signed: 447, approved: 16, rate: 2.0, comment: 'Стабильный источник объема' },
  { name: 'Google Ads', leads: 716, signed: 392, approved: 17, rate: 2.4, comment: 'Квиз повышает качество' },
  { name: 'Meta Ads', leads: 38, signed: 21, approved: 0, rate: 0.0, comment: 'Кампания только началась' },
  { name: 'OnlineBank', leads: 70, signed: 38, approved: 1, rate: 1.4, comment: 'Требует оптимизации' },
];

// Historical Data (MoM) from Excel
const historicalData = [
  { name: 'Октябрь', leads: 1944, label: '1944' },
  { name: 'Ноябрь', leads: 673, label: '673 (1-14 нояб.)' },
  { name: 'Декабрь', leads: 2575, label: '2575' },
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
            <a href="#history" className="hover:text-foreground transition-colors">Динамика</a>
            <a href="#channels" className="hover:text-foreground transition-colors">Каналы</a>
            <a href="#meta" className="hover:text-foreground transition-colors">Meta Ads</a>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
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
                <CardTitle className="text-sm font-medium">Подписано согласий</CardTitle>
                <FileSignature className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1 410</div>
                <p className="text-xs text-muted-foreground mt-1">55% конверсия из заявки</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Одобрено заявок</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">169</div>
                <p className="text-xs text-muted-foreground mt-1">12% от подписанных</p>
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

        {/* Historical Data Section (New) */}
        <section id="history" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
              <CalendarClock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Динамика (MoM)</h2>
              <p className="text-muted-foreground">Сравнение показателей за последние 3 месяца</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Рост количества лидов и одобрений</CardTitle>
              <CardDescription>Динамика Октябрь - Декабрь 2025</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="leads" name="Лиды" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Channel Comparison Table (Updated) */}
        <section id="channels" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Сводная таблица по каналам</h2>
              <p className="text-muted-foreground">Детальная воронка: Лид → Подписание → Одобрение</p>
            </div>
          </div>

          <Card>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Канал</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Лиды</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground bg-slate-50">Подписано</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground bg-slate-50">Conv. to Sign</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Одобрено</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Approval Rate</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Комментарий</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {channelData.map((row, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">{row.name}</td>
                      <td className="p-4 align-middle text-right">{row.leads}</td>
                      <td className="p-4 align-middle text-right bg-slate-50">{row.signed}</td>
                      <td className="p-4 align-middle text-right bg-slate-50 text-slate-600">
                        {Math.round((row.signed / row.leads) * 100)}%
                      </td>
                      <td className="p-4 align-middle text-right font-bold text-green-700">{row.approved}</td>
                      <td className="p-4 align-middle text-right">
                        <Badge variant={row.rate > 5 ? "default" : "secondary"} className={row.rate > 5 ? "bg-green-600 hover:bg-green-700" : ""}>
                          {row.rate}%
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-muted-foreground text-xs max-w-[200px]">{row.comment}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/50 font-bold">
                    <td className="p-4 align-middle">ИТОГО</td>
                    <td className="p-4 align-middle text-right">2 575</td>
                    <td className="p-4 align-middle text-right">1 410</td>
                    <td className="p-4 align-middle text-right">55%</td>
                    <td className="p-4 align-middle text-right text-green-700">169</td>
                    <td className="p-4 align-middle text-right">6.6%</td>
                    <td className="p-4 align-middle"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
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
                <p className="font-medium mb-2">💡 Инсайт:</p>
                <p className="text-muted-foreground">
                  Запуск кампании на узнаваемость (Awareness) перед лидогенерацией позволил "прогреть" аудиторию. 
                  В результате, когда мы запустили сбор заявок, пользователи уже знали бренд, что снизило стоимость целевого действия.
                </p>
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
              <p className="text-muted-foreground">Сравнение эффективности Квиза и Стандартной формы</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Конверсия в заявку (CR)</CardTitle>
                <CardDescription>Квиз показал рост конверсии в 4 раза</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={abTestData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Конверсия']} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="conversion" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60}>
                       <Cell fill="#3b82f6" />
                       <Cell fill="#94a3b8" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Стоимость заявки (CPA)</CardTitle>
                <CardDescription>Квиз снизил стоимость привлечения в 2 раза</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={abTestData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Стоимость']} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="cpl" fill="#10b981" radius={[4, 4, 0, 0]} barSize={60}>
                       <Cell fill="#10b981" />
                       <Cell fill="#94a3b8" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Push & WABA Section */}
        <section id="push" className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Push-кампания</h2>
                <p className="text-muted-foreground">OnlineBank (1 декабря)</p>
              </div>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-1/3">
                    <div className="aspect-[9/16] bg-slate-100 rounded-lg border flex items-center justify-center relative overflow-hidden">
                      <img src="/images/pasted_file_rsXuEg_image.png" alt="Push Preview" className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="w-2/3 space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Результат</div>
                      <div className="text-3xl font-bold">132 Лида</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Статус</div>
                      <div className="text-sm font-medium">Ожидаем данные по просмотрам и кликам от банка.</div>
                    </div>
                    <div className="p-3 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-100">
                      Кампания вела на Маркетплейс, так как Квиз еще не был запущен.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="waba" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">WABA (WhatsApp)</h2>
                <p className="text-muted-foreground">Реактивация отказников</p>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Отправлено</span>
                    <span className="font-bold">1 100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-300 h-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Прочитано (OR 82%)</span>
                    <span className="font-bold">906</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-300 h-full" style={{ width: '82%' }}></div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Кликнули (CTR 16%)</span>
                    <span className="font-bold">179</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: '16%' }}></div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Заявки (CR 40%)</span>
                    <span className="font-bold">73</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full" style={{ width: '6.6%' }}></div>
                  </div>
                  
                  <div className="pt-2 flex justify-between items-center">
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                      8 Одобрено
                    </Badge>
                    <span className="text-xs text-muted-foreground">Стоимость клика: $0.30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Creatives Gallery */}
        <section id="creatives" className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Галерея креативов</h2>
              <p className="text-muted-foreground">Примеры рекламных материалов</p>
            </div>
          </div>

          <Tabs defaultValue="ads" className="w-full">
            <TabsList>
              <TabsTrigger value="ads">Рекламные макеты</TabsTrigger>
              <TabsTrigger value="previews">Предпросмотр в ленте</TabsTrigger>
            </TabsList>
            <TabsContent value="ads" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { src: "/images/IP_var1.jpg", title: "Вариант 1: Общий" },
                  { src: "/images/IP_var1-1.jpg", title: "Вариант 2: Акцент на выгоду" },
                  { src: "/images/IP_var1-2.jpg", title: "Вариант 3: Для ИП" }
                ].map((img, i) => (
                  <Card key={i} className="overflow-hidden group cursor-pointer">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={img.src} 
                        alt={img.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-center">{img.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="previews" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { src: "/images/image016.png", title: "Instagram Feed" },
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

        {/* Roadmap Section (Updated) */}
        <section id="roadmap" className="space-y-8 pb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Планы на Январь 2026</h2>
              <p className="text-muted-foreground">Стратегия масштабирования и автоматизации</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base text-primary flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Автоматизация
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Старт 5 января:</strong> Разработка микросервиса для обновления воронки в реальном времени на внутренней платформе. Интеграция данных без внешних API (MVP).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Масштабирование
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Внедрение успешного <strong>Квиза</strong> во все каналы трафика. Тестирование новых каналов: запуск пилотной кампании в <strong>TikTok</strong> (бюджет ~$200).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Retention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Запуск регулярной сегментированной рассылки <strong>WhatsApp Business</strong> (раз в месяц) для реактивации базы отказников и "думающих" клиентов.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Экосистема & Партнеры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Интеграция маркетплейса в <strong>OnlineBank</strong>. Расширение партнерства с <strong>Allur</strong> и <strong>Kolesa.kz</strong>. Запуск мобильного приложения для физлиц.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
    </div>
  );
}
