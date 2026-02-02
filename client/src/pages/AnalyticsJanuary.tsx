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
// С ДЕДУПЛИКАЦИЕЙ ПО БИН (207 одобренных, 1 января - 1 февраля)
// =============================================================================

// Google Ads данные по неделям (с дедупликацией по БИН)
const googleAdsWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    impressions: 5543, 
    clicks: 1128, 
    leads: 54, 
    consents: 7, 
    approved: 2,
    cost: 336.96,
    ctr: 20.35,
    cr_lead: 4.79,
    cr_consent: 13.0,
    cr_approved: 28.6
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    impressions: 10387, 
    clicks: 2639, 
    leads: 139, 
    consents: 23, 
    approved: 7,
    cost: 782.55,
    ctr: 25.41,
    cr_lead: 5.27,
    cr_consent: 16.5,
    cr_approved: 30.4
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    impressions: 9321, 
    clicks: 2248, 
    leads: 116, 
    consents: 25, 
    approved: 3,
    cost: 705.01,
    ctr: 24.12,
    cr_lead: 5.16,
    cr_consent: 21.6,
    cr_approved: 12.0
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 8475, 
    clicks: 2020, 
    leads: 131, 
    consents: 36, 
    approved: 10,
    cost: 666.39,
    ctr: 23.83,
    cr_lead: 6.49,
    cr_consent: 27.5,
    cr_approved: 27.8
  },
  { 
    week: 'Неделя 5', 
    period: '26 янв-1 фев',
    impressions: 7153, 
    clicks: 1774, 
    leads: 115, 
    consents: 35, 
    approved: 6,
    cost: 655.03,
    ctr: 24.80,
    cr_lead: 6.48,
    cr_consent: 30.4,
    cr_approved: 17.1
  },
];

// Meta Ads данные по неделям (с дедупликацией по БИН)
const metaAdsWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    impressions: 69220, 
    reach: 34166,
    leads: 151, 
    consents: 16, 
    approved: 4,
    cost: 175.39,
    cr_lead: 0.22,
    cr_consent: 10.6,
    cr_approved: 25.0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    impressions: 54433, 
    reach: 28621,
    leads: 241, 
    consents: 25, 
    approved: 7,
    cost: 176.05,
    cr_lead: 0.44,
    cr_consent: 10.4,
    cr_approved: 28.0
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    impressions: 45090, 
    reach: 24672,
    leads: 193, 
    consents: 35, 
    approved: 8,
    cost: 175.86,
    cr_lead: 0.43,
    cr_consent: 18.1,
    cr_approved: 22.9
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    impressions: 26384, 
    reach: 17633,
    leads: 186, 
    consents: 26, 
    approved: 9,
    cost: 98.07,
    cr_lead: 0.70,
    cr_consent: 14.0,
    cr_approved: 34.6
  },
  { 
    week: 'Неделя 5', 
    period: '26 янв-1 фев',
    impressions: 26519, 
    reach: 48376,
    leads: 174, 
    consents: 24, 
    approved: 5,
    cost: 176.05,
    cr_lead: 0.66,
    cr_consent: 13.8,
    cr_approved: 20.8
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
    leads: 43, 
    consents: 1, 
    approved: 1,
    cost: 141.54,
    ctr: 0.27,
    cr_lead: 8.22,
    cr_consent: 2.3,
    cr_approved: 100.0,
    active: true
  },
  { 
    week: 'Неделя 5', 
    period: '26 янв-1 фев',
    impressions: 79786, 
    clicks: 186, 
    leads: 10, 
    consents: 1, 
    approved: 0,
    cost: 28.07,
    ctr: 0.23,
    cr_lead: 5.38,
    cr_consent: 10.0,
    cr_approved: 0,
    active: true
  },
];

