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
  Info, ArrowUpRight, ArrowDownRight, Eye, MousePointer, FileText
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ ИЗ РЕКЛАМНЫХ КАБИНЕТОВ (ЯНВАРЬ 2026)
// =============================================

// Google Ads данные по неделям
const googleAdsWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    impressions: 5543, 
    clicks: 1128, 
    leads: 67, 
    consents: 8, 
    approved: 2,
    cost: 336.96,
    ctr: 20.35,
    cr_lead: 5.94,
    cr_consent: 11.9,
    cr_approved: 25.0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    impressions: 10387, 
    clicks: 2639, 
    leads: 148, 
    consents: 25, 
    approved: 7,
    cost: 782.55,
    ctr: 25.41,
    cr_lead: 5.61,
    cr_consent: 16.9,
    cr_approved: 28.0
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    impressions: 9321, 
    clicks: 2248, 
    leads: 122, 
    consents: 28, 
    approved: 5,
    cost: 705.01,
    ctr: 24.12,
    cr_lead: 5.43,
    cr_consent: 23.0,
    cr_approved: 17.9
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 8475, 
    clicks: 2020, 
    leads: 129, 
    consents: 27, 
    approved: 8,
    cost: 666.39,
    ctr: 23.83,
    cr_lead: 6.39,
    cr_consent: 20.9,
    cr_approved: 29.6
  },
];

// Meta Ads данные по неделям
const metaAdsWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    impressions: 69220, 
    reach: 34166,
    leads: 198, 
    consents: 25, 
    approved: 4,
    cost: 175.39,
    cr_lead: 0.286,
    cr_consent: 12.6,
    cr_approved: 16.0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    impressions: 54433, 
    reach: 28621,
    leads: 251, 
    consents: 32, 
    approved: 7,
    cost: 176.05,
    cr_lead: 0.461,
    cr_consent: 12.7,
    cr_approved: 21.9
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    impressions: 45090, 
    reach: 24672,
    leads: 188, 
    consents: 32, 
    approved: 8,
    cost: 175.86,
    cr_lead: 0.417,
    cr_consent: 17.0,
    cr_approved: 25.0
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 26384, 
    reach: 17633,
    leads: 160, 
    consents: 17, 
    approved: 3,
    cost: 98.07,
    cr_lead: 0.606,
    cr_consent: 10.6,
    cr_approved: 17.6
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
    leads: 9, 
    consents: 1, 
    approved: 0,
    cost: 30.39,
    ctr: 0.28,
    cr_lead: 6.67,
    cr_consent: 11.1,
    cr_approved: 0,
    active: true
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 196219, 
    clicks: 523, 
    leads: 38, 
    consents: 1, 
    approved: 1,
    cost: 141.54,
    ctr: 0.27,
    cr_lead: 7.27,
    cr_consent: 2.6,
    cr_approved: 100.0,
    active: true
  },
];

// Kolesa данные по неделям
const kolesaWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    leads: 108, 
    consents: 11, 
    approved: 1,
    cr_consent: 10.2,
    cr_approved: 9.1
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    leads: 240, 
    consents: 49, 
    approved: 8,
    cr_consent: 20.4,
    cr_approved: 16.3
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 228, 
    consents: 93, 
    approved: 7,
    cr_consent: 40.8,
    cr_approved: 7.5
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 203, 
    consents: 49, 
    approved: 7,
    cr_consent: 24.1,
    cr_approved: 14.3
  },
];

// Органика и партнеры данные по неделям
const organicWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    leads: 78, 
    consents: 7, 
    approved: 0,
    cr_consent: 9.0,
    cr_approved: 0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    leads: 210, 
    consents: 58, 
    approved: 19,
    cr_consent: 27.6,
    cr_approved: 32.8
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 253, 
    consents: 72, 
    approved: 25,
    cr_consent: 28.5,
    cr_approved: 34.7
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 275, 
    consents: 83, 
    approved: 22,
    cr_consent: 30.2,
    cr_approved: 26.5
  },
];

