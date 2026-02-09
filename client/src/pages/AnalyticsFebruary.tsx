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
