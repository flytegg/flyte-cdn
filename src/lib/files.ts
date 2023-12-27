const url = "https://cdn.internal.flyte.gg"
const fileRegex = /<a href="([^"]+)">[^<]+<\/a>\s+(\d{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2})\s+(-|\d+)/g
const hrefsToExclude = ["../", "cdn-data.json"]

export const retrieveAllFilesFor = async (slug: string = "") => {
    return await serialize(await extractSlugs(await (await fetch(`${url}/${slug}`)).text()))
}

const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return "0 B"
  
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
  
    const i = Math.floor(Math.log(bytes) / Math.log(k))
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const buildAbsoluteUrl = (file: File, slug: string) => `${file.isDirectory ? "" : url}${slug ? `${slug}` : ""}/${file.slug}`

const extractSlugs = async (page: string) => {
    return [...page.matchAll(fileRegex)]
        .filter(match => !hrefsToExclude.includes(match[1]))
        .map(match => {
            let slug = match[1]
            const lastModified = match[2]
            const fileSize = match[3]

            const isDirectory = slug.endsWith("/")

            slug = slug.replaceAll("/", "")

            let extension = ""
            if (slug.includes(".")) {
                const split = slug.split(".")
                extension = split[split.length - 1]
            }

            return new File(slug, lastModified, extension, fileSize === "-" ? -1 : +fileSize, isDirectory)
        })
}

const serialize = async (files: File[]) => {
    return await Promise.all(files.map(async file => {
        if (!file.isDirectory) {
            return {
                slug: file.slug,
                lastModified: file.lastModified,
                extension: file.extension,
                size: formatBytes(file.sizeBytes),
                isDirectory: file.isDirectory
            }
        } else {
            const directory: Directory = await queryDirectoryCdnData(file)
            return {
                slug: directory.slug,
                lastModified: directory.lastModified,
                isDirectory: directory.isDirectory,
                favicon: directory.favicon,
                name: directory.name,
            }
        }
    }))
}

const queryDirectoryCdnData = async (file: File) => {
    const request = await fetch(`${url}/${file.slug}/cdn-data.json`)
    if (!request.ok) return new Directory(file.slug, file.lastModified, null, null, file.sizeBytes)
    const response = await request.json()
    return new Directory(file.slug, file.lastModified, `${url}/${file.slug}/favicon.png`, response.name)
}

class File {
    constructor(
        readonly slug: string,
        readonly lastModified: string,
        readonly extension: string,
        readonly sizeBytes: number,
        readonly isDirectory: boolean
    ) {}
}

class Directory extends File {
    constructor(
        readonly slug: string,
        readonly lastModified: string,
        readonly favicon: string | null, 
        readonly name: string | null, 
        readonly sizeBytes: number = -1,
    ) {
        super(slug, lastModified, "", sizeBytes, true);
    }
}