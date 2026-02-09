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
// ДАННЫЕ ИЗ РЕКЛАМНЫХ КАБИНЕТОВ (ФЕВРАЛЬ 2026)
// Неделя 6: 2-8 февраля 2026
// С ДЕДУПЛИКАЦИЕЙ ПО БИН (52 одобренных)
// =============================================================================

// Исторические данные за недели 1-5 (из январского отчёта) для сравнения
const weeklyComparison = [
  {
    week: 'Нед. 1', period: '1-4 янв',
    google_leads: 54, google_consents: 7, google_approved: 2, google_cr_consent: 13.0, google_cr_approved: 28.6,
    meta_leads: 151, meta_consents: 16, meta_approved: 4, meta_cr_consent: 10.6, meta_cr_approved: 25.0,
    kolesa_leads: 153, kolesa_consents: 11, kolesa_approved: 1, kolesa_cr_consent: 7.2, kolesa_cr_approved: 9.1,
    managers_leads: 0, managers_consents: 0, managers_approved: 0, managers_cr_consent: 0, managers_cr_approved: 0,
    organic_leads: 13, organic_consents: 5, organic_approved: 0, organic_cr_consent: 38.5, organic_cr_approved: 0,
    total_leads: 371, total_consents: 39, total_approved: 7, total_cr_consent: 10.5, total_cr_approved: 17.9,
  },
  {
    week: 'Нед. 2', period: '5-11 янв',
    google_leads: 139, google_consents: 23, google_approved: 7, google_cr_consent: 16.5, google_cr_approved: 30.4,
    meta_leads: 241, meta_consents: 25, meta_approved: 7, meta_cr_consent: 10.4, meta_cr_approved: 28.0,
    kolesa_leads: 355, kolesa_consents: 50, kolesa_approved: 16, kolesa_cr_consent: 14.1, kolesa_cr_approved: 32.0,
    managers_leads: 29, managers_consents: 22, managers_approved: 6, managers_cr_consent: 75.9, managers_cr_approved: 27.3,
    organic_leads: 46, organic_consents: 29, organic_approved: 8, organic_cr_consent: 63.0, organic_cr_approved: 27.6,
    total_leads: 810, total_consents: 149, total_approved: 44, total_cr_consent: 18.4, total_cr_approved: 29.5,
  },
  {
    week: 'Нед. 3', period: '12-18 янв',
    google_leads: 116, google_consents: 25, google_approved: 3, google_cr_consent: 21.6, google_cr_approved: 12.0,
    meta_leads: 193, meta_consents: 35, meta_approved: 8, meta_cr_consent: 18.1, meta_cr_approved: 22.9,
    kolesa_leads: 394, kolesa_consents: 51, kolesa_approved: 12, kolesa_cr_consent: 12.9, kolesa_cr_approved: 23.5,
    managers_leads: 56, managers_consents: 46, managers_approved: 24, managers_cr_consent: 82.1, managers_cr_approved: 52.2,
    organic_leads: 66, organic_consents: 42, organic_approved: 12, organic_cr_consent: 63.6, organic_cr_approved: 28.6,
    total_leads: 825, total_consents: 199, total_approved: 59, total_cr_consent: 24.1, total_cr_approved: 29.6,
  },
  {
    week: 'Нед. 4', period: '19-25 янв',
    google_leads: 131, google_consents: 36, google_approved: 10, google_cr_consent: 27.5, google_cr_approved: 27.8,
    meta_leads: 186, meta_consents: 26, meta_approved: 9, meta_cr_consent: 14.0, meta_cr_approved: 34.6,
    kolesa_leads: 414, kolesa_consents: 63, kolesa_approved: 13, kolesa_cr_consent: 15.2, kolesa_cr_approved: 20.6,
    managers_leads: 59, managers_consents: 51, managers_approved: 20, managers_cr_consent: 86.4, managers_cr_approved: 39.2,
    organic_leads: 76, organic_consents: 44, organic_approved: 11, organic_cr_consent: 57.9, organic_cr_approved: 25.0,
    total_leads: 866, total_consents: 220, total_approved: 63, total_cr_consent: 25.4, total_cr_approved: 28.6,
  },
  {
    week: 'Нед. 5', period: '26 янв-1 фев',
    google_leads: 115, google_consents: 35, google_approved: 6, google_cr_consent: 30.4, google_cr_approved: 17.1,
    meta_leads: 174, meta_consents: 24, meta_approved: 5, meta_cr_consent: 13.8, meta_cr_approved: 20.8,
    kolesa_leads: 353, kolesa_consents: 36, kolesa_approved: 6, kolesa_cr_consent: 10.2, kolesa_cr_approved: 16.7,
    managers_leads: 49, managers_consents: 43, managers_approved: 13, managers_cr_consent: 87.8, managers_cr_approved: 30.2,
    organic_leads: 83, organic_consents: 36, organic_approved: 3, organic_cr_consent: 43.4, organic_cr_approved: 8.3,
    total_leads: 774, total_consents: 174, total_approved: 33, total_cr_consent: 22.5, total_cr_approved: 19.0,
  },
  {
    week: 'Нед. 6', period: '2-8 фев',
    google_leads: 158, google_consents: 67, google_approved: 15, google_cr_consent: 42.4, google_cr_approved: 22.4,
    meta_leads: 160, meta_consents: 45, meta_approved: 9, meta_cr_consent: 28.1, meta_cr_approved: 20.0,
    kolesa_leads: 372, kolesa_consents: 113, kolesa_approved: 12, kolesa_cr_consent: 30.4, kolesa_cr_approved: 10.6,
    managers_leads: 37, managers_consents: 32, managers_approved: 14, managers_cr_consent: 86.5, managers_cr_approved: 43.8,
    organic_leads: 30, organic_consents: 17, organic_approved: 2, organic_cr_consent: 56.7, organic_cr_approved: 11.8,
    total_leads: 757, total_consents: 274, total_approved: 52, total_cr_consent: 36.2, total_cr_approved: 19.0,
  },
];