// Kolesa данные по неделям (с дедупликацией по БИН, включая автора kolesa)
const kolesaWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    leads: 153, 
    consents: 11, 
    approved: 1,
    cr_consent: 7.2,
    cr_approved: 9.1
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    leads: 355, 
    consents: 50, 
    approved: 16,
    cr_consent: 14.1,
    cr_approved: 32.0
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 394, 
    consents: 51, 
    approved: 12,
    cr_consent: 12.9,
    cr_approved: 23.5
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 414, 
    consents: 63, 
    approved: 13,
    cr_consent: 15.2,
    cr_approved: 20.6
  },
  { 
    week: 'Неделя 5', 
    period: '26 янв-1 фев',
    leads: 353, 
    consents: 36, 
    approved: 6,
    cr_consent: 10.2,
    cr_approved: 16.7
  },
];

// Менеджеры данные по неделям (с дедупликацией по БИН)
const managersWeekly = [
  { 
    week: 'Неделя 1', 
    period: '1-4 янв',
    leads: 0, 
    consents: 0, 
    approved: 0,
    cr_consent: 0,
    cr_approved: 0
  },
  { 
    week: 'Неделя 2', 
    period: '5-11 янв',
    leads: 29, 
    consents: 22, 
    approved: 6,
    cr_consent: 75.9,
    cr_approved: 27.3
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 56, 
    consents: 46, 
    approved: 24,
    cr_consent: 82.1,
    cr_approved: 52.2
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 59, 
    consents: 51, 
    approved: 20,
    cr_consent: 86.4,
    cr_approved: 39.2
  },
  { 
    week: 'Неделя 5', 
    period: '26 янв-1 фев',
    leads: 49, 
    consents: 43, 
    approved: 13,
    cr_consent: 87.8,
    cr_approved: 30.2
  },
];

// Органика данные по неделям (без менеджеров, с дедупликацией по БИН)
const organicWeekly = [
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
    leads: 46, 
    consents: 29, 
    approved: 8,
    cr_consent: 63.0,
    cr_approved: 27.6
  },
  { 
    week: 'Неделя 3', 
    period: '12-18 янв',
    leads: 66, 
    consents: 42, 
    approved: 12,
    cr_consent: 63.6,
    cr_approved: 28.6
  },
  { 
    week: 'Неделя 4', 
    period: '19-25 янв',
    leads: 76, 
    consents: 44, 
    approved: 11,
    cr_consent: 57.9,
    cr_approved: 25.0
  },
  { 
    week: 'Неделя 5', 
    period: '26 янв-1 фев',
    leads: 83, 
    consents: 36, 
    approved: 3,
    cr_consent: 43.4,
    cr_approved: 8.3
  },
];

// Данные по менеджерам (с дедупликацией по БИН)
const managersData = [
  { name: 'karashev.a', leads: 55, consents: 43, approved: 16, cr_consent: 78.2, cr_approved: 37.2 },
  { name: 'ertargyn.e', leads: 33, consents: 26, approved: 14, cr_consent: 78.8, cr_approved: 53.8 },
  { name: 'kamzina.z', leads: 17, consents: 14, approved: 5, cr_consent: 82.4, cr_approved: 35.7 },
  { name: 'mamutbayeva.a', leads: 16, consents: 15, approved: 4, cr_consent: 93.8, cr_approved: 26.7 },
  { name: 'elkin.p', leads: 10, consents: 10, approved: 7, cr_consent: 100.0, cr_approved: 70.0 },
  { name: 'satbergenov.n', leads: 9, consents: 8, approved: 3, cr_consent: 88.9, cr_approved: 37.5 },
  { name: 'slamkenzhi.b', leads: 4, consents: 3, approved: 1, cr_consent: 75.0, cr_approved: 33.3 },
];

