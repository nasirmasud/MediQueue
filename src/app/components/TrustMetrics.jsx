import { CloudSync, Hourglass, ShieldCheck, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { TRUST_METRICS } from "@/lib/demo";

const ICONS = {
  groups: Users,
  verified_user: ShieldCheck,
  hourglass_top: Hourglass,
  cloud_sync: CloudSync,
};

const TILE_TONES = {
  primary: "bg-primary-container/20 text-primary",
  tertiary: "bg-tertiary-container/30 text-tertiary",
  secondary: "bg-secondary-container/30 text-secondary",
  tint: "bg-surface-container-highest text-surface-tint",
};

const TrustMetrics = () => {
  return (
    <Section tone='surface' spacing='sm'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {TRUST_METRICS.map((metric) => {
          const Icon = ICONS[metric.icon];
          return (
            <Card
              key={metric.label}
              tone='surface'
              shadow='sm'
              padding='md'
              className='flex flex-col justify-between hover:bg-surface-container transition-all'
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  TILE_TONES[metric.iconTone] ?? TILE_TONES.primary
                }`}
              >
                {Icon ? <Icon aria-hidden='true' className='size-7' /> : null}
              </div>
              <div>
                <div className='text-3xl font-extrabold text-on-surface tracking-tight tabular'>
                  {metric.value}
                </div>
                <div className='text-headline-sm text-on-surface mt-1'>{metric.label}</div>
                <p className='text-body-sm text-on-surface-variant mt-1.5'>{metric.copy}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default TrustMetrics;
