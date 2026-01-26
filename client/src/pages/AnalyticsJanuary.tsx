import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, ComposedChart, Area, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Database, AlertTriangle, 
  Calendar, DollarSign, Users, CheckCircle2, FileSignature,
  Info, ArrowUpRight, ArrowDownRight, Eye, MousePointer, FileText, UserCheck
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ ИЗ РЕКЛАМНЫХ КАБИНЕТОВ (ЯНВАРЬ 2026)
// БЕЗ ДЕДУПЛИКАЦИИ ПО БИН
// =============================================

// Google Ads данные по неделям
const googleAdsWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    impressions: 5543, 
    clicks: 1128, 
    leads: 80, 
    consents: 8, 
    approved: 2,
    cost: 336.96,
    ctr: 20.35,
    cr_lead: 7.09,
    cr_consent: 10.0,
    cr_approved: 25.0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    impressions: 10387, 
    clicks: 2639, 
    leads: 195, 
    consents: 33, 
    approved: 9,
    cost: 782.55,
    ctr: 25.41,
    cr_lead: 7.39,
    cr_consent: 16.9,
    cr_approved: 27.3
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    impressions: 9321, 
    clicks: 2248, 
    leads: 157, 
    consents: 36, 
    approved: 5,
    cost: 705.01,
    ctr: 24.12,
    cr_lead: 6.98,
    cr_consent: 22.9,
    cr_approved: 13.9
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 8475, 
    clicks: 2020, 
    leads: 288, 
    consents: 41, 
    approved: 11,
    cost: 666.39,
    ctr: 23.83,
    cr_lead: 14.26,
    cr_consent: 14.2,
    cr_approved: 26.8
  },
];

// Meta Ads данные по неделям
const metaAdsWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    impressions: 69220, 
    reach: 34166,
    leads: 216, 
    consents: 27, 
    approved: 4,
    cost: 175.39,
    cr_lead: 0.31,
    cr_consent: 12.5,
    cr_approved: 14.8
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    impressions: 54433, 
    reach: 28621,
    leads: 309, 
    consents: 38, 
    approved: 10,
    cost: 176.05,
    cr_lead: 0.57,
    cr_consent: 12.3,
    cr_approved: 26.3
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    impressions: 45090, 
    reach: 24672,
    leads: 227, 
    consents: 43, 
    approved: 10,
    cost: 175.86,
    cr_lead: 0.50,
    cr_consent: 18.9,
    cr_approved: 23.3
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 26384, 
    reach: 17633,
    leads: 203, 
    consents: 31, 
    approved: 11,
    cost: 98.07,
    cr_lead: 0.77,
    cr_consent: 15.3,
    cr_approved: 35.5
  },
];

// TikTok Ads данные по неделям (запущен с 15 января)
const tiktokAdsWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    impressions: 0, 
    clicks: 0, 
    leads: 0, 
    consents: 0, 
    approved: 0,
    cost: 0,
    active: false
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    impressions: 0, 
    clicks: 0, 
    leads: 0, 
    consents: 0, 
    approved: 0,
    cost: 0,
    active: false
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    impressions: 47530, 
    clicks: 135, 
    leads: 10, 
    consents: 1, 
    approved: 0,
    cost: 30.39,
    ctr: 0.28,
    cr_lead: 7.41,
    cr_consent: 10.0,
    cr_approved: 0,
    active: true
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 196219, 
    clicks: 523, 
    leads: 47, 
    consents: 1, 
    approved: 1,
    cost: 141.54,
    ctr: 0.27,
    cr_lead: 8.99,
    cr_consent: 2.1,
    cr_approved: 100.0,
    active: true
  },
];

// Kolesa данные по неделям
const kolesaWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    leads: 21, 
    consents: 1, 
    approved: 0,
    cr_consent: 4.8,
    cr_approved: 0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    leads: 42, 
    consents: 14, 
    approved: 0,
    cr_consent: 33.3,
    cr_approved: 0
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 31, 
    consents: 9, 
    approved: 2,
    cr_consent: 29.0,
    cr_approved: 22.2
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 23, 
    consents: 4, 
    approved: 1,
    cr_consent: 17.4,
    cr_approved: 25.0
  },
];

// Менеджеры данные по неделям
const managersWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    leads: 13, 
    consents: 5, 
    approved: 0,
    cr_consent: 38.5,
    cr_approved: 0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    leads: 82, 
    consents: 51, 
    approved: 18,
    cr_consent: 62.2,
    cr_approved: 35.3
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 101, 
    consents: 74, 
    approved: 35,
    cr_consent: 73.3,
    cr_approved: 47.3
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 112, 
    consents: 77, 
    approved: 30,
    cr_consent: 68.8,
    cr_approved: 39.0
  },
];

