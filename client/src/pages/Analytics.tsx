import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, ComposedChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Database, AlertTriangle, 
  Calendar, DollarSign, Users, CheckCircle2, FileSignature,
  Info, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ ИЗ CRM (ОБНОВЛЕНО 9 ЯНВАРЯ 2026)
// =============================================
const crmMonthlyData = [
  { 
    month: 'Октябрь', 
    month_en: 'October',
    total_leads: 2033, 
    consents: 736, 
    approved: 123,
    consent_rate: 36.2,
    approval_rate: 16.7  // от согласий
  },
  { 
    month: 'Ноябрь', 
    month_en: 'November',
    total_leads: 1841, 
    consents: 633, 
    approved: 184,
    consent_rate: 34.4,
    approval_rate: 29.1  // от согласий
  },
  { 
    month: 'Декабрь', 
    month_en: 'December',
    total_leads: 3146, 
    consents: 709, 
    approved: 191,
    consent_rate: 22.5,
    approval_rate: 26.9  // от согласий
  },
  { 
    month: 'Январь*', 
    month_en: 'January',
    total_leads: 1384, 
    consents: 221, 
    approved: 48,
    consent_rate: 16.0,
    approval_rate: 21.7,  // от согласий
    note: 'Данные до 9 января 2026'
  },
];

// =============================================
// ДАННЫЕ ПО ИСТОЧНИКАМ ИЗ CRM (ОБНОВЛЕНО)
// =============================================
const crmBySource = {
  'Октябрь': [
    { source: 'Meta', leads: 219, consents: 79, approved: 9, consent_rate: 36.1, approval_rate: 11.4 },
    { source: 'Google', leads: 99, consents: 37, approved: 6, consent_rate: 37.4, approval_rate: 16.2 },
    { source: 'Kolesa', leads: 1037, consents: 215, approved: 16, consent_rate: 20.7, approval_rate: 7.4 },
    { source: 'Direct/Organic', leads: 632, consents: 401, approved: 91, consent_rate: 63.4, approval_rate: 22.7 },
  ],
  'Ноябрь': [
    { source: 'Meta', leads: 0, consents: 0, approved: 0, consent_rate: 0, approval_rate: 0, note: 'Кампания приостановлена' },
    { source: 'Google', leads: 134, consents: 48, approved: 14, consent_rate: 35.8, approval_rate: 29.2 },
    { source: 'Kolesa', leads: 989, consents: 169, approved: 21, consent_rate: 17.1, approval_rate: 12.4 },
    { source: 'Direct/Organic', leads: 704, consents: 408, approved: 146, consent_rate: 57.9, approval_rate: 35.8 },
  ],
  'Декабрь': [
    { source: 'Meta', leads: 213, consents: 30, approved: 6, consent_rate: 14.1, approval_rate: 20.0 },
    { source: 'Google', leads: 787, consents: 92, approved: 19, consent_rate: 11.7, approval_rate: 20.7 },
    { source: 'Kolesa', leads: 858, consents: 136, approved: 17, consent_rate: 15.9, approval_rate: 12.5 },
    { source: 'Direct/Organic', leads: 1132, consents: 392, approved: 137, consent_rate: 34.6, approval_rate: 35.0 },
    { source: 'WhatsApp', leads: 73, consents: 37, approved: 8, consent_rate: 50.7, approval_rate: 21.6 },
    { source: 'OnlineBank', leads: 71, consents: 18, approved: 1, consent_rate: 25.4, approval_rate: 5.6 },
  ],
  'Январь*': [
    { source: 'Meta', leads: 428, consents: 46, approved: 8, consent_rate: 10.7, approval_rate: 17.4 },
    { source: 'Google', leads: 217, consents: 30, approved: 8, consent_rate: 13.8, approval_rate: 26.7 },
    { source: 'Kolesa', leads: 50, consents: 12, approved: 0, consent_rate: 24.0, approval_rate: 0 },
    { source: 'Direct/Organic', leads: 674, consents: 126, approved: 31, consent_rate: 18.7, approval_rate: 24.6 },
  ],
};

