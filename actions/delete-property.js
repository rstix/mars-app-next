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

  // exctract public ID from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('propertypulse/' + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath('/', 'layout');
};

export default deleteProperty;
