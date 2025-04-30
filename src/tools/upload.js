/**
 * Uploads a Blob or Buffer to Sanity
 * @param file - The file as Blob or Buffer
 * @param filename - The original filename
 * @param contentType - MIME type of the file
 * @returns Promise with the Sanity asset document
 */
export async function uploadBlobToSanity(
  file,
  filename,
  contentType,
) {
  // Convert Buffer to Blob if needed
  const blob =
    file instanceof Buffer ? new Blob([file], { type: contentType }) : file;
    const sanityConfig = {
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      token: process.env.SANITY_API_TOKEN,
    };
    

  // 1. First request - get upload URL
  const assetResponse = await fetch(
    `https://${sanityConfig.projectId}.api.sanity.io/v2021-06-07/assets/files/${sanityConfig.dataset}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sanityConfig.token}`,
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
      body: file,
    }
  );

  if (!assetResponse.ok) {
    throw new Error(`Failed to get upload URL: ${assetResponse.statusText}`);
  }

  const data = await assetResponse.json();
  return data.document.url;
}
