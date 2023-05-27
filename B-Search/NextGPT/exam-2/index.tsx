import axios from 'axios';

export async function getServerSideProps({ query }: any) {
  try {
    const { propertySearch, propertyType } = query;
    const params = new URLSearchParams();
    if (propertySearch) params.set('propertySearch', propertySearch);
    if (propertyType) params.set('propertyType', propertyType);

    // Fetch all estates with the specified title and type from the API
    const res = await axios.get(`http://localhost:5000/realEstate/search?${params.toString()}`);
    const estates = res.data.realEstates;

    // Return the estates as props
    return { props: { estates } };
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error(error);
    return { props: { estates: [] } };
  }
}
