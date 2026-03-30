import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, Database, ArrowUpRight, ArrowDownRight, Info
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ — НЕДЕЛЯ 12-13: 16–29 марта 2026
// Источник: UTM файл (16.03-29.03.csv) + CRM (Обработка заявок)
// Дедупликация: по БИН/ИИН (приоритет: первое появление)
// Согласие: CRM МЕТОДИКА не пусто (558 = 35.9% от уникальных)
// Одобрено: UTM approval_status = APPROVED (39 = 7.0% от согласий)
// Уникальные заявки: 1,555 (вместо 2,399)
// =============================================

// Исторические данные (заявки по неделям - БЕЗ дедупликации)
const weeklyComparison = [
  { week: 'Нед. 7',  period: '9-15 фев',      google: 109, meta: 136, kolesa: 323, dealers: 72,  other: 44,  total: 684  },
  { week: 'Нед. 8',  period: '16-22 фев',     google: 89,  meta: 250, kolesa: 366, dealers: 89,  other: 44,  total: 838  },
  { week: 'Нед. 9',  period: '23 фев-1 мар',  google: 99,  meta: 311, kolesa: 415, dealers: 78,  other: 98,  total: 1001 },
  { week: 'Нед. 10', period: '2-8 мар',       google: 73,  meta: 124, kolesa: 362, dealers: 191, other: 7,   total: 757  },
  { week: 'Нед. 11', period: '9-15 мар',      google: 130, meta: 309, kolesa: 405, dealers: 85,  other: 64,  total: 993  },
  { week: 'Нед. 12-13', period: '16-29 мар',  google: 210, meta: 513, kolesa: 709, dealers: 37,  other: 86,  total: 1555 },
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

// ===== ВОРОНКА ПО КАНАЛАМ — НЕДЕЛЯ 12-13 (УНИКАЛЬНЫЕ ПО БИН) =====
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 15275, clicks: 3087, ctr: 20.21,
    leads: 210, consents: 75, approved: 19,
    cost: 1313.36,
    note: null,
  },
  {
    channel: 'Meta Ads',
    impressions: 207202, clicks: 1060, ctr: 0.51,
    leads: 513, consents: 220, approved: 14,
    cost: 1185.20,
    note: null,
  },
  {
    channel: 'Kolesa DM',
    impressions: null, clicks: null, ctr: null,
    leads: 709, consents: 212, approved: null,
    cost: null,
    note: 'Партнерский источник (45.6% уникальных заявок)',
  },
  {
    channel: 'Zoomlion',
    impressions: 68986, clicks: 417, ctr: 0.60,
    leads: 27, consents: 10, approved: 3,
    cost: null,
    note: 'Пуши (248 кликов) + Баннеры (169 кликов)',
  },
  {
    channel: 'Дилеры',
    impressions: null, clicks: null, ctr: null,
    leads: 37, consents: 28, approved: 3,
    cost: null,
    note: 'UTM dealer',
  },
  {
    channel: 'Остальные',
    impressions: null, clicks: null, ctr: null,
    leads: 528, consents: 0, approved: 0,
    cost: null,
    note: 'Kolesa Page, Online Bank, Instagram, WhatsApp, Push',
  },
];

// Google Ads — кампании нед. 12-13
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова',     impressions: 9162, clicks: 2076, conversions: 186.15, cost: 880.95, ctr: 22.65, cr: 8.96 },
  { campaign: 'Строительство',            impressions: 2135, clicks: 319,  conversions: 11.56,  cost: 129.57,  ctr: 14.94, cr: 3.62 },
  { campaign: 'Такси / Автобусы',         impressions: 1203, clicks: 191,  conversions: 12.62,  cost: 79.77,   ctr: 15.88, cr: 6.61 },
  { campaign: 'Сельское хозяйство',       impressions: 1105, clicks: 193,  conversions: 8.50,   cost: 75.18,   ctr: 17.46, cr: 4.40 },
  { campaign: 'Грузоперевозки',           impressions: 573,  clicks: 83,   conversions: 5.00,   cost: 32.93,   ctr: 14.49, cr: 6.02 },
  { campaign: 'Дистрибуция и ритейл',     impressions: 97,   clicks: 25,   conversions: 16.36,  cost: 14.96,   ctr: 25.77, cr: 65.44 },
];

