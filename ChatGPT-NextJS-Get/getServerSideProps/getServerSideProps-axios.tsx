import axios from 'axios';
import { GetServerSideProps } from 'next';

interface Estate {
  // Define the shape of your Estate object here
}

interface Props {
  estate: Estate;
}

const PropertyPage: React.FC<Props> = ({ estate }) => {
  // Render your page using the estate data
  return (
    <div>
      <h1>Property {estate.id}</h1>
      <p>{estate.description}</p>
      {/* Render other property details here */}
    </div>
  );
};

export default PropertyPage;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // Fetch the estate data using the ID from the URL
  const { estate_id } = context.query;
  const res = await axios.get(`http://localhost:5000/estate/estate_id/${estate_id}`);
  const estate = res.data;

  // Return the estate data as props
  return { props: { estate } };
};