// Данные для графика динамики заявок по неделям
const leadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_leads,
  'Meta Ads': w.meta_leads,
  'Kolesa': w.kolesa_leads,
  'Менеджеры': w.managers_leads,
  'Органика': w.organic_leads,
  'Всего': w.total_leads,
}));

// Данные для графика динамики одобрений по неделям
const approvedChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_approved,
  'Meta Ads': w.meta_approved,
  'Kolesa': w.kolesa_approved,
  'Менеджеры': w.managers_approved,
  'Органика': w.organic_approved,
  'Всего': w.total_approved,
}));

// Данные для графика CR Согласий по неделям
const crConsentChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_cr_consent,
  'Meta Ads': w.meta_cr_consent,
  'Kolesa': w.kolesa_cr_consent,
  'Менеджеры': w.managers_cr_consent,
  'Органика': w.organic_cr_consent,
  'Среднее': w.total_cr_consent,
}));

// Данные для графика CR Одобрений по неделям
const crApprovedChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_cr_approved,
  'Meta Ads': w.meta_cr_approved,
  'Kolesa': w.kolesa_cr_approved,
  'Менеджеры': w.managers_cr_approved,
  'Органика': w.organic_cr_approved,
  'Среднее': w.total_cr_approved,
}));

// Google Ads данные — Неделя 6 (единственная неделя февраля пока)
const googleAdsWeekly = [
  { 
    week: 'Неделя 6', 
    period: '2-8 фев',
    impressions: 8171, 
    clicks: 1912, 
    leads: 158, 
    consents: 67, 
    approved: 15,
    cost: 741.44,
    ctr: 23.40,
    cr_lead: 8.26,
    cr_consent: 42.4,
    cr_approved: 22.4
  },
];

// Meta Ads данные — Неделя 6
const metaAdsWeekly = [
  { 
    week: 'Неделя 6', 
    period: '2-8 фев',
    impressions: 51149, 
    reach: 25763,
    leads: 160, 
    consents: 45, 
    approved: 9,
    cost: 173.92,
    cr_lead: 0.31,
    cr_consent: 28.1,
    cr_approved: 20.0
  },
];

