import { useState, useEffect } from 'react';
import { api, mockCompanies } from '../services/api';
import { Company } from '../types';

export interface RiskDataState {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  avgPortfolioRisk: number;
  criticalEntitiesCount: number;
  activeCasesCount: number;
  totalCVEsCount: number;
}

export const useRiskData = () => {
  const [data, setData] = useState<RiskDataState>({
    companies: mockCompanies,
    isLoading: true,
    error: null,
    avgPortfolioRisk: 4.2,
    criticalEntitiesCount: 2,
    activeCasesCount: 5,
    totalCVEsCount: 14,
  });

  useEffect(() => {
    let isMounted = true;
    api.getCompanies()
      .then((res) => {
        if (!isMounted) return;
        const totalRisk = res.reduce((acc, c) => acc + (c.risk_score || 0), 0);
        const avg = res.length > 0 ? Number((totalRisk / res.length).toFixed(1)) : 4.2;
        const critical = res.filter((c) => (c.risk_score || 0) >= 6.0).length;

        setData({
          companies: res,
          isLoading: false,
          error: null,
          avgPortfolioRisk: avg,
          criticalEntitiesCount: critical,
          activeCasesCount: 5,
          totalCVEsCount: 14,
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        setData((prev) => ({ ...prev, isLoading: false, error: err.message }));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
