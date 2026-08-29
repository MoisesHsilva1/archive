import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/services/firebase.service';
import { ItemDocument, ItemCreatePayload } from '@/types/domain/item.types';
import { AuthUser } from '@/types/domain/auth.types';

const ITEMS_COLLECTION = 'items';

export const mapDocToItem = (
  doc: QueryDocumentSnapshot<DocumentData>
): ItemDocument => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    content: data.content,
    excerpt: data.excerpt,
    location: data.location,
    rating: data.rating,
    coverImage: data.coverImage,
    gallery: data.gallery || [],
    tags: data.tags || [],
    featured: data.featured || false,
    authorId: data.authorId,
    authorName: data.authorName,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const publishItemToFirestore = async (
  payload: ItemCreatePayload,
  author: AuthUser
): Promise<ItemDocument> => {
  const nowIso = new Date().toISOString();

  const docData = {
    ...payload,
    authorId: author.uid,
    authorName: author.displayName || author.email || 'Proprietário',
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const docRef = await addDoc(collection(db, ITEMS_COLLECTION), docData);

  return {
    id: docRef.id,
    ...docData,
  };
};

export const fetchItemsFromFirestore = async (
  maxItems = 20
): Promise<ItemDocument[]> => {
  const q = query(
    collection(db, ITEMS_COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(maxItems)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(mapDocToItem);
};

export const fetchItemBySlug = async (
  slug: string
): Promise<ItemDocument | null> => {
  const q = query(
    collection(db, ITEMS_COLLECTION),
    where('slug', '==', slug),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  const firstDoc = querySnapshot.docs[0];
  if (!firstDoc) return null;
  return mapDocToItem(firstDoc);
};
