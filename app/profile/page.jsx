// 'use client';
// import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import Spinner from '@/components/Spinner';
// import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '@/components/profile-properties';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import { getSessionUser } from '@/utils/get-session-user';
import { convertToSerializeableObject } from '@/utils/convert-to-object';

const ProfilePage = async () => {
  // const { data: session } = useSession();
  // const profileImage = session?.user?.image;
  // const profileName = session?.user?.name;
  // const profileEmail = session?.user?.email;

  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const propertiesDoc = await Property.find({ owner: userId }).lean();
  const properties = propertiesDoc.map(convertToSerializeableObject);

  const profileImage = sessionUser?.user?.image;
  const profileName = sessionUser?.user?.name;
  const profileEmail = sessionUser?.user?.email;

  // const [properties, setProperties] = useState([]);

  // useEffect(() => {
  //   const fetchUserProperties = async (userId) => {
  //     if (!userId) {
  //       return;
  //     }

  //     try {
  //       const res = await fetch(`/api/properties/user/${userId}`);

  //       if (res.status === 200) {
  //         const data = await res.json();
  //         setProperties(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   // Fetch user properties when session is available
  //   if (session?.user?.id) {
  //     fetchUserProperties(session.user.id);
  //   }
  // }, [session]);

  // const properties = await Property.find({ owner: sessionUser.userId }).lean();

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {/* {properties.length ? (
                <div>oh</div> // <Spinner loading={loading} />
              ) : (
                <ProfileProperties properties={properties} />
              )} */}

              {properties.length === 0 ? (
                <p>You have no property listings</p>
              ) : (
                <ProfileProperties properties={properties} />
              )}

              {/* {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )} */}
              {/* {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt=""
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address: {property.location.street}{' '}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
