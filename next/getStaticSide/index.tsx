import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Estate {
  // Define the shape of your Estate object here
}

interface Props {
  estate: Estate;
}

const PropertyPage: React.FC<Props> = ({ estate }) => {
  const router = useRouter();
  const { estate_id } = router.query;

  // Render your page using the estate data
  return (
    <div>
      <h1>Property {estate_id}</h1>
      <p>{estate.description}</p>
      {/* Render other property details here */}
    </div>
  );
};

export default PropertyPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of estate IDs from the API
  const res = await fetch('http://localhost:5000/estate');
  const estates = await res.json();

  // Map the estate IDs to the required format for NextJS
  const paths = estates.map((estate: Estate) => ({
    params: { estate_id: estate.id.toString() },
  }));

  // Return the list of paths to pre-render
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  // Fetch the estate data using the ID from the URL
  const { estate_id } = params;
  const res = await fetch(`http://localhost:5000/estate/estate_id/${estate_id}`);
  const estate = await res.json();

  // Return the estate data as props
  return { props: { estate } };
};
