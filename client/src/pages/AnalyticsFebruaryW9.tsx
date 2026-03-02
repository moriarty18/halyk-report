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
  Info, ArrowUpRight, ArrowDownRight, Eye, MousePointer, FileText, UserCheck, MessageCircle
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ ИЗ РЕКЛАМНЫХ КАБИНЕТОВ (ФЕВРАЛЬ 2026)
// Неделя 9: 23 февраля - 1 марта 2026
// С ДЕДУПЛИКАЦИЕЙ ПО БИН
// =============================================================================

// Исторические данные за недели 1-9 для сравнения
const weeklyComparison = [
  {
    week: 'Нед. 1', period: '1-4 янв',
    google_leads: 54, google_consents: 7, google_approved: 2, google_cr_consent: 13.0, google_cr_approved: 28.6,
    meta_leads: 151, meta_consents: 16, meta_approved: 4, meta_cr_consent: 10.6, meta_cr_approved: 25.0,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 153, kolesa_consents: 11, kolesa_approved: 1, kolesa_cr_consent: 7.2, kolesa_cr_approved: 9.1,
    managers_leads: 0, managers_consents: 0, managers_approved: 0, managers_cr_consent: 0, managers_cr_approved: 0,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 13, organic_consents: 5, organic_approved: 0, organic_cr_consent: 38.5, organic_cr_approved: 0,
    total_leads: 371, total_consents: 39, total_approved: 7, total_cr_consent: 10.5, total_cr_approved: 17.9,
  },
  {
    week: 'Нед. 2', period: '5-11 янв',
    google_leads: 139, google_consents: 23, google_approved: 7, google_cr_consent: 16.5, google_cr_approved: 30.4,
    meta_leads: 241, meta_consents: 25, meta_approved: 7, meta_cr_consent: 10.4, meta_cr_approved: 28.0,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 355, kolesa_consents: 50, kolesa_approved: 16, kolesa_cr_consent: 14.1, kolesa_cr_approved: 32.0,
    managers_leads: 29, managers_consents: 22, managers_approved: 6, managers_cr_consent: 75.9, managers_cr_approved: 27.3,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 46, organic_consents: 29, organic_approved: 8, organic_cr_consent: 63.0, organic_cr_approved: 27.6,
    total_leads: 810, total_consents: 149, total_approved: 44, total_cr_consent: 18.4, total_cr_approved: 29.5,
  },
  {
    week: 'Нед. 3', period: '12-18 янв',
    google_leads: 116, google_consents: 25, google_approved: 3, google_cr_consent: 21.6, google_cr_approved: 12.0,
    meta_leads: 193, meta_consents: 35, meta_approved: 8, meta_cr_consent: 18.1, meta_cr_approved: 22.9,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 394, kolesa_consents: 51, kolesa_approved: 12, kolesa_cr_consent: 12.9, kolesa_cr_approved: 23.5,
    managers_leads: 56, managers_consents: 46, managers_approved: 24, managers_cr_consent: 82.1, managers_cr_approved: 52.2,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 66, organic_consents: 42, organic_approved: 12, organic_cr_consent: 63.6, organic_cr_approved: 28.6,
    total_leads: 825, total_consents: 199, total_approved: 59, total_cr_consent: 24.1, total_cr_approved: 29.6,
  },
  {
    week: 'Нед. 4', period: '19-25 янв',
    google_leads: 131, google_consents: 36, google_approved: 10, google_cr_consent: 27.5, google_cr_approved: 27.8,
    meta_leads: 186, meta_consents: 26, meta_approved: 9, meta_cr_consent: 14.0, meta_cr_approved: 34.6,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 414, kolesa_consents: 63, kolesa_approved: 13, kolesa_cr_consent: 15.2, kolesa_cr_approved: 20.6,
    managers_leads: 59, managers_consents: 51, managers_approved: 20, managers_cr_consent: 86.4, managers_cr_approved: 39.2,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 76, organic_consents: 44, organic_approved: 11, organic_cr_consent: 57.9, organic_cr_approved: 25.0,
    total_leads: 866, total_consents: 220, total_approved: 63, total_cr_consent: 25.4, total_cr_approved: 28.6,
  },
  {
    week: 'Нед. 5', period: '26 янв-1 фев',
    google_leads: 115, google_consents: 35, google_approved: 6, google_cr_consent: 30.4, google_cr_approved: 17.1,
    meta_leads: 174, meta_consents: 24, meta_approved: 5, meta_cr_consent: 13.8, meta_cr_approved: 20.8,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 353, kolesa_consents: 36, kolesa_approved: 6, kolesa_cr_consent: 10.2, kolesa_cr_approved: 16.7,
    managers_leads: 49, managers_consents: 43, managers_approved: 13, managers_cr_consent: 87.8, managers_cr_approved: 30.2,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 83, organic_consents: 36, organic_approved: 3, organic_cr_consent: 43.4, organic_cr_approved: 8.3,
    total_leads: 774, total_consents: 174, total_approved: 33, total_cr_consent: 22.5, total_cr_approved: 19.0,
  },
  {
    week: 'Нед. 6', period: '2-8 фев',
    google_leads: 132, google_consents: 56, google_approved: 12, google_cr_consent: 42.4, google_cr_approved: 21.4,
    meta_leads: 149, meta_consents: 36, meta_approved: 9, meta_cr_consent: 24.2, meta_cr_approved: 25.0,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 347, kolesa_consents: 94, kolesa_approved: 11, kolesa_cr_consent: 27.1, kolesa_cr_approved: 11.7,
    managers_leads: 42, managers_consents: 36, managers_approved: 13, managers_cr_consent: 85.7, managers_cr_approved: 36.1,
    dealers_leads: 54, dealers_consents: 28, dealers_approved: 6, dealers_cr_consent: 51.9, dealers_cr_approved: 21.4,
    organic_leads: 33, organic_consents: 18, organic_approved: 1, organic_cr_consent: 54.5, organic_cr_approved: 5.6,
    total_leads: 757, total_consents: 258, total_approved: 52, total_cr_consent: 34.1, total_cr_approved: 20.2,
  },
  {
    week: 'Нед. 7', period: '9-15 фев',
    google_leads: 109, google_consents: 45, google_approved: 5, google_cr_consent: 41.3, google_cr_approved: 11.1,
    meta_leads: 136, meta_consents: 29, meta_approved: 2, meta_cr_consent: 21.3, meta_cr_approved: 6.9,
    whatsapp_leads: 188, whatsapp_consents: 94, whatsapp_approved: 3, whatsapp_cr_consent: 50.0, whatsapp_cr_approved: 3.2,
    kolesa_leads: 323, kolesa_consents: 93, kolesa_approved: 11, kolesa_cr_consent: 28.8, kolesa_cr_approved: 11.8,
    managers_leads: 55, managers_consents: 50, managers_approved: 32, managers_cr_consent: 90.9, managers_cr_approved: 64.0,
    dealers_leads: 72, dealers_consents: 50, dealers_approved: 5, dealers_cr_consent: 69.4, dealers_cr_approved: 10.0,
    organic_leads: 44, organic_consents: 30, organic_approved: 1, organic_cr_consent: 68.2, organic_cr_approved: 3.3,
    total_leads: 927, total_consents: 391, total_approved: 59, total_cr_consent: 42.2, total_cr_approved: 15.1,
  },
  {
    week: 'Нед. 8', period: '16-22 фев',
    google_leads: 89, google_consents: 22, google_approved: 3, google_cr_consent: 24.7, google_cr_approved: 13.6,
    meta_leads: 250, meta_consents: 84, meta_approved: 5, meta_cr_consent: 33.6, meta_cr_approved: 6.0,
    whatsapp_leads: 35, whatsapp_consents: 6, whatsapp_approved: 0, whatsapp_cr_consent: 17.1, whatsapp_cr_approved: 0,
    kolesa_leads: 366, kolesa_consents: 105, kolesa_approved: 10, kolesa_cr_consent: 28.7, kolesa_cr_approved: 9.5,
    managers_leads: 151, managers_consents: 142, managers_approved: 15, managers_cr_consent: 94.0, managers_cr_approved: 10.6,
    dealers_leads: 89, dealers_consents: 47, dealers_approved: 10, dealers_cr_consent: 52.8, dealers_cr_approved: 21.3,
    organic_leads: 44, organic_consents: 31, organic_approved: 4, organic_cr_consent: 70.5, organic_cr_approved: 12.9,
    total_leads: 1024, total_consents: 437, total_approved: 47, total_cr_consent: 42.7, total_cr_approved: 10.8,
  },
  {
    week: 'Нед. 9', period: '23 фев-1 мар',
    google_leads: 99, google_consents: 38, google_approved: 5, google_cr_consent: 38.4, google_cr_approved: 13.2,
    meta_leads: 311, meta_consents: 118, meta_approved: 7, meta_cr_consent: 37.9, meta_cr_approved: 5.9,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 415, kolesa_consents: 107, kolesa_approved: 10, kolesa_cr_consent: 25.8, kolesa_cr_approved: 9.3,
    managers_leads: 68, managers_consents: 52, managers_approved: 29, managers_cr_consent: 76.5, managers_cr_approved: 55.8,
    dealers_leads: 78, dealers_consents: 60, dealers_approved: 10, dealers_cr_consent: 76.9, dealers_cr_approved: 16.7,
    organic_leads: 98, organic_consents: 68, organic_approved: 10, organic_cr_consent: 69.4, organic_cr_approved: 14.7,
    total_leads: 1057, total_consents: 429, total_approved: 52, total_cr_consent: 40.6, total_cr_approved: 12.1,
  },
];