// Итоговые данные по каналам
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 33726,
    clicks: 8035,
    leads: 466,
    consents: 88,
    approved: 22,
    cost: 2490.91,
    ctr: 23.82,
    cr_lead: 5.80,
    cr_consent: 18.9,
    cr_approved: 25.0,
    cpl: 5.35
  },
  {
    channel: 'Meta Ads',
    impressions: 195127,
    reach: 105092,
    leads: 797,
    consents: 106,
    approved: 22,
    cost: 625.37,
    cr_lead: 0.408,
    cr_consent: 13.3,
    cr_approved: 20.8,
    cpl: 0.78
  },
  {
    channel: 'TikTok Ads',
    impressions: 243749,
    clicks: 658,
    leads: 47,
    consents: 2,
    approved: 1,
    cost: 171.93,
    ctr: 0.27,
    cr_lead: 7.14,
    cr_consent: 4.3,
    cr_approved: 50.0,
    cpl: 3.66,
    note: 'Запущен с 15 января'
  },
  {
    channel: 'Kolesa',
    leads: 779,
    consents: 202,
    approved: 23,
    cr_consent: 25.9,
    cr_approved: 11.4
  },
  {
    channel: 'Органика и партнеры',
    leads: 816,
    consents: 220,
    approved: 66,
    cr_consent: 27.0,
    cr_approved: 30.0
  },
];

