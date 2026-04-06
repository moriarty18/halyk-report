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
// Дедупликация: по БИН/ИИН → 795 уникальных заявок (из 1,123 raw)
// Согласие: Состояние ≠ WAITING_FOR_*_CONSENT → 576 (72.5%)
// Одобрено: Решение ∈ {Одобрить, Условно одобрено} → 66 (11.5% от согласий)
// Обновлено: 06.04.2026 (обновлённые данные CRM)
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