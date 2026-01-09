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
// ДАННЫЕ ИЗ CRM (ФАКТ)
// =============================================
const crmMonthlyData = [
  { 
    month: 'Октябрь', 
    month_en: 'October',
    total_leads: 2033, 
    consents: 1883, 
    approved: 138,
    consent_rate: 92.6,
    approval_rate: 6.8
  },
  { 
    month: 'Ноябрь', 
    month_en: 'November',
    total_leads: 1841, 
    consents: 1660, 
    approved: 184,
    consent_rate: 90.2,
    approval_rate: 10.0
  },
  { 
    month: 'Декабрь', 
    month_en: 'December',
    total_leads: 3146, 
    consents: 2319, 
    approved: 191,
    consent_rate: 73.7,
    approval_rate: 6.1
  },
  { 
    month: 'Январь*', 
    month_en: 'January',
    total_leads: 1342, 
    consents: 555, 
    approved: 46,
    consent_rate: 41.4,
    approval_rate: 3.4,
    note: 'Данные до 9 января 2026'
  },
];

// =============================================
// ДАННЫЕ ПО ИСТОЧНИКАМ ИЗ CRM
// =============================================
const crmBySource = {
  'Октябрь': [
    { source: 'Meta', leads: 219, consents: 193, approved: 9, consent_rate: 88.1, approval_rate: 4.1 },
    { source: 'Google', leads: 99, consents: 90, approved: 6, consent_rate: 90.9, approval_rate: 6.1 },
    { source: 'Kolesa', leads: 1037, consents: 956, approved: 16, consent_rate: 92.2, approval_rate: 1.5 },
    { source: 'Direct/Organic', leads: 663, consents: 631, approved: 106, consent_rate: 95.2, approval_rate: 16.0 },
  ],
  'Ноябрь': [
    { source: 'Meta', leads: 0, consents: 0, approved: 0, consent_rate: 0, approval_rate: 0, note: 'Кампания приостановлена' },
    { source: 'Google', leads: 134, consents: 123, approved: 14, consent_rate: 91.8, approval_rate: 10.4 },
    { source: 'Kolesa', leads: 989, consents: 869, approved: 21, consent_rate: 87.9, approval_rate: 2.1 },
    { source: 'Direct/Organic', leads: 704, consents: 654, approved: 146, consent_rate: 92.9, approval_rate: 20.7 },
  ],
  'Декабрь': [
    { source: 'Meta', leads: 213, consents: 109, approved: 6, consent_rate: 51.2, approval_rate: 2.8 },
    { source: 'Google', leads: 787, consents: 575, approved: 19, consent_rate: 73.1, approval_rate: 2.4 },
    { source: 'Kolesa', leads: 857, consents: 582, approved: 17, consent_rate: 67.9, approval_rate: 2.0 },
    { source: 'Direct/Organic', leads: 1132, consents: 923, approved: 137, consent_rate: 81.5, approval_rate: 12.1 },
  ],
  'Январь*': [
    { source: 'Meta', leads: 424, consents: 109, approved: 8, consent_rate: 25.7, approval_rate: 1.9 },
    { source: 'Google', leads: 196, consents: 90, approved: 7, consent_rate: 45.9, approval_rate: 3.6 },
    { source: 'Kolesa', leads: 50, consents: 19, approved: 0, consent_rate: 38.0, approval_rate: 0 },
    { source: 'Direct/Organic', leads: 657, consents: 325, approved: 30, consent_rate: 49.5, approval_rate: 4.6 },
  ],
};

