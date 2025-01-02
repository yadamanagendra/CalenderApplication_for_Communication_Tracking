import { Communication, Company, CommunicationMethod } from '../../types';
import { isBefore, isToday, isWithinInterval } from 'date-fns';

interface CommunicationFrequencyData {
  method: CommunicationMethod;
  count: number;
  percentage: number;
}

export function filterCommunications(
  communications: Communication[],
  dateRange: { start: Date | null; end: Date | null },
  companyId: string | null
): Communication[] {
  return communications.filter(comm => {
    const date = new Date(comm.date);
    const withinDateRange = dateRange.start && dateRange.end
      ? isWithinInterval(date, { start: dateRange.start, end: dateRange.end })
      : true;
    
    const matchesCompany = companyId
      ? comm.companyId === companyId
      : true;
    
    return withinDateRange && matchesCompany;
  });
}

export function groupCommunicationsByMethod(
  communications: Communication[],
  methods: CommunicationMethod[]
): CommunicationFrequencyData[] {
  const counts = communications.reduce((acc, comm) => {
    acc[comm.methodId] = (acc[comm.methodId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return methods.map(method => ({
    method,
    count: counts[method.id] || 0,
    percentage: total ? ((counts[method.id] || 0) / total) * 100 : 0
  }));
}

interface EngagementMetric {
  method: CommunicationMethod;
  successRate: number;
}

export function getEngagementMetrics(
  communications: Communication[],
  methods: CommunicationMethod[]
): EngagementMetric[] {
  return methods.map(method => {
    const methodComms = communications.filter(comm => comm.methodId === method.id);
    const completedComms = methodComms.filter(comm => comm.completed);
    const successRate = methodComms.length > 0
      ? (completedComms.length / methodComms.length) * 100
      : 0;
    
    return { method, successRate };
  });
}

interface OverdueTrendData {
  company: Company;
  overdueCount: number;
}

export function getOverdueTrends(
  communications: Communication[],
  companies: Company[]
): OverdueTrendData[] {
  const now = new Date();
  
  return companies.map(company => {
    const companyComms = communications.filter(comm => comm.companyId === company.id);
    const overdueCount = companyComms.filter(comm => 
      !comm.completed && isBefore(new Date(comm.date), now) && !isToday(new Date(comm.date))
    ).length;
    
    return { company, overdueCount };
  }).sort((a, b) => b.overdueCount - a.overdueCount);
}