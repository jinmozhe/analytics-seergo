// src/hooks/use-deep-dive.ts
import { useState, useMemo, useEffect } from "react";
import {
    type ReportAPIItem,
    type TimeOption,
    type CategoryOption,
    type DetailOption,
    type DeepDiveState
} from "@/types/deep-dive";
import {
    REPORT_TYPE_MAP,
    REPORT_SOURCE_MAP,
    UNKNOWN_REPORT_CONFIG
} from "@/lib/deep-dive-constants";

export function useDeepDive(reports: ReportAPIItem[]) {
    // =========================================
    // 1. 核心状态管理 (State)
    // =========================================
    const [timeId, setTimeId] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [detailId, setDetailId] = useState<string>("");

    // =========================================
    // 2. 级联选项计算 (Cascading Logic)
    // =========================================

    // --- Step A: 计算周期选项 (Time Options) ---
    // 逻辑: 遍历所有报告，提取唯一的 period_start + period_end 组合
    const timeOptions = useMemo<TimeOption[]>(() => {
        const map = new Map<string, TimeOption>();

        reports.forEach((item) => {
            // 生成唯一 ID (例如: "2026-01-26|2026-02-01")
            const id = `${item.period_start}|${item.period_end}`;

            if (!map.has(id)) {
                // 简单的周次格式化逻辑 (生产环境可以用 date-fns 优化)
                const startShort = item.period_start.slice(5).replace("-", "/"); // "01/26"
                const endShort = item.period_end.slice(5).replace("-", "/");     // "02/01"

                map.set(id, {
                    id,
                    label: `Week of ${startShort}`, // 或者根据业务计算 W05
                    dateRange: `${startShort} - ${endShort}`,
                    periodStart: item.period_start,
                    periodEnd: item.period_end
                });
            }
        });

        // 按时间倒序排列 (最新的在前面)
        return Array.from(map.values()).sort((a, b) => {
            // [修复] 处理可选属性 undefined 的情况，提供空字符串兜底
            const dateA = a.periodStart || "";
            const dateB = b.periodStart || "";
            return dateB.localeCompare(dateA);
        });
    }, [reports]);

    // --- Step B: 计算报告类型选项 (Category Options) ---
    // 逻辑: 基于当前选中的 timeId，过滤出可用的 report_type
    const categoryOptions = useMemo<CategoryOption[]>(() => {
        if (!timeId) return [];

        const [start, end] = timeId.split("|");
        const uniqueTypes = new Set<string>();

        reports
            .filter(r => r.period_start === start && r.period_end === end)
            .forEach(r => uniqueTypes.add(r.report_type));

        return Array.from(uniqueTypes).map(type => {
            const config = REPORT_TYPE_MAP[type] || UNKNOWN_REPORT_CONFIG;
            return {
                id: type,
                label: config.label,
                icon: config.icon // 传递给 UI 使用
            };
        });
    }, [reports, timeId]);

    // --- Step C: 计算报告明细选项 (Detail Options) ---
    // 逻辑: 基于当前选中的 timeId + categoryId，过滤出可用的 report_source
    const detailOptions = useMemo<DetailOption[]>(() => {
        if (!timeId || !categoryId) return [];

        const [start, end] = timeId.split("|");

        return reports
            .filter(r =>
                r.period_start === start &&
                r.period_end === end &&
                r.report_type === categoryId
            )
            .map(r => {
                const config = REPORT_SOURCE_MAP[r.report_source] || UNKNOWN_REPORT_CONFIG;
                return {
                    id: r.report_source,
                    label: config.label
                };
            });
    }, [reports, timeId, categoryId]);

    // --- Step D: 锁定当前唯一报告 (Current Active Report) ---
    const currentReport = useMemo(() => {
        if (!timeId || !categoryId || !detailId) return null;

        const [start, end] = timeId.split("|");

        return reports.find(r =>
            r.period_start === start &&
            r.period_end === end &&
            r.report_type === categoryId &&
            r.report_source === detailId
        ) || null;
    }, [reports, timeId, categoryId, detailId]);

    // =========================================
    // 3. 自动初始化与纠错 (Auto-Selection Effects)
    // =========================================

    // Effect 1: 初始化默认选中最新的周期
    useEffect(() => {
        if (timeOptions.length > 0 && !timeId) {
            setTimeId(timeOptions[0].id);
        }
    }, [timeOptions, timeId]);

    // Effect 2: 当周期变化时，检查 Category 是否有效，无效则重置为第一个
    useEffect(() => {
        if (categoryOptions.length > 0) {
            const isValid = categoryOptions.some(opt => opt.id === categoryId);
            if (!isValid) {
                setCategoryId(categoryOptions[0].id);
            }
        } else {
            setCategoryId("");
        }
    }, [categoryOptions, categoryId]);

    // Effect 3: 当类型变化时，检查 Detail 是否有效，无效则重置为第一个
    useEffect(() => {
        if (detailOptions.length > 0) {
            const isValid = detailOptions.some(opt => opt.id === detailId);
            if (!isValid) {
                setDetailId(detailOptions[0].id);
            }
        } else {
            setDetailId("");
        }
    }, [detailOptions, detailId]);

    // =========================================
    // 4. 返回状态与操作
    // =========================================
    return {
        state: { timeId, categoryId, detailId } as DeepDiveState,
        actions: { setTimeId, setCategoryId, setDetailId },
        options: { timeOptions, categoryOptions, detailOptions },
        currentReport
    };
}
