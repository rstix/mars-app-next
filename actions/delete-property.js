'use server';

import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/get-session-user';
import { revalidatePath } from 'next/cache';

const deleteProperty = async (propertyID) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('user id is required');
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyID);
  if (!property) {
    throw new Error('no property');
  }

  if (property.owner.toString() !== userId) {
    throw new Error('unauthorized');
  }
};

export default deleteProperty;
