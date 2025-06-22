import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','username','password','role','emailVerified','maskedEmail','phone','language','country','postalCode','address','addressExtra','metadata','phoneCertifiedAt','emailMarketingAgreedAt','phoneMarketingAgreedAt','createdAt','updatedAt']);

export const CourseScalarFieldEnumSchema = z.enum(['id','title','publicTitle','publicDescription','description','state','slug','instructor','keywords','qualification','clipCount','runningTime','paidPeriod','openAt','desktopCoverImage','mobileCoverImage','desktopCardAsset','coverVideo','createdAt','updatedAt','categoryId']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','slug','description']);

export const ProductScalarFieldEnumSchema = z.enum(['id','title','publicTitle','subtitle','description','state','currency','listPrice','salePrice','discountAmount','discountPercent','createdAt','updatedAt','courseId']);

export const OrderScalarFieldEnumSchema = z.enum(['id','state','listPrice','salePrice','discountPrice','paymentMethod','paymentPg','paymentState','paymentAt','createdAt','updatedAt','userId']);

export const OrderItemScalarFieldEnumSchema = z.enum(['id','quantity','listPrice','salePrice','orderId','productId']);

export const VoucherTemplateScalarFieldEnumSchema = z.enum(['id','type','title','publicDescription','code','currency','discountType','discountAmount','discountRate','maxDiscountAmount','minPaymentAmount','total','stock','periodType','periodDuration','periodBeginAt','periodEndAt','redeemBeginAt','redeemEndAt','createdAt','updatedAt']);

export const VoucherScalarFieldEnumSchema = z.enum(['id','isUsed','useBeginAt','useEndAt','createdAt','updatedAt','templateId','userId']);

export const VoucherUsageHistoryScalarFieldEnumSchema = z.enum(['id','usedAt','voucherId','userId']);

export const EnrollmentScalarFieldEnumSchema = z.enum(['id','state','periodBeginAt','periodEndAt','completedAt','createdAt','updatedAt','userId','courseId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['USER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const OrderStateSchema = z.enum(['PENDING','COMPLETED','CANCELLED','REFUNDED']);

export type OrderStateType = `${z.infer<typeof OrderStateSchema>}`

export const PaymentMethodSchema = z.enum(['CARD','PAYPAL','PROMOTION']);

export type PaymentMethodType = `${z.infer<typeof PaymentMethodSchema>}`

export const VoucherTypeSchema = z.enum(['WELCOME','DOWNLOAD','DEFAULT']);

export type VoucherTypeType = `${z.infer<typeof VoucherTypeSchema>}`

export const VoucherDiscountTypeSchema = z.enum(['AMOUNT','RATE']);

export type VoucherDiscountTypeType = `${z.infer<typeof VoucherDiscountTypeSchema>}`

export const VoucherPeriodTypeSchema = z.enum(['DURATION','SPECIFIED_PERIOD']);

export type VoucherPeriodTypeType = `${z.infer<typeof VoucherPeriodTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  username: z.string().nullable(),
  password: z.string(),
  emailVerified: z.boolean(),
  maskedEmail: z.string().nullable(),
  phone: z.string().nullable(),
  language: z.string().nullable(),
  country: z.string().nullable(),
  postalCode: z.string().nullable(),
  address: z.string().nullable(),
  addressExtra: z.string().nullable(),
  metadata: z.string().nullable(),
  phoneCertifiedAt: z.coerce.date().nullable(),
  emailMarketingAgreedAt: z.coerce.date().nullable(),
  phoneMarketingAgreedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const CourseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  publicTitle: z.string().nullable(),
  publicDescription: z.string().nullable(),
  description: z.string().nullable(),
  state: z.string(),
  slug: z.string().nullable(),
  instructor: z.string().nullable(),
  keywords: z.string().nullable(),
  qualification: z.string().nullable(),
  clipCount: z.number().int().nullable(),
  runningTime: z.number().int().nullable(),
  paidPeriod: z.string().nullable(),
  openAt: z.coerce.date().nullable(),
  desktopCoverImage: z.string().nullable(),
  mobileCoverImage: z.string().nullable(),
  desktopCardAsset: z.string().nullable(),
  coverVideo: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  categoryId: z.number().int().nullable(),
})

export type Course = z.infer<typeof CourseSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  publicTitle: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  state: z.string(),
  currency: z.string(),
  listPrice: z.number(),
  salePrice: z.number(),
  discountAmount: z.number().nullable(),
  discountPercent: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  courseId: z.number().int().nullable(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// ORDER SCHEMA
/////////////////////////////////////////

export const OrderSchema = z.object({
  state: OrderStateSchema,
  paymentMethod: PaymentMethodSchema.nullable(),
  id: z.number().int(),
  listPrice: z.number(),
  salePrice: z.number(),
  discountPrice: z.number(),
  paymentPg: z.string().nullable(),
  paymentState: z.string().nullable(),
  paymentAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.number().int(),
})

export type Order = z.infer<typeof OrderSchema>

/////////////////////////////////////////
// ORDER ITEM SCHEMA
/////////////////////////////////////////

export const OrderItemSchema = z.object({
  id: z.number().int(),
  quantity: z.number().int(),
  listPrice: z.number(),
  salePrice: z.number(),
  orderId: z.number().int(),
  productId: z.number().int(),
})

export type OrderItem = z.infer<typeof OrderItemSchema>

/////////////////////////////////////////
// VOUCHER TEMPLATE SCHEMA
/////////////////////////////////////////

export const VoucherTemplateSchema = z.object({
  type: VoucherTypeSchema,
  discountType: VoucherDiscountTypeSchema,
  periodType: VoucherPeriodTypeSchema,
  id: z.number().int(),
  title: z.string(),
  publicDescription: z.string().nullable(),
  code: z.string(),
  currency: z.string(),
  discountAmount: z.number().nullable(),
  discountRate: z.number().nullable(),
  maxDiscountAmount: z.number().nullable(),
  minPaymentAmount: z.number().nullable(),
  total: z.number().int(),
  stock: z.number().int(),
  periodDuration: z.number().int().nullable(),
  periodBeginAt: z.coerce.date().nullable(),
  periodEndAt: z.coerce.date().nullable(),
  redeemBeginAt: z.coerce.date().nullable(),
  redeemEndAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type VoucherTemplate = z.infer<typeof VoucherTemplateSchema>

/////////////////////////////////////////
// VOUCHER SCHEMA
/////////////////////////////////////////

export const VoucherSchema = z.object({
  id: z.number().int(),
  isUsed: z.boolean(),
  useBeginAt: z.coerce.date().nullable(),
  useEndAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  templateId: z.number().int(),
  userId: z.number().int().nullable(),
})

export type Voucher = z.infer<typeof VoucherSchema>

/////////////////////////////////////////
// VOUCHER USAGE HISTORY SCHEMA
/////////////////////////////////////////

export const VoucherUsageHistorySchema = z.object({
  id: z.number().int(),
  usedAt: z.coerce.date(),
  voucherId: z.number().int(),
  userId: z.number().int(),
})

export type VoucherUsageHistory = z.infer<typeof VoucherUsageHistorySchema>

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const EnrollmentSchema = z.object({
  id: z.number().int(),
  state: z.string(),
  periodBeginAt: z.coerce.date().nullable(),
  periodEndAt: z.coerce.date().nullable(),
  completedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.number().int(),
  courseId: z.number().int(),
})

export type Enrollment = z.infer<typeof EnrollmentSchema>
