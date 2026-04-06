import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, Database, ArrowUpRight, ArrowDownRight, Info,
  CheckCircle, Zap
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ — НЕДЕЛЯ 14: 30 марта – 5 апреля 2026
// Источник: CRM (Обработка заявок_2026-04-06.xlsx) + Google Ads CSV + Meta Ads CSV
// Дедупликация: по БИН/ИИН (keep=first) → 795 уникальных заявок (из 1,123 raw)
// Согласие: Дата согласия заполнена → 338 (42.5%)
// Одобрено: Решение ∈ {Одобрить, Условно одобрено} → 61 (18.0% от согласий)
// Обновлено: 06.04.2026
// =============================================

const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads':   '#0668E1',
  'Kolesa DM':  '#ff6b35',
  'Дилеры (UTM)': '#f59e0b',
  'Дилеры/Партнеры': '#e11d48',
  'Zoomlion':   '#10b981',
  'Прочие':     '#94a3b8',
  'Kolesa Page': '#6366f1',
  'Online Bank': '#8b5cf6',
  'Перезаведено': '#d946ef',
  'Сайт (лид)': '#06b6d4',
};

// Исторические данные (нед.7-14)
const weeklyComparison = [
  { week: 'Нед. 7',  period: '9-15 фев',      google: 109, meta: 136, kolesa: 323, dealers: 72,  other: 44,  total: 684  },
  { week: 'Нед. 8',  period: '16-22 фев',     google: 89,  meta: 250, kolesa: 366, dealers: 89,  other: 44,  total: 838  },
  { week: 'Нед. 9',  period: '23 фев-1 мар',  google: 99,  meta: 311, kolesa: 415, dealers: 78,  other: 98,  total: 1001 },
  { week: 'Нед. 10', period: '2-8 мар',       google: 73,  meta: 124, kolesa: 362, dealers: 191, other: 7,   total: 757  },
  { week: 'Нед. 11', period: '9-15 мар',      google: 130, meta: 309, kolesa: 405, dealers: 85,  other: 64,  total: 993  },
  { week: 'Нед. 12', period: '16-22 мар',     google: 149, meta: 276, kolesa: 320, dealers: 21,  other: 57,  total: 823  },
  { week: 'Нед. 13', period: '23-29 мар',     google: 164, meta: 372, kolesa: 335, dealers: 32,  other: 90,  total: 793  },
  { week: 'Нед. 14', period: '30 мар-5 апр',  google: 78,  meta: 197, kolesa: 339, dealers: 70,  other: 111, total: 795  },
];

const leadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google,
  'Meta Ads':   w.meta,
  'Kolesa DM':  w.kolesa,
  'Дилеры':     w.dealers,
  'Остальные':  w.other,
}));

const totalLeadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  period: w.period,
  'Всего заявок': w.total,
}));

// Воронка по каналам (уникальные БИН, dedup keep=first)
const channelTotals = [
  {
    channel: 'Kolesa DM',
    impressions: null, clicks: null, ctr: null,
    leads: 339, consents: 86, approved: 4,
    cost: null,
    note: 'Партнёрский источник (42.6% всех заявок)',
  },
  {
    channel: 'Meta Ads',
    impressions: 51131, clicks: 1331, ctr: 2.60,
    leads: 197, consents: 86, approved: 2,
    cost: 292.08,
    note: 'Охват 27,846 | CPR $1.30 | Частота 1.84',
  },
  {
    channel: 'Google Ads',
    impressions: 9136, clicks: 1605, ctr: 17.57,
    leads: 78, consents: 37, approved: 9,
    cost: 645.10,
    note: 'Quiz кампании | CPC $0.40 | CPL $8.27',
  },
  {
    channel: 'Дилеры/Партнеры',
    impressions: null, clicks: null, ctr: null,
    leads: 54, consents: 37, approved: 13,
    cost: null,
    note: 'ALLUR, NKB GROUP, SEVALO и др.',
  },
  {
    channel: 'Перезаведено',
    impressions: null, clicks: null, ctr: null,
    leads: 30, consents: 25, approved: 11,
    cost: null,
    note: 'Повторно заведённые заявки',
  },
  {
    channel: 'Zoomlion',
    impressions: null, clicks: null, ctr: null,
    leads: 23, consents: 14, approved: 3,
    cost: null,
    note: 'Спецпрограмма Zoomlion',
  },
  {
    channel: 'Дилеры (UTM)',
    impressions: null, clicks: null, ctr: null,
    leads: 16, consents: 13, approved: 3,
    cost: null,
    note: 'UTM utm_source=dealer',
  },
  {
    channel: 'Сайт (лид)',
    impressions: null, clicks: null, ctr: null,
    leads: 16, consents: 12, approved: 8,
    cost: null,
    note: 'Заявки с сайта (прямые)',
  },
  {
    channel: 'Kolesa Page',
    impressions: null, clicks: null, ctr: null,
    leads: 6, consents: 2, approved: 0,
    cost: null,
    note: 'Страница на Kolesa.kz',
  },
  {
    channel: 'Online Bank',
    impressions: null, clicks: null, ctr: null,
    leads: 5, consents: 4, approved: 1,
    cost: null,
    note: 'Маркетплейс onlinebank',
  },
  {
    channel: 'Прочие',
    impressions: null, clicks: null, ctr: null,
    leads: 31, consents: 22, approved: 7,
    cost: null,
    note: 'Push, WhatsApp, Маркетплейс, Действ. клиенты и др.',
  },
];

