/**
 * TVS Rubber Boots - Size Data
 * Dữ liệu sản phẩm và bảng size cho ủng cao su
 */

const PRODUCTS = [
  {
    id: "RB-001",
    name: "Ủng Bảo Hộ Xanh Rêu",
    code: "RB-001",
    color: "#2d5016",
    type: "high",
    description: "Ủng cao cổ, chống nước, phù hợp công trường"
  },
  {
    id: "RB-002",
    name: "Ủng Công Nghiệp Đen",
    code: "RB-002",
    color: "#1a1a1a",
    type: "high",
    description: "Ủng cao su đen, chống hóa chất"
  },
  {
    id: "RB-003",
    name: "Ủng Nông Nghiệp Xanh",
    code: "RB-003",
    color: "#166534",
    type: "high",
    description: "Ủng cao su xanh, phù hợp đồng ruộng"
  },
  {
    id: "RB-004",
    name: "Ủng Ngắn Cổ Vàng",
    code: "RB-004",
    color: "#ca8a04",
    type: "low",
    description: "Ủng ngắn cổ, nhẹ, linh hoạt"
  },
  {
    id: "RB-005",
    name: "Ủng An Toàn Cam",
    code: "RB-005",
    color: "#ea580c",
    type: "high",
    description: "Ủng phản quang cam, an toàn lao động"
  },
  {
    id: "RB-006",
    name: "Ủng Trắng Thực Phẩm",
    code: "RB-006",
    color: "#f5f5f4",
    type: "high",
    description: "Ủng trắng chuyên ngành thực phẩm"
  },
  {
    id: "RB-007",
    name: "Ủng Ngắn Đen",
    code: "RB-007",
    color: "#292524",
    type: "low",
    description: "Ủng ngắn cổ đen, đa dụng"
  },
  {
    id: "RB-008",
    name: "Ủng Xanh Navy",
    code: "RB-008",
    color: "#1e3a5f",
    type: "high",
    description: "Ủng xanh navy, chống trượt"
  }
];

/**
 * Bảng size - mỗi entry chứa thông số cho từng mã và size
 * Đơn vị: mm
 * footLength: Chiều dài bàn chân
 * ballGirth: Vòng khớp ngón chân
 * ballWidth: Bề ngang khớp ngón chân
 * instepGirth: Vòng mu bàn chân
 * calfGirth: Vòng bắp chân (chỉ cho ủng cao)
 */
