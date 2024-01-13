"use server";

import { revalidatePath } from "next/cache";

export async function deletefileUT(key: string) {}

export async function revalidate(path: string) {
  revalidatePath(path);
}