// Данные для графиков
const leadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_leads,
  'Meta Ads': w.meta_leads,
  'WhatsApp': w.whatsapp_leads,
  'Kolesa': w.kolesa_leads,
  'Мен./Дил.': (w.managers_leads || 0) + (w.dealers_leads || 0),
  'Органика': w.organic_leads,
  'Всего': w.total_leads,
}));

const approvedChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_approved,
  'Meta Ads': w.meta_approved,
  'WhatsApp': w.whatsapp_approved,
  'Kolesa': w.kolesa_approved,
  'Мен./Дил.': (w.managers_approved || 0) + (w.dealers_approved || 0),
  'Органика': w.organic_approved,
  'Всего': w.total_approved,
}));

const crConsentChartData = weeklyComparison.map(w => {
  const mgr_dlr_leads = (w.managers_leads || 0) + (w.dealers_leads || 0);
  const mgr_dlr_consents = (w.managers_consents || 0) + (w.dealers_consents || 0);
  return {
    week: w.week,
    'Google Ads': w.google_cr_consent,
    'Meta Ads': w.meta_cr_consent,
    'WhatsApp': w.whatsapp_cr_consent,
    'Kolesa': w.kolesa_cr_consent,
    'Мен./Дил.': mgr_dlr_leads > 0 ? Math.round(mgr_dlr_consents / mgr_dlr_leads * 1000) / 10 : 0,
    'Органика': w.organic_cr_consent,
    'Среднее': w.total_cr_consent,
  };
});

