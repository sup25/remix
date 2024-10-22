import prisma from "~/_lib/db";
export const makePost = async (data: {
  title: string;
  content: string;
  authorId: number;
  published: true;
}) => {
  return await prisma.post.create({
    data,
  });
};

export const getPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostById = async (id: number) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

export const updatePost = async (
  id: number,
  data: { title?: string; content?: string; published?: boolean }
) => {
  return await prisma.post.update({
    where: { id },
    data,
  });
};

export const deletePost = async (id: number) => {
  return await prisma.post.delete({
    where: { id },
  });
};
