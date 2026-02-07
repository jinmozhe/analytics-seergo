// src/hooks/use-deep-dive.ts
import { useState, useMemo } from "react";
import {
    type ReportAPIItem,
    type TimeOption,
    type AdTypeOption,
    type ReportTypeOption,
    type DetailOption,
    type DeepDiveState
} from "@/types/deep-dive";
import {
    AD_TYPE_MAP,
    REPORT_TYPE_MAP,
    REPORT_SOURCE_MAP,
    UNKNOWN_REPORT_CONFIG
} from "@/lib/deep-dive-constants";

export function useDeepDive(reports: ReportAPIItem[]) {
    // =========================================
    // 1. 核心状态管理 (Raw State)
    // =========================================
    const [timeId, setTimeId] = useState<string>("");
    const [adTypeId, setAdTypeId] = useState<string>("");
    const [reportTypeId, setReportTypeId] = useState<string>("");
    const [detailId, setDetailId] = useState<string>("");

    // =========================================
    // 2. 级联选项计算 (Derived State & Cascading Logic)
    // =========================================

    // --- Level 1: Time ---

    // A. 计算选项
    const timeOptions = useMemo<TimeOption[]>(() => {
        const map = new Map<string, TimeOption>();

        reports.forEach((item) => {
            const id = `${item.period_start}|${item.period_end}`;

            if (!map.has(id)) {
                const startShort = item.period_start.slice(5).replace("-", "/");
                const endShort = item.period_end.slice(5).replace("-", "/");

                // [UPDATED] 直接使用日期范围作为 Label，不再加 "Week of"
                const rangeLabel = `${startShort} - ${endShort}`;

                map.set(id, {
                    id,
                    label: rangeLabel, // e.g. "01/25 - 01/31"
                    dateRange: rangeLabel,
                    periodStart: item.period_start,
                    periodEnd: item.period_end
                });
            }
        });

        return Array.from(map.values()).sort((a, b) => {
            const dateA = a.periodStart || "";
            const dateB = b.periodStart || "";
            return dateB.localeCompare(dateA);
        });
    }, [reports]);

    // B. 计算当前有效 ID (Active ID)
    const activeTimeId = useMemo(() => {
        if (timeId && timeOptions.some(opt => opt.id === timeId)) {
            return timeId;
        }
        return timeOptions.length > 0 ? timeOptions[0].id : "";
    }, [timeId, timeOptions]);


    // --- Level 2: Ad Type ---

    // A. 计算选项 (依赖 activeTimeId)
    const adTypeOptions = useMemo<AdTypeOption[]>(() => {
        if (!activeTimeId) return [];
        const [start, end] = activeTimeId.split("|");

        const uniqueAdTypes = new Set<string>();
        reports
            .filter(r => r.period_start === start && r.period_end === end)
            .forEach(r => uniqueAdTypes.add(r.ad_type));

        const sortOrder = ["SP", "SB", "SBV", "SD", "DSP"];

        return Array.from(uniqueAdTypes)
            .sort((a, b) => {
                const idxA = sortOrder.indexOf(a);
                const idxB = sortOrder.indexOf(b);
                return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
            })
            .map(type => {
                const config = AD_TYPE_MAP[type] || UNKNOWN_REPORT_CONFIG;
                return {
                    id: type,
                    label: config.label,
                    icon: config.icon
                };
            });
    }, [reports, activeTimeId]);

    // B. 计算当前有效 ID
    const activeAdTypeId = useMemo(() => {
        if (adTypeId && adTypeOptions.some(opt => opt.id === adTypeId)) {
            return adTypeId;
        }
        return adTypeOptions.length > 0 ? adTypeOptions[0].id : "";
    }, [adTypeId, adTypeOptions]);


    // --- Level 3: Report Type ---

    // A. 计算选项 (依赖 activeTimeId + activeAdTypeId)
    const reportTypeOptions = useMemo<ReportTypeOption[]>(() => {
        if (!activeTimeId || !activeAdTypeId) return [];
        const [start, end] = activeTimeId.split("|");

        const uniqueTypes = new Set<string>();
        reports
            .filter(r =>
                r.period_start === start &&
                r.period_end === end &&
                r.ad_type === activeAdTypeId
            )
            .forEach(r => uniqueTypes.add(r.report_type));

        return Array.from(uniqueTypes).map(type => {
            const config = REPORT_TYPE_MAP[type] || UNKNOWN_REPORT_CONFIG;
            return {
                id: type,
                label: config.label,
                icon: config.icon
            };
        });
    }, [reports, activeTimeId, activeAdTypeId]);

    // B. 计算当前有效 ID
    const activeReportTypeId = useMemo(() => {
        if (reportTypeId && reportTypeOptions.some(opt => opt.id === reportTypeId)) {
            return reportTypeId;
        }
        return reportTypeOptions.length > 0 ? reportTypeOptions[0].id : "";
    }, [reportTypeId, reportTypeOptions]);


    // --- Level 4: Detail ---

    // A. 计算选项 (依赖前三级的 active IDs)
    const detailOptions = useMemo<DetailOption[]>(() => {
        if (!activeTimeId || !activeAdTypeId || !activeReportTypeId) return [];
        const [start, end] = activeTimeId.split("|");

        return reports
            .filter(r =>
                r.period_start === start &&
                r.period_end === end &&
                r.ad_type === activeAdTypeId &&
                r.report_type === activeReportTypeId
            )
            .map(r => {
                const config = REPORT_SOURCE_MAP[r.report_source] || UNKNOWN_REPORT_CONFIG;
                return {
                    id: r.report_source,
                    label: config.label
                };
            });
    }, [reports, activeTimeId, activeAdTypeId, activeReportTypeId]);

    // B. 计算当前有效 ID
    const activeDetailId = useMemo(() => {
        if (detailId && detailOptions.some(opt => opt.id === detailId)) {
            return detailId;
        }
        return detailOptions.length > 0 ? detailOptions[0].id : "";
    }, [detailId, detailOptions]);


    // --- Final Step: 锁定当前唯一报告 ---
    const currentReport = useMemo(() => {
        if (!activeTimeId || !activeAdTypeId || !activeReportTypeId || !activeDetailId) return null;
        const [start, end] = activeTimeId.split("|");

        return reports.find(r =>
            r.period_start === start &&
            r.period_end === end &&
            r.ad_type === activeAdTypeId &&
            r.report_type === activeReportTypeId &&
            r.report_source === activeDetailId
        ) || null;
    }, [reports, activeTimeId, activeAdTypeId, activeReportTypeId, activeDetailId]);


    // =========================================
    // 3. 返回状态与操作
    // =========================================

    return {
        state: {
            timeId: activeTimeId,
            adTypeId: activeAdTypeId,
            reportTypeId: activeReportTypeId,
            detailId: activeDetailId
        } as DeepDiveState,

        actions: {
            setTimeId,
            setAdTypeId,
            setReportTypeId,
            setDetailId
        },

        options: {
            timeOptions,
            adTypeOptions,
            reportTypeOptions,
            detailOptions
        },

        currentReport
    };
}
