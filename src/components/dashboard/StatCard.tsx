// 引入 shadcn ui 的基础卡片 (假设 src/components/ui/card.tsx 已存在)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  highlight?: boolean; // 是否高亮显示
}

export function StatCard({ title, value, highlight = false }: StatCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 font-sans">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 👇 关键点：
            数字使用 font-mono (JetBrains Mono) 以保证对齐和辨识度。
            highlight 属性控制颜色深浅。
        */}
        <div 
          className={`text-2xl font-bold font-mono tracking-tight ${
            highlight ? "text-slate-900" : "text-slate-700"
          }`}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
