"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deletefileUT(key: string) {
  await utapi.deleteFiles(key);
}