const crApprovedChartData = weeklyComparison.map(w => {
  const mgr_dlr_consents = (w.managers_consents || 0) + (w.dealers_consents || 0);
  const mgr_dlr_approved = (w.managers_approved || 0) + (w.dealers_approved || 0);
  return {
    week: w.week,
    'Google Ads': w.google_cr_approved,
    'Meta Ads': w.meta_cr_approved,
    'WhatsApp': w.whatsapp_cr_approved,
    'Kolesa': w.kolesa_cr_approved,
    'Мен./Дил.': mgr_dlr_consents > 0 ? Math.round(mgr_dlr_approved / mgr_dlr_consents * 1000) / 10 : 0,
    'Органика': w.organic_cr_approved,
    'Среднее': w.total_cr_approved,
  };
});

// ===== НЕДЕЛЯ 9 (текущая) — основные данные =====

// Google Ads — Неделя 9
const googleAdsWeekly = [
  { 
    week: 'Неделя 6', period: '2-8 фев',
    impressions: 8171, clicks: 1912, leads: 132, consents: 56, approved: 12,
    cost: 741.44, ctr: 23.40, cr_lead: 6.90, cr_consent: 42.4, cr_approved: 21.4
  },
  { 
    week: 'Неделя 7', period: '9-15 фев',
    impressions: 9081, clicks: 1831, leads: 109, consents: 45, approved: 5,
    cost: 773.34, ctr: 20.16, cr_lead: 5.95, cr_consent: 41.3, cr_approved: 11.1
  },
  { 
    week: 'Неделя 8', period: '16-22 фев',
    impressions: 8498, clicks: 1738, leads: 89, consents: 22, approved: 3,
    cost: 726.61, ctr: 20.45, cr_lead: 5.12, cr_consent: 24.7, cr_approved: 13.6
  },
  { 
    week: 'Неделя 9', period: '23 фев-1 мар',
    impressions: 10299, clicks: 1855, leads: 99, consents: 38, approved: 5,
    cost: 745.55, ctr: 18.01, cr_lead: 5.34, cr_consent: 38.4, cr_approved: 13.2
  },
];

// Meta Ads — Неделя 9
const metaAdsWeekly = [
  { 
    week: 'Неделя 6', period: '2-8 фев',
    impressions: 51149, reach: 25763, leads: 149, consents: 36, approved: 9,
    cost: 173.92, cr_lead: 0.29, cr_consent: 24.2, cr_approved: 25.0
  },
  { 
    week: 'Неделя 7', period: '9-15 фев',
    impressions: 49394, reach: 24438, leads: 136, consents: 29, approved: 2,
    cost: 176.17, cr_lead: 0.28, cr_consent: 21.3, cr_approved: 6.9
  },
  { 
    week: 'Неделя 8', period: '16-22 фев',
    impressions: 63498, reach: 30842, leads: 250, consents: 84, approved: 5,
    cost: 256.65, cr_lead: 0.39, cr_consent: 33.6, cr_approved: 6.0
  },
  { 
    week: 'Неделя 9', period: '23 фев-1 мар',
    impressions: 69107, reach: 34961, leads: 311, consents: 118, approved: 7,
    cost: 301.25, cr_lead: 0.45, cr_consent: 37.9, cr_approved: 5.9
  },
];

// Kolesa — Неделя 9
const kolesaWeekly = [
  { week: 'Неделя 6', period: '2-8 фев', leads: 347, consents: 94, approved: 11, cr_consent: 27.1, cr_approved: 11.7 },
  { week: 'Неделя 7', period: '9-15 фев', leads: 323, consents: 93, approved: 11, cr_consent: 28.8, cr_approved: 11.8 },
  { week: 'Неделя 8', period: '16-22 фев', leads: 366, consents: 105, approved: 10, cr_consent: 28.7, cr_approved: 9.5 },
  { week: 'Неделя 9', period: '23 фев-1 мар', leads: 415, consents: 107, approved: 10, cr_consent: 25.8, cr_approved: 9.3 },
];

// Менеджеры — Неделя 9
const managersWeekly = [
  { week: 'Неделя 6', period: '2-8 фев', leads: 42, consents: 36, approved: 13, cr_consent: 85.7, cr_approved: 36.1 },
  { week: 'Неделя 7', period: '9-15 фев', leads: 55, consents: 50, approved: 32, cr_consent: 90.9, cr_approved: 64.0 },
  { week: 'Неделя 8', period: '16-22 фев', leads: 151, consents: 142, approved: 15, cr_consent: 94.0, cr_approved: 10.6 },
  { week: 'Неделя 9', period: '23 фев-1 мар', leads: 68, consents: 52, approved: 29, cr_consent: 76.5, cr_approved: 55.8 },
];