// Google Ads кампании (из CSV) — Топ по расходам
const googleAdsCampaigns = [
  { adGroup: 'Лизинг автомобилей',      impressions: 2878, clicks: 581, conversions: 38, cost: 241.41, ctr: 20.19, cr: 6.62, cpc: 0.42 },
  { adGroup: 'Лизинг техники общие',     impressions: 1741, clicks: 419, conversions: 30, cost: 140.95, ctr: 24.07, cr: 7.19, cpc: 0.34 },
  { adGroup: 'Финансовый лизинг',        impressions: 1103, clicks: 127, conversions: 8,  cost: 71.24,  ctr: 11.51, cr: 6.58, cpc: 0.56 },
  { adGroup: 'Легковые автомобили',      impressions: 522,  clicks: 55,  conversions: 3,  cost: 23.51,  ctr: 10.54, cr: 4.55, cpc: 0.43 },
  { adGroup: 'Седельные тягачи',         impressions: 216,  clicks: 41,  conversions: 4,  cost: 17.96,  ctr: 18.98, cr: 9.76, cpc: 0.44 },
  { adGroup: 'Самосвалы строительные',   impressions: 176,  clicks: 38,  conversions: 6,  cost: 16.78,  ctr: 21.59, cr: 15.76, cpc: 0.44 },
  { adGroup: 'Тракторы',                 impressions: 294,  clicks: 37,  conversions: 1,  cost: 16.54,  ctr: 12.59, cr: 2.70, cpc: 0.45 },
  { adGroup: 'Манипуляторы строительные',impressions: 312,  clicks: 36,  conversions: 1,  cost: 14.08,  ctr: 11.54, cr: 2.78, cpc: 0.39 },
  { adGroup: 'Остальные группы',         impressions: 1894, clicks: 271, conversions: 14, cost: 102.63, ctr: 14.31, cr: 5.17, cpc: 0.38 },
];

// Google Ads динамика нед.8-14
const googleAdsWeekly = [
  { week: 'Нед. 8',  impressions: 8498,  clicks: 1738, leads: 89,  cost: 726.61 },
  { week: 'Нед. 9',  impressions: 10299, clicks: 1855, leads: 99,  cost: 745.55 },
  { week: 'Нед. 10', impressions: 7651,  clicks: 1561, leads: 73,  cost: 664.16 },
  { week: 'Нед. 11', impressions: 11038, clicks: 1908, leads: 130, cost: 768.83 },
  { week: 'Нед. 12', impressions: 7200,  clicks: 1450, leads: 149, cost: 630.00 },
  { week: 'Нед. 13', impressions: 8075,  clicks: 1637, leads: 164, cost: 683.36 },
  { week: 'Нед. 14', impressions: 9136,  clicks: 1605, leads: 78,  cost: 645.10 },
];

// Meta Ads динамика нед.8-14
const metaAdsWeekly = [
  { week: 'Нед. 8',  impressions: 63498,  reach: 30842, leads: 250, cost: 256.65 },
  { week: 'Нед. 9',  impressions: 69107,  reach: 34961, leads: 311, cost: 301.25 },
  { week: 'Нед. 10', impressions: 61034,  reach: 31689, leads: 124, cost: 294.38 },
  { week: 'Нед. 11', impressions: 59351,  reach: 31365, leads: 309, cost: 297.20 },
  { week: 'Нед. 12', impressions: 48000,  reach: 21000, leads: 276, cost: 278.00 },
  { week: 'Нед. 13', impressions: 55601,  reach: 25141, leads: 372, cost: 314.60 },
  { week: 'Нед. 14', impressions: 51131,  reach: 27846, leads: 197, cost: 292.08 },
];