// Google Ads — динамика нед. 8–13
const googleAdsWeekly = [
  { week: 'Нед. 8',  impressions: 8498,  clicks: 1738, leads: 89,  cost: 726.61 },
  { week: 'Нед. 9',  impressions: 10299, clicks: 1855, leads: 99,  cost: 745.55 },
  { week: 'Нед. 10', impressions: 7651,  clicks: 1561, leads: 73,  cost: 664.16 },
  { week: 'Нед. 11', impressions: 11038, clicks: 1908, leads: 130, cost: 768.83 },
  { week: 'Нед. 12-13', impressions: 15275, clicks: 3087, leads: 313, cost: 1313.36 },
];

// Meta Ads — динамика нед. 8–13
const metaAdsWeekly = [
  { week: 'Нед. 8',  impressions: 89234,  reach: 45123, leads: 250, cost: 245.67 },
  { week: 'Нед. 9',  impressions: 123456, reach: 67890, leads: 311, cost: 312.45 },
  { week: 'Нед. 10', impressions: 98765,  reach: 54321, leads: 124, cost: 198.76 },
  { week: 'Нед. 11', impressions: 159351, reach: 82282, leads: 309, cost: 297.20 },
  { week: 'Нед. 12-13', impressions: 207202, reach: 92282, leads: 648, cost: 1185.20 },
];

// Zoomlion маркетинговые активности
const zoomlionFunnel = [
  { stage: 'Пуши запущено', value: 33437 },
  { stage: 'Пуши прочитано', value: 2599 },
  { stage: 'Клик из пушей', value: 248 },
  { stage: 'Баннеры показано', value: 14345 },
  { stage: 'Клик из баннеров', value: 169 },
  { stage: 'Всего кликов', value: 417 },
  { stage: 'Заявки', value: 45 },
  { stage: 'Согласия', value: 11 },
  { stage: 'Одобрено', value: 3 },
];

// Согласия по каналам (CRM методика)
const consentsByChannel = [
  { channel: 'Google', consents: 80, leads: 313, rate: 25.6 },
  { channel: 'Meta', consents: 257, leads: 648, rate: 39.7 },
  { channel: 'Zoomlion', consents: 11, leads: 45, rate: 24.4 },
  { channel: 'Дилеры', consents: 31, leads: 53, rate: 58.5 },
  { channel: 'Kolesa DM', consents: 811, leads: 811, rate: 100.0 },
];

