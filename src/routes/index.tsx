import { createFileRoute } from "@tanstack/react-router";
import { AirApp } from "@/components/air-app";
import { getAirSnapshot } from "@/lib/nea";
import type { AirSnapshot } from "@/lib/psi";

export const Route = createFileRoute("/")({
  loader: async (): Promise<AirSnapshot | null> => {
    try {
      return await getAirSnapshot();
    } catch {
      return null;
    }
  },
  component: Home,
});

function Home() {
  const initial = Route.useLoaderData();
  return <AirApp initial={initial} />;
}