const SIZE_CHART = [
  // RB-001 Ủng Bảo Hộ Xanh Rêu (High boot)
  { productId: "RB-001", uk: 4, us: 5, eur: 37, footLength: 235, ballGirth: 210, ballWidth: 82, instepGirth: 215, calfGirth: 340 },
  { productId: "RB-001", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 216, ballWidth: 84, instepGirth: 220, calfGirth: 350 },
  { productId: "RB-001", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 222, ballWidth: 87, instepGirth: 225, calfGirth: 360 },
  { productId: "RB-001", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 228, ballWidth: 89, instepGirth: 230, calfGirth: 370 },
  { productId: "RB-001", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 234, ballWidth: 92, instepGirth: 236, calfGirth: 380 },
  { productId: "RB-001", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 240, ballWidth: 94, instepGirth: 241, calfGirth: 390 },
  { productId: "RB-001", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 246, ballWidth: 97, instepGirth: 247, calfGirth: 400 },
  { productId: "RB-001", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 252, ballWidth: 99, instepGirth: 252, calfGirth: 410 },
  { productId: "RB-001", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 258, ballWidth: 102, instepGirth: 258, calfGirth: 420 },
  { productId: "RB-001", uk: 13, us: 14, eur: 46, footLength: 298, ballGirth: 264, ballWidth: 104, instepGirth: 263, calfGirth: 430 },

  // RB-002 Ủng Công Nghiệp Đen (High boot)
  { productId: "RB-002", uk: 4, us: 5, eur: 37, footLength: 235, ballGirth: 212, ballWidth: 83, instepGirth: 217, calfGirth: 345 },
  { productId: "RB-002", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 218, ballWidth: 85, instepGirth: 222, calfGirth: 355 },
  { productId: "RB-002", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 224, ballWidth: 88, instepGirth: 227, calfGirth: 365 },
  { productId: "RB-002", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 230, ballWidth: 90, instepGirth: 233, calfGirth: 375 },
  { productId: "RB-002", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 236, ballWidth: 93, instepGirth: 238, calfGirth: 385 },
  { productId: "RB-002", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 242, ballWidth: 95, instepGirth: 244, calfGirth: 395 },
  { productId: "RB-002", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 248, ballWidth: 98, instepGirth: 249, calfGirth: 405 },
  { productId: "RB-002", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 254, ballWidth: 100, instepGirth: 255, calfGirth: 415 },
  { productId: "RB-002", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 260, ballWidth: 103, instepGirth: 260, calfGirth: 425 },
  { productId: "RB-002", uk: 13, us: 14, eur: 46, footLength: 298, ballGirth: 266, ballWidth: 105, instepGirth: 266, calfGirth: 435 },

  // RB-003 Ủng Nông Nghiệp Xanh (High boot)
  { productId: "RB-003", uk: 4, us: 5, eur: 37, footLength: 235, ballGirth: 214, ballWidth: 84, instepGirth: 218, calfGirth: 350 },
  { productId: "RB-003", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 220, ballWidth: 86, instepGirth: 224, calfGirth: 360 },
  { productId: "RB-003", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 226, ballWidth: 89, instepGirth: 229, calfGirth: 370 },
  { productId: "RB-003", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 232, ballWidth: 91, instepGirth: 235, calfGirth: 380 },
  { productId: "RB-003", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 238, ballWidth: 94, instepGirth: 240, calfGirth: 390 },
  { productId: "RB-003", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 244, ballWidth: 96, instepGirth: 246, calfGirth: 400 },
  { productId: "RB-003", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 250, ballWidth: 99, instepGirth: 251, calfGirth: 410 },
  { productId: "RB-003", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 256, ballWidth: 101, instepGirth: 257, calfGirth: 420 },
  { productId: "RB-003", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 262, ballWidth: 104, instepGirth: 262, calfGirth: 430 },
  { productId: "RB-003", uk: 13, us: 14, eur: 46, footLength: 298, ballGirth: 268, ballWidth: 106, instepGirth: 268, calfGirth: 440 },

  // RB-004 Ủng Ngắn Cổ Vàng (Low boot - no calfGirth)
  { productId: "RB-004", uk: 4, us: 5, eur: 37, footLength: 235, ballGirth: 208, ballWidth: 81, instepGirth: 213, calfGirth: null },
  { productId: "RB-004", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 214, ballWidth: 83, instepGirth: 218, calfGirth: null },
  { productId: "RB-004", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 220, ballWidth: 86, instepGirth: 224, calfGirth: null },
  { productId: "RB-004", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 226, ballWidth: 88, instepGirth: 229, calfGirth: null },
  { productId: "RB-004", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 232, ballWidth: 91, instepGirth: 235, calfGirth: null },
  { productId: "RB-004", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 238, ballWidth: 93, instepGirth: 240, calfGirth: null },
  { productId: "RB-004", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 244, ballWidth: 96, instepGirth: 246, calfGirth: null },
  { productId: "RB-004", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 250, ballWidth: 98, instepGirth: 251, calfGirth: null },
  { productId: "RB-004", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 256, ballWidth: 101, instepGirth: 257, calfGirth: null },

  // RB-005 Ủng An Toàn Cam (High boot)
  { productId: "RB-005", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 218, ballWidth: 85, instepGirth: 222, calfGirth: 352 },
  { productId: "RB-005", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 224, ballWidth: 88, instepGirth: 228, calfGirth: 362 },
  { productId: "RB-005", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 230, ballWidth: 90, instepGirth: 233, calfGirth: 372 },
  { productId: "RB-005", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 236, ballWidth: 93, instepGirth: 239, calfGirth: 382 },
  { productId: "RB-005", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 242, ballWidth: 95, instepGirth: 244, calfGirth: 392 },
  { productId: "RB-005", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 248, ballWidth: 98, instepGirth: 250, calfGirth: 402 },
  { productId: "RB-005", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 254, ballWidth: 100, instepGirth: 255, calfGirth: 412 },
  { productId: "RB-005", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 260, ballWidth: 103, instepGirth: 261, calfGirth: 422 },

  // RB-006 Ủng Trắng Thực Phẩm (High boot)
  { productId: "RB-006", uk: 4, us: 5, eur: 37, footLength: 235, ballGirth: 210, ballWidth: 82, instepGirth: 215, calfGirth: 338 },
  { productId: "RB-006", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 216, ballWidth: 84, instepGirth: 221, calfGirth: 348 },
  { productId: "RB-006", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 222, ballWidth: 87, instepGirth: 226, calfGirth: 358 },
  { productId: "RB-006", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 228, ballWidth: 89, instepGirth: 232, calfGirth: 368 },
  { productId: "RB-006", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 234, ballWidth: 92, instepGirth: 237, calfGirth: 378 },
  { productId: "RB-006", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 240, ballWidth: 94, instepGirth: 243, calfGirth: 388 },
  { productId: "RB-006", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 246, ballWidth: 97, instepGirth: 248, calfGirth: 398 },
  { productId: "RB-006", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 252, ballWidth: 99, instepGirth: 254, calfGirth: 408 },
  { productId: "RB-006", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 258, ballWidth: 102, instepGirth: 259, calfGirth: 418 },

  // RB-007 Ủng Ngắn Đen (Low boot)
  { productId: "RB-007", uk: 4, us: 5, eur: 37, footLength: 235, ballGirth: 210, ballWidth: 82, instepGirth: 214, calfGirth: null },
  { productId: "RB-007", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 216, ballWidth: 84, instepGirth: 220, calfGirth: null },
  { productId: "RB-007", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 222, ballWidth: 87, instepGirth: 225, calfGirth: null },
  { productId: "RB-007", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 228, ballWidth: 89, instepGirth: 231, calfGirth: null },
  { productId: "RB-007", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 234, ballWidth: 92, instepGirth: 236, calfGirth: null },
  { productId: "RB-007", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 240, ballWidth: 94, instepGirth: 242, calfGirth: null },
  { productId: "RB-007", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 246, ballWidth: 97, instepGirth: 247, calfGirth: null },
  { productId: "RB-007", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 252, ballWidth: 99, instepGirth: 253, calfGirth: null },
  { productId: "RB-007", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 258, ballWidth: 102, instepGirth: 258, calfGirth: null },

  // RB-008 Ủng Xanh Navy (High boot)
  { productId: "RB-008", uk: 5, us: 6, eur: 38, footLength: 242, ballGirth: 217, ballWidth: 85, instepGirth: 221, calfGirth: 348 },
  { productId: "RB-008", uk: 6, us: 7, eur: 39, footLength: 249, ballGirth: 223, ballWidth: 87, instepGirth: 227, calfGirth: 358 },
  { productId: "RB-008", uk: 7, us: 8, eur: 40, footLength: 256, ballGirth: 229, ballWidth: 90, instepGirth: 232, calfGirth: 368 },
  { productId: "RB-008", uk: 8, us: 9, eur: 41, footLength: 263, ballGirth: 235, ballWidth: 92, instepGirth: 238, calfGirth: 378 },
  { productId: "RB-008", uk: 9, us: 10, eur: 42, footLength: 270, ballGirth: 241, ballWidth: 95, instepGirth: 243, calfGirth: 388 },
  { productId: "RB-008", uk: 10, us: 11, eur: 43, footLength: 277, ballGirth: 247, ballWidth: 97, instepGirth: 249, calfGirth: 398 },
  { productId: "RB-008", uk: 11, us: 12, eur: 44, footLength: 284, ballGirth: 253, ballWidth: 100, instepGirth: 254, calfGirth: 408 },
  { productId: "RB-008", uk: 12, us: 13, eur: 45, footLength: 291, ballGirth: 259, ballWidth: 102, instepGirth: 260, calfGirth: 418 },
];

/**
 * Hướng dẫn đo chân
 */
const MEASUREMENT_GUIDES = [
  {
    icon: "📏",
    title: "Chiều dài bàn chân",
    description: "Đặt chân lên giấy, đánh dấu điểm dài nhất của gót và ngón chân dài nhất. Đo khoảng cách giữa 2 điểm (mm)."
  },
  {
    icon: "⭕",
    title: "Vòng khớp ngón chân",
    description: "Dùng thước dây quấn quanh phần rộng nhất của bàn chân (vùng khớp ngón cái và ngón út). Ghi số đo (mm)."
  },
  {
    icon: "↔️",
    title: "Bề ngang khớp ngón",
    description: "Đo bề ngang phần rộng nhất bàn chân từ khớp ngón cái đến khớp ngón út (mm)."
  },
  {
    icon: "🦶",
    title: "Vòng mu bàn chân",
    description: "Quấn thước dây quanh mu bàn chân (phần cao nhất khi đứng). Ghi số đo (mm)."
  },
  {
    icon: "🦵",
    title: "Vòng bắp chân",
    description: "Đo vòng phần to nhất của bắp chân. Chỉ cần khi chọn ủng cao cổ (mm)."
  }
];