// Дилеры — Неделя 9
const dealersWeekly = [
  { week: 'Неделя 6', period: '2-8 фев', leads: 54, consents: 28, approved: 6, cr_consent: 51.9, cr_approved: 21.4 },
  { week: 'Неделя 7', period: '9-15 фев', leads: 72, consents: 50, approved: 5, cr_consent: 69.4, cr_approved: 10.0 },
  { week: 'Неделя 8', period: '16-22 фев', leads: 89, consents: 47, approved: 10, cr_consent: 52.8, cr_approved: 21.3 },
  { week: 'Неделя 9', period: '23 фев-1 мар', leads: 78, consents: 60, approved: 10, cr_consent: 76.9, cr_approved: 16.7 },
];

// Дилеры по источникам — Неделя 9
const dealerSources = [
  { source: 'ANTO MOTORS', w6: 0, w7: 0, w8: 0, w9: 153 },
  { source: 'ALLUR (Jac, Skoda, Kia, Hongqi)', w6: 7, w7: 5, w8: 11, w9: 16 },
  { source: 'AB MACHINERY (ALMATY BRANDS)', w6: 5, w7: 8, w8: 5, w9: 6 },
  { source: 'ASTANA MOTORS', w6: 4, w7: 3, w8: 5, w9: 6 },
  { source: 'NKB GROUP', w6: 1, w7: 2, w8: 6, w9: 6 },
  { source: 'BAIKONUR MACHINERY', w6: 1, w7: 3, w8: 4, w9: 6 },
  { source: 'ПРОЧИЕ ПАРТНЕРЫ', w6: 7, w7: 6, w8: 10, w9: 6 },
  { source: 'ВИРАЖ', w6: 4, w7: 4, w8: 3, w9: 5 },
  { source: 'AS-AY', w6: 2, w7: 6, w8: 5, w9: 3 },
  { source: 'GLOBUS MACHINERY', w6: 0, w7: 0, w8: 0, w9: 3 },
  { source: 'HYUNDAI CONSTRUCTION', w6: 0, w7: 1, w8: 3, w9: 2 },
  { source: 'Universal Machinery Group', w6: 0, w7: 0, w8: 4, w9: 2 },
  { source: 'Маркетплейс', w6: 10, w7: 11, w8: 12, w9: 11 },
  { source: 'SEVALO', w6: 3, w7: 1, w8: 1, w9: 1 },
  { source: 'ORBIS (Geely, Exceed, Zeekr)', w6: 0, w7: 0, w8: 0, w9: 1 },
  { source: 'AUTODOM MACHINERY(JCB)', w6: 0, w7: 0, w8: 0, w9: 1 },
  { source: 'VOLVO GROUP', w6: 0, w7: 0, w8: 0, w9: 1 },
  { source: 'ZOOMLION', w6: 1, w7: 0, w8: 2, w9: 1 },
  { source: 'СВС-ТРАНС', w6: 0, w7: 0, w8: 0, w9: 1 },
  { source: 'СпецАвто KAZAKHSTAN', w6: 4, w7: 4, w8: 3, w9: 1 },
];

// Органика — Неделя 9
const organicWeekly = [
  { week: 'Неделя 6', period: '2-8 фев', leads: 33, consents: 18, approved: 1, cr_consent: 54.5, cr_approved: 5.6 },
  { week: 'Неделя 7', period: '9-15 фев', leads: 44, consents: 30, approved: 1, cr_consent: 68.2, cr_approved: 3.3 },
  { week: 'Неделя 8', period: '16-22 фев', leads: 44, consents: 31, approved: 4, cr_consent: 70.5, cr_approved: 12.9 },
  { week: 'Неделя 9', period: '23 фев-1 мар', leads: 98, consents: 68, approved: 10, cr_consent: 69.4, cr_approved: 14.7 },
];

// Данные по менеджерам — Неделя 9
const managersData = [
  { name: 'Карашев А.', leads: 23, consents: 13, approved: 0, cr_consent: 56.5, cr_approved: 0 },
  { name: 'Ертаргын Е.', leads: 10, consents: 8, approved: 4, cr_consent: 80.0, cr_approved: 50.0 },
  { name: 'Елкин П.', leads: 9, consents: 7, approved: 6, cr_consent: 77.8, cr_approved: 85.7 },
  { name: 'Камзина З.', leads: 8, consents: 7, approved: 4, cr_consent: 87.5, cr_approved: 57.1 },
  { name: 'Тайгара А.', leads: 7, consents: 7, approved: 6, cr_consent: 100.0, cr_approved: 85.7 },
  { name: 'balgozhina.f', leads: 6, consents: 6, approved: 5, cr_consent: 100.0, cr_approved: 83.3 },
  { name: 'Сатбергенов Н.', leads: 4, consents: 4, approved: 4, cr_consent: 100.0, cr_approved: 100.0 },
  { name: 'mamutbayeva.a', leads: 1, consents: 0, approved: 0, cr_consent: 0, cr_approved: 0 },
];

