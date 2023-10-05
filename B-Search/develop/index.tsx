export async function getServerSideProps({ query }: any) {
  try {
    const { propertySearch, propertyType, propertyStatus } = query;
    const params = new URLSearchParams();

    if (propertySearch) {
      params.append("propertySearch", propertySearch);
    }
    if (propertyStatus) {
      params.append("propertyStatus", propertyStatus);
    }
    if (propertyType) {
      params.append("propertyType", propertyType);
    }

    // Fetch estates with the specified search parameters from the API
    const res = await axios.get(
      `http://localhost:5000/realEstate/search?${params.toString()}`
    );
    const estates = res.data.realEstates;

    // Pass the propertySearch value to the ShowMarket component
    return { props: { estates, propertySearch: propertySearch || null } };
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error(error);
    return { props: { estates: [], propertySearch: null } };
  }
}
  