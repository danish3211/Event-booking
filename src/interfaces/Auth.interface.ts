export interface InitSessionDto {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

export interface AuthUser {
  accessToken: string;
  refreshToken: string;
  id: number;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface GetCurrentUserResponse {
  statusCode: string;
  message: string;
  data: UserProfile[];
}

export interface UserProfile {
  id: number
  bio: string
  role: string
  email: string
  imageUrl: string
  lastName: string
  location: string
  createdAt: string
  firstName: string
  updatedAt: string
  websiteUrl: string
  dateOfBirth: string
  profileName: string
  mobileNumber: string
  userMasterId: number
  minimumBudget: number
  specialization: string
  yearsOfExperience: number
  isDefaultProfile: boolean
}
