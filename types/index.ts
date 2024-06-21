type SocialProvidersType = "google" | "github" | "facebook" | "apple";

interface Media {
  name: string;
  url: string;
  size?: number;
  type?: string;
  uid?: string;
}

interface ProductExample {
  instance_description: string;
  instance_media: Media[];
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

interface IInnovationReaction {
  id: string;
  userId: string;
  innovationId: string;
  reaction: string;
  User?: any;
  Innovation?: any;
  createdAt: string;
  updatedAt: string;
}

interface IInnovationType {
  id: string;
  productName: string;
  yearInvented: string;
  country: string;
  cost: number;
  likes: number;
  status?: string;
  dislikes: number;
  reactions?: IInnovationReaction[];
  productChain: string[];
  productPhase: string;
  productUse: string;
  productDescription: string;
  productMedia: Media[];
  isExample: boolean;
  isHSEGuidelines: boolean;
  isInstruction: boolean;
  isInventor: boolean;
  isSupplier: boolean;
  productExample?: ProductExample[];
  productInstruction?: ProductInstruction[];
  productInventor: ProductInventor[];
  productSupplier: ProductSupplier[];
  productGuidelines?: ProductGuidelines[];
  isGenderFriendly?: boolean | null;
  productGenderDescription?: string | null;
  createdAt: string;
  updatedAt?: string;
  discussion?: IInnovationDiscussion[];
}

interface IInnovationComment {
  createdAt?: Date;
  dislikes: number;
  email: string;
  id: string;
  innovationDiscussionId: string;
  likes: number;
  message: string;
  replies?: any | any[];
  topReply?: string;
  updatedAt?: Date;
  username: string;
}

interface IGetInnovationReactions {
  message?: string;
  totalComments: number;
  totalDislikes: number;
  totalLikes: number;
  totalReplies: number;
}

interface IGetInnovationResponse {
  data: IInnovationType[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface IInnovationDiscussion {
  createdAt: string;
  dislikes: number;
  id: string;
  innovation_id: string;
  likes: number;
  topComment: any;
  updatedAt: string;
  comments: any[];
  Innovation?: IInnovationType;
}

interface IUserDiscussion {
  createdAt: string;
  dislikes: number;
  id: string;
  likes: number;
  message: string;
  title: string;
  updatedAt: string;
  userId: string;
  user: any;
  replies: any;
}

interface ICombinedDiscussion {
  createdAt: string;
  dislikes: number;
  id: string;
  innovation_id: string;
  likes: number;
  topComment: any;
  updatedAt: string;
  comments?: any[];
  message: string;
  title: string;
  userId: string;
  replies?: any[];
  user?: any;
  Innovation?: IInnovationType;
}

interface ChartData {
  name: string;
  value: number;
}

// interface IInnovationComments {
//   createdAt: Date;
//   dislikes: number;
//   email: string;
//   id: string;
//   innovationDiscussionId: string;
//   likes: number;
//   message: string;
//   topReply: any;
//   updatedAt: Date;
//   username: string;
// }

// const data: IInnovationType[] = [
//   {
//     id: "66697f03e9c81c3233f0c24d",
//     productName: "Razorslasher",
//     yearInvented: "2023",
//     country: "Algeria",
//     cost: 2000,
//     likes: 0,
//     dislikes: 0,
//     productChain: ["Farm supply"],
//     productPhase: "testing",
//     productUse: "For automatically clearing weeds and land cultivation",
//     productDescription: "Null",
//     productMedia: [
//       {
//         name: "download__1_-removebg-preview.png",
//         url: "https://stavmia-bucket.https://nyc3.digitaloceanspaces.com/download__1_-removebg-preview.png",
//       },
//     ],
//     isExample: true,
//     productExample: [
//       {
//         instance_description: "Null",
//         instance_media: {
//           name: "download__1_-removebg-preview.png",
//           url: "https://stavmia-bucket.https://nyc3.digitaloceanspaces.com/download__1_-removebg-preview.png",
//           type: "image/jpeg",
//           size: 11277,
//         },
//       },
//     ],
//     productInstruction: [
//       {
//         instruction_step: "Step1",
//       },
//     ],
//     productInventor: [
//       {
//         inventor_name: "Irobuisi Ch",
//         inventor_email: "test@test.com",
//         inventor_contact: "",
//       },
//     ],
//     productSupplier: [
//       {
//         supplier_name: "Global distribution",
//         supplier_email: "global@test.com",
//         supplier_contact: "",
//       },
//     ],
//     productGuidelines: [
//       {
//         name: "Guideline 1",
//       },
//     ],
//     isGenderFriendly: false,
//     productGenderDescription: "Optional description here",
//     createdAt: "2024-06-12T10:57:07.486Z",
//     updatedAt: "2024-06-12T10:57:07.486Z",
//   },
// ];