// Kolesa данные — Неделя 6 (автор kolesa + kolesa-page)
const kolesaWeekly = [
  { 
    week: 'Неделя 6', 
    period: '2-8 фев',
    leads: 372, 
    consents: 113, 
    approved: 12,
    cr_consent: 30.4,
    cr_approved: 10.6
  },
];

// Менеджеры данные — Неделя 6
const managersWeekly = [
  { 
    week: 'Неделя 6', 
    period: '2-8 фев',
    leads: 37, 
    consents: 32, 
    approved: 14,
    cr_consent: 86.5,
    cr_approved: 43.8
  },
];

// Органика данные — Неделя 6
const organicWeekly = [
  { 
    week: 'Неделя 6', 
    period: '2-8 фев',
    leads: 30, 
    consents: 17, 
    approved: 2,
    cr_consent: 56.7,
    cr_approved: 11.8
  },
];

// Данные по менеджерам (с дедупликацией по БИН)
const managersData = [
  { name: 'karashev.a', leads: 19, consents: 19, approved: 9, cr_consent: 100.0, cr_approved: 47.4 },
  { name: 'ertargyn.e', leads: 6, consents: 4, approved: 1, cr_consent: 66.7, cr_approved: 25.0 },
  { name: 'elkin.p', leads: 5, consents: 5, approved: 2, cr_consent: 100.0, cr_approved: 40.0 },
  { name: 'mamutbayeva.a', leads: 5, consents: 3, approved: 1, cr_consent: 60.0, cr_approved: 33.3 },
  { name: 'kamzina.z', leads: 2, consents: 1, approved: 1, cr_consent: 50.0, cr_approved: 100.0 },
];

// Google Ads кампании — детализация
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова', impressions: 4558, clicks: 1211, conversions: 114.63, cost: 449.25, ctr: 26.57, cr: 9.47 },
  { campaign: 'Такси / Автобусы', impressions: 1105, clicks: 254, conversions: 22.82, cost: 103.66, ctr: 22.99, cr: 8.98 },
  { campaign: 'Строительство', impressions: 1364, clicks: 214, conversions: 17.67, cost: 97.14, ctr: 15.69, cr: 8.26 },
  { campaign: 'Сельское хозяйство', impressions: 400, clicks: 93, conversions: 2.00, cost: 27.81, ctr: 23.25, cr: 2.15 },
  { campaign: 'Грузоперевозки', impressions: 305, clicks: 67, conversions: 4.50, cost: 29.79, ctr: 21.97, cr: 6.72 },
  { campaign: 'Дистрибуция и ритейл', impressions: 347, clicks: 55, conversions: 2.00, cost: 25.54, ctr: 15.85, cr: 3.64 },
  { campaign: 'ГМК и нефтедобыча', impressions: 92, clicks: 18, conversions: 1.00, cost: 8.25, ctr: 19.57, cr: 5.56 },
];

// Итоговые данные по каналам (с дедупликацией по БИН)
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 8171,
    clicks: 1912,
    leads: 158,
    consents: 67,
    approved: 15,
    cost: 741.44,
    ctr: 23.4,
    cr_lead: 8.26,
    cr_consent: 42.4,
    cr_approved: 22.4,
    cpl: 4.69
  },
  {
    channel: 'Meta Ads',
    impressions: 51149,
    reach: 25763,
    leads: 160,
    consents: 45,
    approved: 9,
    cost: 173.92,
    cr_lead: 0.31,
    cr_consent: 28.1,
    cr_approved: 20.0,
    cpl: 1.09
  },
  {
    channel: 'Kolesa',
    leads: 372,
    consents: 113,
    approved: 12,
    cr_consent: 30.4,
    cr_approved: 10.6
  },
  {
    channel: 'Менеджеры',
    leads: 37,
    consents: 32,
    approved: 14,
    cr_consent: 86.5,
    cr_approved: 43.8
  },
  {
    channel: 'Органика',
    leads: 30,
    consents: 17,
    approved: 2,
    cr_consent: 56.7,
    cr_approved: 11.8
  },
];

// Данные для графика воронки
const weeklyFunnelData = [
  { 
    week: 'Неделя 6',
    'Google Ads': 158,
    'Meta Ads': 160,
    'Kolesa': 372,
    'Менеджеры': 37,
    'Органика': 30
  },
];