// Данные для графика воронки по неделям
const weeklyFunnelData = [
  { 
    week: 'Неделя 1',
    'Google Ads': 67,
    'Meta Ads': 198,
    'TikTok Ads': 0,
    'Kolesa': 108,
    'Органика': 78
  },
  { 
    week: 'Неделя 2',
    'Google Ads': 148,
    'Meta Ads': 251,
    'TikTok Ads': 0,
    'Kolesa': 240,
    'Органика': 210
  },
  { 
    week: 'Неделя 3',
    'Google Ads': 122,
    'Meta Ads': 188,
    'TikTok Ads': 9,
    'Kolesa': 228,
    'Органика': 253
  },
  { 
    week: 'Неделя 4',
    'Google Ads': 129,
    'Meta Ads': 160,
    'TikTok Ads': 38,
    'Kolesa': 203,
    'Органика': 275
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
              <p className="text-muted-foreground">Понедельный анализ по всем каналам (1-25 января)</p>
            </div>
          </div>
          
          {/* Month Tabs */}
          <div className="flex gap-2">
            <Link href="/analytics">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted px-4 py-2 text-sm">
                Декабрь 2025
              </Badge>
            </Link>
            <Badge className="px-4 py-2 text-sm">
              Январь 2026
            </Badge>
          </div>
          
          {/* Info Banner */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-blue-800">Методология расчета</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>CTR</strong> = Клики / Показы</li>
                  <li>• <strong>CR в заявку</strong> = Заявки / Клики (или Показы для Meta)</li>
                  <li>• <strong>CR в согласие</strong> = Согласия / Заявки</li>
                  <li>• <strong>CR в одобрение</strong> = Одобрено / Согласия</li>
                  <li>• Данные CRM дедуплицированы по БИН компании</li>
                  <li>• TikTok Ads запущен с 15 января</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Summary Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Сводные показатели за январь</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего заявок</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">уникальных по БИН</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Согласия</CardTitle>
                <FileSignature className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalConsents}</div>
                <p className="text-xs text-muted-foreground">CR: {(totalConsents / totalLeads * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Одобрено</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalApproved}</div>
                <p className="text-xs text-muted-foreground">CR: {(totalApproved / totalConsents * 100).toFixed(1)}%</p>
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
                <div className="text-2xl font-bold">${(totalSpend / (466 + 797 + 47)).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">платные каналы</p>
              </CardContent>
            </Card>
          </div>
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="google">Google Ads</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok Ads</TabsTrigger>
              <TabsTrigger value="kolesa">Kolesa</TabsTrigger>
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
                          <td className="text-right py-3 px-4 font-mono">466</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">5.80%</td>
                          <td className="text-right py-3 px-4 font-mono">88</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">18.9%</td>
                          <td className="text-right py-3 px-4 font-mono">22</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">25.0%</td>
                          <td className="text-right py-3 px-4 font-mono">$2,490.91</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>CPL:</strong> $5.35 | <strong>Cost per Consent:</strong> ${(2490.91/88).toFixed(2)} | <strong>Cost per Approval:</strong> ${(2490.91/22).toFixed(2)}</p>
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
                          <td className="text-right py-3 px-4 font-mono">797</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">0.41%</td>
                          <td className="text-right py-3 px-4 font-mono">106</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">13.3%</td>
                          <td className="text-right py-3 px-4 font-mono">22</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">20.8%</td>
                          <td className="text-right py-3 px-4 font-mono">$625.37</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>CPL:</strong> $0.78 | <strong>Cost per Consent:</strong> ${(625.37/106).toFixed(2)} | <strong>Cost per Approval:</strong> ${(625.37/22).toFixed(2)}</p>
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
                    <Badge variant="outline">Запущен с 15 января</Badge>
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
                          <tr key={week.week} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            {week.active ? (
                              <>
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
                              </>
                            ) : (
                              <td colSpan={10} className="text-center py-3 px-4 text-muted-foreground">
                                Кампания не запущена
                              </td>
                            )}
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">243,749</td>
                          <td className="text-right py-3 px-4 font-mono">658</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">0.27%</td>
                          <td className="text-right py-3 px-4 font-mono">47</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">7.14%</td>
                          <td className="text-right py-3 px-4 font-mono">2</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">4.3%</td>
                          <td className="text-right py-3 px-4 font-mono">1</td>
                          <td className="text-right py-3 px-4 font-mono text-blue-600">50%</td>
                          <td className="text-right py-3 px-4 font-mono">$171.93</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800"><strong>Примечание:</strong> Кампания запущена с 15 января. Мало данных для выводов по конверсии в согласие и одобрение.</p>
                    <p className="text-sm mt-2"><strong>CPL:</strong> $3.66</p>
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
                  <CardDescription>Заявки → Согласия → Одобрено (нет данных по показам/кликам)</CardDescription>
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
                            <td className="text-right py-3 px-4 font-mono text-orange-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-orange-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">779</td>
                          <td className="text-right py-3 px-4 font-mono">202</td>
                          <td className="text-right py-3 px-4 font-mono text-orange-600">25.9%</td>
                          <td className="text-right py-3 px-4 font-mono">23</td>
                          <td className="text-right py-3 px-4 font-mono text-orange-600">11.4%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>Лучший CR в согласие</strong> среди всех каналов (25.9%), но низкий CR в одобрение (11.4%)</p>
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
                    <CardTitle>Органика и партнеры — Воронка</CardTitle>
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
                        {organicWeekly.map((week) => (
                          <tr key={week.week} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-semibold">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">816</td>
                          <td className="text-right py-3 px-4 font-mono">220</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">27.0%</td>
                          <td className="text-right py-3 px-4 font-mono">66</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">30.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-sm text-emerald-800"><strong>Лучшее качество лидов:</strong> Самый высокий CR в одобрение (30.0%) среди всех каналов</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Summary Comparison Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Сравнение каналов</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Канал</th>
                      <th className="text-right py-3 px-4 font-semibold">Показы</th>
                      <th className="text-right py-3 px-4 font-semibold">Клики/Охват</th>
                      <th className="text-right py-3 px-4 font-semibold">Заявки</th>
                      <th className="text-right py-3 px-4 font-semibold">CR в согласие</th>
                      <th className="text-right py-3 px-4 font-semibold">Согласия</th>
                      <th className="text-right py-3 px-4 font-semibold">CR в одобрение</th>
                      <th className="text-right py-3 px-4 font-semibold">Одобрено</th>
                      <th className="text-right py-3 px-4 font-semibold">Расход</th>
                      <th className="text-right py-3 px-4 font-semibold">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((channel) => (
                      <tr key={channel.channel} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[channel.channel as keyof typeof COLORS] || '#888' }}></div>
                            {channel.channel}
                            {channel.note && <Badge variant="outline" className="text-xs">{channel.note}</Badge>}
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-mono">{channel.impressions?.toLocaleString() || '—'}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.clicks?.toLocaleString() || channel.reach?.toLocaleString() || '—'}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.leads}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.cr_consent}%</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.consents}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.cr_approved}%</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.approved}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.cost ? `$${channel.cost.toFixed(2)}` : '—'}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.cpl ? `$${channel.cpl.toFixed(2)}` : '—'}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50 font-semibold">
                      <td className="py-3 px-4">ИТОГО</td>
                      <td className="text-right py-3 px-4 font-mono">472,602</td>
                      <td className="text-right py-3 px-4 font-mono">—</td>
                      <td className="text-right py-3 px-4 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-mono">{(totalConsents / totalLeads * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-4 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-4 font-mono">{(totalApproved / totalConsents * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-4 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-4 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-4 font-mono">${(totalSpend / (466 + 797 + 47)).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <p className="text-sm text-muted-foreground">
            Данные обновлены на основе выгрузки CRM и рекламных кабинетов (26 января 2026). Дедупликация по БИН.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-primary hover:underline flex items-center gap-1">
              Вернуться к отчету
            </Link>
            <Link href="/analytics" className="text-sm text-primary hover:underline flex items-center gap-1">
              Аналитика (Декабрь)
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
