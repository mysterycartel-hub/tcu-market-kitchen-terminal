// Vercel Blob storage helper for chart screenshot uploads.
// Requires @vercel/blob package and BLOB_READ_WRITE_TOKEN env var.
// Falls back to base64 data-URL when the package or token is unavailable (local dev).

export type BlobUploadResult = {
  ok: boolean;
  url: string | null;
  key: string | null;
  error?: string;
};

function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/**
 * Upload a File or Blob to Vercel Blob storage.
 * Returns the public URL and key if successful.
 *
 * Usage in a Server Action or Route Handler:
 *   const result = await uploadChartBlob(file, userId);
 */
export async function uploadChartBlob(
  file: File,
  userId: string,
): Promise<BlobUploadResult> {
  if (!isBlobConfigured()) {
    console.warn("[blob] BLOB_READ_WRITE_TOKEN not set — upload skipped, using local preview only.");
    return { ok: false, url: null, key: null, error: "Blob storage not configured" };
  }

  try {
    // Dynamic import keeps the package optional — app compiles without @vercel/blob installed.
    const { put } = await import("@vercel/blob");

    const filename = `charts/${userId}/${Date.now()}-${file.name.replace(/[^a-z0-9._-]/gi, "_")}`;
    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return { ok: true, url: blob.url, key: filename };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, url: null, key: null, error: message };
  }
}

/**
 * Delete a chart blob by key.
 */
export async function deleteChartBlob(key: string): Promise<void> {
  if (!isBlobConfigured()) return;

  try {
    const { del } = await import("@vercel/blob");
    await del(key, { token: process.env.BLOB_READ_WRITE_TOKEN });
  } catch {
    // Silently ignore — deletion failures are not fatal.
  }
}