// Итоговые данные по каналам (с дедупликацией по БИН)
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 40879,
    clicks: 9809,
    leads: 555,
    consents: 126,
    approved: 28,
    cost: 3145.94,
    ctr: 24.0,
    cr_lead: 5.66,
    cr_consent: 22.7,
    cr_approved: 22.2,
    cpl: 5.67
  },
  {
    channel: 'Meta Ads',
    impressions: 221646,
    reach: 153468,
    leads: 945,
    consents: 126,
    approved: 33,
    cost: 801.42,
    cr_lead: 0.43,
    cr_consent: 13.3,
    cr_approved: 26.2,
    cpl: 0.85
  },
  {
    channel: 'TikTok Ads',
    impressions: 323535,
    clicks: 844,
    leads: 62,
    consents: 3,
    approved: 1,
    cost: 200.0,
    ctr: 0.26,
    cr_lead: 7.35,
    cr_consent: 4.8,
    cr_approved: 33.3,
    cpl: 3.23,
    note: 'Запущен с 15 января'
  },
  {
    channel: 'Kolesa',
    leads: 1669,
    consents: 211,
    approved: 48,
    cr_consent: 12.6,
    cr_approved: 22.7
  },
  {
    channel: 'Менеджеры',
    leads: 193,
    consents: 162,
    approved: 63,
    cr_consent: 83.9,
    cr_approved: 38.9
  },
  {
    channel: 'Органика',
    leads: 284,
    consents: 156,
    approved: 34,
    cr_consent: 54.9,
    cr_approved: 21.8
  },
];

