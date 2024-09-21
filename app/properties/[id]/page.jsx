import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertyPage = async ({ params }) => {
  await connectDB();
  const property = await Property.findById(params.id).lean();
  return <div>PropertyPage {property.name}</div>;
};

export default PropertyPage;
