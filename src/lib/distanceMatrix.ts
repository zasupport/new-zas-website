const HYDE_PARK = 'Hyde Park, Johannesburg, South Africa';

export async function getDriveTime(
  suburb: string
): Promise<{ duration: string; distance: string } | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return null;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    suburb + ', Johannesburg'
  )}&destinations=${encodeURIComponent(HYDE_PARK)}&key=${key}&units=metric`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    const element = data.rows?.[0]?.elements?.[0];
    if (element?.status === 'OK') {
      return {
        duration: element.duration.text,
        distance: element.distance.text,
      };
    }
  } catch {
    // silently return null — key absent or network failure
  }
  return null;
}