// Органика данные по неделям (без менеджеров)
const organicWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    leads: 223, 
    consents: 20, 
    approved: 1,
    cr_consent: 9.0,
    cr_approved: 5.0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    leads: 534, 
    consents: 92, 
    approved: 22,
    cr_consent: 17.2,
    cr_approved: 23.9
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 561, 
    consents: 86, 
    approved: 16,
    cr_consent: 15.3,
    cr_approved: 18.6
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 607, 
    consents: 106, 
    approved: 19,
    cr_consent: 17.5,
    cr_approved: 17.9
  },
];

// Данные по менеджерам
const managersData = [
  { name: 'karashev.a', leads: 74, consents: 61, approved: 22, cr_consent: 82.4, cr_approved: 36.1 },
  { name: 'ertargyn.e', leads: 39, consents: 32, approved: 15, cr_consent: 82.1, cr_approved: 46.9 },
  { name: 'mamutbayeva.a', leads: 31, consents: 26, approved: 11, cr_consent: 83.9, cr_approved: 42.3 },
  { name: 'kamzina.z', leads: 22, consents: 18, approved: 7, cr_consent: 81.8, cr_approved: 38.9 },
  { name: 'elkin.p', leads: 12, consents: 12, approved: 8, cr_consent: 100.0, cr_approved: 66.7 },
  { name: 'satbergenov.n', leads: 10, consents: 9, approved: 3, cr_consent: 90.0, cr_approved: 33.3 },
  { name: 'slamkenzhi.b', leads: 4, consents: 3, approved: 1, cr_consent: 75.0, cr_approved: 33.3 },
  { name: 'balgozhina.f', leads: 3, consents: 3, approved: 3, cr_consent: 100.0, cr_approved: 100.0 },
  { name: 'taigara.a', leads: 2, consents: 2, approved: 1, cr_consent: 100.0, cr_approved: 50.0 },
];

// Итоговые данные по каналам
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 33726,
    clicks: 8035,
    leads: 720,
    consents: 118,
    approved: 27,
    cost: 2490.91,
    ctr: 23.82,
    cr_lead: 8.96,
    cr_consent: 16.4,
    cr_approved: 22.9,
    cpl: 3.46
  },
  {
    channel: 'Meta Ads',
    impressions: 195127,
    reach: 105092,
    leads: 955,
    consents: 139,
    approved: 35,
    cost: 625.37,
    cr_lead: 0.49,
    cr_consent: 14.6,
    cr_approved: 25.2,
    cpl: 0.65
  },
  {
    channel: 'TikTok Ads',
    impressions: 243749,
    clicks: 658,
    leads: 57,
    consents: 2,
    approved: 1,
    cost: 171.93,
    ctr: 0.27,
    cr_lead: 8.66,
    cr_consent: 3.5,
    cr_approved: 50.0,
    cpl: 3.02,
    note: 'Запущен с 15 января'
  },
  {
    channel: 'Kolesa',
    leads: 117,
    consents: 28,
    approved: 3,
    cr_consent: 23.9,
    cr_approved: 10.7
  },
  {
    channel: 'Менеджеры',
    leads: 308,
    consents: 207,
    approved: 83,
    cr_consent: 67.2,
    cr_approved: 40.1
  },
  {
    channel: 'Органика',
    leads: 1925,
    consents: 304,
    approved: 58,
    cr_consent: 15.8,
    cr_approved: 19.1
  },
];

// Данные для графика воронки по неделям
const weeklyFunnelData = [
  { 
    week: 'Неделя 1',
    'Google Ads': 80,
    'Meta Ads': 216,
    'TikTok Ads': 0,
    'Kolesa': 21,
    'Менеджеры': 13,
    'Органика': 223
  },
  { 
    week: 'Неделя 2',
    'Google Ads': 195,
    'Meta Ads': 309,
    'TikTok Ads': 0,
    'Kolesa': 42,
    'Менеджеры': 82,
    'Органика': 534
  },
  { 
    week: 'Неделя 3',
    'Google Ads': 157,
    'Meta Ads': 227,
    'TikTok Ads': 10,
    'Kolesa': 31,
    'Менеджеры': 101,
    'Органика': 561
  },
  { 
    week: 'Неделя 4',
    'Google Ads': 288,
    'Meta Ads': 203,
    'TikTok Ads': 47,
    'Kolesa': 23,
    'Менеджеры': 112,
    'Органика': 607
  },
];