// Google Ads кампании — Неделя 9
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова', impressions: 5273, clicks: 1213, conversions: 93.5, cost: 494.72, ctr: 23.00, cr: 7.71 },
  { campaign: 'Такси / Автобусы', impressions: 1752, clicks: 180, conversions: 9.0, cost: 73.66, ctr: 10.27, cr: 5.00 },
  { campaign: 'Строительство', impressions: 1458, clicks: 197, conversions: 11.2, cost: 78.70, ctr: 13.51, cr: 5.67 },
  { campaign: 'Сельское хозяйство', impressions: 728, clicks: 108, conversions: 6.5, cost: 35.13, ctr: 14.84, cr: 6.02 },
  { campaign: 'Грузоперевозки', impressions: 478, clicks: 68, conversions: 3.3, cost: 24.72, ctr: 14.23, cr: 4.90 },
  { campaign: 'Дистрибуция и ритейл', impressions: 436, clicks: 57, conversions: 3.5, cost: 24.97, ctr: 13.07, cr: 6.14 },
  { campaign: 'ГМК и нефтедобыча', impressions: 174, clicks: 32, conversions: 1.0, cost: 13.65, ctr: 18.39, cr: 3.12 },
];

// Итоговые данные по каналам — Неделя 9 (текущая)
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 10299, clicks: 1855, leads: 99, consents: 38, approved: 5,
    cost: 745.55, ctr: 18.01, cr_click: 18.01, cr_lead: 5.34, cr_consent: 38.4, cr_approved: 13.2, cpl: 7.53
  },
  {
    channel: 'Meta Ads',
    impressions: 69107, clicks: 1811, leads: 311, consents: 118, approved: 7,
    cost: 301.25, cr_click: 2.62, cr_lead: 17.17, cr_consent: 37.9, cr_approved: 5.9, cpl: 0.97
  },
  {
    channel: 'Kolesa',
    leads: 415, consents: 107, approved: 10, cr_consent: 25.8, cr_approved: 9.3
  },
  {
    channel: 'Менеджеры',
    leads: 68, consents: 52, approved: 29, cr_consent: 76.5, cr_approved: 55.8
  },
  {
    channel: 'Дилеры',
    leads: 78, consents: 60, approved: 10, cr_consent: 76.9, cr_approved: 16.7
  },
  {
    channel: 'Органика',
    leads: 98, consents: 68, approved: 10, cr_consent: 69.4, cr_approved: 14.7
  },
];

// Прочие каналы
const otherChannels = [
  { channel: 'Маркетплейс', leads: 11, consents: 5, approved: 3, cr_consent: 45.5, cr_approved: 60.0 },
  { channel: 'Kolesa-page', leads: 11, consents: 5, approved: 0, cr_consent: 45.5, cr_approved: 0 },
  { channel: 'WhatsApp (источник)', leads: 3, consents: 2, approved: 0, cr_consent: 66.7, cr_approved: 0 },
  { channel: 'Сайт', leads: 11, consents: 9, approved: 0, cr_consent: 81.8, cr_approved: 0 },
  { channel: 'Действующие клиенты', leads: 3, consents: 3, approved: 1, cr_consent: 100.0, cr_approved: 33.3 },
  { channel: 'Перезаведено', leads: 17, consents: 14, approved: 6, cr_consent: 82.4, cr_approved: 42.9 },
];

// Итоги — Неделя 9
const totalLeads = 1057;
const totalConsents = 429;
const totalApproved = 52;
const totalSpend = 745.55 + 301.25;
const paidLeads = 99 + 311;

// Цвета для каналов
const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads': '#0668E1',
  'WhatsApp': '#25D366',
  'Kolesa': '#ff6b35',
  'Менеджеры/Дилеры': '#8b5cf6',
  'Менеджеры': '#a78bfa',
  'Дилеры': '#f59e0b',
  'Органика': '#22c55e'
};

// Дельта между неделями
const w8 = weeklyComparison[7];
const w9 = weeklyComparison[8];
const deltaLeads = w9.total_leads - w8.total_leads;
const deltaConsents = w9.total_consents - w8.total_consents;
const deltaApproved = w9.total_approved - w8.total_approved;

