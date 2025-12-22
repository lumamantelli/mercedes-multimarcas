import { searchService } from "src/services/searchService";

export async function getAllItems() {
    const all = await searchService()
}