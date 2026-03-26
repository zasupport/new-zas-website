'use client';

const C = {
  green: '#0FEA7A',
  text: '#E8F4F1',
  muted: '#7A9E98',
  cardBg: 'rgba(22,34,32,0.5)',
  cardBorder: 'rgba(15,234,122,0.1)',
};

interface OnboardingProgressProps {
  steps: string[];
  currentStep: number;
}

export default function OnboardingProgress({ steps, currentStep }: OnboardingProgressProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 32 }}>
      {steps.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: done ? C.green : active ? 'rgba(15,234,122,0.15)' : C.cardBg,
                  border: `2px solid ${done ? C.green : active ? C.green : C.cardBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  color: done ? '#0A1A18' : active ? C.green : C.muted,
                  transition: 'all 0.3s',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: active ? C.green : done ? C.text : C.muted,
                  whiteSpace: 'nowrap',
                  fontWeight: active ? 600 : 400,
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 48,
                  height: 2,
                  background: i < currentStep ? C.green : C.cardBorder,
                  marginBottom: 18,
                  transition: 'background 0.3s',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