// Итоги
const totalLeads = channelTotals.reduce((sum, c) => sum + c.leads, 0);
const totalConsents = channelTotals.reduce((sum, c) => sum + c.consents, 0);
const totalApproved = channelTotals.reduce((sum, c) => sum + c.approved, 0);
const totalSpend = channelTotals.filter(c => c.cost).reduce((sum, c) => sum + (c.cost || 0), 0);

// Цвета для каналов
const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads': '#0668E1',
  'Kolesa': '#ff6b35',
  'Менеджеры': '#8b5cf6',
  'Органика': '#22c55e'
};

export default function AnalyticsFebruary() {
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
            <Link href="/analytics-january" className="hover:text-foreground transition-colors">Аналитика (Янв)</Link>
            <span className="text-foreground">Аналитика (Фев)</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            2 - 8 февраля 2026
          </div>
        </div>
      </header>

      <main className="container py-10 space-y-12">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Февраль 2026</h1>
              <p className="text-muted-foreground mt-1">Неделя 6: 2-8 февраля 2026 | Данные с дедупликацией по БИН</p>
            </div>
          </div>
          
          {/* Period Tabs */}
          <div className="flex gap-2">
            <Link href="/analytics">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">Декабрь 2025</Badge>
            </Link>
            <Link href="/analytics-january">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">Январь 2026</Badge>
            </Link>
            <Badge variant="default">Февраль 2026</Badge>
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
                <div className="text-3xl font-bold">${totalSpend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <p className="text-xs text-muted-foreground mt-1">платные каналы</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Средний CPL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(totalSpend / (158 + 160)).toFixed(2)}</div>
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
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[channel.channel] }}></div>
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

        {/* Leads Distribution Chart */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Распределение заявок по каналам</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={channelTotals} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="channel" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки" fill="#94a3b8" />
                  <Bar dataKey="consents" name="Согласия" fill="#3b82f6" />
                  <Bar dataKey="approved" name="Одобрено" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Channel Details Tabs */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Детализация по каналам</h2>
          <Tabs defaultValue="google" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="google">Google Ads</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
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
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>CPL: ${(741.44 / 158).toFixed(2)} | Cost per Consent: ${(741.44 / 67).toFixed(2)} | Cost per Approval: ${(741.44 / 15).toFixed(2)}</p>
                  </div>

                  <Separator className="my-6" />

                  <h4 className="font-semibold mb-4">Разбивка по кампаниям</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Кампания</th>
                          <th className="text-right py-3 px-2 font-medium">Показы</th>
                          <th className="text-right py-3 px-2 font-medium">Клики</th>
                          <th className="text-right py-3 px-2 font-medium">CTR</th>
                          <th className="text-right py-3 px-2 font-medium">Конверсии</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                          <th className="text-right py-3 px-2 font-medium">CPC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {googleAdsCampaigns.map((c, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2 text-xs">{c.campaign}</td>
                            <td className="text-right py-3 px-2 font-mono">{c.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{c.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{c.ctr}%</td>
                            <td className="text-right py-3 px-2 font-mono">{c.conversions.toFixed(1)}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{c.cr}%</td>
                            <td className="text-right py-3 px-2 font-mono">${c.cost.toFixed(2)}</td>
                            <td className="text-right py-3 px-2 font-mono">${(c.cost / c.clicks).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-2">ИТОГО</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.impressions, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.clicks, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">23.40%</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.conversions, 0).toFixed(1)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">8.61%</td>
                          <td className="text-right py-3 px-2 font-mono">${googleAdsCampaigns.reduce((s, c) => s + c.cost, 0).toFixed(2)}</td>
                          <td className="text-right py-3 px-2 font-mono">${(741.44 / 1912).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
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
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>CPL: ${(173.92 / 160).toFixed(2)} | Cost per Consent: ${(173.92 / 45).toFixed(2)} | Cost per Approval: ${(173.92 / 9).toFixed(2)}</p>
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
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">86.5%</td>
                          <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.approved, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">43.8%</td>
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
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Weekly Comparison Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Сравнение по неделям — Динамика показателей</h2>
          
          {/* Leads Comparison Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Заявки по каналам (недели 1-6)</CardTitle>
              <CardDescription>Количество уникальных заявок (дедупликация по БИН) по каждому каналу</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Неделя</th>
                      <th className="text-right py-3 px-3 font-medium" style={{color: COLORS['Google Ads']}}>Google Ads</th>
                      <th className="text-right py-3 px-3 font-medium" style={{color: COLORS['Meta Ads']}}>Meta Ads</th>
                      <th className="text-right py-3 px-3 font-medium" style={{color: COLORS['Kolesa']}}>Kolesa</th>
                      <th className="text-right py-3 px-3 font-medium" style={{color: COLORS['Менеджеры']}}>Менеджеры</th>
                      <th className="text-right py-3 px-3 font-medium" style={{color: COLORS['Органика']}}>Органика</th>
                      <th className="text-right py-3 px-3 font-medium font-bold">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyComparison.map((w, i) => (
                      <tr key={i} className={`border-b hover:bg-muted/50 ${i === weeklyComparison.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                        <td className="py-3 px-3">
                          <div className="font-medium">{w.week}</div>
                          <div className="text-xs text-muted-foreground">{w.period}</div>
                        </td>
                        <td className="text-right py-3 px-3 font-mono">{w.google_leads}</td>
                        <td className="text-right py-3 px-3 font-mono">{w.meta_leads}</td>
                        <td className="text-right py-3 px-3 font-mono">{w.kolesa_leads}</td>
                        <td className="text-right py-3 px-3 font-mono">{w.managers_leads}</td>
                        <td className="text-right py-3 px-3 font-mono">{w.organic_leads}</td>
                        <td className="text-right py-3 px-3 font-mono font-bold">{w.total_leads}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Leads Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Динамика заявок по неделям</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={leadsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Google Ads" fill={COLORS['Google Ads']} stackId="a" />
                  <Bar dataKey="Meta Ads" fill={COLORS['Meta Ads']} stackId="a" />
                  <Bar dataKey="Kolesa" fill={COLORS['Kolesa']} stackId="a" />
                  <Bar dataKey="Менеджеры" fill={COLORS['Менеджеры']} stackId="a" />
                  <Bar dataKey="Органика" fill={COLORS['Органика']} stackId="a" />
                  <Line type="monotone" dataKey="Всего" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Consents Comparison Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Согласия по каналам (недели 1-6)</CardTitle>
              <CardDescription>Количество подписанных согласий и CR (Заявки → Согласия)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Неделя</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Google Ads']}}>Google Ads</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Meta Ads']}}>Meta Ads</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Kolesa']}}>Kolesa</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Менеджеры']}}>Менеджеры</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Органика']}}>Органика</th>
                      <th className="text-right py-3 px-2 font-medium font-bold" colSpan={2}>Всего</th>
                    </tr>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th></th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyComparison.map((w, i) => (
                      <tr key={i} className={`border-b hover:bg-muted/50 ${i === weeklyComparison.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                        <td className="py-2 px-2">
                          <div className="font-medium text-xs">{w.week}</div>
                          <div className="text-xs text-muted-foreground">{w.period}</div>
                        </td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.google_consents}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.google_cr_consent}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.meta_consents}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.meta_cr_consent}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.kolesa_consents}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.kolesa_cr_consent}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.managers_consents}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.managers_cr_consent}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.organic_consents}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.organic_cr_consent}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs font-bold">{w.total_consents}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600 font-bold">{w.total_cr_consent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* CR Consent Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Динамика CR Согласий по неделям (%)</CardTitle>
              <CardDescription>Конверсия из заявок в согласия по каждому каналу</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={crConsentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="Google Ads" stroke={COLORS['Google Ads']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Meta Ads" stroke={COLORS['Meta Ads']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Менеджеры" stroke={COLORS['Менеджеры']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Approved Comparison Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Одобрения по каналам (недели 1-6)</CardTitle>
              <CardDescription>Количество одобренных заявок и CR (Согласия → Одобрения)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Неделя</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Google Ads']}}>Google Ads</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Meta Ads']}}>Meta Ads</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Kolesa']}}>Kolesa</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Менеджеры']}}>Менеджеры</th>
                      <th className="text-right py-3 px-2 font-medium" colSpan={2} style={{color: COLORS['Органика']}}>Органика</th>
                      <th className="text-right py-3 px-2 font-medium font-bold" colSpan={2}>Всего</th>
                    </tr>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th></th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                      <th className="text-right py-1 px-2">#</th>
                      <th className="text-right py-1 px-2">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyComparison.map((w, i) => (
                      <tr key={i} className={`border-b hover:bg-muted/50 ${i === weeklyComparison.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                        <td className="py-2 px-2">
                          <div className="font-medium text-xs">{w.week}</div>
                          <div className="text-xs text-muted-foreground">{w.period}</div>
                        </td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.google_approved}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.google_cr_approved}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.meta_approved}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.meta_cr_approved}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.kolesa_approved}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.kolesa_cr_approved}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.managers_approved}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.managers_cr_approved}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.organic_approved}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{w.organic_cr_approved}%</td>
                        <td className="text-right py-2 px-2 font-mono text-xs font-bold">{w.total_approved}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600 font-bold">{w.total_cr_approved}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Approved + CR Approved Charts */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Динамика одобрений по неделям</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={approvedChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Google Ads" fill={COLORS['Google Ads']} stackId="a" />
                    <Bar dataKey="Meta Ads" fill={COLORS['Meta Ads']} stackId="a" />
                    <Bar dataKey="Kolesa" fill={COLORS['Kolesa']} stackId="a" />
                    <Bar dataKey="Менеджеры" fill={COLORS['Менеджеры']} stackId="a" />
                    <Bar dataKey="Органика" fill={COLORS['Органика']} stackId="a" />
                    <Line type="monotone" dataKey="Всего" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Динамика CR Одобрений (%)</CardTitle>
                <CardDescription>Конверсия из согласий в одобрения</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={crApprovedChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="Google Ads" stroke={COLORS['Google Ads']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Meta Ads" stroke={COLORS['Meta Ads']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Менеджеры" stroke={COLORS['Менеджеры']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Approved Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Одобренные заявки — Неделя 6</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Неделя</th>
                      <th className="text-right py-3 px-4 font-medium">Google Ads</th>
                      <th className="text-right py-3 px-4 font-medium">Meta Ads</th>
                      <th className="text-right py-3 px-4 font-medium">Kolesa</th>
                      <th className="text-right py-3 px-4 font-medium">Менеджеры</th>
                      <th className="text-right py-3 px-4 font-medium">Органика</th>
                      <th className="text-right py-3 px-4 font-medium">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Неделя 6 (2-8 фев)</td>
                      <td className="text-right py-3 px-4 font-mono">15</td>
                      <td className="text-right py-3 px-4 font-mono">9</td>
                      <td className="text-right py-3 px-4 font-mono">12</td>
                      <td className="text-right py-3 px-4 font-mono">14</td>
                      <td className="text-right py-3 px-4 font-mono">2</td>
                      <td className="text-right py-3 px-4 font-mono font-bold">52</td>
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
              <p>• Период: 2-8 февраля 2026 года (Неделя 6)</p>
              <p>• <strong>Данные с дедупликацией по БИН</strong> — учитываются уникальные компании, лучший статус для каждого БИН</p>
              <p>• <strong>Kolesa:</strong> Включает заявки с автором kolesa и utm_source kolesa-page из файла обработки</p>
              <p>• <strong>Менеджеры:</strong> Заявки добавленные менеджерами (karashev.a, ertargyn.e, elkin.p, mamutbayeva.a, kamzina.z)</p>
              <p>• <strong>Органика:</strong> Все заявки без UTM меток, исключая заявки менеджеров и Kolesa (включая Self Service без канала, API, online_bank)</p>
              <p>• <strong>Согласие:</strong> Определяется по столбцу «Методика» — M1, M2 или M3</p>
              <p>• <strong>Одобрение:</strong> Определяется по столбцу «approval_status» = APPROVED</p>
              <p>• <strong>CR (Conversion Rate):</strong> Рассчитывается от предыдущего этапа воронки</p>
              <p>• <strong>Источник данных:</strong> CRM export, файл обработки заявок, рекламные кабинеты (Google Ads, Meta Ads)</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
