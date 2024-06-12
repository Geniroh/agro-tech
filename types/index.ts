interface InnovationType {
  id: number;
  name: string;
  industry?: string;
  usage: string;
}

type SocialProvidersType = "google" | "github" | "facebook" | "apple";
interface Media {
  name: string;
  url: string;
}

interface InstanceMedia {
  name: string;
  url: string;
}

interface ProductExample {
  instance_description: string;
  instance_media: InstanceMedia;
}

interface ProductInstruction {
  instruction_step: string;
}

interface ProductInventor {
  inventor_name: string;
  inventor_email: string;
  inventor_contact: string;
}

interface ProductSupplier {
  supplier_name: string;
  supplier_email: string;
  supplier_contact: string;
}

interface ProductGuidelines {
  name: string;
}
interface IInnovationType {
  id: string;
  productName: string;
  yearInvented: string;
  country: string;
  cost: number;
  productChain: string;
  productPhase: string;
  productUse: string[];
  productDescription: string;
  productMedia: Media[];
  isExample: boolean;
  productExample?: ProductExample[];
  productInstruction?: ProductInstruction[];
  productInventor?: ProductInventor[];
  productSupplier?: ProductSupplier[];
  productGuidelines?: ProductGuidelines[];
  isGenderFriendly?: boolean | null;
  productGenderDescription?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

const data: IInnovationType[] = [
  {
    id: "66697f03e9c81c3233f0c24d",
    productName: "Razorslasher",
    yearInvented: "2023",
    country: "Algeria",
    cost: 2000,
    productChain: "Farm supply",
    productPhase: "testing",
    productUse: ["For automatically clearing weeds and land cultivation"],
    productDescription: "Null",
    productMedia: [
      {
        name: "download__1_-removebg-preview.png",
        url: "https://stavmia-bucket.https://nyc3.digitaloceanspaces.com/download__1_-removebg-preview.png",
      },
    ],
    isExample: true,
    productExample: [
      {
        instance_description: "Null",
        instance_media: {
          name: "download__1_-removebg-preview.png",
          url: "https://stavmia-bucket.https://nyc3.digitaloceanspaces.com/download__1_-removebg-preview.png",
        },
      },
    ],
    productInstruction: [
      {
        instruction_step: "Step1",
      },
    ],
    productInventor: [
      {
        inventor_name: "Irobuisi Ch",
        inventor_email: "test@test.com",
        inventor_contact: "",
      },
    ],
    productSupplier: [
      {
        supplier_name: "Global distribution",
        supplier_email: "global@test.com",
        supplier_contact: "",
      },
    ],
    productGuidelines: [
      {
        name: "Guideline 1",
      },
    ],
    isGenderFriendly: false,
    productGenderDescription: "Optional description here",
    createdAt: "2024-06-12T10:57:07.486Z",
    updatedAt: "2024-06-12T10:57:07.486Z",
  },
];