// =============================================
// ДАННЫЕ ИЗ РЕКЛАМНЫХ КАБИНЕТОВ (ОБНОВЛЕНО)
// =============================================
const adsData = {
  'Октябрь': {
    google: { cost: 1413.10, conversions: 140, cpl: 10.09 },
    meta: { cost: 1368.10, leads: 383, cpl: 3.57, campaign: 'Halyk Leasing Leadgen october' },
    total_spend: 2781.20
  },
  'Ноябрь': {
    google: { cost: 1096.27, conversions: 190, cpl: 5.78 },
    meta: { cost: 2.77, leads: 10, cpl: 0.28, campaign: 'Leadgen (приостановлено)' },
    total_spend: 1099.04,
    note: 'Meta Leadgen приостановлен, фокус на охват и узнаваемость'
  },
  'Декабрь': {
    google: { cost: 2843.14, conversions: 790, cpl: 3.60 },
    meta: { cost: 185.21, leads: 208, cpl: 0.89, campaign: 'IP promo - images' },
    total_spend: 3028.35,
    awareness: { cost: 686.13, reach: 493270, impressions: 2231384 }
  },
  'Январь*': {
    google: { cost: 850.42, conversions: 196, cpl: 4.33 },
    meta: { cost: 207.01, leads: 399, cpl: 0.52, campaign: 'IP promo - images' },
    total_spend: 1057.43
  },
};

// =============================================
// РАСЧЕТ РЕАЛЬНОГО CPL (CRM лиды / Расходы)
// =============================================
const realCplData = [
  { 
    month: 'Октябрь',
    google_crm_leads: 99,
    google_cost: 1413.10,
    google_real_cpl: 14.27,
    meta_crm_leads: 219,
    meta_cost: 1368.10,
    meta_real_cpl: 6.25,
    total_paid_leads: 318,
    total_cost: 2781.20,
    total_real_cpl: 8.75
  },
  { 
    month: 'Ноябрь',
    google_crm_leads: 134,
    google_cost: 1096.27,
    google_real_cpl: 8.18,
    meta_crm_leads: 0,
    meta_cost: 2.77,
    meta_real_cpl: 0,
    total_paid_leads: 134,
    total_cost: 1099.04,
    total_real_cpl: 8.20,
    note: 'Meta приостановлен'
  },
  { 
    month: 'Декабрь',
    google_crm_leads: 787,
    google_cost: 2843.14,
    google_real_cpl: 3.61,
    meta_crm_leads: 213,
    meta_cost: 185.21,
    meta_real_cpl: 0.87,
    total_paid_leads: 1000,
    total_cost: 3028.35,
    total_real_cpl: 3.03
  },
  { 
    month: 'Январь*',
    google_crm_leads: 217,
    google_cost: 850.42,
    google_real_cpl: 3.92,
    meta_crm_leads: 428,
    meta_cost: 207.01,
    meta_real_cpl: 0.48,
    total_paid_leads: 645,
    total_cost: 1057.43,
    total_real_cpl: 1.64
  },
];

// Данные для трендового графика
const trendData = crmMonthlyData.map(item => ({
  name: item.month,
  'Лиды': item.total_leads,
  'Согласия': item.consents,
  'Одобрено': item.approved,
}));

// Данные для графика CPL
const cplTrendData = realCplData.map(item => ({
  name: item.month,
  'Google CPL': item.google_real_cpl,
  'Meta CPL': item.meta_real_cpl || null,
  'Общий CPL': item.total_real_cpl,
}));

// Расчет MoM изменений
const calculateMoM = (current: number, previous: number) => {
  if (previous === 0) return null;
  return ((current - previous) / previous * 100).toFixed(1);
};

