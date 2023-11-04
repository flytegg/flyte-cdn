import { retrieveAllFilesFor } from '$lib/files';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, params }) => {
	return { 
        slug: url.pathname,
        files: await retrieveAllFilesFor(params.slug) 
    }
}