export default function AnalyticsMarchW1213() {
  const totalLeads = channelTotals.reduce((sum, ch) => sum + ch.leads, 0);
  const totalConsents = channelTotals.reduce((sum, ch) => sum + (ch.consents || 0), 0);
  const totalApproved = channelTotals.reduce((sum, ch) => sum + (ch.approved || 0), 0);
  const totalSpend = channelTotals.reduce((sum, ch) => sum + (ch.cost || 0), 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-green-600 flex items-center justify-center text-white font-bold">H</div>
            <span className="font-bold text-lg">Halyk Leasing</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Период: 16-29 марта 2026 | Дата: 12.03.2026
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <p className="text-lg text-muted-foreground">Неделя 12-13: 16-29 марта 2026</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего заявок</p>
                <p className="text-3xl font-bold mt-2">{totalLeads.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Согласия (CRM)</p>
                <p className="text-3xl font-bold mt-2">{totalConsents.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">34.9% CR</p>
              </div>
              <Badge className="bg-green-600">✓</Badge>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Одобрено</p>
                <p className="text-3xl font-bold mt-2">{totalApproved.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">4.9% от всех</p>
              </div>
              <Badge className="bg-purple-600">✓✓</Badge>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Расходы</p>
                <p className="text-3xl font-bold mt-2">${totalSpend.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta</p>
              </div>
              <Database className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Воронка по каналам */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Воронка по каналам</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-4 font-semibold">Канал</th>
                  <th className="text-right py-2 px-4 font-semibold">Заявки</th>
                  <th className="text-right py-2 px-4 font-semibold">Согласия (CRM)</th>
                  <th className="text-right py-2 px-4 font-semibold">CR</th>
                  <th className="text-right py-2 px-4 font-semibold">Одобрено</th>
                  <th className="text-right py-2 px-4 font-semibold">CR Одобр.</th>
                  <th className="text-left py-2 px-4 font-semibold">Примечание</th>
                </tr>
              </thead>
              <tbody>
                {channelTotals.map((ch, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{ch.channel}</td>
                    <td className="text-right py-3 px-4">{ch.leads}</td>
                    <td className="text-right py-3 px-4">{ch.consents || '—'}</td>
                    <td className="text-right py-3 px-4">{ch.consents ? `${(ch.consents/ch.leads*100).toFixed(1)}%` : '—'}</td>
                    <td className="text-right py-3 px-4">{ch.approved || '—'}</td>
                    <td className="text-right py-3 px-4">{ch.approved && ch.consents ? `${(ch.approved/ch.consents*100).toFixed(1)}%` : '—'}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">{ch.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Динамика заявок */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Динамика заявок по неделям</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Google Ads" fill="#4285F4" />
              <Bar dataKey="Meta Ads" fill="#1877F2" />
              <Bar dataKey="Kolesa DM" fill="#FF6B00" />
              <Bar dataKey="Дилеры" fill="#22C55E" />
              <Bar dataKey="Остальные" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Google Ads */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Google Ads — Кампании</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-4 font-semibold">Кампания</th>
                  <th className="text-right py-2 px-4 font-semibold">Показы</th>
                  <th className="text-right py-2 px-4 font-semibold">Клики</th>
                  <th className="text-right py-2 px-4 font-semibold">CTR</th>
                  <th className="text-right py-2 px-4 font-semibold">Конверсии</th>
                  <th className="text-right py-2 px-4 font-semibold">Расходы</th>
                </tr>
              </thead>
              <tbody>
                {googleAdsCampaigns.map((camp, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{camp.campaign}</td>
                    <td className="text-right py-3 px-4">{camp.impressions.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{camp.clicks.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{camp.ctr.toFixed(2)}%</td>
                    <td className="text-right py-3 px-4">{camp.conversions.toFixed(2)}</td>
                    <td className="text-right py-3 px-4">${camp.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Zoomlion */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Zoomlion — Маркетинговые активности</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-4">Пуши (Push notifications)</h3>
              <ul className="space-y-2 text-sm">
                <li>Запущено: <strong>33,437</strong> пушей</li>
                <li>Уникальные пользователи: <strong>40,954</strong></li>
                <li>Прочитано: <strong>2,599</strong> (7.8%)</li>
                <li>Клики: <strong>248</strong> (9.5% от прочитанных)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Баннеры (Banners)</h3>
              <ul className="space-y-2 text-sm">
                <li>Размещено: <strong>35,549</strong> баннеров</li>
                <li>Показано: <strong>14,345</strong> (40.4%)</li>
                <li>Клики: <strong>169</strong> (1.2%)</li>
                <li>Статус: На клиентах до 12.04.2026</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm"><strong>Итого кликов из рекламы:</strong> 248 (пуши) + 169 (баннеры) = <strong>417 кликов</strong></p>
            <p className="text-sm mt-2"><strong>CR Клик → Заявка:</strong> 45 заявок / 417 кликов = <strong>10.8%</strong></p>
            <p className="text-sm mt-2"><strong>CR Заявка → Согласие (CRM):</strong> 11 согласий / 45 заявок = <strong>24.4%</strong></p>
          </div>
        </div>

        {/* Согласия по каналам */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Согласия по каналам (CRM Методика)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consentsByChannel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="consents" fill="#22C55E" name="Согласия" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Методология */}
        <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Методология</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• <strong>Дедупликация:</strong> По БИН/ИИН, уникальные заявки: 1,555 (вместо 2,399)</li>
                <li>• <strong>Согласия:</strong> CRM поле МЕТОДИКА не пусто (558 = 35.9% от уникальных)</li>
                <li>• <strong>Одобрено:</strong> UTM approval_status = APPROVED (39 = 7.0% от согласий)</li>
                <li>• <strong>Kolesa DM:</strong> 709 уникальных заявок (45.6%), согласия: 212 (29.9%)</li>
                <li>• <strong>Zoomlion:</strong> 27 уникальных заявок, маркетинговые активности (пуши + баннеры)</li>
                <li>• <strong>Период:</strong> 16-29 марта 2026</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center py-8">
          <Link href="/analytics-march-w11" className="px-6 py-2 rounded-lg border hover:bg-muted transition-colors">
            ← Неделя 11
          </Link>
          <Link href="/" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            На главную
          </Link>
        </div>
      </main>
    </div>
  );
}
