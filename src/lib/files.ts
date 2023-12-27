const url = "https://cdn.internal.flyte.gg"
const fileRegex = /<a href="([^"]+)">[^<]+<\/a>\s+(\d{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2})\s+(-|\d+)/g
const hrefsToExclude = ["../", "cdn-data.json"]

export const retrieveAllFilesFor = async (slug: string = "") => {
    return await serialize(await extractSlugs(slug, await (await fetch(`${url}/${slug}`)).text()))
}

const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return "0 B"
  
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
  
    const i = Math.floor(Math.log(bytes) / Math.log(k))
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const buildAbsoluteUrl = (file: File, slug: string) => `${file.isLink ? file.slug : ((file.isDirectory ? "" : url) + (slug ? `${slug}` : "") + '/' + file.slug)}`

const extractSlugs = async (dirSlug: string, page: string) => {
    return [...page.matchAll(fileRegex)]
        .filter(match => !hrefsToExclude.includes(match[1]))
        .map(match => {
            let slug = match[1]
            const lastModified = match[2]
            const fileSize = match[3]

            const isDirectory = slug.endsWith("/")
            const isLink = slug.endsWith("-link.json")

            slug = slug.replaceAll("/", "")

            let extension = ""
            if (slug.includes(".")) {
                const split = slug.split(".")
                extension = split[split.length - 1]
            }

            return new File(slug, lastModified, extension, fileSize === "-" ? -1 : +fileSize, isDirectory, isLink, dirSlug)
        })
}

const serialize = async (files: File[]) => {
    return await Promise.all(files.map(async file => {
        if (file.isDirectory) {
            const directory: Directory = await queryDirectoryCdnData(file)
            return {
                slug: directory.slug,
                lastModified: directory.lastModified,
                isDirectory: directory.isDirectory,
                isLink: directory.isLink,
                favicon: directory.favicon,
                name: directory.name,
            }
        }

        if (file.isLink) {
            const link: Link = await readLinkData(file)
            console.log(link)
            return {
                slug: link.slug,
                isDirectory: link.isDirectory,
                isLink: link.isLink,
                name: link.name,
                size: link.description
            }
        }

        return {
            slug: file.slug,
            lastModified: file.lastModified,
            extension: file.extension,
            size: formatBytes(file.sizeBytes),
            isDirectory: file.isDirectory,
            isLink: file.isLink
        }
    }))
}

const queryDirectoryCdnData = async (file: File) => {
    const request = await fetch(`${url}/${file.slug}/cdn-data.json`)
    if (!request.ok) return new Directory(file.slug, file.lastModified, null, null, file.sizeBytes)
    const response = await request.json()
    return new Directory(file.slug, file.lastModified, `${url}/${file.slug}/favicon.png`, response.name)
}

const readLinkData = async (file: File) => {
    const request = await fetch(`${url}/${file.dirSlug}/${file.slug}`)
    if (!request.ok) return new Link(file.slug, file.slug, file.sizeBytes.toString())
    const response = await request.json()
    return new Link(response.redirect, response.name, response.description)
}

class File {
    constructor(
        readonly slug: string,
        readonly lastModified: string,
        readonly extension: string,
        readonly sizeBytes: number,
        readonly isDirectory: boolean,
        readonly isLink: boolean,
        readonly dirSlug: string
    ) {}
}

class Link extends File {
    constructor(
        readonly slug: string,
        readonly name: string | null, 
        readonly description: string | null,
    ) {
        super(slug, "", "", -1, false, true, "");
    }
}
class Directory extends File {
    constructor(
        readonly slug: string,
        readonly lastModified: string,
        readonly favicon: string | null, 
        readonly name: string | null, 
        readonly sizeBytes: number = -1,
    ) {
        super(slug, lastModified, "", sizeBytes, true, false, "");
    }
}