export default function AnalyticsFebruaryW9() {
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
            <Link href="/analytics-february" className="hover:text-foreground transition-colors">Аналитика (Фев)</Link>
            <span className="text-foreground">Неделя 9</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            23 февраля - 1 марта 2026
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
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Неделя 9</h1>
              <p className="text-muted-foreground mt-1">23 февраля – 1 марта 2026 | Данные с дедупликацией по БИН</p>
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
            <Link href="/analytics-february">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">Февраль (нед. 6-8)</Badge>
            </Link>
            <Badge variant="default">Неделя 9</Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые показатели — Неделя 9</h2>
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaLeads >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaLeads >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaLeads >= 0 ? '+' : ''}{deltaLeads} vs нед. 8
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Согласий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalConsents}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaConsents >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaConsents >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaConsents >= 0 ? '+' : ''}{deltaConsents} vs нед. 8 | CR {(totalConsents / totalLeads * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Одобрено</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{totalApproved}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaApproved >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaApproved >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaApproved >= 0 ? '+' : ''}{deltaApproved} vs нед. 8 | CR {(totalApproved / totalConsents * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Средний CPL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(totalSpend / paidLeads).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">платные каналы ({paidLeads} лидов)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Full Funnel Table with CR at every stage */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Полная воронка по каналам — Неделя 9</h2>
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
                      <th className="text-right py-3 px-2 font-medium">CR Клик→Заявка</th>
                      <th className="text-right py-3 px-2 font-medium">Согласия</th>
                      <th className="text-right py-3 px-2 font-medium">CR Заявка→Согласие</th>
                      <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-2 font-medium">CR Согласие→Одобрение</th>
                      <th className="text-right py-3 px-2 font-medium">Расход</th>
                      <th className="text-right py-3 px-2 font-medium">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((ch, i) => {
                      const hasImpr = ch.impressions !== undefined;
                      const ctr = hasImpr && ch.clicks ? (ch.clicks / ch.impressions * 100).toFixed(2) : null;
                      const crLead = ch.clicks ? (ch.leads / ch.clicks * 100).toFixed(2) : null;
                      const crConsent = ch.leads > 0 ? (ch.consents / ch.leads * 100).toFixed(1) : '0';
                      const crApproved = ch.consents > 0 ? (ch.approved / ch.consents * 100).toFixed(1) : '0';
                      const cpl = ch.cost ? (ch.cost / ch.leads).toFixed(2) : null;
                      return (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[ch.channel] }}></div>
                              {ch.channel}
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 font-mono">{hasImpr ? ch.impressions?.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.clicks ? ch.clicks.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{ctr ? `${ctr}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono font-semibold">{ch.leads.toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{crLead ? `${crLead}%` : '—'}</td>
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
                      <td className="py-3 px-2">ИТОГО (основные)</td>
                      <td className="text-right py-3 px-2 font-mono">79,406</td>
                      <td className="text-right py-3 px-2 font-mono">3,666</td>
                      <td className="text-right py-3 px-2 font-mono text-blue-600">4.62%</td>
                      <td className="text-right py-3 px-2 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-2 font-mono text-blue-600">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalConsents / totalLeads * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalApproved / totalConsents * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-2 font-mono">${(totalSpend / paidLeads).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Other channels */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Прочие каналы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Канал</th>
                      <th className="text-right py-3 px-3 font-medium">Заявки</th>
                      <th className="text-right py-3 px-3 font-medium">Согласия</th>
                      <th className="text-right py-3 px-3 font-medium">CR</th>
                      <th className="text-right py-3 px-3 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-3 font-medium">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherChannels.map((ch, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3">{ch.channel}</td>
                        <td className="text-right py-2 px-3 font-mono">{ch.leads}</td>
                        <td className="text-right py-2 px-3 font-mono">{ch.consents}</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">{ch.cr_consent}%</td>
                        <td className="text-right py-2 px-3 font-mono">{ch.approved}</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">{ch.cr_approved}%</td>
                      </tr>
                    ))}
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="google">Google Ads</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
              <TabsTrigger value="kolesa">Kolesa</TabsTrigger>
              <TabsTrigger value="managers">Менеджеры</TabsTrigger>
              <TabsTrigger value="dealers">Дилеры</TabsTrigger>
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
                  <CardDescription>Показы → Клики → Заявки → Согласия → Одобрено | CR на каждом этапе</CardDescription>
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
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === googleAdsWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{week.ctr}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{week.cr_lead}%</td>
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
                    <p>Неделя 9: CPL: ${(745.55 / 99).toFixed(2)} | Cost per Consent: ${(745.55 / 38).toFixed(2)} | Cost per Approval: ${(745.55 / 5).toFixed(2)}</p>
                  </div>

                  <Separator className="my-6" />

                  <h4 className="font-semibold mb-4">Разбивка по кампаниям — Неделя 9</h4>
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
                            <td className="py-2 px-2 text-sm">{c.campaign}</td>
                            <td className="text-right py-2 px-2 font-mono">{c.impressions.toLocaleString()}</td>
                            <td className="text-right py-2 px-2 font-mono">{c.clicks.toLocaleString()}</td>
                            <td className="text-right py-2 px-2 font-mono text-blue-600">{c.ctr}%</td>
                            <td className="text-right py-2 px-2 font-mono">{c.conversions}</td>
                            <td className="text-right py-2 px-2 font-mono text-blue-600">{c.cr}%</td>
                            <td className="text-right py-2 px-2 font-mono">${c.cost.toFixed(2)}</td>
                            <td className="text-right py-2 px-2 font-mono">${(c.cost / c.clicks).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-2 px-2">ИТОГО</td>
                          <td className="text-right py-2 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.impressions, 0).toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.clicks, 0).toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono text-blue-600">{(googleAdsCampaigns.reduce((s, c) => s + c.clicks, 0) / googleAdsCampaigns.reduce((s, c) => s + c.impressions, 0) * 100).toFixed(2)}%</td>
                          <td className="text-right py-2 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.conversions, 0).toFixed(1)}</td>
                          <td className="text-right py-2 px-2 font-mono text-blue-600">{(googleAdsCampaigns.reduce((s, c) => s + c.conversions, 0) / googleAdsCampaigns.reduce((s, c) => s + c.clicks, 0) * 100).toFixed(2)}%</td>
                          <td className="text-right py-2 px-2 font-mono">${googleAdsCampaigns.reduce((s, c) => s + c.cost, 0).toFixed(2)}</td>
                          <td className="text-right py-2 px-2 font-mono">${(googleAdsCampaigns.reduce((s, c) => s + c.cost, 0) / googleAdsCampaigns.reduce((s, c) => s + c.clicks, 0)).toFixed(2)}</td>
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
                  <CardDescription>Показы → Клики → Заявки → Согласия → Одобрено | CR на каждом этапе</CardDescription>
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
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === metaAdsWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.reach.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{week.cr_lead}%</td>
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
                    <p>Неделя 9: CPL: ${(301.25 / 311).toFixed(2)} | Cost per Consent: ${(301.25 / 118).toFixed(2)} | Cost per Approval: ${(301.25 / 7).toFixed(2)} | ANTO MOTORS: 146 из 311 заявок (47%)</p>
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
                  <CardDescription>Заявки → Согласия → Одобрено (включая автора kolesa) | CR на каждом этапе</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR Заявка→Согласие</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR Согласие→Одобрение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kolesaWeekly.map((week, i) => (
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === kolesaWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
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
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Менеджеры'] }}></div>
                      Менеджеры — Воронка по неделям
                    </CardTitle>
                    <CardDescription>Заявки добавленные менеджерами вручную | CR на каждом этапе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Неделя</th>
                            <th className="text-right py-3 px-4 font-medium">Заявки</th>
                            <th className="text-right py-3 px-4 font-medium">Согласия</th>
                            <th className="text-right py-3 px-4 font-medium">CR Заявка→Согласие</th>
                            <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                            <th className="text-right py-3 px-4 font-medium">CR Согласие→Одобрение</th>
                          </tr>
                        </thead>
                        <tbody>
                          {managersWeekly.map((week, i) => (
                            <tr key={i} className={`border-b hover:bg-muted/50 ${i === managersWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
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

                    <h4 className="font-semibold mb-4">Менеджеры — Детализация (Неделя 9)</h4>
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
                          {managersData.map((m, i) => (
                            <tr key={i} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{m.name}</td>
                              <td className="text-right py-3 px-4 font-mono">{m.leads}</td>
                              <td className="text-right py-3 px-4 font-mono">{m.consents}</td>
                              <td className="text-right py-3 px-4 font-mono text-emerald-600">{m.cr_consent}%</td>
                              <td className="text-right py-3 px-4 font-mono">{m.approved}</td>
                              <td className="text-right py-3 px-4 font-mono text-emerald-600">{m.cr_approved}%</td>
                            </tr>
                          ))}
                          <tr className="font-bold bg-muted/30">
                            <td className="py-3 px-4">ИТОГО Менеджеры</td>
                            <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.leads, 0)}</td>
                            <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.consents, 0)}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{(managersData.reduce((s, m) => s + m.consents, 0) / managersData.reduce((s, m) => s + m.leads, 0) * 100).toFixed(1)}%</td>
                            <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.approved, 0)}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{(managersData.reduce((s, m) => s + m.approved, 0) / managersData.reduce((s, m) => s + m.consents, 0) * 100).toFixed(1)}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Dealers Tab */}
            <TabsContent value="dealers" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Дилеры'] }}></div>
                      Дилеры — Воронка по неделям
                    </CardTitle>
                    <CardDescription>Заявки от дилерских партнёров (вкл. ИП Дилеры) | CR на каждом этапе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Неделя</th>
                            <th className="text-right py-3 px-4 font-medium">Заявки</th>
                            <th className="text-right py-3 px-4 font-medium">Согласия</th>
                            <th className="text-right py-3 px-4 font-medium">CR Заявка→Согласие</th>
                            <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                            <th className="text-right py-3 px-4 font-medium">CR Согласие→Одобрение</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dealersWeekly.map((week, i) => (
                            <tr key={i} className={`border-b hover:bg-muted/50 ${i === dealersWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
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

                    <h4 className="font-semibold mb-4">Заявки по дилерам (источник)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-3 font-medium">Дилер / Источник</th>
                            <th className="text-right py-3 px-3 font-medium">Нед. 6</th>
                            <th className="text-right py-3 px-3 font-medium">Нед. 7</th>
                            <th className="text-right py-3 px-3 font-medium">Нед. 8</th>
                            <th className="text-right py-3 px-3 font-medium bg-blue-50 dark:bg-blue-950/30">Нед. 9</th>
                            <th className="text-right py-3 px-3 font-medium">Всего</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dealerSources.map((d, i) => (
                            <tr key={i} className="border-b hover:bg-muted/50">
                              <td className="py-2 px-3 text-xs">{d.source}</td>
                              <td className="text-right py-2 px-3 font-mono text-xs">{d.w6 || '—'}</td>
                              <td className="text-right py-2 px-3 font-mono text-xs">{d.w7 || '—'}</td>
                              <td className="text-right py-2 px-3 font-mono text-xs">{d.w8 || '—'}</td>
                              <td className="text-right py-2 px-3 font-mono text-xs bg-blue-50 dark:bg-blue-950/30 font-semibold">{d.w9 || '—'}</td>
                              <td className="text-right py-2 px-3 font-mono text-xs font-bold">{d.w6 + d.w7 + d.w8 + d.w9}</td>
                            </tr>
                          ))}
                          <tr className="font-bold bg-muted/30">
                            <td className="py-2 px-3">ИТОГО</td>
                            <td className="text-right py-2 px-3 font-mono">{dealerSources.reduce((s, d) => s + d.w6, 0)}</td>
                            <td className="text-right py-2 px-3 font-mono">{dealerSources.reduce((s, d) => s + d.w7, 0)}</td>
                            <td className="text-right py-2 px-3 font-mono">{dealerSources.reduce((s, d) => s + d.w8, 0)}</td>
                            <td className="text-right py-2 px-3 font-mono bg-blue-50 dark:bg-blue-950/30">{dealerSources.reduce((s, d) => s + d.w9, 0)}</td>
                            <td className="text-right py-2 px-3 font-mono">{dealerSources.reduce((s, d) => s + d.w6 + d.w7 + d.w8 + d.w9, 0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Organic Tab */}
            <TabsContent value="organic" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Органика'] }}></div>
                    Органика / Прямой трафик — Воронка
                  </CardTitle>
                  <CardDescription>Self Service без UTM, API, online_bank | CR на каждом этапе</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR Заявка→Согласие</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR Согласие→Одобрение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organicWeekly.map((week, i) => (
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === organicWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
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
              <CardTitle className="text-base">Заявки по каналам (недели 1-9)</CardTitle>
              <CardDescription>Количество уникальных заявок (дедупликация по БИН) по каждому каналу</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Неделя</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Google Ads']}}>Google</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Meta Ads']}}>Meta</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['WhatsApp']}}>WhatsApp</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Kolesa']}}>Kolesa</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Менеджеры/Дилеры']}}>Мен./Дил.</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Органика']}}>Органика</th>
                      <th className="text-right py-3 px-2 font-medium font-bold">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyComparison.map((w, i) => (
                      <tr key={i} className={`border-b hover:bg-muted/50 ${i === weeklyComparison.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                        <td className="py-2 px-2">
                          <div className="font-medium text-xs">{w.week}</div>
                          <div className="text-xs text-muted-foreground">{w.period}</div>
                        </td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.google_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.meta_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.whatsapp_leads || '—'}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.kolesa_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{(w.managers_leads || 0) + (w.dealers_leads || 0) || '—'}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.organic_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs font-bold">{w.total_leads}</td>
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
                  <Bar dataKey="WhatsApp" fill={COLORS['WhatsApp']} stackId="a" />
                  <Bar dataKey="Kolesa" fill={COLORS['Kolesa']} stackId="a" />
                  <Bar dataKey="Мен./Дил." fill={COLORS['Менеджеры/Дилеры']} stackId="a" />
                  <Bar dataKey="Органика" fill={COLORS['Органика']} stackId="a" />
                  <Line type="monotone" dataKey="Всего" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
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
                  <Line type="monotone" dataKey="WhatsApp" stroke={COLORS['WhatsApp']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Мен./Дил." stroke={COLORS['Менеджеры/Дилеры']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
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
                    <Bar dataKey="WhatsApp" fill={COLORS['WhatsApp']} stackId="a" />
                    <Bar dataKey="Kolesa" fill={COLORS['Kolesa']} stackId="a" />
                    <Bar dataKey="Мен./Дил." fill={COLORS['Менеджеры/Дилеры']} stackId="a" />
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
                    <Line type="monotone" dataKey="WhatsApp" stroke={COLORS['WhatsApp']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Мен./Дил." stroke={COLORS['Менеджеры/Дилеры']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
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
              <p>• Период: Неделя 9 — 23 февраля – 1 марта 2026</p>
              <p>• <strong>Данные с дедупликацией по БИН</strong> — учитываются уникальные компании, лучший статус для каждого БИН</p>
              <p>• <strong>Google Ads:</strong> Данные из рекламного кабинета Google Ads (Quiz | Halyk Leasing)</p>
              <p>• <strong>Meta Ads:</strong> Данные из рекламного кабинета Meta (Facebook/Instagram). ANTO MOTORS: 146 из 311 заявок (47%)</p>
              <p>• <strong>Kolesa:</strong> Включает заявки с автором kolesa и каналом whatsapp+источник kolesa</p>
              <p>• <strong>Менеджеры:</strong> Заявки от Карашев А., Ертаргын Е., Елкин П., Камзина З., Тайгара А., balgozhina.f, Сатбергенов Н., mamutbayeva.a</p>
              <p>• <strong>Дилеры:</strong> Заявки с каналом dealer (включая ИП Дилеры)</p>
              <p>• <strong>Органика:</strong> Self Service без UTM, API, online_bank</p>
              <p>• <strong>Согласие:</strong> Определяется по столбцу «Методика» — M1, M2 или M3 + has_consent в UTM</p>
              <p>• <strong>Одобрение:</strong> Определяется по столбцу «approval_status» = APPROVED</p>
              <p>• <strong>CR (Conversion Rate):</strong> Рассчитывается от предыдущего этапа воронки на каждом шаге</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