// Итоги
const totalLeads = channelTotals.reduce((sum, c) => sum + c.leads, 0);
const totalConsents = channelTotals.reduce((sum, c) => sum + c.consents, 0);
const totalApproved = channelTotals.reduce((sum, c) => sum + c.approved, 0);
const totalSpend = channelTotals.filter(c => c.cost).reduce((sum, c) => sum + (c.cost || 0), 0);

// Цвета для каналов
const COLORS = {
  'Google Ads': '#4285f4',
  'Meta Ads': '#0668E1',
  'TikTok Ads': '#000000',
  'Kolesa': '#ff6b35',
  'Менеджеры': '#8b5cf6',
  'Органика': '#22c55e'
};

export default function AnalyticsJanuary() {
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
            <Link href="/analytics" className="hover:text-foreground transition-colors">Аналитика (Дек)</Link>
            <span className="text-foreground">Аналитика (Янв)</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            Январь 2026 (1-25)
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
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Январь 2026</h1>
              <p className="text-muted-foreground mt-1">Период: 1-25 января 2026 | Данные без дедупликации</p>
            </div>
          </div>
          
          {/* Period Tabs */}
          <div className="flex gap-2">
            <Link href="/analytics">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">Декабрь 2025</Badge>
            </Link>
            <Badge variant="default">Январь 2026</Badge>
          </div>
        </div>

        <Separator />

        {/* KPI Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Ключевые показатели</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего заявок</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">все каналы</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Согласий</CardTitle>
                <FileSignature className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalConsents}</div>
                <p className="text-xs text-muted-foreground">CR {(totalConsents / totalLeads * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Одобрено</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalApproved}</div>
                <p className="text-xs text-muted-foreground">CR {(totalApproved / totalConsents * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Расходы</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">платные каналы</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Средний CPL</CardTitle>
                <TrendingDown className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalSpend / (720 + 955 + 57)).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">платные каналы</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Summary Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Сводная таблица по каналам</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Канал</th>
                      <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                      <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                      <th className="text-right py-3 px-4 font-semibold">CR</th>
                      <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                      <th className="text-right py-3 px-4 font-semibold">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((ch) => (
                      <tr key={ch.channel} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[ch.channel as keyof typeof COLORS] }}></div>
                            <span className="font-medium">{ch.channel}</span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-mono">{ch.leads.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 font-mono">{ch.consents}</td>
                        <td className="text-right py-3 px-4 font-mono text-blue-600">{ch.cr_consent}%</td>
                        <td className="text-right py-3 px-4 font-mono">{ch.approved}</td>
                        <td className="text-right py-3 px-4 font-mono text-blue-600">{ch.cr_approved}%</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50 font-semibold">
                      <td className="py-3 px-4">ИТОГО</td>
                      <td className="text-right py-3 px-4 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-4 font-mono text-blue-600">{(totalConsents / totalLeads * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-4 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-4 font-mono text-blue-600">{(totalApproved / totalConsents * 100).toFixed(1)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Weekly Leads Chart */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Динамика заявок по неделям</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyFunnelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Google Ads" fill={COLORS['Google Ads']} />
                    <Bar dataKey="Meta Ads" fill={COLORS['Meta Ads']} />
                    <Bar dataKey="TikTok Ads" fill={COLORS['TikTok Ads']} />
                    <Bar dataKey="Kolesa" fill={COLORS['Kolesa']} />
                    <Bar dataKey="Менеджеры" fill={COLORS['Менеджеры']} />
                    <Bar dataKey="Органика" fill={COLORS['Органика']} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Channel Details Tabs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Детализация по каналам</h2>
          
          <Tabs defaultValue="google" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="google">Google Ads</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok Ads</TabsTrigger>
              <TabsTrigger value="kolesa">Kolesa</TabsTrigger>
              <TabsTrigger value="managers">Менеджеры</TabsTrigger>
              <TabsTrigger value="organic">Органика</TabsTrigger>
            </TabsList>
            
            {/* Google Ads Tab */}
            <TabsContent value="google" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Google Ads'] }}></div>
                    <CardTitle>Google Ads — Полная воронка</CardTitle>
                  </div>
                  <CardDescription>Показы → Клики → Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Неделя</th>
                          <th className="text-right py-3 px-4 font-semibold">Показы</th>
                          <th className="text-right py-3 px-4 font-semibold">Клики</th>
                          <th className="text-right py-3 px-4 font-semibold">CTR</th>
                          <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {googleAdsWeekly.map((week) => (
                          <tr key={week.week} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.ctr}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_lead}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_approved}%</td>
                            <td className="text-right py-3 px-4 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">33,726</td>
                          <td className="text-right py-3 px-4 font-mono">8,035</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">23.82%</td>
                          <td className="text-right py-3 px-4 font-mono">720</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">8.96%</td>
                          <td className="text-right py-3 px-4 font-mono">118</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">16.4%</td>
                          <td className="text-right py-3 px-4 font-mono">27</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">22.9%</td>
                          <td className="text-right py-3 px-4 font-mono">$2,490.91</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>CPL:</strong> $3.46 | <strong>Cost per Consent:</strong> ${(2490.91/118).toFixed(2)} | <strong>Cost per Approval:</strong> ${(2490.91/27).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Meta Ads Tab */}
            <TabsContent value="meta" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Meta Ads'] }}></div>
                    <CardTitle>Meta Ads — Полная воронка</CardTitle>
                  </div>
                  <CardDescription>Показы → Охват → Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Неделя</th>
                          <th className="text-right py-3 px-4 font-semibold">Показы</th>
                          <th className="text-right py-3 px-4 font-semibold">Охват</th>
                          <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metaAdsWeekly.map((week) => (
                          <tr key={week.week} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.reach.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_lead}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_approved}%</td>
                            <td className="text-right py-3 px-4 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">195,127</td>
                          <td className="text-right py-3 px-4 font-mono">105,092</td>
                          <td className="text-right py-3 px-4 font-mono">955</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">0.49%</td>
                          <td className="text-right py-3 px-4 font-mono">139</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">14.6%</td>
                          <td className="text-right py-3 px-4 font-mono">35</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">25.2%</td>
                          <td className="text-right py-3 px-4 font-mono">$625.37</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>CPL:</strong> $0.65 | <strong>Cost per Consent:</strong> ${(625.37/139).toFixed(2)} | <strong>Cost per Approval:</strong> ${(625.37/35).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* TikTok Ads Tab */}
            <TabsContent value="tiktok" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['TikTok Ads'] }}></div>
                    <CardTitle>TikTok Ads — Полная воронка</CardTitle>
                    <Badge variant="secondary">Запущен с 15 января</Badge>
                  </div>
                  <CardDescription>Показы → Клики → Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Неделя</th>
                          <th className="text-right py-3 px-4 font-semibold">Показы</th>
                          <th className="text-right py-3 px-4 font-semibold">Клики</th>
                          <th className="text-right py-3 px-4 font-semibold">CTR</th>
                          <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tiktokAdsWeekly.map((week) => (
                          <tr key={week.week} className={`border-b ${!week.active ? 'opacity-40' : 'hover:bg-muted/50'}`}>
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.ctr || '-'}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_lead || '-'}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_consent || '-'}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_approved || '-'}%</td>
                            <td className="text-right py-3 px-4 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">243,749</td>
                          <td className="text-right py-3 px-4 font-mono">658</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">0.27%</td>
                          <td className="text-right py-3 px-4 font-mono">57</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">8.66%</td>
                          <td className="text-right py-3 px-4 font-mono">2</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">3.5%</td>
                          <td className="text-right py-3 px-4 font-mono">1</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">50.0%</td>
                          <td className="text-right py-3 px-4 font-mono">$171.93</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>CPL:</strong> $3.02 | <strong>Cost per Consent:</strong> ${(171.93/2).toFixed(2)} | <strong>Cost per Approval:</strong> ${(171.93/1).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Kolesa Tab */}
            <TabsContent value="kolesa" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Kolesa'] }}></div>
                    <CardTitle>Kolesa — Воронка</CardTitle>
                  </div>
                  <CardDescription>Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Неделя</th>
                          <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kolesaWeekly.map((week) => (
                          <tr key={week.week} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">117</td>
                          <td className="text-right py-3 px-4 font-mono">28</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">23.9%</td>
                          <td className="text-right py-3 px-4 font-mono">3</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">10.7%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Managers Tab */}
            <TabsContent value="managers" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Менеджеры'] }}></div>
                    <CardTitle>Менеджеры — Воронка</CardTitle>
                  </div>
                  <CardDescription>Заявки → Согласия → Одобрено (заявки добавленные менеджерами)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Неделя</th>
                          <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managersWeekly.map((week) => (
                          <tr key={week.week} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">308</td>
                          <td className="text-right py-3 px-4 font-mono">207</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">67.2%</td>
                          <td className="text-right py-3 px-4 font-mono">83</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">40.1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Managers breakdown */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Разбивка по менеджерам</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Менеджер</th>
                          <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managersData.map((mgr) => (
                          <tr key={mgr.name} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{mgr.name}</td>
                            <td className="text-right py-3 px-4 font-mono">{mgr.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{mgr.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{mgr.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{mgr.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{mgr.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">197</td>
                          <td className="text-right py-3 px-4 font-mono">166</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">84.3%</td>
                          <td className="text-right py-3 px-4 font-mono">71</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">42.8%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Organic Tab */}
            <TabsContent value="organic" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Органика'] }}></div>
                    <CardTitle>Органика — Воронка</CardTitle>
                  </div>
                  <CardDescription>Заявки → Согласия → Одобрено (без заявок менеджеров)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Неделя</th>
                          <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                          <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                          <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                          <th className="text-right py-3 px-4 font-semibold">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organicWeekly.map((week) => (
                          <tr key={week.week} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-blue-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">1,925</td>
                          <td className="text-right py-3 px-4 font-mono">304</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">15.8%</td>
                          <td className="text-right py-3 px-4 font-mono">58</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">19.1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Approved by Week */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Одобренные заявки по неделям</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Неделя</th>
                      <th className="text-right py-3 px-4 font-semibold">Google Ads</th>
                      <th className="text-right py-3 px-4 font-semibold">Meta Ads</th>
                      <th className="text-right py-3 px-4 font-semibold">TikTok Ads</th>
                      <th className="text-right py-3 px-4 font-semibold">Kolesa</th>
                      <th className="text-right py-3 px-4 font-semibold">Менеджеры</th>
                      <th className="text-right py-3 px-4 font-semibold">Органика</th>
                      <th className="text-right py-3 px-4 font-semibold bg-muted/50">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Неделя 1 (1-4 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">2</td>
                      <td className="text-right py-3 px-4 font-mono">4</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">1</td>
                      <td className="text-right py-3 px-4 font-mono font-semibold bg-muted/50">7</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Неделя 2 (5-11 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">9</td>
                      <td className="text-right py-3 px-4 font-mono">10</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">18</td>
                      <td className="text-right py-3 px-4 font-mono">22</td>
                      <td className="text-right py-3 px-4 font-mono font-semibold bg-muted/50">59</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Неделя 3 (12-18 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">5</td>
                      <td className="text-right py-3 px-4 font-mono">10</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">2</td>
                      <td className="text-right py-3 px-4 font-mono">35</td>
                      <td className="text-right py-3 px-4 font-mono">16</td>
                      <td className="text-right py-3 px-4 font-mono font-semibold bg-muted/50">68</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Неделя 4 (19-25 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">11</td>
                      <td className="text-right py-3 px-4 font-mono">11</td>
                      <td className="text-right py-3 px-4 font-mono">1</td>
                      <td className="text-right py-3 px-4 font-mono">1</td>
                      <td className="text-right py-3 px-4 font-mono">30</td>
                      <td className="text-right py-3 px-4 font-mono">19</td>
                      <td className="text-right py-3 px-4 font-mono font-semibold bg-muted/50">73</td>
                    </tr>
                    <tr className="bg-muted/50 font-semibold">
                      <td className="py-3 px-4">ИТОГО</td>
                      <td className="text-right py-3 px-4 font-mono">27</td>
                      <td className="text-right py-3 px-4 font-mono">35</td>
                      <td className="text-right py-3 px-4 font-mono">1</td>
                      <td className="text-right py-3 px-4 font-mono">3</td>
                      <td className="text-right py-3 px-4 font-mono">83</td>
                      <td className="text-right py-3 px-4 font-mono">58</td>
                      <td className="text-right py-3 px-4 font-mono">207</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Notes */}
        <section className="space-y-4">
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Примечания к данным
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• <strong>Период:</strong> 1-25 января 2026 года</p>
              <p>• <strong>Данные без дедупликации по БИН</strong> — учитываются все записи</p>
              <p>• <strong>TikTok Ads:</strong> Канал запущен с 15 января 2026</p>
              <p>• <strong>Менеджеры:</strong> Заявки добавленные менеджерами (kamzina.z, karashev.a, mamutbayeva.a, slamkenzhi.b, balgozhina.f, elkin.p, ertargyn.e, satbergenov.n, taigara.a)</p>
              <p>• <strong>Органика:</strong> Все заявки без UTM меток, исключая заявки менеджеров</p>
              <p>• <strong>CR (Conversion Rate):</strong> Рассчитывается от предыдущего этапа воронки</p>
              <p>• <strong>Источник данных:</strong> UTM файл (utm Jan 1-26.xlsx), файл обработки заявок</p>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Halyk Leasing. Аналитика за январь 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
