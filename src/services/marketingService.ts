import { http } from "@/lib/http";
// ✅ 修复点：加上 'type' 关键字
import type { ApiResponse, DateRangeData } from "@/types/marketing";

export const marketingService = {
    getDateRange: async (userId: string, adType: string): Promise<DateRangeData> => {
        // 1. 发起请求
        const response = await http.get<ApiResponse<DateRangeData>>(
            "/marketing/date-range/",
            {
                params: {
                    user_id: userId,
                    sponsored_ad_type: adType
                }
            }
        );

        // 2. 拆信封
        if (response.code === 1) {
            return response.data;
        } else {
            throw new Error(response.msg || "业务请求失败");
        }
    },
};
