import { db } from "@/db";
import { NewUsageMetadata, usageMetadataTable } from "@/db/schema";
export class UsageMetadataRepository {
  constructor() {}

  save = async (usageMetadata: NewUsageMetadata) => {
    const [newUsageMetadata] = await db
      .insert(usageMetadataTable)
      .values(usageMetadata)
      .returning();

    return newUsageMetadata;
  };
}
