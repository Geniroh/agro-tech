interface InnovationType {
    id: number,
    name: string,
    industry?: string,
    usage: string,
}

type SocialProvidersType = "google" | "github" | "facebook" | "apple"