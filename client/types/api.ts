// 표준 API 응답 형식
export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

// 에러 응답 형식
export interface ApiError {
  code: number;
  message: string;
  cause?: string;
  details?: any;
}

// Mock API 응답을 표준 형식으로 변환하는 유틸리티
export const normalizeMockResponse = <T>(mockData: any): ApiResponse<T> => {
  // Mock API 응답이 이미 { data: ... } 형태인 경우,
  // 기존 클라이언트 호환성을 위해 data 필드를 직접 반환
  if (mockData && typeof mockData === 'object' && 'data' in mockData) {
    // 기존 클라이언트 코드는 http.get().data가 직접 배열/객체를 반환하길 기대
    // 따라서 Mock API의 data 필드를 ApiResponse의 data로 설정
    return {
      success: true,
      data: mockData.data, // Mock API의 data 필드 (배열 등)를 직접 전달
    };
  }

  // Mock 데이터가 직접 데이터인 경우 래핑
  return {
    success: true,
    data: mockData,
  };
};

// Express API 응답을 표준 형식으로 변환하는 유틸리티
export const normalizeExpressResponse = <T>(response: any): ApiResponse<T> => {
  // Express API는 이미 표준 형식을 따른다고 가정
  if (response && response.success !== undefined) {
    return response;
  }

  // Express API 응답이 { data: ..., meta: ..., user: ... } 형태인 경우 (auth 응답 등)
  if (response && typeof response === 'object' && ('data' in response || 'meta' in response || 'user' in response)) {
    return {
      success: true,
      data: response,
    };
  }

  // 만약 Express API가 다른 형식을 사용한다면 여기서 변환
  return {
    success: true,
    data: response,
  };
};

// 에러 응답 생성 유틸리티
export const createErrorResponse = (error: ApiError): ApiResponse => {
  return {
    success: false,
    error,
  };
};

// Mock 데이터 구조 타입들 (기존 mock.json 구조 참고)
export interface MockI18nData {
  id: string;
  data: Record<string, any>;
}

export interface MockOrderData {
  id: string;
  data: {
    orderDetail: Array<{
      id: number;
      orderName: string;
      orderState: string;
      orderListPrice: number;
      orderSalePrice: number;
      orderDiscountPrice: number;
      paymentPg: string | null;
      paymentType: string;
      paymentState: string;
      paymentMethod: string;
      paymentRequestedAt: string;
      paymentCompletedAt: string;
      paymentUpdatedAt: string;
      orderItems: any[];
    }>;
    refundOrders: any[];
  };
}

export interface MockCatalogData {
  id: string;
  data: Array<{
    id: number;
    site: string;
    type: string;
    state: string;
    flags: number;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    subCategoryId: number | null;
    formatId: number;
    originCourseId: number | null;
    code: string | null;
    prerequisite: string;
    openAt: string;
    closeAt: string | null;
    // ... 기타 필드들
  }>;
}

// Mock 데이터 전체 구조
export interface MockApiData {
  i18n: MockI18nData[];
  orders: MockOrderData[];
  catalogs: MockCatalogData[];
}