// Pie chart
const leadsPieData = [
  { name: 'Kolesa DM',         value: 339, color: '#ff6b35' },
  { name: 'Meta Ads',          value: 197, color: '#0668E1' },
  { name: 'Google Ads',        value: 78,  color: '#4285f4' },
  { name: 'Дилеры/Партнеры',   value: 54,  color: '#e11d48' },
  { name: 'Прочие',            value: 31,  color: '#94a3b8' },
  { name: 'Перезаведено',      value: 30,  color: '#d946ef' },
  { name: 'Zoomlion',          value: 23,  color: '#10b981' },
  { name: 'Дилеры (UTM)',      value: 16,  color: '#f59e0b' },
  { name: 'Сайт (лид)',        value: 16,  color: '#06b6d4' },
  { name: 'Kolesa Page',       value: 6,   color: '#6366f1' },
  { name: 'Online Bank',       value: 5,   color: '#8b5cf6' },
];

// Итоги нед.14
const totalLeads    = 795;
const totalConsents = 338;
const totalApproved = 61;
const totalSpend    = 645.10 + 292.08;
const paidLeads     = 78 + 197;
const deltaLeads    = totalLeads - 793; // vs W13


export default function AnalyticsAprilW14() {
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
            <Link href="/analytics" className="hover:text-foreground transition-colors">Дек</Link>
            <Link href="/analytics-january" className="hover:text-foreground transition-colors">Янв</Link>
            <Link href="/analytics-february" className="hover:text-foreground transition-colors">Фев (нед. 6-8)</Link>
            <Link href="/analytics-february-w9" className="hover:text-foreground transition-colors">Нед. 9</Link>
            <Link href="/analytics-march-w10" className="hover:text-foreground transition-colors">Нед. 10</Link>
            <Link href="/analytics-march-w11" className="hover:text-foreground transition-colors">Нед. 11</Link>
            <Link href="/analytics-march-w12-13" className="hover:text-foreground transition-colors">Нед. 12-13</Link>
            <span className="text-foreground font-semibold border-b-2 border-primary pb-0.5">Нед. 14</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">30 мар – 5 апр 2026</div>
        </div>
      </header>

      <main className="container py-10 space-y-12">

        {/* Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Неделя 14</h1>
              <p className="text-muted-foreground mt-1">
                30 марта – 5 апреля 2026 &nbsp;|&nbsp; Дедупликация по БИН &nbsp;|&nbsp; 795 уникальных заявок
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/analytics"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Декабрь 2025</Badge></Link>
            <Link href="/analytics-january"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Январь 2026</Badge></Link>
            <Link href="/analytics-february"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Февраль (нед. 6-8)</Badge></Link>
            <Link href="/analytics-february-w9"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 9</Badge></Link>
            <Link href="/analytics-march-w10"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 10</Badge></Link>
            <Link href="/analytics-march-w11"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 11</Badge></Link>
            <Link href="/analytics-march-w12-13"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 12-13</Badge></Link>
            <Badge variant="default">Неделя 14</Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые показатели — Неделя 14</h2>
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Уникальных заявок</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className="text-xs mt-1 flex items-center gap-1 text-emerald-500">
                  <ArrowUpRight className="h-3 w-3" />
                  +{deltaLeads} vs нед. 13 (+{((deltaLeads/793)*100).toFixed(1)}%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Согласий</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalConsents}</div>
                <p className="text-xs text-muted-foreground mt-1">CR {(totalConsents/totalLeads*100).toFixed(1)}% от заявок</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Одобрено</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{totalApproved}</div>
                <p className="text-xs text-muted-foreground mt-1">CR {(totalApproved/totalConsents*100).toFixed(1)}% от согласий</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground mt-1">Google $645 | Meta $292</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">CPL (платные)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(totalSpend/paidLeads).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta ({paidLeads} лидов)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Insights */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые выводы</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Сайт (лид) — лидер по CR одобрения</p>
                    <p className="text-xs text-muted-foreground mt-1">CR одобрения 66.7% (8 из 12 согласий). 16 заявок, но самое высокое качество.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Дилеры/Партнеры — стабильное качество</p>
                    <p className="text-xs text-muted-foreground mt-1">CR согласий 68.5%, CR одобрений 35.1%. 54 заявки → 13 одобрено.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Google Ads — лучший платный канал</p>
                    <p className="text-xs text-muted-foreground mt-1">CR согласий 47.4%, CR одобрений 24.3%. CPC $0.40, CPL $8.27. 9 одобрений.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-amber-200 bg-amber-50/40">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Kolesa DM + Meta — объём есть, одобрения низкие</p>
                    <p className="text-xs text-muted-foreground mt-1">536 заявок (67.4%), но всего 6 одобрений (CR 3.5%). Нужна оптимизация квалификации лидов.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Full Funnel Table */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Полная воронка по каналам — Неделя 14</h2>
          <p className="text-sm text-muted-foreground mb-4">Дедупликация по БИН/ИИН. Источник: обновлённый CRM (06.04.2026). Согласие = Дата согласия заполнена.</p>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Канал</th>
                      <th className="text-right py-3 px-2 font-medium">Показы</th>
                      <th className="text-right py-3 px-2 font-medium">Клики</th>
                      <th className="text-right py-3 px-2 font-medium">CTR</th>
                      <th className="text-right py-3 px-2 font-medium">Заявки</th>
                      <th className="text-right py-3 px-2 font-medium">Согласия</th>
                      <th className="text-right py-3 px-2 font-medium">CR%</th>
                      <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-2 font-medium">CR%</th>
                      <th className="text-right py-3 px-2 font-medium">Расход</th>
                      <th className="text-right py-3 px-2 font-medium">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((ch, i) => {
                      const crConsent = (ch.consents / ch.leads * 100).toFixed(1);
                      const crApproved = ch.consents > 0 ? (ch.approved / ch.consents * 100).toFixed(1) : '0.0';
                      const cpl = ch.cost ? (ch.cost / ch.leads).toFixed(2) : null;
                      return (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[ch.channel] || '#94a3b8' }}></div>
                              <div>
                                <span className="font-medium">{ch.channel}</span>
                                {ch.note && <div className="text-xs text-muted-foreground">{ch.note}</div>}
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 font-mono">{ch.impressions != null ? ch.impressions.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.clicks != null ? ch.clicks.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{ch.ctr != null ? `${ch.ctr}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono font-semibold">{ch.leads.toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.consents}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">{crConsent}%</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.approved}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">{crApproved}%</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.cost ? `$${ch.cost.toFixed(2)}` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{cpl ? `$${cpl}` : '—'}</td>
                        </tr>
                      );
                    })}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-3 px-2">ИТОГО</td>
                      <td className="text-right py-3 px-2 font-mono">60,267</td>
                      <td className="text-right py-3 px-2 font-mono">2,936</td>
                      <td className="text-right py-3 px-2 font-mono">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-2 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalConsents/totalLeads*100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalApproved/totalConsents*100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-2 font-mono">${(totalSpend/paidLeads).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Структура заявок */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Структура заявок — Неделя 14</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Доля каналов (795 уник. заявки)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={leadsPieData} cx="50%" cy="50%" outerRadius={100} dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`} labelLine>
                      {leadsPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value} заявок`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Заявки по каналам (нед. 7–14)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Google Ads" stackId="a" fill={COLORS['Google Ads']} />
                    <Bar dataKey="Meta Ads"   stackId="a" fill={COLORS['Meta Ads']} />
                    <Bar dataKey="Kolesa DM"  stackId="a" fill={COLORS['Kolesa DM']} />
                    <Bar dataKey="Дилеры"     stackId="a" fill={COLORS['Дилеры (UTM)']} />
                    <Bar dataKey="Остальные"  stackId="a" fill={COLORS['Прочие']} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Динамика */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Динамика уникальных заявок (нед. 7–14)</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={totalLeadsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[500, 1100]} />
                  <Tooltip
                    formatter={(value: number) => [`${value} заявок`, 'Всего']}
                    labelFormatter={(label) => {
                      const item = totalLeadsChartData.find(d => d.week === label);
                      return item ? `${label} (${item.period})` : label;
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Всего заявок" stroke="#4285f4" strokeWidth={3}
                    dot={{ r: 5, fill: '#4285f4' }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Google Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Google Ads — Неделя 14</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9,136</div>
                <p className="text-xs text-emerald-600 mt-1">+1,061 vs нед.13 (+13%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Клики</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,605</div>
                <p className="text-xs text-muted-foreground mt-1">CTR 17.57% | CPC $0.40</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$645.10</div>
                <p className="text-xs text-muted-foreground mt-1">CPL $8.27 (78 заявок CRM)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Конверсии (GA)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">105</div>
                <p className="text-xs text-muted-foreground mt-1">CR 6.54% | 78 заявок в CRM</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Группы объявлений Google Ads</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-medium">Группа</th>
                        <th className="text-right py-2 px-2 font-medium">Показы</th>
                        <th className="text-right py-2 px-2 font-medium">Клики</th>
                        <th className="text-right py-2 px-2 font-medium">CTR</th>
                        <th className="text-right py-2 px-2 font-medium">Конв.</th>
                        <th className="text-right py-2 px-2 font-medium">Расход</th>
                      </tr>
                    </thead>
                    <tbody>
                      {googleAdsCampaigns.map((c, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-2 text-xs">{c.adGroup}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.impressions.toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.clicks.toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs text-blue-600">{c.ctr}%</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.conversions}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">${c.cost.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-muted/30 text-xs">
                        <td className="py-2 px-2">ИТОГО</td>
                        <td className="text-right py-2 px-2 font-mono">9,136</td>
                        <td className="text-right py-2 px-2 font-mono">1,605</td>
                        <td className="text-right py-2 px-2 font-mono text-blue-600">17.57%</td>
                        <td className="text-right py-2 px-2 font-mono">105</td>
                        <td className="text-right py-2 px-2 font-mono">$645.10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Динамика Google Ads (нед. 8–14)</CardTitle></CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={googleAdsWeekly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads"  name="Заявки (CRM)" fill={COLORS['Google Ads']} />
                    <Bar dataKey="clicks" name="Клики" fill="#93c5fd" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Meta Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Meta Ads — Неделя 14</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Охват</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27,846</div>
                <p className="text-xs text-muted-foreground mt-1">Частота 1.84</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">51,131</div>
                <p className="text-xs text-red-500 mt-1">-4,470 vs нед.13 (-8%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$292.08</div>
                <p className="text-xs text-muted-foreground mt-1">CPR $1.30 | CPM $5.71</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Заявки (CRM)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">197</div>
                <p className="text-xs text-muted-foreground mt-1">CPL $1.48 | 225 лидов в Meta</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Динамика Meta Ads (нед. 8–14)</CardTitle></CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={metaAdsWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки (CRM)" fill={COLORS['Meta Ads']} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Методология */}
        <section>
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" />
                Методология и примечания
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• <strong>Период:</strong> Неделя 14 — 30 марта – 5 апреля 2026</p>
              <p>• <strong>Источники:</strong> CRM Excel (Обработка заявок 2026-04-06, обновлённые данные) + Google Ads CSV + Meta Ads CSV</p>
              <p>• <strong>Дедупликация:</strong> по БИН/ИИН (первая запись). Итого 795 уникальных заявок из 1,123 raw.</p>
              <p>• <strong>Согласия:</strong> Дата согласия заполнена → 338 согласий (42.5%)</p>
              <p>• <strong>Одобрено:</strong> Решение ∈ «Одобрить», «Условно одобрено» → 61 одобрение (18.0% от согласий, 7.7% от заявок)</p>
              <p>• <strong>Kolesa DM:</strong> 339 уникальных БИН (42.6%). 86 согласий, 4 одобрения. Партнёрский источник.</p>
              <p>• <strong>Meta Ads:</strong> 197 уникальных заявок. $292.08 расход, 51,131 показов, охват 27,846. IP promo кампания.</p>
              <p>• <strong>Google Ads:</strong> 78 уникальных заявок. $645.10 расход, 9,136 показов, 1,605 кликов, 105 конверсий (GA). Quiz-кампании.</p>
              <p>• <strong>Дилеры/Партнеры:</strong> 54 заявки от ALLUR, NKB GROUP, SEVALO и других партнёров (source_name).</p>
              <p>• <strong>Перезаведено:</strong> 30 повторно заведённых заявок, 11 одобрено (CR 44.0%).</p>
              <p>• <strong>Обновление:</strong> Данные CRM обновлены 06.04.2026 (файл «Обработка заявок_2026-04-06 (1).xlsx»).</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}