// Итоговые суммы
const totalLeads = crmMonthlyData.reduce((sum, m) => sum + m.total_leads, 0);
const totalConsents = crmMonthlyData.reduce((sum, m) => sum + m.consents, 0);
const totalApproved = crmMonthlyData.reduce((sum, m) => sum + m.approved, 0);
const totalSpend = Object.values(adsData).reduce((sum, m) => sum + m.total_spend, 0);

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">H</div>
                <span className="font-bold text-lg tracking-tight">Halyk Leasing</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Отчет</Link>
            <span className="text-foreground">Аналитика (Дек)</span>
            <Link href="/analytics-january" className="hover:text-foreground transition-colors">Аналитика (Янв)</Link>
            <Link href="/analytics-february" className="hover:text-foreground transition-colors">Аналитика (Фев)</Link>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            Октябрь 2025 — Январь 2026
          </div>
        </div>
      </header>

      <main className="container py-10 space-y-12">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">CRM Analytics</h1>
              <p className="text-muted-foreground">Детальный анализ воронки продаж за 4 месяца</p>
            </div>
          </div>
          
          {/* Month Tabs */}
          <div className="flex gap-2">
            <Badge className="px-4 py-2 text-sm">
              Декабрь 2025
            </Badge>
            <Link href="/analytics-january">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted px-4 py-2 text-sm">
                Январь 2026
              </Badge>
            </Link>
          </div>
          
          {/* Info Banner */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-amber-800">Важные примечания к данным</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• <strong>Январь*</strong> — данные за период 1-9 января 2026 (неполный месяц)</li>
                  <li>• <strong>Конверсия в одобрение</strong> считается от количества подписанных согласий</li>
                  <li>• <strong>Ноябрь:</strong> Meta Leadgen был приостановлен, фокус на охватные кампании</li>
                  <li>• <strong>Декабрь-Январь:</strong> Запущена кампания IP promo с низким CPL ($0.48-$0.89)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Summary Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Сводные показатели за 4 месяца</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего лидов</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Октябрь — Январь</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Подписано согласий</CardTitle>
                <FileSignature className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalConsents.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalConsents / totalLeads) * 100).toFixed(1)}% от всех лидов
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Одобрено</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalApproved}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalApproved / totalConsents) * 100).toFixed(1)}% от согласий
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Общие расходы</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta Ads</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Trend Chart */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Трендовый график</h2>
              <p className="text-muted-foreground">Динамика воронки по месяцам</p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Лиды → Согласия → Одобрения</CardTitle>
              <CardDescription>Октябрь 2025 — Январь 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="Лиды" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="Согласия" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="Одобрено" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Detailed Tables */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Детализация по месяцам</h2>
              <p className="text-muted-foreground">CRM данные + Рекламные расходы</p>
            </div>
          </div>
          
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Сводная таблица</TabsTrigger>
              <TabsTrigger value="sources">По источникам</TabsTrigger>
              <TabsTrigger value="cpl">CPL анализ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Сводная таблица по месяцам</CardTitle>
                  <CardDescription>Все ключевые метрики в одном месте</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Месяц</th>
                          <th className="text-right py-3 px-4 font-semibold">Лиды</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR Согласий</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR Одобрения</th>
                          <th className="text-right py-3 px-4 font-semibold">Расходы</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crmMonthlyData.map((item, index) => (
                          <tr key={item.month} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {item.month}
                                {item.note && (
                                  <Badge variant="outline" className="text-xs">
                                    {item.note}
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{item.total_leads.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono">{item.consents.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono">{item.consent_rate}%</td>
                            <td className="text-right py-3 px-4 font-mono">{item.approved}</td>
                            <td className="text-right py-3 px-4 font-mono">{item.approval_rate}%</td>
                            <td className="text-right py-3 px-4 font-mono">
                              ${adsData[item.month as keyof typeof adsData]?.total_spend.toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-muted/30 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">{totalLeads.toLocaleString()}</td>
                          <td className="text-right py-3 px-4 font-mono">{totalConsents.toLocaleString()}</td>
                          <td className="text-right py-3 px-4 font-mono">{((totalConsents / totalLeads) * 100).toFixed(1)}%</td>
                          <td className="text-right py-3 px-4 font-mono">{totalApproved}</td>
                          <td className="text-right py-3 px-4 font-mono">{((totalApproved / totalConsents) * 100).toFixed(1)}%</td>
                          <td className="text-right py-3 px-4 font-mono">${totalSpend.toLocaleString(undefined, {minimumFractionDigits: 0})}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* MoM Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Сравнение MoM (месяц к месяцу)</CardTitle>
                  <CardDescription>Процентное изменение ключевых показателей</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Период</th>
                          <th className="text-right py-3 px-4 font-semibold">Δ Лиды</th>
                          <th className="text-right py-3 px-4 font-semibold">Δ Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">Δ Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">Δ Расходы</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">Окт → Ноя</td>
                          <td className="text-right py-3 px-4">
                            <Badge variant={Number(calculateMoM(1841, 2033)) < 0 ? "destructive" : "default"}>
                              {calculateMoM(1841, 2033)}%
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge variant={Number(calculateMoM(633, 736)) < 0 ? "destructive" : "default"}>
                              {calculateMoM(633, 736)}%
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge variant="default">
                              +{calculateMoM(184, 123)}%
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge variant="destructive">
                              {calculateMoM(1099.04, 2781.20)}%
                            </Badge>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">Ноя → Дек</td>
                          <td className="text-right py-3 px-4">
                            <Badge variant="default">
                              +{calculateMoM(3146, 1841)}%
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge variant="default">
                              +{calculateMoM(709, 633)}%
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge variant="default">
                              +{calculateMoM(191, 184)}%
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge variant="default">
                              +{calculateMoM(3028.35, 1099.04)}%
                            </Badge>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              Дек → Янв*
                              <Badge variant="outline" className="text-xs">неполный месяц</Badge>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4 text-muted-foreground">—</td>
                          <td className="text-right py-3 px-4 text-muted-foreground">—</td>
                          <td className="text-right py-3 px-4 text-muted-foreground">—</td>
                          <td className="text-right py-3 px-4 text-muted-foreground">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sources" className="space-y-4">
              {Object.entries(crmBySource).map(([month, sources]) => (
                <Card key={month}>
                  <CardHeader>
                    <CardTitle>{month}</CardTitle>
                    <CardDescription>Разбивка по источникам трафика</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Источник</th>
                            <th className="text-right py-3 px-4 font-semibold">Лиды</th>
                            <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                            <th className="text-right py-3 px-4 font-semibold">CR Согласий</th>
                            <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                            <th className="text-right py-3 px-4 font-semibold">CR Одобрения</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sources.map((source) => (
                            <tr key={source.source} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  {source.source}
                                  {source.note && (
                                    <Badge variant="outline" className="text-xs">{source.note}</Badge>
                                  )}
                                </div>
                              </td>
                              <td className="text-right py-3 px-4 font-mono">{source.leads.toLocaleString()}</td>
                              <td className="text-right py-3 px-4 font-mono">{source.consents.toLocaleString()}</td>
                              <td className="text-right py-3 px-4 font-mono">{source.consent_rate}%</td>
                              <td className="text-right py-3 px-4 font-mono">{source.approved}</td>
                              <td className="text-right py-3 px-4 font-mono">{source.approval_rate}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="cpl" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Реальный CPL (Cost Per Lead)</CardTitle>
                  <CardDescription>Расходы из рекламных кабинетов / Лиды из CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Месяц</th>
                          <th className="text-right py-3 px-4 font-semibold">Google Лиды</th>
                          <th className="text-right py-3 px-4 font-semibold">Google CPL</th>
                          <th className="text-right py-3 px-4 font-semibold">Meta Лиды</th>
                          <th className="text-right py-3 px-4 font-semibold">Meta CPL</th>
                          <th className="text-right py-3 px-4 font-semibold">Общий CPL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {realCplData.map((item) => (
                          <tr key={item.month} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {item.month}
                                {item.note && (
                                  <Badge variant="outline" className="text-xs">{item.note}</Badge>
                                )}
                              </div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{item.google_crm_leads}</td>
                            <td className="text-right py-3 px-4 font-mono">${item.google_real_cpl.toFixed(2)}</td>
                            <td className="text-right py-3 px-4 font-mono">{item.meta_crm_leads}</td>
                            <td className="text-right py-3 px-4 font-mono">
                              {item.meta_real_cpl > 0 ? `$${item.meta_real_cpl.toFixed(2)}` : '—'}
                            </td>
                            <td className="text-right py-3 px-4 font-mono font-semibold">${item.total_real_cpl.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* CPL Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Динамика CPL</CardTitle>
                  <CardDescription>Изменение стоимости лида по месяцам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cplTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, '']} />
                        <Legend />
                        <Line type="monotone" dataKey="Google CPL" stroke="#4285f4" strokeWidth={2} dot={{ fill: '#4285f4' }} />
                        <Line type="monotone" dataKey="Meta CPL" stroke="#0668E1" strokeWidth={2} dot={{ fill: '#0668E1' }} connectNulls={false} />
                        <Line type="monotone" dataKey="Общий CPL" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Meta AWARENESS Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Meta AWARENESS кампании</h2>
              <p className="text-muted-foreground">Охватные кампании (не включены в расчет CPL)</p>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Расходы</p>
                  <p className="text-3xl font-bold">$686.13</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Охват</p>
                  <p className="text-3xl font-bold">493,270</p>
                  <p className="text-xs text-muted-foreground">уникальных пользователей</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Показы</p>
                  <p className="text-3xl font-bold">2,231,384</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Кампания "Halyk Leasing AWARENESS december" — декабрь 2025
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <p className="text-sm text-muted-foreground">
            Данные обновлены на основе выгрузки CRM и рекламных кабинетов Google/Meta (9 января 2026).
          </p>
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-primary hover:underline flex items-center gap-1">
              Вернуться к отчету
            </Link>
            <Link href="/roadmap" className="text-sm text-primary hover:underline flex items-center gap-1">
              Планы (Roadmap)
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
