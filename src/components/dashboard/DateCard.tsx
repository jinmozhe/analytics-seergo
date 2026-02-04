import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// 1. 修复 TS 错误：加上 'type' 关键字
import type { DateRangeData } from "@/types/marketing";

export function DateCard({ data }: { data: DateRangeData }) {
  return (
    // 2. 修复 Tailwind 警告：将 w-[380px] 替换为标准的 w-95 (即 380px)
    // 这里的 w-95 是 Tailwind 的简写，计算公式：95 * 4px = 380px
    <Card className="w-95 shadow-lg border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>广告投放周期</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between p-3 bg-slate-50 rounded">
          <span className="text-slate-500 text-sm">起始时间</span>
          <span className="font-mono font-bold text-slate-700">{data.min_date}</span>
        </div>
        <div className="flex justify-between p-3 bg-slate-50 rounded">
          <span className="text-slate-500 text-sm">结束时间</span>
          <span>2026</span>
          <span className="font-mono font-bold text-slate-700">{data.max_date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
