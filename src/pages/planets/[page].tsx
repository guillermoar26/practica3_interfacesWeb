import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { PlanetsAPI } from "@/types";

type Planet = {
  name: string;
  id: string;
};

type PageProps = {
  planets: Planet[];
  page: number;
};

const PlanetsPage = ({ planets, page }: PageProps) => {
  const handlePrevClick = () => {
    window.location.href = `http://localhost:3000/planets/${page - 1}`;
  };

  const handleNextClick = () => {
    window.location.href = `http://localhost:3000/planets/${page + 1}`;
  };

  if (planets.length === 0) {
    return <>Loading data...</>;
  }

  return (
    <div>
      <h1>Planets</h1>
      <ul>
        {planets.map((planet) => (
          <li key={planet.id}>
            <Link href={`/planet/${planet.id}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={handlePrevClick} disabled={page === 1}>
        Prev
      </button>
      <button onClick={handleNextClick} disabled={page === 6}>
        Next
      </button>
    </div>
  );
};

export default PlanetsPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  const page = parseInt(context.params?.page as string, 10) || 1;

  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data: PlanetsAPI = await res.json();
  const planets: Planet[] = data.results.map((planet) => {
    const id = planet.url.split("/").filter(Boolean).pop() as string;
    return { name: planet.name, id };
  });

  return { props: { planets, page } };
};
