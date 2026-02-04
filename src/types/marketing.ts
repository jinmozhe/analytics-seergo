import { z } from "zod";

// 1. 信封结构 (Code=1)
export interface ApiResponse<T> {
    code: number;
    msg: string;
    time: number;
    data: T;
}

// 2. 业务数据校验 (对应 data 字段)
export const DateRangeSchema = z.object({
    min_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "开始日期格式错误"),
    max_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "结束日期格式错误"),
});

export type DateRangeData = z.infer<typeof DateRangeSchema>;
