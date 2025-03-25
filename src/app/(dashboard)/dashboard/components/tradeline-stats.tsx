import { Card, CardContent } from "@/components/ui/card";
import { ActiveTradelineIcon, TradelineGaugeIcon, NegativeIcon } from "@/components/icons";

interface TradelineStat {
  id: string;
  title: string;
  value: number;
  IconComponent: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }>;
}

interface TradelineStatsProps {
  stats?: TradelineStat[];
}

function TradelineStatCard({ stat }: { stat: TradelineStat }) {
  const { IconComponent } = stat;
  
  return (
    <Card className="">
      <CardContent className="flex w-full h-full items-center pt-6">
        <div className="flex-shrink-0">
          <IconComponent className="w-10 h-10" />
        </div>
        <div className="flex flex-row">
          <h4 className="text-xs text-gray-600">{stat.title}</h4>
          <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TradelineStats({ stats = defaultStats }: TradelineStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <TradelineStatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

const defaultStats: TradelineStat[] = [
  {
    id: 'active-tradelines',
    title: 'Active Tradelines',
    value: 4,
    IconComponent: ActiveTradelineIcon
  },
  {
    id: 'high-utilization',
    title: 'Tradelines Over 30%',
    value: 2,
    IconComponent: TradelineGaugeIcon
  },
  {
    id: 'negative-tradelines',
    title: 'Tradelines with Negatives',
    value: 1,
    IconComponent: NegativeIcon
  }
];

export default TradelineStats;