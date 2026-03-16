'use client';

interface GoogleMapProps {
  height?: string;
}

export default function GoogleMap({ height = '320px' }: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=ZA+Support,Hyde+Park,Johannesburg&zoom=15`
    : 'https://maps.google.com/maps?q=1+Hyde+Lane+Hyde+Park+Johannesburg&output=embed';

  return (
    <div
      className="rounded-2xl border border-[rgba(15,234,122,0.15)] w-full overflow-hidden"
      style={{ height }}
    >
      <iframe
        title="ZA Support — Hyde Park, Johannesburg"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
