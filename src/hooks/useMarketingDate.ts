import { useState, useEffect } from "react";
import { DateRangeSchema, type DateRangeData } from "@/types/marketing";
import { marketingService } from "@/services/marketingService";

export function useMarketingDate(userId: string, adType: string) {
    const [data, setData] = useState<DateRangeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const rawData = await marketingService.getDateRange(userId, adType);
                const validated = DateRangeSchema.parse(rawData); // Zod 安检
                if (isMounted) setData(validated);
            } catch (err) {
                if (isMounted) setError(err instanceof Error ? err.message : "未知错误");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, [userId, adType]);

    return { data, loading, error };
}
