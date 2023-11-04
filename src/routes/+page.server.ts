import { retrieveAllFilesFor } from '../lib/files';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { files: await retrieveAllFilesFor() }
}