// =============================================
// ДАННЫЕ ИЗ РЕКЛАМНЫХ КАБИНЕТОВ
// =============================================
const adsData = {
  'Октябрь': {
    google: { cost: 1413.10, conversions: 140, cpl: 10.09 },
    meta: { cost: 1368.10, leads: 383, cpl: 3.57, campaign: 'Halyk Leasing Leadgen october' },
    total_spend: 2781.20
  },
  'Ноябрь': {
    google: { cost: 1096.27, conversions: 189, cpl: 5.81 },
    meta: { cost: 2.77, leads: 10, cpl: 0.28, campaign: 'Leadgen (приостановлено)' },
    total_spend: 1099.04,
    note: 'Meta Leadgen приостановлен, фокус на охват и узнаваемость'
  },
  'Декабрь': {
    google: { cost: 2980.29, conversions: 816, cpl: 3.65 },
    meta: { cost: 185.21, leads: 208, cpl: 0.89, campaign: 'IP promo - images' },
    total_spend: 3165.50,
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
    google_cost: 2980.29,
    google_real_cpl: 3.79,
    meta_crm_leads: 213,
    meta_cost: 185.21,
    meta_real_cpl: 0.87,
    total_paid_leads: 1000,
    total_cost: 3165.50,
    total_real_cpl: 3.17
  },
  { 
    month: 'Январь*',
    google_crm_leads: 196,
    google_cost: 850.42,
    google_real_cpl: 4.34,
    meta_crm_leads: 424,
    meta_cost: 207.01,
    meta_real_cpl: 0.49,
    total_paid_leads: 620,
    total_cost: 1057.43,
    total_real_cpl: 1.71
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
            <span className="text-foreground">CRM Analytics</span>
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
          
          {/* Info Banner */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-amber-800">Важные примечания к данным</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• <strong>Январь*</strong> — данные за период 1-9 января 2026 (неполный месяц)</li>
                  <li>• <strong>Расхождение UTM-меток:</strong> В октябре-ноябре наблюдалось расхождение между конверсиями в рекламных кабинетах и лидами в CRM. Проблема исправлена в декабре.</li>
                  <li>• <strong>Ноябрь:</strong> Meta Leadgen был приостановлен, фокус на охватные кампании для повышения узнаваемости бренда</li>
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
                <div className="text-3xl font-bold">8,362</div>
                <p className="text-xs text-muted-foreground mt-1">Октябрь — Январь</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Подписано согласий</CardTitle>
                <FileSignature className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6,417</div>
                <p className="text-xs text-muted-foreground mt-1">76.7% от всех лидов</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Одобрено</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">559</div>
                <p className="text-xs text-muted-foreground mt-1">8.7% от подписанных</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Общие расходы</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$8,103</div>
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
              <TrendingUp className="h-6 w-6" />
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
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Лиды" fill="#3b82f6" name="Лиды" />
                  <Bar yAxisId="left" dataKey="Согласия" fill="#10b981" name="Согласия" />
                  <Line yAxisId="right" type="monotone" dataKey="Одобрено" stroke="#f59e0b" strokeWidth={3} name="Одобрено" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Monthly Tables */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <Calendar className="h-6 w-6" />
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
            
            {/* Summary Table */}
            <TabsContent value="summary" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Сводная таблица по месяцам</CardTitle>
                  <CardDescription>Все ключевые метрики в одном месте</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b bg-muted/50">
                          <th className="h-12 px-4 text-left font-medium">Месяц</th>
                          <th className="h-12 px-4 text-right font-medium">Лиды</th>
                          <th className="h-12 px-4 text-right font-medium">Согласия</th>
                          <th className="h-12 px-4 text-right font-medium">CR Согласий</th>
                          <th className="h-12 px-4 text-right font-medium">Одобрено</th>
                          <th className="h-12 px-4 text-right font-medium">CR Одобрения</th>
                          <th className="h-12 px-4 text-right font-medium">Расходы</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crmMonthlyData.map((row, idx) => (
                          <tr key={row.month} className="border-b hover:bg-muted/50">
                            <td className="h-12 px-4 font-medium">
                              {row.month}
                              {row.note && <span className="text-xs text-muted-foreground block">{row.note}</span>}
                            </td>
                            <td className="h-12 px-4 text-right font-semibold">{row.total_leads.toLocaleString()}</td>
                            <td className="h-12 px-4 text-right">{row.consents.toLocaleString()}</td>
                            <td className="h-12 px-4 text-right">
                              <span className={row.consent_rate < 50 ? 'text-red-600' : row.consent_rate > 80 ? 'text-green-600' : ''}>
                                {row.consent_rate}%
                              </span>
                            </td>
                            <td className="h-12 px-4 text-right font-semibold">{row.approved}</td>
                            <td className="h-12 px-4 text-right">
                              <span className={row.approval_rate < 5 ? 'text-red-600' : row.approval_rate > 8 ? 'text-green-600' : ''}>
                                {row.approval_rate}%
                              </span>
                            </td>
                            <td className="h-12 px-4 text-right">
                              ${Object.values(adsData)[idx].total_spend.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-muted/30 font-bold">
                          <td className="h-12 px-4">ИТОГО</td>
                          <td className="h-12 px-4 text-right">8,362</td>
                          <td className="h-12 px-4 text-right">6,417</td>
                          <td className="h-12 px-4 text-right">76.7%</td>
                          <td className="h-12 px-4 text-right">559</td>
                          <td className="h-12 px-4 text-right">8.7%</td>
                          <td className="h-12 px-4 text-right">$8,103</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* MoM Comparison */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Сравнение MoM (месяц к месяцу)</CardTitle>
                  <CardDescription>Процентное изменение ключевых показателей</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b bg-muted/50">
                          <th className="h-12 px-4 text-left font-medium">Период</th>
                          <th className="h-12 px-4 text-right font-medium">Δ Лиды</th>
                          <th className="h-12 px-4 text-right font-medium">Δ Согласия</th>
                          <th className="h-12 px-4 text-right font-medium">Δ Одобрено</th>
                          <th className="h-12 px-4 text-right font-medium">Δ Расходы</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="h-12 px-4 font-medium">Окт → Ноя</td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-red-600 flex items-center justify-end gap-1">
                              <ArrowDownRight className="h-4 w-4" />-9.4%
                            </span>
                          </td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-red-600 flex items-center justify-end gap-1">
                              <ArrowDownRight className="h-4 w-4" />-11.8%
                            </span>
                          </td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-green-600 flex items-center justify-end gap-1">
                              <ArrowUpRight className="h-4 w-4" />+33.3%
                            </span>
                          </td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-green-600 flex items-center justify-end gap-1">
                              <ArrowDownRight className="h-4 w-4" />-60.5%
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="h-12 px-4 font-medium">Ноя → Дек</td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-green-600 flex items-center justify-end gap-1">
                              <ArrowUpRight className="h-4 w-4" />+70.9%
                            </span>
                          </td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-green-600 flex items-center justify-end gap-1">
                              <ArrowUpRight className="h-4 w-4" />+39.7%
                            </span>
                          </td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-green-600 flex items-center justify-end gap-1">
                              <ArrowUpRight className="h-4 w-4" />+3.8%
                            </span>
                          </td>
                          <td className="h-12 px-4 text-right">
                            <span className="text-red-600 flex items-center justify-end gap-1">
                              <ArrowUpRight className="h-4 w-4" />+188.0%
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50 bg-amber-50">
                          <td className="h-12 px-4 font-medium">
                            Дек → Янв*
                            <span className="text-xs text-muted-foreground block">неполный месяц</span>
                          </td>
                          <td className="h-12 px-4 text-right text-muted-foreground">—</td>
                          <td className="h-12 px-4 text-right text-muted-foreground">—</td>
                          <td className="h-12 px-4 text-right text-muted-foreground">—</td>
                          <td className="h-12 px-4 text-right text-muted-foreground">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sources Table */}
            <TabsContent value="sources" className="mt-6 space-y-6">
              {Object.entries(crmBySource).map(([month, sources]) => (
                <Card key={month}>
                  <CardHeader>
                    <CardTitle>{month}</CardTitle>
                    <CardDescription>Разбивка по источникам трафика</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b bg-muted/50">
                            <th className="h-12 px-4 text-left font-medium">Источник</th>
                            <th className="h-12 px-4 text-right font-medium">Лиды</th>
                            <th className="h-12 px-4 text-right font-medium">Согласия</th>
                            <th className="h-12 px-4 text-right font-medium">CR Согласий</th>
                            <th className="h-12 px-4 text-right font-medium">Одобрено</th>
                            <th className="h-12 px-4 text-right font-medium">CR Одобрения</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sources.map((row) => (
                            <tr key={row.source} className="border-b hover:bg-muted/50">
                              <td className="h-12 px-4 font-medium">
                                {row.source}
                                {row.note && <Badge variant="secondary" className="ml-2 text-xs">{row.note}</Badge>}
                              </td>
                              <td className="h-12 px-4 text-right">{row.leads.toLocaleString()}</td>
                              <td className="h-12 px-4 text-right">{row.consents.toLocaleString()}</td>
                              <td className="h-12 px-4 text-right">{row.consent_rate}%</td>
                              <td className="h-12 px-4 text-right">{row.approved}</td>
                              <td className="h-12 px-4 text-right">
                                <span className={row.approval_rate > 10 ? 'text-green-600 font-semibold' : ''}>
                                  {row.approval_rate}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* CPL Analysis */}
            <TabsContent value="cpl" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Реальный CPL (Cost Per Lead)</CardTitle>
                  <CardDescription>
                    Расчет на основе фактических лидов в CRM с UTM-метками, а не конверсий из рекламных кабинетов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b bg-muted/50">
                          <th className="h-12 px-4 text-left font-medium">Месяц</th>
                          <th className="h-12 px-4 text-right font-medium bg-blue-50">Google Лиды</th>
                          <th className="h-12 px-4 text-right font-medium bg-blue-50">Google Расход</th>
                          <th className="h-12 px-4 text-right font-medium bg-blue-50">Google CPL</th>
                          <th className="h-12 px-4 text-right font-medium bg-purple-50">Meta Лиды</th>
                          <th className="h-12 px-4 text-right font-medium bg-purple-50">Meta Расход</th>
                          <th className="h-12 px-4 text-right font-medium bg-purple-50">Meta CPL</th>
                          <th className="h-12 px-4 text-right font-medium bg-green-50">Общий CPL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {realCplData.map((row) => (
                          <tr key={row.month} className="border-b hover:bg-muted/50">
                            <td className="h-12 px-4 font-medium">
                              {row.month}
                              {row.note && <span className="text-xs text-muted-foreground block">{row.note}</span>}
                            </td>
                            <td className="h-12 px-4 text-right bg-blue-50/50">{row.google_crm_leads}</td>
                            <td className="h-12 px-4 text-right bg-blue-50/50">${row.google_cost.toLocaleString()}</td>
                            <td className="h-12 px-4 text-right bg-blue-50/50 font-semibold">${row.google_real_cpl.toFixed(2)}</td>
                            <td className="h-12 px-4 text-right bg-purple-50/50">{row.meta_crm_leads}</td>
                            <td className="h-12 px-4 text-right bg-purple-50/50">${row.meta_cost.toLocaleString()}</td>
                            <td className="h-12 px-4 text-right bg-purple-50/50 font-semibold">
                              {row.meta_real_cpl > 0 ? `$${row.meta_real_cpl.toFixed(2)}` : '—'}
                            </td>
                            <td className="h-12 px-4 text-right bg-green-50/50 font-bold text-green-700">
                              ${row.total_real_cpl.toFixed(2)}
                            </td>
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
                  <CardDescription>Снижение стоимости лида по месяцам</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cplTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="Google CPL" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Meta CPL" stroke="#8b5cf6" strokeWidth={2} connectNulls />
                      <Line type="monotone" dataKey="Общий CPL" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Discrepancy Note */}
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-amber-600" />
                    <CardTitle className="text-amber-800">О расхождении данных</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-amber-700 space-y-2">
                  <p>
                    <strong>Октябрь-Ноябрь:</strong> Наблюдалось расхождение между конверсиями в рекламных кабинетах и лидами в CRM с UTM-метками.
                    Это связано с потерей UTM-меток при переходах и техническими особенностями трекинга.
                  </p>
                  <p>
                    <strong>Декабрь:</strong> Проблема была исправлена — данные из рекламных кабинетов и CRM теперь сходятся с минимальным расхождением.
                  </p>
                  <p>
                    <strong>Рекомендация:</strong> Для расчета реального CPL использовать данные из CRM (лиды с UTM-метками) в сочетании с расходами из рекламных кабинетов.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Meta Awareness Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Meta AWARENESS кампании</h2>
              <p className="text-muted-foreground">Охватные кампании (не включены в расчет CPL)</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Расходы</p>
                  <p className="text-2xl font-bold text-indigo-700">$686.13</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Охват</p>
                  <p className="text-2xl font-bold text-indigo-700">493,270</p>
                  <p className="text-xs text-muted-foreground">уникальных пользователей</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Показы</p>
                  <p className="text-2xl font-bold text-indigo-700">2,231,384</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Кампания "Halyk Leasing AWARENESS december" — декабрь 2025
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Footer CTA */}
        <div className="bg-slate-50 rounded-xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Нужна дополнительная аналитика?</h3>
          <p className="text-muted-foreground">
            Данные обновлены на основе выгрузки CRM и рекламных кабинетов Google/Meta.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer">
                Вернуться к отчету
              </div>
            </Link>
            <Link href="/roadmap">
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer">
                Планы (Roadmap)
              </div>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
