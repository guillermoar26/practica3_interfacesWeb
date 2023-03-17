import PlanetsList from "@/components/PlanetsList";
import { PlanetsAPI } from "@/types";

import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Link href="/planets/1">Lista de planetas</Link>
        </div>
    );
}