// Данные для графика воронки по неделям
const weeklyFunnelData = [
  { 
    week: 'Неделя 1',
    'Google Ads': 54,
    'Meta Ads': 151,
    'TikTok Ads': 0,
    'Kolesa': 153,
    'Менеджеры': 0,
    'Органика': 13
  },
  { 
    week: 'Неделя 2',
    'Google Ads': 139,
    'Meta Ads': 241,
    'TikTok Ads': 0,
    'Kolesa': 355,
    'Менеджеры': 29,
    'Органика': 46
  },
  { 
    week: 'Неделя 3',
    'Google Ads': 116,
    'Meta Ads': 193,
    'TikTok Ads': 9,
    'Kolesa': 394,
    'Менеджеры': 56,
    'Органика': 66
  },
  { 
    week: 'Неделя 4',
    'Google Ads': 131,
    'Meta Ads': 186,
    'TikTok Ads': 43,
    'Kolesa': 414,
    'Менеджеры': 59,
    'Органика': 76
  },
  { 
    week: 'Неделя 5',
    'Google Ads': 115,
    'Meta Ads': 174,
    'TikTok Ads': 10,
    'Kolesa': 353,
    'Менеджеры': 49,
    'Органика': 83
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
            1 января - 1 февраля 2026
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
              <p className="text-muted-foreground mt-1">Период: 1 января - 1 февраля 2026 | Данные с дедупликацией по БИН</p>
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

        {/* Key Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые показатели</h2>
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">уникальные по БИН</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Согласий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalConsents}</div>
                <p className="text-xs text-emerald-600 mt-1">CR {(totalConsents / totalLeads * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Одобрено</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{totalApproved}</div>
                <p className="text-xs text-emerald-600 mt-1">CR {(totalApproved / totalConsents * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">платные каналы</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Средний CPL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(totalSpend / (440 + 771 + 52)).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">платные каналы</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Summary Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Сводная таблица по каналам</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Канал</th>
                      <th className="text-right py-3 px-4 font-medium">Заявки</th>
                      <th className="text-right py-3 px-4 font-medium">Согласия</th>
                      <th className="text-right py-3 px-4 font-medium">CR</th>
                      <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-4 font-medium">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((channel, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[channel.channel as keyof typeof COLORS] }}></div>
                            {channel.channel}
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-mono">{channel.leads.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.consents}</td>
                        <td className="text-right py-3 px-4 font-mono text-emerald-600">{channel.cr_consent}%</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.approved}</td>
                        <td className="text-right py-3 px-4 font-mono text-emerald-600">{channel.cr_approved}%</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-3 px-4">ИТОГО</td>
                      <td className="text-right py-3 px-4 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-4 font-mono text-emerald-600">{(totalConsents / totalLeads * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-4 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-4 font-mono text-emerald-600">{(totalApproved / totalConsents * 100).toFixed(1)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Weekly Chart */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Динамика заявок по неделям</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
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
            </CardContent>
          </Card>
        </section>

        {/* Channel Details Tabs */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Детализация по каналам</h2>
          <Tabs defaultValue="google" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="google">Google Ads</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok Ads</TabsTrigger>
              <TabsTrigger value="kolesa">Kolesa</TabsTrigger>
              <TabsTrigger value="managers">Менеджеры</TabsTrigger>
              <TabsTrigger value="organic">Органика</TabsTrigger>
            </TabsList>

            {/* Google Ads Tab */}
            <TabsContent value="google" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Google Ads'] }}></div>
                    Google Ads — Полная воронка
                  </CardTitle>
                  <CardDescription>Показы → Клики → Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Неделя</th>
                          <th className="text-right py-3 px-2 font-medium">Показы</th>
                          <th className="text-right py-3 px-2 font-medium">Клики</th>
                          <th className="text-right py-3 px-2 font-medium">CTR</th>
                          <th className="text-right py-3 px-2 font-medium">Заявки</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Согласия</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {googleAdsWeekly.map((week, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{week.ctr}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_lead}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_approved}%</td>
                            <td className="text-right py-3 px-2 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-2">ИТОГО</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsWeekly.reduce((s, w) => s + w.impressions, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsWeekly.reduce((s, w) => s + w.clicks, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">23.82%</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsWeekly.reduce((s, w) => s + w.leads, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">5.48%</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsWeekly.reduce((s, w) => s + w.consents, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">20.7%</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsWeekly.reduce((s, w) => s + w.approved, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">24.2%</td>
                          <td className="text-right py-3 px-2 font-mono">${googleAdsWeekly.reduce((s, w) => s + w.cost, 0).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>CPL: ${(channelTotals[0].cost / channelTotals[0].leads).toFixed(2)} | Cost per Consent: ${(channelTotals[0].cost / channelTotals[0].consents).toFixed(2)} | Cost per Approval: ${(channelTotals[0].cost / channelTotals[0].approved).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meta Ads Tab */}
            <TabsContent value="meta" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Meta Ads'] }}></div>
                    Meta Ads — Полная воронка
                  </CardTitle>
                  <CardDescription>Показы → Охват → Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Неделя</th>
                          <th className="text-right py-3 px-2 font-medium">Показы</th>
                          <th className="text-right py-3 px-2 font-medium">Охват</th>
                          <th className="text-right py-3 px-2 font-medium">Заявки</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Согласия</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metaAdsWeekly.map((week, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.reach.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_lead}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_approved}%</td>
                            <td className="text-right py-3 px-2 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-2">ИТОГО</td>
                          <td className="text-right py-3 px-2 font-mono">{metaAdsWeekly.reduce((s, w) => s + w.impressions, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{metaAdsWeekly.reduce((s, w) => s + w.reach, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{metaAdsWeekly.reduce((s, w) => s + w.leads, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">0.40%</td>
                          <td className="text-right py-3 px-2 font-mono">{metaAdsWeekly.reduce((s, w) => s + w.consents, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">13.2%</td>
                          <td className="text-right py-3 px-2 font-mono">{metaAdsWeekly.reduce((s, w) => s + w.approved, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">27.5%</td>
                          <td className="text-right py-3 px-2 font-mono">${metaAdsWeekly.reduce((s, w) => s + w.cost, 0).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>CPL: ${(channelTotals[1].cost / channelTotals[1].leads).toFixed(2)} | Cost per Consent: ${(channelTotals[1].cost / channelTotals[1].consents).toFixed(2)} | Cost per Approval: ${(channelTotals[1].cost / channelTotals[1].approved).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TikTok Ads Tab */}
            <TabsContent value="tiktok" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['TikTok Ads'] }}></div>
                    TikTok Ads — Полная воронка
                  </CardTitle>
                  <CardDescription>Показы → Клики → Заявки → Согласия → Одобрено (запущен с 15 января)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Неделя</th>
                          <th className="text-right py-3 px-2 font-medium">Показы</th>
                          <th className="text-right py-3 px-2 font-medium">Клики</th>
                          <th className="text-right py-3 px-2 font-medium">CTR</th>
                          <th className="text-right py-3 px-2 font-medium">Заявки</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Согласия</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tiktokAdsWeekly.map((week, i) => (
                          <tr key={i} className={`border-b ${!week.active ? 'opacity-50' : ''} hover:bg-muted/50`}>
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.active ? week.impressions.toLocaleString() : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.active ? week.clicks : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{week.active ? `${week.ctr}%` : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.active ? week.leads : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.active ? `${week.cr_lead}%` : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.active ? week.consents : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.active ? `${week.cr_consent}%` : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.active ? week.approved : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.active ? `${week.cr_approved}%` : '-'}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.active ? `$${week.cost.toFixed(2)}` : '-'}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-2">ИТОГО</td>
                          <td className="text-right py-3 px-2 font-mono">{tiktokAdsWeekly.reduce((s, w) => s + w.impressions, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{tiktokAdsWeekly.reduce((s, w) => s + w.clicks, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">0.27%</td>
                          <td className="text-right py-3 px-2 font-mono">{tiktokAdsWeekly.reduce((s, w) => s + w.leads, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">7.90%</td>
                          <td className="text-right py-3 px-2 font-mono">{tiktokAdsWeekly.reduce((s, w) => s + w.consents, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">3.8%</td>
                          <td className="text-right py-3 px-2 font-mono">{tiktokAdsWeekly.reduce((s, w) => s + w.approved, 0)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">50.0%</td>
                          <td className="text-right py-3 px-2 font-mono">${tiktokAdsWeekly.reduce((s, w) => s + w.cost, 0).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>CPL: ${(channelTotals[2].cost / channelTotals[2].leads).toFixed(2)} | Cost per Consent: ${(channelTotals[2].cost / channelTotals[2].consents).toFixed(2)} | Cost per Approval: ${(channelTotals[2].cost / channelTotals[2].approved).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kolesa Tab */}
            <TabsContent value="kolesa" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Kolesa'] }}></div>
                    Kolesa — Воронка
                  </CardTitle>
                  <CardDescription>Заявки → Согласия → Одобрено (включая автора kolesa)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kolesaWeekly.map((week, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
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
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">{kolesaWeekly.reduce((s, w) => s + w.leads, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono">{kolesaWeekly.reduce((s, w) => s + w.consents, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">13.3%</td>
                          <td className="text-right py-3 px-4 font-mono">{kolesaWeekly.reduce((s, w) => s + w.approved, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">24.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Managers Tab */}
            <TabsContent value="managers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Менеджеры'] }}></div>
                    Менеджеры — Воронка
                  </CardTitle>
                  <CardDescription>Заявки → Согласия → Одобрено (заявки добавленные менеджерами)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managersWeekly.map((week, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
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
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">{managersWeekly.reduce((s, w) => s + w.leads, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono">{managersWeekly.reduce((s, w) => s + w.consents, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">82.6%</td>
                          <td className="text-right py-3 px-4 font-mono">{managersWeekly.reduce((s, w) => s + w.approved, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">42.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h4 className="font-semibold mb-4">Разбивка по менеджерам</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Менеджер</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managersData.map((manager, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{manager.name}</td>
                            <td className="text-right py-3 px-4 font-mono">{manager.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{manager.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{manager.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{manager.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{manager.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.leads, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.consents, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">82.6%</td>
                          <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.approved, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">42.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organic Tab */}
            <TabsContent value="organic" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Органика'] }}></div>
                    Органика — Воронка
                  </CardTitle>
                  <CardDescription>Заявки → Согласия → Одобрено (без UTM меток, исключая менеджеров и Kolesa)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organicWeekly.map((week, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
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
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">{organicWeekly.reduce((s, w) => s + w.leads, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono">{organicWeekly.reduce((s, w) => s + w.consents, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">59.7%</td>
                          <td className="text-right py-3 px-4 font-mono">{organicWeekly.reduce((s, w) => s + w.approved, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">25.8%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Approved by Week Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Одобренные заявки по неделям</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Неделя</th>
                      <th className="text-right py-3 px-4 font-medium">Google Ads</th>
                      <th className="text-right py-3 px-4 font-medium">Meta Ads</th>
                      <th className="text-right py-3 px-4 font-medium">TikTok Ads</th>
                      <th className="text-right py-3 px-4 font-medium">Kolesa</th>
                      <th className="text-right py-3 px-4 font-medium">Менеджеры</th>
                      <th className="text-right py-3 px-4 font-medium">Органика</th>
                      <th className="text-right py-3 px-4 font-medium">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Неделя 1 (1-4 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">2</td>
                      <td className="text-right py-3 px-4 font-mono">4</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">1</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono font-bold">7</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Неделя 2 (5-11 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">7</td>
                      <td className="text-right py-3 px-4 font-mono">7</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">16</td>
                      <td className="text-right py-3 px-4 font-mono">6</td>
                      <td className="text-right py-3 px-4 font-mono">8</td>
                      <td className="text-right py-3 px-4 font-mono font-bold">44</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Неделя 3 (12-18 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">3</td>
                      <td className="text-right py-3 px-4 font-mono">8</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">12</td>
                      <td className="text-right py-3 px-4 font-mono">24</td>
                      <td className="text-right py-3 px-4 font-mono">12</td>
                      <td className="text-right py-3 px-4 font-mono font-bold">59</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Неделя 4 (19-25 янв)</td>
                      <td className="text-right py-3 px-4 font-mono">10</td>
                      <td className="text-right py-3 px-4 font-mono">9</td>
                      <td className="text-right py-3 px-4 font-mono">1</td>
                      <td className="text-right py-3 px-4 font-mono">13</td>
                      <td className="text-right py-3 px-4 font-mono">20</td>
                      <td className="text-right py-3 px-4 font-mono">11</td>
                      <td className="text-right py-3 px-4 font-mono font-bold">64</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Неделя 5 (26 янв-1 фев)</td>
                      <td className="text-right py-3 px-4 font-mono">6</td>
                      <td className="text-right py-3 px-4 font-mono">5</td>
                      <td className="text-right py-3 px-4 font-mono">0</td>
                      <td className="text-right py-3 px-4 font-mono">6</td>
                      <td className="text-right py-3 px-4 font-mono">13</td>
                      <td className="text-right py-3 px-4 font-mono">3</td>
                      <td className="text-right py-3 px-4 font-mono font-bold">33</td>
                    </tr>
                    <tr className="font-bold bg-muted/30">
                      <td className="py-3 px-4">ИТОГО</td>
                      <td className="text-right py-3 px-4 font-mono">28</td>
                      <td className="text-right py-3 px-4 font-mono">33</td>
                      <td className="text-right py-3 px-4 font-mono">1</td>
                      <td className="text-right py-3 px-4 font-mono">48</td>
                      <td className="text-right py-3 px-4 font-mono">63</td>
                      <td className="text-right py-3 px-4 font-mono">34</td>
                      <td className="text-right py-3 px-4 font-mono">207</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notes */}
        <section>
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" />
                Примечания к данным
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Период: 1 января - 1 февраля 2026 года</p>
              <p>• <strong>Данные с дедупликацией по БИН</strong> — учитываются уникальные компании, лучший статус для каждого БИН</p>
              <p>• <strong>TikTok Ads:</strong> Канал запущен с 15 января 2026</p>
              <p>• <strong>Kolesa:</strong> Включает заявки с utm_source=kolesa и автором kolesa из файла обработки</p>
              <p>• <strong>Менеджеры:</strong> Заявки добавленные менеджерами (kamzina.z, karashev.a, mamutbayeva.a, slamkenzhi.b, elkin.p, ertargyn.e, satbergenov.n)</p>
              <p>• <strong>Органика:</strong> Все заявки без UTM меток, исключая заявки менеджеров и Kolesa</p>
              <p>• <strong>CR (Conversion Rate):</strong> Рассчитывается от предыдущего этапа воронки</p>
              <p>• <strong>Источник данных:</strong> CRM export, файл обработки заявок, рекламные кабинеты (Google Ads, Meta Ads, TikTok Ads)</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
