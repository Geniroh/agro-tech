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
  currency: string;
  reactions?: IInnovationReaction[];
  comments: IInnovationComment[];
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
  discussions: IInnovationDiscussion[];
}

interface IInnovationComment {
  createdAt?: string;
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

interface IInnovationCommentReply {
  commentId: string;
  createdAt: string;
  dislikes: number;
  id: string;
  likes: number;
  message: string;
  updatedAt: string;
  userId: string;
  User: IUser;
  Comment: IInnovationComment;
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
  comments: IInnovationComment[];
  Innovation?: IInnovationType;
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

interface IUser {
  email: string;
  emailVerified: string;
  id: string;
  image: string;
  name: string;
  role: string;
}

interface IUserDetails {
  id: string;
  username: string;
  phone: string;
  occupation: string;
  userId: string;
  country: string;
  state?: string;
  lga?: string;
  address?: string;
  company_name?: string;
  position?: string;
  association?: string;
  user?: IUser;
}

interface IGetInnovationDiscussionResponse {
  message: string;
  comments: IInnovationComment[];
  discussion: IInnovationDiscussion;
}

interface IGetInnovationDisussionReplies {
  message: string;
  replies: IInnovationCommentReply[];
}

interface IUserDiscussion {
  createdAt: string;
  dislikes: number;
  id: string;
  likes: number;
  message: string;
  replies: IUserDiscussionReply[];
  title: string;
  updatedAt: string;
  userId: string;
  user: IUser;
  comments: IUserDiscussionReply[];
}

interface IUserDiscussionReply {
  id: string;
  message: string;
  userId: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  discussionId: string;
  Discussion?: IUserDiscussion;
}

interface IFeaturedPosts {
  id: string;
  title: string;
  mediaUrl: string;
  tag: string[];
  createdAt: string;
  updatedAt: string;
}
