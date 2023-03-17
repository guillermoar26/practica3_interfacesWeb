import PlanetComponent from "@/components/Planet";
import { Planet, PlanetsAPI } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";

// cada planeta se mostrara en la ruta /planets/[id] y se renderizara en el cliente
export const getStaticPaths: GetStaticPaths = async () => {
    const planetsAPI: PlanetsAPI = await fetch(
        "https://swapi.dev/api/planets/"
    ).then((res) => res.json());
    const planets: Planet[] = planetsAPI.results;
    const paths = planets.map((planet) => ({
        params: { id: planet.url.split("/").slice(-2)[0] },
    }));
    return {
        paths,
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id;
    const planet: Planet = await fetch(
        `https://swapi.dev/api/planets/${id}/`
    ).then((res) => res.json());
    return {
        props: {
            planet,
        },
    };
};

const PlanetPage = ({ planet }: { planet: Planet }) => {
    return <PlanetComponent data={planet} />;
};

export default PlanetPage;