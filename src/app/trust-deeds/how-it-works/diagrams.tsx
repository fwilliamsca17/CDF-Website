/**
 * Six SVG walkthrough diagrams in the Nocturne palette. Inline static
 * SVG — no chart libs, no framer-motion (LCP-friendly). Tokens:
 *   ink-950 #060A12 background, ivory #F5F2EA text, champagne accents.
 */
const STROKE = "#C9A86A"; // champagne-500
const SOFT = "#E6D2A2"; // champagne-300
const TEXT = "#F5F2EA";
const MUTED = "rgba(245,242,234,0.55)";

const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  className: "w-full h-auto",
  fontFamily: "var(--font-source-sans), system-ui, sans-serif",
};

function Label({
  x,
  y,
  children,
  size = 13,
  fill = TEXT,
  anchor = "middle" as const,
}: {
  x: number;
  y: number;
  children: string;
  size?: number;
  fill?: string;
  anchor?: "middle" | "start" | "end";
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor}>
      {children}
    </text>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="rgba(201,168,106,0.08)"
        stroke={STROKE}
      />
      <Label x={x + w / 2} y={y + h / 2 + 1} size={14}>
        {label}
      </Label>
      {sub && (
        <Label x={x + w / 2} y={y + h - 8} size={11} fill={MUTED}>
          {sub}
        </Label>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g stroke={SOFT} strokeWidth="1.5" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#arrowhead)" />
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
      >
        <path d="M0,0 L0,6 L9,3 z" fill={SOFT} />
      </marker>
    </defs>
  );
}

export function OriginationDiagram() {
  return (
    <svg viewBox="0 0 560 220" aria-label="Loan origination steps" {...baseProps}>
      <Defs />
      {[
        ["Application", 0],
        ["Underwriting", 1],
        ["Appraisal", 2],
        ["Escrow / Title", 3],
        ["Recording", 4],
        ["Funded", 5],
      ].map(([label, i]) => {
        const x = 10 + (i as number) * 90;
        return <Box key={label as string} x={x} y={90} w={80} h={48} label={label as string} />;
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const x1 = 10 + i * 90 + 80;
        const x2 = 10 + (i + 1) * 90;
        return <Arrow key={i} x1={x1} y1={114} x2={x2} y2={114} />;
      })}
    </svg>
  );
}

export function DOTDiagram() {
  return (
    <svg viewBox="0 0 480 280" aria-label="Lien stack and equity cushion" {...baseProps}>
      <Defs />
      <Label x={240} y={24} size={14}>Capital stack against property value</Label>
      {/* Property value background bar */}
      <rect x={140} y={50} width={200} height={200} fill="rgba(255,255,255,0.04)" stroke={MUTED} />
      <Label x={130} y={56} size={11} fill={MUTED} anchor="end">Top of value</Label>
      <Label x={130} y={252} size={11} fill={MUTED} anchor="end">$0</Label>

      {/* Equity cushion */}
      <rect x={140} y={50} width={200} height={70} fill="rgba(201,168,106,0.08)" />
      <Label x={240} y={92} size={13}>Equity cushion (your safety margin)</Label>

      {/* 2nd lien */}
      <rect x={140} y={120} width={200} height={40} fill="rgba(201,168,106,0.25)" stroke={STROKE} />
      <Label x={240} y={144} size={13}>2nd lien</Label>

      {/* 1st lien */}
      <rect x={140} y={160} width={200} height={90} fill="rgba(201,168,106,0.45)" stroke={STROKE} />
      <Label x={240} y={210} size={14}>1st lien (paid first at sale)</Label>

      <Label x={240} y={272} size={11} fill={MUTED}>Lower lien position = paid earlier at payoff or sale</Label>
    </svg>
  );
}

export function AssignmentDiagram() {
  return (
    <svg viewBox="0 0 560 200" aria-label="Note and deed of trust assigned to investor" {...baseProps}>
      <Defs />
      <Box x={20} y={70} w={140} h={60} label="CDF (originator)" sub="funds the loan" />
      <Arrow x1={160} y1={100} x2={210} y2={100} />
      <Box x={210} y={70} w={140} h={60} label="Note + DOT" sub="assigned & recorded" />
      <Arrow x1={350} y1={100} x2={400} y2={100} />
      <Box x={400} y={70} w={140} h={60} label="Investor" sub="of record" />
      <Label x={280} y={170} size={11} fill={MUTED}>
        Assignment is recorded with the county — public, permanent.
      </Label>
    </svg>
  );
}

export function FractionalizationDiagram() {
  return (
    <svg viewBox="0 0 560 240" aria-label="Multiple investors on one deed of trust" {...baseProps}>
      <Defs />
      <Box x={210} y={20} w={140} h={50} label="One loan" sub="one deed of trust" />
      <Arrow x1={245} y1={70} x2={120} y2={120} />
      <Arrow x1={280} y1={70} x2={280} y2={120} />
      <Arrow x1={315} y1={70} x2={440} y2={120} />
      <Box x={50} y={120} w={140} h={60} label="Investor A — 25%" sub="Personal" />
      <Box x={210} y={120} w={140} h={60} label="Investor B — 50%" sub="Forge Trust IRA" />
      <Box x={370} y={120} w={140} h={60} label="Investor C — 25%" sub="Solo 401(k)" />
      <Label x={280} y={210} size={11} fill={MUTED}>
        Each interest is recorded. Monthly interest splits by recorded percentage.
      </Label>
    </svg>
  );
}

export function LifeOfLoanDiagram() {
  return (
    <svg viewBox="0 0 560 220" aria-label="Life of the loan including default path" {...baseProps}>
      <Defs />
      <Box x={20} y={30} w={120} h={50} label="Funded" />
      <Arrow x1={140} y1={55} x2={180} y2={55} />
      <Box x={180} y={30} w={140} h={50} label="Monthly interest" sub="usually I/O" />
      <Arrow x1={320} y1={55} x2={360} y2={55} />
      <Box x={360} y={30} w={120} h={50} label="Payoff / sale" />

      {/* Default branch */}
      <Arrow x1={250} y1={80} x2={250} y2={120} />
      <Box x={180} y={120} w={140} h={50} label="Missed payment" sub="cure window" />
      <Arrow x1={320} y1={145} x2={360} y2={145} />
      <Box x={360} y={120} w={120} h={50} label="Notice of Default" />
      <Arrow x1={420} y1={170} x2={420} y2={185} />
      <Box x={350} y={185} w={140} h={28} label="Trustee's sale → recovery" />
      <Label x={130} y={205} size={11} fill={MUTED}>
        Foreclosure is the recovery path — equity cushion is what makes the recovery work.
      </Label>
    </svg>
  );
}

export function SDIRADiagram() {
  return (
    <svg viewBox="0 0 560 240" aria-label="SDIRA / Solo 401(k) investment flow" {...baseProps}>
      <Defs />
      <Box x={10} y={30} w={150} h={56} label="You open" sub="Forge / Provident / Entrust" />
      <Arrow x1={160} y1={58} x2={200} y2={58} />
      <Box x={200} y={30} w={150} h={56} label="Custodian funds escrow" sub="direction-of-investment" />
      <Arrow x1={350} y1={58} x2={390} y2={58} />
      <Box x={390} y={30} w={160} h={56} label="Note vested FBO you" sub="custodian holds title" />

      <Arrow x1={470} y1={86} x2={470} y2={130} />
      <Box x={380} y={130} w={170} h={56} label="Monthly interest" sub="returns to your IRA / 401(k)" />
      <Arrow x1={380} y1={158} x2={250} y2={158} />
      <Box x={90} y={130} w={160} h={56} label="Tax-advantaged growth" sub="consult your CPA" />
    </svg>
  );
}
